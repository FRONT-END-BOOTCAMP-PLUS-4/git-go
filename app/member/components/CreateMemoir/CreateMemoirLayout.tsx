import { ReactNode } from "react";

export default function CreateMemoirLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="mx-auto flex h-[calc(100vh-65px)] w-full max-w-[1920px] overflow-hidden">
            {children}
        </div>
    );
}
