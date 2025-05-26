//BottomCard
import React from "react";

interface BottomCardProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

export default function BottomCard({
    title,
    subtitle,
    children,
}: BottomCardProps) {
    return (
        <div className="border-border-primary1 h-79 rounded-xl border bg-white p-4 shadow-sm">
            <h3 className="text-text-secondary1 text-md font-semibold">
                {title}
            </h3>
            {subtitle && (
                <p className="text-text-secondary2 mb-4 text-sm">{subtitle}</p>
            )}
            {children}
        </div>
    );
}
