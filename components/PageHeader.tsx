interface PageHeaderProps {
  title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="w-full px-4 md:px-12 lg:px-24 mx-auto py-4 md:py-8 flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#1a2754] mb-4">
        {title}
      </h1>
      <div className="w-24 h-1 bg-amber-500 rounded-full"></div>
    </div>
  );
}
