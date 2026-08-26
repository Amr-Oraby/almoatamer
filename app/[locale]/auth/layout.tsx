import Image from 'next/image';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* Left side - Image/Pattern (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#f8f9fa] items-center justify-center overflow-hidden">
        {/* Decorative Islamic Pattern Background */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Placeholder Kaaba Image (from Unsplash) */}
        <div className="relative w-1/2 max-w-md aspect-square drop-shadow-2xl z-10">
          <Image 
            src="/images/kaaba-2.png" 
            alt="Kaaba" 
            fill
            className="object-cover rounded-3xl"
            priority
          />
        </div>
      </div>

      {/* Right side - Container */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 sm:p-12 lg:p-16 xl:p-24 bg-white relative">
        {children}
      </div>
    </div>
  );
}
