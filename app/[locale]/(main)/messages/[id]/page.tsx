"use client";

import { use, useEffect, useState, useRef } from "react";
import { useChat, useReadMessages, useSendMessage } from "@/features/chat/hook";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { FileText, Download, Paperclip } from "lucide-react";

export default function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  
  const { data: chatResponse, isLoading } = useChat(id);
  const { mutate: readMessages } = useReadMessages();
  const { mutate: sendMessage, isPending: isSending } = useSendMessage();

  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mark as read on mount/change
  useEffect(() => {
    if (id) {
      readMessages(id);
    }
  }, [id, readMessages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatResponse?.data?.messages]);

  const handleSend = () => {
    if (!message.trim() || isSending || !chatResponse?.data?.receiver?.id) return;
    sendMessage({ 
      chatId: id, 
      receiverId: chatResponse.data.receiver.id,
      message, 
      type: "text" 
    });
    setMessage("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || isSending || !chatResponse?.data?.receiver?.id) return;
    
    sendMessage({
      chatId: id,
      receiverId: chatResponse.data.receiver.id,
      message: file,
      type: "file"
    });
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-full text-gray-400 gap-3">
        <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-sm font-medium">جاري التحميل...</p>
      </div>
    );
  }

  const chatDetails = chatResponse?.data;
  const receiver = chatDetails?.receiver;
  const messages = chatDetails?.messages || [];

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative animate-in fade-in duration-300">
      {/* Chat Header */}
      <div className="h-16 border-b border-gray-100 flex items-center px-6 bg-white z-10 shadow-sm gap-4">
        {receiver && (
          <>
            <Avatar className="h-10 w-10 border border-gray-100 shadow-sm">
              <AvatarImage src={receiver.image || ''} alt={receiver.name} className="object-cover" />
              <AvatarFallback className="bg-primary/5 text-primary font-semibold text-sm">
                {receiver.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-800 leading-tight">
                {receiver.name}
              </h3>
              {receiver.is_active && (
                <p className="text-xs text-green-500 font-medium flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span> متصل الآن
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#f8f9fa] space-y-4 relative">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <p className="text-sm">لا توجد رسائل سابقة. ابدأ المحادثة الآن!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.type === "me";
            
            const isUrl = msg.message.startsWith("http");
            const isImageExt = isUrl && msg.message.match(/\.(jpeg|jpg|gif|png|webp|svg)(\?.*)?$/i) != null;
            const isFileExt = isUrl && msg.message.match(/\.(pdf|txt|doc|docx|xls|xlsx|ppt|pptx|zip|rar|csv)(\?.*)?$/i) != null;
            
            const isImageMessage = msg.message_type === "image" || isImageExt;
            const isFileMessage = msg.message_type === "file" || (isUrl && !isImageExt && (isFileExt || msg.message.includes("/assets/")));

            const getFileName = (url: string) => {
              try {
                const urlParts = new URL(url).pathname.split('/');
                return decodeURIComponent(urlParts[urlParts.length - 1] || "ملف مرفق");
              } catch {
                return "ملف مرفق";
              }
            };
            
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] rounded-2xl px-4 py-2 shadow-sm relative text-sm md:text-base ${
                  isMe 
                    ? 'bg-primary text-primary-foreground rounded-br-sm' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-sm'
                }`}>
                  {isImageMessage ? (
                    <Dialog>
                      <DialogTrigger className="bg-transparent p-0 m-0 border-none inline-block">
                        <img 
                          src={msg.message} 
                          alt="مرفق" 
                          className="rounded-lg max-w-[200px] sm:max-w-[250px] max-h-[150px] object-cover mb-1 cursor-pointer hover:opacity-85 transition-opacity"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      </DialogTrigger>
                      <DialogContent className="max-w-[90vw] md:max-w-2xl bg-transparent border-none shadow-none flex justify-center p-0">
                        <DialogTitle className="sr-only">صورة مرفقة</DialogTitle>
                        <img 
                          src={msg.message} 
                          alt="مرفق مكبر" 
                          className="w-full h-auto max-h-[85vh] object-contain rounded-xl" 
                        />
                      </DialogContent>
                    </Dialog>
                  ) : isFileMessage ? (
                    <a 
                      href={msg.message} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-3 rounded-xl border mb-1 transition-colors ${
                        isMe 
                          ? 'bg-primary-foreground/10 border-primary-foreground/20 hover:bg-primary-foreground/20' 
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${isMe ? 'bg-primary-foreground/20' : 'bg-white shadow-sm border border-gray-100'}`}>
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate" dir="ltr">{getFileName(msg.message)}</p>
                        <p className="text-xs opacity-70 mt-0.5">انقر للعرض أو التنزيل</p>
                      </div>
                      <Download className="w-4 h-4 opacity-70 flex-shrink-0" />
                    </a>
                  ) : (
                    <p className="whitespace-pre-wrap">{msg.message}</p>
                  )}
                  <div className={`text-[10px] mt-1 text-end ${isMe ? 'text-primary-foreground/70' : 'text-gray-400'}`}>
                    {msg.updated_at.split(', ')[1]}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex gap-2 relative items-center">
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
            disabled={isSending}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isSending}
            type="button"
            className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 flex-shrink-0"
            title="إرفاق ملف"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="اكتب رسالة..." 
            disabled={isSending}
            className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all disabled:opacity-50"
          />
          <button 
            onClick={handleSend}
            disabled={!message.trim() || isSending}
            className="bg-primary text-primary-foreground h-12 w-12 flex-shrink-0 rounded-full flex items-center justify-center shadow-sm hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:hover:scale-100"
          >
            {isSending ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="-ml-1">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
