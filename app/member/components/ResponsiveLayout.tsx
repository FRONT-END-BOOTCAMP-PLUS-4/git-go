import { ReactNode } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type Props = {
    mobile: ReactNode;
    desktop: ReactNode;
    breakpoint?: string; // 기본 "(max-width:1023px)"
};

export default function ResponsiveLayout({
    mobile,
    desktop,
    breakpoint = "(max-width:1023px)",
}: Props) {
    const isMobile = useMediaQuery(breakpoint);
    return <>{isMobile ? mobile : desktop}</>;
}
