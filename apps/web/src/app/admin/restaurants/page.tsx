'use client';

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Badge,
    Button,
    Avatar,
    AvatarFallback,
    Input,
    cn
} from '@smart-menu-workspace/shared-ui';
import {
    Plus,
    Search,
    Filter,
    FileDown,
    Edit2,
    Eye,
    Trash2,
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
    LayoutGrid,
    Store,
    Pizza,
    Fish,
    Coffee,
    MoreVertical
} from 'lucide-react';

const restaurants = [
    {
        name: 'The Gourmet Kitchen',
        owner: 'John Doe',
        email: 'john@gourmet.com',
        plan: 'Premium',
        status: 'Active',
        icon: Store,
        iconColor: 'text-primary'
    },
    {
        name: 'Pizza Palace',
        owner: 'Jane Smith',
        email: 'jane@pizzapalace.com',
        plan: 'Basic',
        status: 'Active',
        icon: Pizza,
        iconColor: 'text-orange-500'
    },
    {
        name: 'Sushi Zen',
        owner: 'Hiroshi Tanaka',
        email: 'hiro@sushizen.com',
        plan: 'Enterprise',
        status: 'Inactive',
        icon: Fish,
        iconColor: 'text-blue-500'
    },
    {
        name: 'Burger Hub',
        owner: 'Mike Ross',
        email: 'mike@burgerhub.com',
        plan: 'Premium',
        status: 'Active',
        icon: LayoutGrid,
        iconColor: 'text-emerald-500'
    },
    {
        name: 'Cafe Delight',
        owner: 'Sarah Connor',
        email: 'sarah@cafedelight.com',
        plan: 'Free',
        status: 'Active',
        icon: Coffee,
        iconColor: 'text-amber-500'
    },
];

