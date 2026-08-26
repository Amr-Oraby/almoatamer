"use client";

import { useTranslations } from "next-intl";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useOrders } from "../hooks";
import OrdersNav from "./OrdersNav";
import OrdersList from "./OrdersList";
export default function OrdersClient() {
    const t = useTranslations("Orders");
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentStatus = searchParams.get("status") || "pending";
    const currentPage = parseInt(searchParams.get("page") || "1", 10);

    const { data, isLoading, isError } = useOrders(currentPage, currentStatus);

    const setParam = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(key, value);
        if (key === "status") {
            params.set("page", "1");
        }
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex mb-15 px-10 flex-col gap-6 w-full max-w-5xl mx-auto mt-4">
            <OrdersNav
                currentStatus={currentStatus}
                onChange={(status) => setParam("status", status)}
            />

            <div className="flex-1">
                <OrdersList
                    data={data}
                    isLoading={isLoading}
                    isError={isError}
                />
            </div>

            {data?.meta && data.meta.last_page > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8 mb-12">
                    <button
                        disabled={currentPage <= 1}
                        onClick={() => setParam("page", (currentPage - 1).toString())}
                        className="px-4 py-2 border bg-white rounded-md disabled:opacity-50 hover:bg-muted transition-colors"
                    >
                        {t("previous")}
                    </button>
                    <span className="font-medium">
                        {currentPage} / {data.meta.last_page}
                    </span>
                    <button
                        disabled={currentPage >= data.meta.last_page}
                        onClick={() => setParam("page", (currentPage + 1).toString())}
                        className="px-4 py-2 border bg-white rounded-md disabled:opacity-50 hover:bg-muted transition-colors"
                    >
                        {t("next")}
                    </button>
                </div>
            )}
        </div>
    );
}
