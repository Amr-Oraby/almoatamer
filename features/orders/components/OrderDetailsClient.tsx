"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useOrder, useApplyCoupon } from "../hooks";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"; // I will check if Button exists, else use raw buttons
import { Input } from "@/components/ui/input"; // Check if Input exists
import { useRouter } from "@/i18n/routing";
import OrderEditModal from "./OrderEditModal";
import OrderDeleteModal from "./OrderDeleteModal";
import OrderCancelModal from "./OrderCancelModal";
import PaymentMethodModal from "./PaymentMethodModal";
import InstapayModal from "./InstapayModal";

interface OrderDetailsClientProps {
    orderId: string;
}

export default function OrderDetailsClient({ orderId }: OrderDetailsClientProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isInstapayModalOpen, setIsInstapayModalOpen] = useState(false);
    const t = useTranslations("OrderDetails");
    const tCard = useTranslations("OrderCard"); // for common terms like beneficiary, status
    const router = useRouter();

    const [couponCode, setCouponCode] = useState("");
    const [couponError, setCouponError] = useState("");
    const { mutate: applyCoupon, isPending: isApplyingCoupon } = useApplyCoupon();

    const handleApplyCoupon = () => {
        if (!couponCode.trim()) {
            setCouponError(t("couponRequired") || "Coupon code is required");
            return;
        }
        setCouponError("");
        applyCoupon({ umrah_id: orderId, code: couponCode });
    };

    const { data, isLoading, isError } = useOrder(orderId);

    if (isLoading) {
        return <div className="flex justify-center py-20">{t("loading")}</div>;
    }

    if (isError || !data?.data) {
        return (
            <div className="flex flex-col gap-4 items-center justify-center py-20 text-destructive">
                <p>{t("error")}</p>
                <button onClick={() => router.back()} className="text-sm underline">{t("back")}</button>
            </div>
        );
    }

    const order = data.data;

    const getStatusTranslation = (status: string) => {
        try {
            // @ts-ignore
            if (tCard.has && !tCard.has(status)) return status;
            return tCard(status as any);
        } catch (e) {
            return status;
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Right Column (in RTL) - Order Details & Coupon */}
            <div className="flex flex-col gap-6 w-full lg:w-1/2">
                {/* Order Details Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
                    <h2 className="text-xl font-bold text-gray-900 text-center mb-8">{tCard("orderDetails")}</h2>
                    
                    <div className="flex flex-col gap-4 mb-8">
                        <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                            <span className="text-muted-foreground text-sm font-medium">{tCard("beneficiary")}</span>
                            <span className="font-semibold text-gray-800 text-sm">{order.name}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                            <span className="text-muted-foreground text-sm font-medium">{tCard("status")}</span>
                            <span className="font-semibold text-gray-800 text-sm">
                                {order.status?.name ? getStatusTranslation(order.status.name) : "-"}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground text-sm font-medium">{tCard("gender")}</span>
                            <span className="font-semibold text-gray-800 text-sm">
                                {order.gender ? getStatusTranslation(order.gender) : "-"}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button 
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="flex-1 py-3 border border-red-200 text-red-500 font-semibold rounded-lg hover:bg-red-50 transition-colors"
                        >
                            {t("delete")}
                        </button>
                        {order.umrah_status === "pending" && (
                            <button 
                                onClick={() => setIsEditModalOpen(true)}
                                className="flex-1 py-3 bg-[#1a2754] text-white font-semibold rounded-lg hover:bg-[#121c3b] transition-colors shadow-sm"
                            >
                                {t("edit")}
                            </button>
                        )}
                    </div>
                </div>

                {/* Discount Coupon Card */}
                {order.umrah_status === "pending" && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2 flex-1">
                                {/* Coupon Icon Placeholder */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground h-5 w-5"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>
                                <input 
                                    type="text" 
                                    value={couponCode}
                                    onChange={(e) => {
                                        setCouponCode(e.target.value);
                                        if (e.target.value.trim()) setCouponError("");
                                    }}
                                    placeholder={t("discountCoupon")} 
                                    className="w-full bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
                                />
                            </div>
                            <button 
                                onClick={handleApplyCoupon}
                                disabled={isApplyingCoupon}
                                className="bg-[#1a2754] text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-[#121c3b] transition-colors disabled:opacity-50"
                            >
                                {isApplyingCoupon ? t("applying") || "Applying..." : t("apply")}
                            </button>
                        </div>
                        {couponError && (
                            <p className="text-red-500 text-xs mt-1">{couponError}</p>
                        )}
                    </div>
                )}
            </div>

            {/* Left Column (in RTL) - Pricing & Payment */}
            <div className="flex flex-col gap-6 w-full lg:w-1/2">
                {/* Pricing Details Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
                    <div className="flex flex-col gap-5">
                        <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                            <span className="text-muted-foreground text-sm font-medium">{tCard("serviceValue")}</span>
                            <span className="font-semibold text-emerald-600 text-sm">
                                {order.price} {tCard("sar")}
                            </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                            <span className="text-muted-foreground text-sm font-medium">{tCard("discount")}</span>
                            <span className="font-semibold text-red-500 text-sm">
                                {order.discount}
                            </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                            <span className="text-muted-foreground text-sm font-medium">
                                {tCard("vat")} {order.tax_value}%
                            </span>
                            <span className="font-semibold text-emerald-600 text-sm">
                                {order.tax_amount} {tCard("sar")}
                            </span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <span className="text-gray-900 font-extrabold text-base">{tCard("total")}</span>
                            <span className="font-extrabold text-emerald-600 text-lg">
                                {order.total_price} {tCard("sar")}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                {order.umrah_status === "pending" && (
                    <div className="flex gap-4">
                        <button 
                            onClick={() => setIsCancelModalOpen(true)}
                            className="flex-1 py-4 bg-white border border-red-200 text-red-500 font-semibold rounded-lg shadow-sm hover:bg-red-50 transition-colors"
                        >
                            {t("cancelUmrah")}
                        </button>
                        <button 
                            onClick={() => setIsPaymentModalOpen(true)}
                            className="flex-[2] py-4 bg-[#1a2754] text-white font-semibold rounded-lg shadow-sm hover:bg-[#121c3b] transition-colors"
                        >
                            {t("choosePayment")}
                        </button>
                    </div>
                )}
            </div>

            <OrderEditModal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)} 
                order={order} 
            />

            <OrderDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                orderId={orderId}
            />

            <OrderCancelModal
                isOpen={isCancelModalOpen}
                onClose={() => setIsCancelModalOpen(false)}
                orderId={orderId}
            />

            <PaymentMethodModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                orderId={orderId}
                onInstapayClick={() => {
                    setIsPaymentModalOpen(false);
                    setIsInstapayModalOpen(true);
                }}
            />

            <InstapayModal
                isOpen={isInstapayModalOpen}
                onClose={() => setIsInstapayModalOpen(false)}
                onBack={() => {
                    setIsInstapayModalOpen(false);
                    setIsPaymentModalOpen(true);
                }}
                orderPrice={order.total_price}
                orderId={orderId}
            />
        </div>
    );
}
