"use client";

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Link } from '@/i18n/routing';
import { BlogItem, PaginationMeta } from '@/app/types/blog';
import Pagination from '@/components/Pagination';

export default function BlogsList({ data = [], meta }: { data?: BlogItem[], meta?: PaginationMeta }) {
  const t = useTranslations('Blogs');
  const [searchQuery, setSearchQuery] = useState('');
  const filteredBlogs = data.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="container mx-auto px-4 md:px-12 lg:px-24 py-8 mb-24">
      {/* Search Bar */}
      <div className="relative max-w-full mx-auto mb-12">
        <div className="relative bg-white rounded-full shadow-sm border border-gray-100 overflow-hidden flex items-center px-6 py-4">
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            className="w-full bg-transparent outline-none text-gray-700 rtl:text-right ltr:text-left text-lg placeholder:text-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <Link href={`/blogs/${blog.slug}`} key={blog.id} className="group cursor-pointer flex flex-col">
            <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden mb-4 shadow-sm">
              <img
                src={blog.images?.image || '/images/blogs-1.webp'}
                alt={blog.alt || blog.title}
                onError={(event) => {
                  event.currentTarget.src = "/images/blogs-1.webp";
                }}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-[#1a2754] leading-tight rtl:text-right ltr:text-left group-hover:text-amber-500 transition-colors duration-300">
              {blog.title}
            </h3>
          </Link>
        ))}
      </div>

      <Pagination meta={meta} />
    </section>
  );
}
