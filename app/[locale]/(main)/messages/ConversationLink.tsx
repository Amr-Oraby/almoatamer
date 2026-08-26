"use client";

import { Link } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Conversation } from '@/app/types/conversations';

export default function ConversationLink({ conv }: { conv: Conversation }) {
  const params = useParams();
  const isActive = params.id === String(conv.id);
  // If active, clicking again closes the chat by navigating back to /messages
  const href = isActive ? '/messages' : `/messages/${conv.id}`;

  const isAttachment = conv.last_message?.message_type === 'file' || conv.last_message?.message_type === 'image' || (conv.last_message?.message && typeof conv.last_message.message === 'string' && conv.last_message.message.startsWith('http') && conv.last_message.message.match(/\.(jpeg|jpg|gif|png|webp|svg|pdf|txt|doc|docx|xls|xlsx|ppt|pptx|zip|rar|csv)(\?.*)?$/i));

  return (
    <Link 
      href={href}
      className={`w-full text-start flex items-center gap-4 p-3 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 group border ${
        isActive 
          ? 'bg-primary/5 border-primary/20 shadow-sm' 
          : 'bg-transparent border-transparent hover:bg-gray-50 hover:border-gray-100'
      }`}
    >
      <Avatar className="h-14 w-14 border border-gray-100 shadow-sm transition-transform group-hover:scale-105 bg-white">
        <AvatarImage src={conv.reciever_name.image || ''} alt={conv.reciever_name.name} className="object-cover" />
        <AvatarFallback className="bg-primary/5 text-primary font-semibold text-lg">
          {conv.reciever_name.name.substring(0, 2)}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <h3 className={`font-semibold truncate pr-1 ${isActive ? 'text-primary' : 'text-gray-900'}`}>
            {conv.reciever_name.name}
          </h3>
          <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">
            {conv.last_message?.agoTime || 'الآن'}
          </span>
        </div>
        <p className={`text-sm truncate leading-snug ${isActive ? 'text-gray-600 font-medium' : 'text-gray-500'}`}>
          {isAttachment
            ? '📎 ملف مرفق' 
            : (conv.last_message?.message || 'ابدأ المحادثة...')}
        </p>
      </div>

      {conv.unread_messages_count > 0 && (
        <div className="bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
          {conv.unread_messages_count > 99 ? '99+' : conv.unread_messages_count}
        </div>
      )}
    </Link>
  );
}
