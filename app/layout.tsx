import Sidebar from "./components/layout/sidebar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex h-full min-h-screen w-full">
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
