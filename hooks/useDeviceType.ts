"use client";

import { useEffect, useState } from "react";

export function useDeviceType() {
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        const checkWidth = () => setIsTablet(window.innerWidth < 1024);
        checkWidth();
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener("resize", checkWidth);
    }, []);

    return { isTablet };
}
