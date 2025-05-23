import { ReactNode } from "react";

export default function ChangeListLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="border-x-border-primary1 col-span-1 h-full overflow-y-auto overscroll-contain border-x p-3">
            {children}
        </div>
    );
}
