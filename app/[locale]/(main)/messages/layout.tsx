import { getTranslations } from 'next-intl/server';
import PageHeader from '@/components/PageHeader';
import { serverGet } from '@/lib/api/serverRoute';
import { ConversationsResponse } from '@/app/types/conversations';
import ConversationLink from './ConversationLink';

export default async function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations('Navbar');
  
  // Fetch conversations data on the server
  let conversations: ConversationsResponse['data'] = [];
  try {
    const response = await serverGet('get-conversations');
    // Using .json() on NextResponse to extract data
    const data = (await response.json()) as ConversationsResponse;
    if (data.status === 'success' && Array.isArray(data.data)) {
      conversations = data.data;
    }
  } catch (error) {
    console.error("Failed to fetch conversations", error);
  }

  return (
    <main className="flex flex-1 flex-col w-full bg-gray-50/50 min-h-screen">
      <PageHeader title={t('messages')} />
      
      <div className="container mx-auto p-4 md:p-6 lg:p-8 flex-1 flex flex-col max-w-7xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-1 min-h-[70vh] flex-col md:flex-row relative">
          
          {/* Sidebar / Conversation List */}
          <div className="w-full md:w-80 lg:w-96 border-b md:border-b-0 md:border-e border-gray-100 flex flex-col bg-white z-10">
            <div className="p-5 border-b border-gray-50">
              <h2 className="font-bold text-xl text-gray-800 tracking-tight">الرسائل</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {conversations.length === 0 ? (
                <div className="text-center text-gray-400 py-12 flex flex-col items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  <p className="text-sm font-medium">لا توجد محادثات</p>
                </div>
              ) : (
                conversations.map((conv) => (
                  <ConversationLink key={conv.id} conv={conv} />
                ))
              )}
            </div>
          </div>
          
          {/* Main Chat Area (Render Children) */}
          <div className="flex-1 flex flex-col relative bg-gray-50/50">
             {children}
          </div>
          
        </div>
      </div>
    </main>
  );
}
