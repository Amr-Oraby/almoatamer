"use client";

import { useTranslations } from "next-intl";
import { Order } from "../types";
import { cn } from "@/lib/utils";

import { Link } from "@/i18n/routing";

interface OrderCardProps {
    order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
    const t = useTranslations("OrderCard");

    const getStatusTranslation = (status: string) => {
        try {
            // @ts-ignore
            if (t.has && !t.has(status)) return status;
            return t(status as any);
        } catch (e) {
            return status;
        }
    };

    const statusColors = {
        pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
        running: "bg-blue-100 text-blue-700 border-blue-200",
        done: "bg-green-100 text-green-700 border-green-200",
        canceled: "bg-red-100 text-red-700 border-red-200"
    };

    const statusStyle = statusColors[order.umrah_status as keyof typeof statusColors] || "bg-gray-100 text-gray-700 border-gray-200";

    return (
        <Link href={`/orders/${order.id}`} className="block w-full group">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col p-6 w-full group-hover:shadow-md transition-shadow">
                {/* Header: Status Badge & Order Number */}
                <div className="flex justify-between items-center mb-6">
                    <div className={cn("px-4 py-1.5 rounded-full border text-xs font-semibold whitespace-nowrap", statusStyle)}>
                        {getStatusTranslation(order.umrah_status)}
                    </div>
                    <div className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                        {t("orderNumber")} #{order.id}
                    </div>
                </div>

                {/* Title */}
                <div className="text-center font-bold text-lg mb-6 text-gray-800">
                    {t("orderDetails")}
                </div>

                {/* Main Details */}
                <div className="flex flex-col gap-3 mb-6">
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-sm">{t("beneficiary")}</span>
                        <span className="font-medium text-gray-700 text-sm">{order.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-sm">{t("status")}</span>
                        <span className="font-medium text-gray-700 text-sm">
                            {order.status?.name ? getStatusTranslation(order.status.name) : "-"}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-sm">{t("gender")}</span>
                        <span className="font-medium text-gray-700 text-sm">
                            {order.gender ? getStatusTranslation(order.gender) : "-"}
                        </span>
                    </div>
                </div>

                <hr className="border-gray-100 mb-6" />

                {/* Pricing Details */}
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-sm">{t("serviceValue")}</span>
                        <span className="font-medium text-emerald-600 text-sm">
                            {order.price} {t("sar")}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-sm">{t("discount")}</span>
                        <span className="font-medium text-red-500 text-sm">
                            {order.discount}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-sm">
                            {t("vat")} {order.tax_value}%
                        </span>
                        <span className="font-medium text-emerald-600 text-sm">
                            {order.tax_amount} {t("sar")}
                        </span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                        <span className="text-muted-foreground font-semibold text-sm">{t("total")}</span>
                        <span className="font-bold text-emerald-600 text-base">
                            {order.total_price} {t("sar")}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
