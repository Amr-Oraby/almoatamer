"use client";

import { useTranslations } from "next-intl";
import { OrdersResponse } from "../types";
import OrderCard from "./OrderCard";

interface OrdersListProps {
    data?: OrdersResponse;
    isLoading: boolean;
    isError: boolean;
}

export default function OrdersList({ data, isLoading, isError }: OrdersListProps) {
    const t = useTranslations("Orders");

    if (isLoading) {
        return <div className="flex justify-center py-20">{t("loading")}</div>;
    }

    if (isError) {
        return <div className="flex justify-center py-20 text-destructive">{t("error")}</div>;
    }

    if (!data?.data || data.data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg border border-dashed">
                <p className="text-muted-foreground">{t("noOrdersPlaceholder")}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.data.map((order) => (
                <OrderCard key={order.id} order={order} />
            ))}
        </div>
    );
}
