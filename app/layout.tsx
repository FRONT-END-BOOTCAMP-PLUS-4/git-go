import Header from "./components/Header";
import { Providers } from "./components/Providers";
import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <title>GitGo - 기록이 남는 개발</title>
            </head>
            <body className="bg-bg-primary1">
                <Providers>
                    <Header />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
