"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface OrdersNavProps {
    currentStatus: string;
    onChange: (status: string) => void;
}

const statuses = [
    { value: "pending", labelKey: "pending" },
    { value: "running", labelKey: "running" },
    { value: "done", labelKey: "done" },
    { value: "canceled", labelKey: "canceled" }
];

export default function OrdersNav({ currentStatus, onChange }: OrdersNavProps) {
    const t = useTranslations("Orders");

    return (
        <div className="flex justify-center mb-8 w-full">
            <div className="bg-white rounded-md p-1 grid grid-cols-2 sm:flex sm:flex-row gap-1 shadow-sm border w-full sm:w-auto">
                {statuses.map(status => (
                    <button
                        key={status.value}
                        onClick={() => onChange(status.value)}
                        className={cn(
                            "px-2 sm:px-6 py-2 rounded-md font-medium transition-colors text-xs sm:text-sm flex items-center justify-center text-center",
                            currentStatus === status.value
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-muted"
                        )}
                    >
                        {t(status.labelKey)}
                    </button>
                ))}
            </div>
        </div>
    );
}
