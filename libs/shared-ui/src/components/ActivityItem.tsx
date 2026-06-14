'use client';

import { LucideIcon } from 'lucide-react';
import { cn } from '../utils';

interface ActivityItemProps {
    title: string;
    description: string;
    time: string;
    icon: LucideIcon;
    iconColor: string;
}

export function ActivityItem({ title, description, time, icon: Icon, iconColor }: ActivityItemProps) {
    return (
        <div className="flex items-center gap-4 group cursor-pointer p-3 rounded-2xl hover:bg-muted/40 transition-all duration-300 border border-transparent hover:border-border/50">
            <div className={cn("h-11 w-11 shrink-0 rounded-xl flex items-center justify-center border", iconColor.replace('bg-', 'bg-').replace('-500', '/10'), iconColor.replace('bg-', 'border-').replace('-500', '/20'))}>
                <Icon size={18} className={iconColor.replace('bg-', 'text-')} />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                    <p className="text-sm font-black truncate leading-tight group-hover:text-primary transition-colors tracking-tight">{title}</p>
                    <p className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest whitespace-nowrap mt-0.5">{time}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1 font-medium truncate leading-relaxed">{description}</p>
            </div>
        </div>
    );
}
