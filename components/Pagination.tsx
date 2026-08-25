"use client";

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { type PaginationMeta } from '@/app/types/blog';

export default function Pagination({ meta }: { meta?: PaginationMeta }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!meta || meta.last_page <= 1) {
    return null;
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex justify-center items-center space-x-2 rtl:space-x-reverse mt-12">
      <button
        onClick={() => handlePageChange(meta.current_page - 1)}
        disabled={meta.current_page === 1}
        className="p-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-5 h-5 rtl:hidden" />
        <ChevronRight className="w-5 h-5 ltr:hidden" />
      </button>

      <div className="flex space-x-1 rtl:space-x-reverse">
        {Array.from({ length: meta.last_page }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${meta.current_page === pageNum
                ? 'bg-[#1a2754] text-white'
                : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            {pageNum}
          </button>
        ))}
      </div>

      <button
        onClick={() => handlePageChange(meta.current_page + 1)}
        disabled={meta.current_page === meta.last_page}
        className="p-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-5 h-5 rtl:hidden" />
        <ChevronLeft className="w-5 h-5 ltr:hidden" />
      </button>
    </div>
  );
}
