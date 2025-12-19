import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Kaan vs. Kadir: The Birthday Battle",
    description: "An epic futuristic birthday battle experience",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="tr">
            <body className="antialiased overflow-hidden">
                {children}
            </body>
        </html>
    );
}
