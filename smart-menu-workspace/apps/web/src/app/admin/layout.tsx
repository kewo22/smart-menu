import { DashboardLayout } from '@smart-menu-workspace/shared-ui';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="dark">
            <DashboardLayout>{children}</DashboardLayout>
        </div>
    );
}
