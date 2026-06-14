'use client';

import { Search, Bell, HelpCircle } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export function Header() {
    return (
        <header className="h-20 border-b border-border bg-background/60 backdrop-blur-xl flex items-center justify-between px-10 sticky top-0 z-10 shrink-0">
            <div className="flex-1 max-w-2xl">
                <div className="relative group">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" size={18} />
                    <Input
                        placeholder="Search restaurants, invoices, or users..."
                        className="pl-11 h-11 bg-muted/40 border-transparent focus-visible:bg-muted/80 focus-visible:ring-offset-0 focus-visible:ring-primary/20 transition-all duration-300 rounded-xl"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4 ml-8">
                <Button variant="ghost" size="icon" className="relative h-11 w-11 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all">
                    <Bell size={20} />
                    <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-primary border-2 border-background rounded-full shadow-sm" />
                </Button>
                <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all">
                    <HelpCircle size={20} />
                </Button>
            </div>
        </header>
    );
}
