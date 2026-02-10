'use client';

import { Header } from './Header';
import { AdminSidebar } from './AdminSidebar';

export function DashboardLayout({
    children,
    Sidebar = AdminSidebar
}: {
    children: React.ReactNode;
    Sidebar?: React.ComponentType;
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-muted">
                    {children}
                </main>
            </div>
        </div>
    );
}
