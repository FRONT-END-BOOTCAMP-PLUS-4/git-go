import { ReactNode } from "react";

export default function ChangeListLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="border-x-border-primary1 col-span-1 overflow-y-auto overscroll-y-contain border-x p-4">
            {children}
        </div>
    );
}
