"use client"

import { useEffect } from "react";
import { StringValidation } from "zod/v3";

export function Toast({
    message,
    onClose,
}: {
    message: string;
    onClose: () => void;
}) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose])

    return (
        <div className="
        fixed top-4 right-4 z-50 
        rounded-lg bg-white border border-slate-200 
        shadow-md px-4 py-3 
        text-sm text-slate-800
        flex items-center gap-2
        animate-slide-in
        ">
        <span className="text-red-600">⚠</span>
        <span>{message}</span>
        </div>
    );
}