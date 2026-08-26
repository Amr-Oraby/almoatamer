"use client";

import { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { 
    useStandardPrice, 
    useTimingWeb, 
    useStatuses, 
    useLangs, 
    useRelatives, 
    useCreateBooking 
} from "../hooks";
import { CreateBookingPayload, DayTiming } from "@/app/types/booking";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function BookingClient() {
    const t = useTranslations("Booking");
    const router = useRouter();

    const [formData, setFormData] = useState<Partial<CreateBookingPayload>>({
        motamer_gender: "male",
        phone_code: "20"
    });

    const { selectedMonth, selectedDay } = useMemo(() => {
        if (formData.date) {
            const parts = formData.date.split('-');
            if (parts.length === 3) {
                return {
                    selectedMonth: Number(parts[1]),
                    selectedDay: Number(parts[2])
                };
            }
        }
        return { selectedMonth: undefined, selectedDay: undefined };
    }, [formData.date]);

    const { data: statusesData, isLoading: isLoadingStatuses } = useStatuses();
    const { data: langsData, isLoading: isLoadingLangs } = useLangs();
    const { data: relativesData, isLoading: isLoadingRelatives } = useRelatives();
    const { data: timingData, isLoading: isLoadingTiming } = useTimingWeb();
    
    // Auto-fetch price when valid month & day are selected.
    // If not selected, fetch the default standard price (no month/day params).
    const { data: standardPriceData, isLoading: isLoadingPrice } = useStandardPrice(selectedMonth, selectedDay);

    const { mutate: createBooking, isPending } = useCreateBooking();

    const isDateAvailable = useMemo(() => {
        if (!selectedMonth || !selectedDay || !timingData?.data) return true;
        
        const monthInfo = timingData.data.find(m => Number(m.month_number) === selectedMonth);
        if (!monthInfo) return false;

        const dayInfo = monthInfo.days.find(d => Number(d.day) === selectedDay);
        if (!dayInfo) return false;

        return Boolean(dayInfo.is_open);
    }, [selectedMonth, selectedDay, timingData]);

    const { minDate, maxDate } = useMemo(() => {
        if (!timingData?.data || timingData.data.length === 0) return { minDate: undefined, maxDate: undefined };
        
        const currentYear = new Date().getFullYear();
        const sortedMonths = [...timingData.data].sort((a, b) => a.month_number - b.month_number);
        
        const firstMonth = sortedMonths[0].month_number;
        const lastMonth = sortedMonths[sortedMonths.length - 1].month_number;
        
        const minStr = `${currentYear}-${String(firstMonth).padStart(2, '0')}-01`;
        const maxStr = `${currentYear}-${String(lastMonth).padStart(2, '0')}-${new Date(currentYear, lastMonth, 0).getDate()}`;
        
        return { minDate: minStr, maxDate: maxStr };
    }, [timingData]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: ["status_id", "relative_id", "motamer_required_lang_id"].includes(name) 
                ? Number(value) 
                : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!isDateAvailable) {
            toast.error(t("invalidDate"));
            return;
        }

        // Validate required fields
        if (
            !formData.umrah_for_whom_name ||
            !formData.status_id ||
            !formData.relative_id ||
            !formData.phone ||
            !formData.motamer_required_lang_id ||
            !formData.motamer_gender ||
            !formData.date ||
            !formData.phone_code
        ) {
            toast.error(t("requiredField"));
            return;
        }

        createBooking(formData as CreateBookingPayload, {
            onSuccess: (data) => {
                if (data?.status !== "fail") {
                    router.push("/orders");
                }
            }
        });
    };

    const isLoading = isLoadingStatuses || isLoadingLangs || isLoadingRelatives || isLoadingTiming;
    const recommendedPrice = standardPriceData?.data?.recommended_price_by_app || 0;

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-[#1a2754]" />
                <p className="mt-4 text-gray-500 font-medium">Loading...</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto py-10 px-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#1a2754] text-center mb-10">
                {t("title")}
            </h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                {/* Column 1 */}
                <div className="flex flex-col gap-6">
                    {/* Status */}
                    <div className="relative">
                        <select 
                            name="status_id"
                            value={formData.status_id || ""}
                            onChange={handleChange}
                            className="w-full bg-white border border-gray-200 text-gray-800 rounded-xl px-5 py-4 appearance-none outline-none focus:ring-2 focus:ring-[#1a2754]/20 transition-all shadow-sm"
                            required
                        >
                            <option value="" disabled>{t("status")}</option>
                            {statusesData?.data?.map(s => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 ltr:right-4 rtl:left-4 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="relative">
                        <div className="flex justify-between items-center w-full bg-white border border-gray-200 rounded-xl px-5 py-4 opacity-70">
                            <span className="text-gray-500 font-medium">{t("price")}</span>
                            {isLoadingPrice ? (
                                <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
                            ) : (
                                <span className="text-emerald-600 font-bold">{recommendedPrice} {t("currency")}</span>
                            )}
                        </div>
                    </div>

                    {/* Date */}
                    <div className="relative">
                        <input
                            type={formData.date ? "date" : "text"}
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => { if (!e.target.value) e.target.type = "text" }}
                            name="date"
                            value={formData.date || ""}
                            onChange={handleChange}
                            min={minDate}
                            max={maxDate}
                            placeholder={t("date")}
                            className={`w-full bg-white border ${!isDateAvailable ? 'border-red-500 text-red-500' : 'border-gray-200 text-gray-800'} rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#1a2754]/20 transition-all shadow-sm block`}
                            required
                        />
                        {!isDateAvailable && formData.date && (
                            <p className="text-red-500 text-xs mt-1 px-2">{t("invalidDate")}</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div className="relative flex shadow-sm rounded-xl overflow-hidden bg-white border border-gray-200">
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone || ""}
                            onChange={handleChange}
                            placeholder={t("phone")}
                            className="flex-1 px-5 py-4 outline-none bg-transparent"
                            required
                        />
                        <div className="flex items-center border-l border-gray-200 px-3 bg-gray-50">
                            <select 
                                name="phone_code"
                                value={formData.phone_code || "20"}
                                onChange={handleChange}
                                className="bg-transparent outline-none text-sm appearance-none cursor-pointer pr-4"
                            >
                                <option value="20">+20 🇪🇬</option>
                                <option value="966">+966 🇸🇦</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Column 2 */}
                <div className="flex flex-col gap-6">
                    {/* For Whom Name */}
                    <div className="relative">
                        <input
                            type="text"
                            name="umrah_for_whom_name"
                            value={formData.umrah_for_whom_name || ""}
                            onChange={handleChange}
                            placeholder={t("umrahForWhomName")}
                            className="w-full bg-white border border-gray-200 text-gray-800 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#1a2754]/20 transition-all shadow-sm"
                            required
                        />
                    </div>

                    {/* Relative */}
                    <div className="relative">
                        <select 
                            name="relative_id"
                            value={formData.relative_id || ""}
                            onChange={handleChange}
                            className="w-full bg-white border border-gray-200 text-gray-800 rounded-xl px-5 py-4 appearance-none outline-none focus:ring-2 focus:ring-[#1a2754]/20 transition-all shadow-sm"
                            required
                        >
                            <option value="" disabled>{t("relative")}</option>
                            {relativesData?.data?.map(r => (
                                <option key={r.id} value={r.id}>{r.name}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 ltr:right-4 rtl:left-4 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>

                    {/* Language */}
                    <div className="relative">
                        <select 
                            name="motamer_required_lang_id"
                            value={formData.motamer_required_lang_id || ""}
                            onChange={handleChange}
                            className="w-full bg-white border border-gray-200 text-gray-800 rounded-xl px-5 py-4 appearance-none outline-none focus:ring-2 focus:ring-[#1a2754]/20 transition-all shadow-sm"
                            required
                        >
                            <option value="" disabled>{t("lang")}</option>
                            {langsData?.data?.map(l => (
                                <option key={l.id} value={l.id}>{l.name}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 ltr:right-4 rtl:left-4 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>

                    {/* Gender */}
                    <div className="relative">
                        <select 
                            name="motamer_gender"
                            value={formData.motamer_gender || "male"}
                            onChange={handleChange}
                            className="w-full bg-white border border-gray-200 text-gray-800 rounded-xl px-5 py-4 appearance-none outline-none focus:ring-2 focus:ring-[#1a2754]/20 transition-all shadow-sm"
                            required
                        >
                            <option value="" disabled>{t("gender")}</option>
                            <option value="male">{t("male")}</option>
                            <option value="female">{t("female")}</option>
                        </select>
                        <div className="absolute inset-y-0 ltr:right-4 rtl:left-4 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 pt-4">
                    <button
                        type="submit"
                        disabled={isPending || !isDateAvailable}
                        className="w-full bg-[#1a2754] text-white font-bold text-lg py-4 rounded-xl shadow-[0_8px_30px_rgb(26,39,84,0.2)] hover:shadow-[0_8px_30px_rgb(26,39,84,0.4)] transition-all hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                    >
                        {isPending ? t("submitting") : t("submit")}
                    </button>
                </div>
            </form>
        </div>
    );
}
