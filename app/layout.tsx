import "./globals.css";

import Link from "next/link";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="bg-bg-primary1">
                <nav className="flex justify-between items-center bg-white">
                    <Link href={"/"}>로고</Link>
                    <button>로그인 버튼</button>{" "}
                </nav>
                {children}
            </body>
        </html>
    );
}
