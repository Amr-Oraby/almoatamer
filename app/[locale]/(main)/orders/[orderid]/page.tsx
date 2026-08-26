import { getTranslations } from 'next-intl/server';
import PageHeader from '@/components/PageHeader';
import OrderDetailsClient from '@/features/orders/components/OrderDetailsClient';

export default async function OrderDetailsPage({
    params
}: {
    params: Promise<{ orderid: string }>
}) {
    const t = await getTranslations('OrderDetails');
    const resolvedParams = await params;

    return (
        <main className="flex flex-1 flex-col w-full bg-[#f8f9fc] min-h-screen pb-12">
            <PageHeader title={t('completeOrder')} />
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8">
                <OrderDetailsClient orderId={resolvedParams.orderid} />
            </div>
        </main>
    );
}
