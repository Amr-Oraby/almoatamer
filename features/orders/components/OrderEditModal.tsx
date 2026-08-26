"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Order } from "../types";
import { useUpdateOrder } from "../hooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface OrderEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: Order;
}

export default function OrderEditModal({ isOpen, onClose, order }: OrderEditModalProps) {
    const t = useTranslations("OrderEdit");
    const { mutate, isPending } = useUpdateOrder(order.id.toString());

    // State matching payload fields
    const [name, setName] = useState(order.name || "");
    const [gender, setGender] = useState(order.gender || "male");
    const [phoneCode, setPhoneCode] = useState(order.phone_code || "+966");
    const [phone, setPhone] = useState(order.phone || "");
    const [date, setDate] = useState(order.unformatted_date || "");
    const [langId, setLangId] = useState(order.language?.id === 1 ? "1" : "2");
    const [statusId, setStatusId] = useState(order.status?.id?.toString() || "3");
    const [relativeId, setRelativeId] = useState(order.relative?.id?.toString() || "8");

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setName(order.name || "");
            setGender(order.gender || "male");
            setPhoneCode(order.phone_code || "+966");
            setPhone(order.phone || "");
            setDate(order.unformatted_date || "");
            setLangId(order.language?.id === 1 ? "1" : "2");
            setStatusId(order.status?.id?.toString() || "3");
            setRelativeId(order.relative?.id?.toString() || "8");
        }
    }, [isOpen, order]);

    const handleSave = () => {
        // Build payload of only changed values
        const payload: any = {};
        
        if (name !== order.name) payload.umrah_for_whom_name = name;
        if (gender !== order.gender) payload.gender = gender;
        if (phoneCode !== order.phone_code) payload.phone_code = phoneCode;
        if (phone !== order.phone) payload.phone = phone;
        if (date !== order.unformatted_date) payload.date = date;
        if (langId !== (order.language?.id === 1 ? "1" : "2")) payload.motamer_required_lang_id = parseInt(langId, 10);
        if (statusId !== (order.status?.id?.toString() || "3")) payload.status_id = parseInt(statusId, 10);
        if (relativeId !== (order.relative?.id?.toString() || "8")) payload.relative_id = parseInt(relativeId, 10);

        // If no changes, just close
        if (Object.keys(payload).length === 0) {
            onClose();
            return;
        }

        mutate(payload, {
            onSuccess: () => {
                onClose();
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[95vw] max-w-2xl md:max-w-3xl lg:max-w-4xl p-5 sm:p-8 md:p-10 bg-[#f8f9fc] rounded-2xl border-none shadow-2xl overflow-y-auto max-h-[90vh]">
                <DialogHeader className="mb-6 sm:mb-8">
                    <DialogTitle className="text-xl sm:text-2xl font-black text-[#1a2754] text-center w-full">{t("title")}</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* RTL layout: Right inputs */}
                    <div className="flex flex-col gap-6">
                        <Input 
                            value={name} 
                            onChange={e => setName(e.target.value)} 
                            placeholder={t("name")} 
                            className="bg-white border border-gray-200 shadow-sm h-14 rounded-xl px-4 text-gray-900 font-medium focus-visible:ring-1 focus-visible:ring-[#1a2754] focus-visible:border-[#1a2754] text-right" 
                        />
                        <select 
                            value={relativeId} 
                            onChange={e => setRelativeId(e.target.value)}
                            className="w-full h-14 px-4 bg-white border border-gray-200 rounded-xl shadow-sm outline-none text-gray-900 font-medium focus:ring-1 focus:ring-[#1a2754] focus:border-[#1a2754] appearance-none cursor-pointer"
                            dir="rtl"
                        >
                            <option value="1">{t("father")}</option>
                            <option value="2">{t("mother")}</option>
                            <option value="3">{t("wife")}</option>
                            <option value="4">{t("children")}</option>
                            <option value="5">{t("sister")}</option>
                            <option value="6">{t("brother")}</option>
                            <option value="7">{t("friend")}</option>
                            <option value="8">{t("other")}</option>
                            <option value="9">{t("self")}</option>
                        </select>
                        <select 
                            value={langId} 
                            onChange={e => setLangId(e.target.value)}
                            className="w-full h-14 px-4 bg-white border border-gray-200 rounded-xl shadow-sm outline-none text-gray-900 font-medium focus:ring-1 focus:ring-[#1a2754] focus:border-[#1a2754] appearance-none cursor-pointer"
                            dir="rtl"
                        >
                            <option value="2">{t("arabic")}</option>
                            <option value="1">{t("english")}</option>
                        </select>
                        <select 
                            value={gender} 
                            onChange={e => setGender(e.target.value as "male" | "female")}
                            className="w-full h-14 px-4 bg-white border border-gray-200 rounded-xl shadow-sm outline-none text-gray-900 font-medium focus:ring-1 focus:ring-[#1a2754] focus:border-[#1a2754] appearance-none cursor-pointer"
                            dir="rtl"
                        >
                            <option value="male">{t("male")}</option>
                            <option value="female">{t("female")}</option>
                        </select>
                    </div>

                    {/* RTL layout: Left inputs */}
                    <div className="flex flex-col gap-6">
                        <select 
                            value={statusId} 
                            onChange={e => setStatusId(e.target.value)}
                            className="w-full h-14 px-4 bg-white border border-gray-200 rounded-xl shadow-sm outline-none text-gray-900 font-medium focus:ring-1 focus:ring-[#1a2754] focus:border-[#1a2754] appearance-none cursor-pointer"
                            dir="rtl"
                        >
                            <option value="1">{t("dead")}</option>
                            <option value="2">{t("incapacitated")}</option>
                            <option value="3">{t("sick")}</option>
                        </select>
                        
                        {/* Price (Disabled) */}
                        <div className="flex items-center justify-between px-4 h-14 bg-white border border-gray-200 rounded-xl shadow-sm opacity-60">
                            <span className="text-emerald-600 font-bold">{order.price} {t("price").split(' ')[1] || 'ريال'}</span>
                            <span className="text-muted-foreground font-medium">{t("price").split(' ')[0]} {t("price").split(' ')[1] ? '' : t("price")}</span>
                        </div>

                        <Input 
                            type="date"
                            value={date} 
                            onChange={e => setDate(e.target.value)} 
                            className="bg-white border border-gray-200 shadow-sm h-14 rounded-xl px-4 text-gray-900 font-medium focus-visible:ring-1 focus-visible:ring-[#1a2754] focus-visible:border-[#1a2754] appearance-none text-right cursor-pointer" 
                        />
                        
                        <div className="flex gap-3">
                            <Input 
                                value={phone} 
                                onChange={e => setPhone(e.target.value)} 
                                placeholder={t("phone")} 
                                className="bg-white border border-gray-200 shadow-sm h-14 rounded-xl px-4 text-gray-900 font-medium focus-visible:ring-1 focus-visible:ring-[#1a2754] focus-visible:border-[#1a2754] flex-1 text-right" 
                                type="tel"
                                dir="ltr"
                            />
                            <div className="w-28 bg-white border border-gray-200 rounded-xl shadow-sm flex items-center justify-center overflow-hidden">
                                <select 
                                    value={phoneCode}
                                    onChange={e => setPhoneCode(e.target.value)}
                                    className="bg-transparent border-none outline-none text-sm text-gray-900 font-medium text-center w-full px-2 h-full cursor-pointer appearance-none"
                                    dir="ltr"
                                >
                                    <option value="+966">+966 🇸🇦</option>
                                    <option value="+20">+20 🇪🇬</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-6 sm:mt-8">
                    <button 
                        onClick={handleSave} 
                        disabled={isPending}
                        className="bg-[#1a2754] text-white px-10 sm:px-16 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-[#121c3b] transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 w-full sm:w-auto"
                    >
                        {isPending ? t("saving") : t("save")}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
