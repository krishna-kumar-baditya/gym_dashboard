import AdminLayout from "@/components/layout/AdminLayout";


export default function AdminDashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
            >
                <AdminLayout>{children}</AdminLayout>
            </body>
        </html>
    );
}
