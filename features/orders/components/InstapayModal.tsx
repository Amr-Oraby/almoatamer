"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImagePlus, X, UploadCloud, Loader2 } from "lucide-react";
import { useLocale } from "next-intl";
import { useUploadUmrahInstapay } from "@/features/booking/hooks";

interface InstapayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  orderPrice: string | number;
  orderId: string;
}

export default function InstapayModal({ isOpen, onClose, onBack, orderPrice, orderId }: InstapayModalProps) {
  const locale = useLocale();
  const isRtl = locale === 'ar';
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { mutate: uploadInstapay, isPending } = useUploadUmrahInstapay();

  const instapayNumber = "01008780062"; // Assuming this is fixed or from settings

  const titleText = isRtl
    ? `يمكنك الدفع عبر إنستاباي. ( ${instapayNumber} ) + ( سعر العمرة = ${orderPrice} جنية )`
    : `You can pay via Instapay. (${instapayNumber}) + (Umrah price = ${orderPrice} EGP)`;
    
  const subtitleText = isRtl ? "يرجى رفع صورة المعاملة" : "Please upload the transaction image";
  const saveText = isRtl ? "حفظ" : "Save";
  const backText = isRtl ? "رجوع" : "Back";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setSelectedFile(file);
    }
  };

  const handleClearPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("umrah_id", orderId);
    formData.append("instapay", selectedFile);

    uploadInstapay(formData, {
      onSuccess: () => {
        onClose();
        setPreviewUrl(null);
        setSelectedFile(null);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl p-6 sm:p-8 rounded-3xl bg-white shadow-2xl border-0">
        <DialogHeader className="mb-6 flex flex-col items-center text-center gap-3">
          <DialogTitle className="text-lg sm:text-xl font-bold text-[#1a2754] leading-relaxed max-w-[90%]">
            {titleText}
          </DialogTitle>
          <p className="text-sm sm:text-base text-muted-foreground font-medium">
            {subtitleText}
          </p>
        </DialogHeader>

        {/* Upload Area */}
        <div className="flex justify-center mb-8">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`
              relative w-64 h-64 sm:w-72 sm:h-72 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all duration-300
              ${previewUrl ? 'border-primary/50 shadow-md' : 'border-[#1a2754]/20 hover:border-[#1a2754]/50 hover:bg-slate-50'}
            `}
          >
            {previewUrl ? (
              <>
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  onClick={handleClearPreview}
                  className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-1.5 rounded-full text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center gap-4 text-[#1a2754]/40">
                <div className="p-4 bg-[#1a2754]/5 rounded-full">
                  <ImagePlus className="w-16 h-16 sm:w-20 sm:h-20" strokeWidth={1.5} />
                </div>
                <span className="text-sm font-medium text-[#1a2754]/60">
                  {isRtl ? "اضغط لرفع الصورة" : "Click to upload image"}
                </span>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onBack}
            className="w-full py-3.5 sm:py-4 bg-white text-[#1a2754] border-2 border-[#1a2754] rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors"
          >
            {backText}
          </button>
          
          <button
            onClick={handleSave}
            disabled={!selectedFile || isPending}
            className="w-full flex justify-center items-center py-3.5 sm:py-4 bg-[#1a2754] text-white rounded-xl font-bold text-lg hover:bg-[#121c3b] shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? <Loader2 className="w-6 h-6 animate-spin text-white" /> : saveText}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
