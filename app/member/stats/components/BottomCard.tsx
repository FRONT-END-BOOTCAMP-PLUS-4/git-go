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
        <div className="border-border-primary1 bg-bg-member1 h-79 rounded-xl border p-4 shadow-sm">
            <h3 className="text-text-primary1 text-md font-semibold">
                {title}
            </h3>
            {subtitle && (
                <p className="text-text-gray1 mb-4 text-sm">{subtitle}</p>
            )}
            {children}
        </div>
    );
}
