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
        <aside className="w-64 border-r border-slate-200 bg-white flex flex-col justify-between h-screen shrink-0 transition-all duration-300">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-10">
                    <div className="bg-[#13ecb6] rounded-xl p-2 shadow-sm shadow-[#13ecb6]/20">
                        <Utensils className="text-slate-900" size={20} />
                    </div>
                    <div>
                        <h1 className="text-slate-900 text-lg font-black leading-none tracking-tight">DineDash</h1>
                        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mt-1">Restaurant</p>
                    </div>
                </div>

                <nav className="flex flex-col gap-1.5">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl transition-all duration-300 group text-sm font-bold",
                                    isActive
                                        ? "bg-[#13ecb6]/15 text-slate-900"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                )}
                            >
                                <item.icon size={19} className={cn(
                                    "transition-transform duration-300 group-hover:scale-110",
                                    isActive ? "text-[#13ecb6]" : "text-slate-400 group-hover:text-slate-600"
                                )} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="p-4 border-t border-slate-100 mb-4">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors cursor-pointer group">
                    <Avatar className="h-10 w-10 border-2 border-white shadow-sm rounded-xl overflow-hidden">
                        <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuB46zgGu3G2mnhzu__5twceVNpDGUfkd1WYZQHCTLOzeI4ISgyS0JrKbS3Cc7o_qa0CYJtbSefduBsEvQPcvt7R7VcLaTuSBYSxF65p5CU9Al_-i8Q-vKkcjCrclCLjxEMV55jYujVik7spB5sQn_aX8KRkJ3d37NX8DgZGtAMt-ifBIXHM5bUc5zmP3rcZennVcn3jUKE_KPlO1RRQRqxLG8REHPDeZKVBuqjx6iIO2zIkScSSlc0aiYvSAThgaU8t_JWhccgIwrlY" />
                        <AvatarFallback className="bg-slate-200 text-slate-600 text-[10px] font-black">MR</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-slate-900 truncate tracking-tight">Marco Rossi</p>
                        <p className="text-[11px] text-slate-500 truncate font-medium mt-1">The Italian Bistro</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
