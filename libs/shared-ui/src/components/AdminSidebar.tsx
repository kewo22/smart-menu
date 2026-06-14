'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Store,
    CreditCard,
    LayoutTemplate,
    Settings
} from 'lucide-react';
import { cn } from '../utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Restaurants', href: '/admin/restaurants', icon: Store },
    { name: 'Subscriptions', href: '/admin/subscriptions', icon: CreditCard },
    { name: 'Templates', href: '/admin/templates', icon: LayoutTemplate },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col w-64 shrink-0 border-r border-border bg-card/40 backdrop-blur-md h-screen transition-all duration-300">
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20">
                    <Store size={22} />
                </div>
                <div className="flex flex-col">
                    <span className="font-extrabold text-xl tracking-tight leading-none">Smart Menu</span>
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary mt-1.5 opacity-80">Super Admin</span>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-1.5 mt-8 overflow-y-auto scrollbar-none">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href === '/dashboard' && pathname === '/');
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl transition-all duration-300 group text-sm",
                                isActive
                                    ? "bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20"
                                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                            )}
                        >
                            <item.icon size={19} className={cn(
                                "transition-transform duration-300 group-hover:scale-110",
                                isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                            )} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 mt-auto">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-accent/30 border border-border/50 hover:bg-accent/50 transition-colors cursor-pointer group">
                    <Avatar className="h-10 w-10 border-2 border-primary/20 rounded-xl">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-black uppercase">AR</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold truncate leading-none group-hover:text-primary transition-colors">Alex Rivera</span>
                        <span className="text-[11px] text-muted-foreground truncate mt-1.5 font-medium">alex@smartmenu.io</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
