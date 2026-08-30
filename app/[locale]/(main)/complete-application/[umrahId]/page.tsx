import PaymentResultClient from "@/features/payment/components/PaymentResultClient";
import { Suspense } from "react";

export default async function CompleteApplicationPage({ params }: { params: Promise<{ umrahId: string }> }) {
    const { umrahId } = await params;

    return (
        <div className="container mx-auto px-4 py-16">
            <Suspense fallback={<div className="min-h-[50vh]" />}>
                <PaymentResultClient umrahId={umrahId} />
            </Suspense>
        </div>
    );
}
