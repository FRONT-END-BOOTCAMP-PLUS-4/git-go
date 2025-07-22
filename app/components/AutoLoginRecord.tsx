"use client";

import { useEffect } from "react";

export default function AutoLoginRecord() {
    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        const lastDate = localStorage.getItem("lastLoginRecordDate");
        // localStorage.setItem("lastLoginRecordDate", "2025-07-21");

        if (lastDate !== today) {
            fetch("/api/login-record/auto", { method: "POST" }).then(() => {
                localStorage.setItem("lastLoginRecordDate", today);
            });
        }
    }, []);

    return null;
}
