export default function MessagesPage() {
  return (
    <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-gray-50/50 p-8 relative overflow-hidden h-full">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      
      <div className="bg-white p-8 rounded-full shadow-sm border border-gray-100 mb-6 relative z-10 animate-in fade-in zoom-in duration-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/>
        </svg>
      </div>
      <h3 className="text-2xl font-semibold text-gray-700 mb-3 tracking-tight z-10">ابدأ بالتواصل</h3>
      <p className="text-gray-500 text-center max-w-sm leading-relaxed z-10">
        اختر محادثة من القائمة الجانبية لعرض الرسائل أو بدء محادثة جديدة.
      </p>
    </div>
  );
}
