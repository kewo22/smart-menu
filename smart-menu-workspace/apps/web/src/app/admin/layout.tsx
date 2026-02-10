import { DashboardLayout } from '@smart-menu-workspace/shared-ui';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="dark bg-background min-h-screen">
            <DashboardLayout>{children}</DashboardLayout>
        </div>
    );
}
