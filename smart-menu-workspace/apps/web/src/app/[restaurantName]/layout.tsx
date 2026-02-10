'use client';

import { DashboardLayout, RestaurantSidebar } from '@smart-menu-workspace/shared-ui';

export default function RestaurantLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="light bg-[#f6f8f8] min-h-screen">
            <DashboardLayout Sidebar={RestaurantSidebar}>{children}</DashboardLayout>
        </div>
    );
}
