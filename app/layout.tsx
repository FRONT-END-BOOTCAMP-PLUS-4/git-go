import Header from "./components/Header";
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
                <Header />
                {children}
            </body>
        </html>
    );
}
