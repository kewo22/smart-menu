'use client';

import { Card, CardContent } from '../ui/card';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../utils';

interface StatsCardProps {
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    icon: LucideIcon;
    iconBg: string;
    iconColor: string;
}

export function StatsCard({ title, value, change, trend, icon: Icon, iconBg, iconColor }: StatsCardProps) {
    return (
        <Card className="hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border border-border/50 group overflow-hidden relative">
            <div className={cn("absolute top-0 right-0 w-24 h-24 blur-3xl opacity-10 rounded-full -mr-12 -mt-12 transition-colors", iconBg)} />
            <CardContent className="p-6 relative z-10">
                <div className="flex justify-between items-start">
                    <div className="space-y-3">
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">{title}</p>
                        <div className="space-y-1">
                            <h3 className="text-3xl font-black tracking-tight">{value}</h3>
                            <div className={cn(
                                "text-[11px] font-bold flex items-center gap-1 w-fit px-2 py-0.5 rounded-full border",
                                trend === 'up'
                                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                    : "bg-destructive/10 text-destructive border-destructive/20"
                            )}>
                                {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                <span className="translate-y-[0.5px] tracking-wide">{change}</span>
                            </div>
                        </div>
                    </div>
                    <div className={cn("p-3 rounded-2xl shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3", iconBg)}>
                        <Icon size={24} className={iconColor} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
