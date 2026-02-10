'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Utensils,
    Store,
    CreditCard,
    Settings
} from 'lucide-react';
import { cn } from '../utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const navItems = [
    { name: 'Dashboard', href: '/dine-dash/dashboard', icon: LayoutDashboard },
    { name: 'Menu Manager', href: '/dine-dash/menu-manager', icon: Utensils },
    { name: 'Restaurant Info', href: '/dine-dash/restaurant-info', icon: Store },
    { name: 'Subscription', href: '/dine-dash/subscription', icon: CreditCard },
    { name: 'Settings', href: '/dine-dash/settings', icon: Settings },
];

export function RestaurantSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col w-64 shrink-0 border-r border-border bg-card/40 backdrop-blur-md h-screen transition-all duration-300">
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20 shadow-sm">
                    <Utensils size={22} />
                </div>
                <div className="flex flex-col">
                    <span className="font-extrabold text-xl tracking-tight leading-none text-foreground">DineDash</span>
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary mt-1.5 opacity-80">Restaurant</span>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-1.5 mt-8 overflow-y-auto scrollbar-none">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl transition-all duration-300 group text-sm font-bold",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
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
                    <Avatar className="h-10 w-10 border-2 border-primary/20 rounded-xl overflow-hidden shadow-sm">
                        <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuB46zgGu3G2mnhzu__5twceVNpDGUfkd1WYZQHCTLOzeI4ISgyS0JrKbS3Cc7o_qa0CYJtbSefduBsEvQPcvt7R7VcLaTuSBYSxF65p5CU9Al_-i8Q-vKkcjCrclCLjxEMV55jYujVik7spB5sQn_aX8KRkJ3d37NX8DgZGtAMt-ifBIXHM5bUc5zmP3rcZennVcn3jUKE_KPlO1RRQRqxLG8REHPDeZKVBuqjx6iIO2zIkScSSlc0aiYvSAThgaU8t_JWhccgIwrlY" />
                        <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-black uppercase">MR</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold truncate leading-none group-hover:text-primary transition-colors text-foreground">Marco Rossi</span>
                        <span className="text-[11px] text-muted-foreground truncate mt-1.5 font-medium">The Italian Bistro</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