export default function RestaurantsPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-700 max-w-[1600px] mx-auto pb-10">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black tracking-tight text-foreground">Manage Restaurants</h1>
                    <p className="text-muted-foreground font-medium">Overview of all active and inactive restaurant accounts.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2 h-12 px-6 rounded-xl font-bold border-border/50 bg-background/50 hover:bg-accent/50 group transition-all">
                        <FileDown size={19} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                        Export
                    </Button>
                    <Button className="gap-2.5 h-12 px-6 rounded-xl font-black shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all bg-primary text-primary-foreground">
                        <Plus size={20} />
                        Add New Restaurant
                    </Button>
                </div>
            </div>

            {/* Main Content Card */}
            <Card className="border-border/40 shadow-xl shadow-black/20 rounded-[2.5rem] overflow-hidden bg-card/40 backdrop-blur-xl">
                {/* Filters Area */}
                <div className="p-8 border-b border-white /5 flex flex-col lg:flex-row gap-6 bg-muted/5">
                    <div className="flex-1">
                        <div className="relative group max-w-xl">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" size={20} />
                            <Input
                                placeholder="Search by restaurant name or owner..."
                                className="pl-12 h-14 bg-background/40 border-border/50 focus-visible:bg-background/80 focus-visible:ring-primary/20 transition-all duration-300 rounded-2xl text-base font-medium"
                            />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="h-14 px-6 rounded-2xl font-bold border-border/50 bg-background/40 hover:bg-accent/50 gap-3 group">
                            <span className="text-sm">Status: All</span>
                            <Filter size={18} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                        </Button>
                        <Button variant="outline" className="h-14 px-6 rounded-2xl font-bold border-border/50 bg-background/40 hover:bg-accent/50 gap-3 group">
                            <span className="text-sm">Plan: All</span>
                            <Filter size={18} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                        </Button>
                    </div>
                </div>

                {/* Table Area */}
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-b border-border/10 bg-muted/10 h-16">
                                <TableHead className="pl-10 text-[11px] uppercase font-black tracking-[0.15em] text-muted-foreground/70">Restaurant Name</TableHead>
                                <TableHead className="text-[11px] uppercase font-black tracking-[0.15em] text-muted-foreground/70">Owner</TableHead>
                                <TableHead className="text-[11px] uppercase font-black tracking-[0.15em] text-muted-foreground/70">Subscription Plan</TableHead>
                                <TableHead className="text-[11px] uppercase font-black tracking-[0.15em] text-muted-foreground/70">Status</TableHead>
                                <TableHead className="pr-10 text-right text-[11px] uppercase font-black tracking-[0.15em] text-muted-foreground/70">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {restaurants.map((res) => (
                                <TableRow key={res.name} className="group transition-all hover:bg-primary/5 border-b border-border/5 last:border-0 h-24">
                                    <TableCell className="pl-10">
                                        <div className="flex items-center gap-5">
                                            <div className={cn("w-12 h-12 rounded-2xl bg-card border border-border flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500", res.iconColor.replace('text-', 'bg-').concat('/10'))}>
                                                <res.icon size={22} className={res.iconColor} />
                                            </div>
                                            <span className="font-extrabold text-base tracking-tight text-foreground group-hover:text-primary transition-colors">{res.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-sm text-foreground">{res.owner}</span>
                                            <span className="text-xs text-muted-foreground font-medium mt-1">{res.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            className={cn(
                                                "px-4 py-1.5 text-[11px] font-black uppercase tracking-widest rounded-xl border shadow-sm transition-all duration-300",
                                                res.plan === 'Premium' ? "bg-primary/10 text-primary border-primary/20" :
                                                    res.plan === 'Enterprise' ? "bg-purple-500/10 text-purple-500 border-purple-500/20" :
                                                        res.plan === 'Basic' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                                                            "bg-muted/50 text-muted-foreground border-border/50"
                                            )}
                                        >
                                            {res.plan}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2.5">
                                            <span className={cn(
                                                "size-2 rounded-full shadow-[0_0_8px]",
                                                res.status === 'Active' ? "bg-emerald-500 shadow-emerald-500/50" : "bg-muted-foreground/40 shadow-transparent"
                                            )} />
                                            <span className={cn(
                                                "text-sm font-bold tracking-tight",
                                                res.status === 'Active' ? "text-emerald-500" : "text-muted-foreground"
                                            )}>{res.status}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="pr-10">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5">
                                                <Edit2 size={18} />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-muted-foreground hover:text-blue-500 hover:bg-blue-500/5">
                                                <Eye size={18} />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/5">
                                                <Trash2 size={18} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>

                {/* Pagination Area */}
                <div className="px-10 py-8 border-t border-border/10 flex flex-col sm:flex-row items-center justify-between gap-6 bg-muted/5">
                    <p className="text-sm font-bold text-muted-foreground order-2 sm:order-1">
                        Showing <span className="text-foreground">5</span> of <span className="text-foreground">42</span> restaurants
                    </p>
                    <div className="flex items-center gap-2 order-1 sm:order-2">
                        <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl border-border/50 bg-background/40 hover:bg-accent/50 text-muted-foreground">
                            <ChevronLeft size={20} />
                        </Button>
                        <div className="flex items-center gap-1.5 px-1">
                            {[1, 2, 3].map((page) => (
                                <Button
                                    key={page}
                                    variant={page === 1 ? 'default' : 'outline'}
                                    className={cn(
                                        "h-11 w-11 rounded-xl font-black text-sm transition-all duration-300",
                                        page === 1 ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "border-border/50 bg-background/40 hover:bg-accent/50"
                                    )}
                                >
                                    {page}
                                </Button>
                            ))}
                            <span className="px-1 text-muted-foreground font-black">...</span>
                        </div>
                        <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl border-border/50 bg-background/40 hover:bg-accent/50 text-muted-foreground">
                            <ChevronRight size={20} />
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Footer-like note */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-6 text-xs font-bold text-muted-foreground/50 uppercase tracking-widest">
                <p>© 2024 Smart Menu Admin Portal. All rights reserved.</p>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-primary transition-colors">Help Center</a>
                    <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                </div>
            </div>
        </div>
    );
}
