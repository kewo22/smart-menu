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
    CreditCard,
    FileText,
    Calendar,
    DollarSign,
    ArrowUpRight,
    MoreVertical,
    CheckCircle2,
    Clock,
    AlertCircle,
    Eye,
    Trash2,
    Download,
    Receipt,
    ArrowRight
} from 'lucide-react';

const subscriptions = [
    {
        id: 'SUB-001',
        restaurant: 'The Gourmet Kitchen',
        plan: 'Premium',
        amount: '$49.99',
        cycle: 'Monthly',
        nextPayment: 'Mar 15, 2024',
        status: 'Active',
        restaurantIcon: 'GK',
        iconColor: 'bg-primary/20 text-primary'
    },
    {
        id: 'SUB-002',
        restaurant: 'Pizza Palace',
        plan: 'Basic',
        amount: '$19.99',
        cycle: 'Monthly',
        nextPayment: 'Mar 10, 2024',
        status: 'Active',
        restaurantIcon: 'PP',
        iconColor: 'bg-blue-500/20 text-blue-500'
    },
    {
        id: 'SUB-003',
        restaurant: 'Sushi Zen',
        plan: 'Enterprise',
        amount: '$199.99',
        cycle: 'Yearly',
        nextPayment: 'Oct 12, 2024',
        status: 'Pending',
        restaurantIcon: 'SZ',
        iconColor: 'bg-purple-500/20 text-purple-500'
    },
    {
        id: 'SUB-004',
        restaurant: 'Burger Hub',
        plan: 'Premium',
        amount: '$449.99',
        cycle: 'Yearly',
        nextPayment: 'Feb 20, 2025',
        status: 'Active',
        restaurantIcon: 'BH',
        iconColor: 'bg-emerald-500/20 text-emerald-500'
    },
    {
        id: 'SUB-005',
        restaurant: 'Cafe Delight',
        plan: 'Basic',
        amount: '$19.99',
        cycle: 'Monthly',
        nextPayment: 'Mar 05, 2024',
        status: 'Past Due',
        restaurantIcon: 'CD',
        iconColor: 'bg-amber-500/20 text-amber-500'
    }
];

const stats = [
    { label: 'Total Revenue', value: '$12,845.00', change: '+12.5%', icon: DollarSign, color: 'text-primary' },
    { label: 'Active Subs', value: '142', change: '+8', icon: CreditCard, color: 'text-emerald-500' },
    { label: 'Pending Payments', value: '$840.00', change: '-2', icon: Clock, color: 'text-amber-500' },
];

export default function SubscriptionsPage() {
    return (
        <div className="space-y-10 animate-in fade-in duration-700 max-w-[1600px] mx-auto pb-20">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black tracking-tight text-foreground">Subscription Management</h1>
                    <p className="text-muted-foreground font-medium max-w-2xl">
                        Monitor restaurant payment cycles, manage billing plans, and track platform revenue performance.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2 h-12 px-6 rounded-xl font-bold border-border/50 bg-background/50 hover:bg-accent/50 group transition-all">
                        <Download size={19} className="text-muted-foreground group-hover:text-foreground" />
                        Download Reports
                    </Button>
                    <Button className="gap-2.5 h-12 px-6 rounded-xl font-black shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all bg-primary text-primary-foreground">
                        <Receipt size={20} />
                        View Invoices
                    </Button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i} className="border-border/40 bg-card/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-xl shadow-black/10 group hover:border-primary/20 transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div className={cn("p-3 rounded-2xl bg-muted/50 border border-border/50", stat.color.replace('text-', 'text-opacity-20 bg-'))}>
                                <stat.icon className={stat.color} size={24} />
                            </div>
                            <span className={cn("text-xs font-black uppercase tracking-widest pt-1", stat.change.startsWith('+') ? 'text-emerald-500' : 'text-amber-500')}>
                                {stat.change}
                            </span>
                        </div>
                        <div className="space-y-1">
                            <p className="text-muted-foreground text-xs font-black uppercase tracking-[0.15em]">{stat.label}</p>
                            <h3 className="text-3xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors">{stat.value}</h3>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Main Table Interface */}
            <Card className="border-border/40 shadow-2xl shadow-black/20 rounded-[2.5rem] overflow-hidden bg-card/40 backdrop-blur-xl">
                {/* Table Controls */}
                <div className="p-8 border-b border-white/5 flex flex-col lg:flex-row gap-6 bg-muted/5">
                    <div className="flex-1">
                        <div className="relative group max-w-xl">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" size={19} />
                            <Input
                                placeholder="Search by ID or restaurant name..."
                                className="pl-12 h-14 bg-background/40 border-border/50 focus-visible:bg-background/80 focus-visible:ring-primary/20 transition-all duration-300 rounded-2xl text-base font-medium"
                            />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="h-14 px-6 rounded-2xl font-bold border-border/50 bg-background/40 hover:bg-accent/50 gap-3">
                            <Filter size={18} className="text-muted-foreground" />
                            <span>Status: All</span>
                        </Button>
                        <Button variant="outline" className="h-14 px-6 rounded-2xl font-bold border-border/50 bg-background/40 hover:bg-accent/50 gap-3">
                            <Calendar size={18} className="text-muted-foreground" />
                            <span>This Month</span>
                        </Button>
                    </div>
                </div>

                {/* Subscriptions Table */}
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-b border-border/10 bg-muted/10 h-16">
                                <TableHead className="pl-10 text-[11px] uppercase font-black tracking-[0.15em] text-muted-foreground/70">ID & Restaurant</TableHead>
                                <TableHead className="text-[11px] uppercase font-black tracking-[0.15em] text-muted-foreground/70">Subscription Plan</TableHead>
                                <TableHead className="text-[11px] uppercase font-black tracking-[0.15em] text-muted-foreground/70">Amount / Cycle</TableHead>
                                <TableHead className="text-[11px] uppercase font-black tracking-[0.15em] text-muted-foreground/70">Next Payment</TableHead>
                                <TableHead className="text-[11px] uppercase font-black tracking-[0.15em] text-muted-foreground/70">Status</TableHead>
                                <TableHead className="pr-10 text-right text-[11px] uppercase font-black tracking-[0.15em] text-muted-foreground/70">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subscriptions.map((sub) => (
                                <TableRow key={sub.id} className="group transition-all hover:bg-primary/5 border-b border-border/5 last:border-0 h-24">
                                    <TableCell className="pl-10">
                                        <div className="flex items-center gap-5">
                                            <Avatar className={cn("size-12 rounded-2xl border-none font-black text-xs shadow-sm shadow-black/20", sub.iconColor)}>
                                                <AvatarFallback>{sub.restaurantIcon}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="font-extrabold text-base tracking-tight text-foreground group-hover:text-primary transition-colors">{sub.restaurant}</span>
                                                <span className="text-[11px] font-black text-muted-foreground/60 uppercase tracking-widest mt-1">{sub.id}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="px-4 py-1.5 text-[11px] font-black uppercase tracking-widest rounded-xl bg-background/50 border-border/50 text-foreground">
                                            {sub.plan}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-extrabold text-base text-foreground tracking-tight">{sub.amount}</span>
                                            <span className="text-[11px] font-bold text-muted-foreground mt-1 uppercase tracking-tighter">{sub.cycle} Billing</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                                            <Calendar size={16} className="text-muted-foreground/60" />
                                            {sub.nextPayment}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2.5">
                                            <div className={cn(
                                                "size-2 rounded-full shadow-[0_0_8px]",
                                                sub.status === 'Active' ? "bg-emerald-500 shadow-emerald-500/50" :
                                                    sub.status === 'Pending' ? "bg-amber-500 shadow-amber-500/50" :
                                                        "bg-red-500 shadow-red-500/50"
                                            )} />
                                            <span className={cn(
                                                "text-sm font-bold tracking-tight",
                                                sub.status === 'Active' ? "text-emerald-500" :
                                                    sub.status === 'Pending' ? "text-amber-500" :
                                                        "text-red-500"
                                            )}>{sub.status}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="pr-10">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5">
                                                <Eye size={18} />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5">
                                                <ArrowUpRight size={18} />
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
            </Card>

            {/* Footer Meta */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-6 pt-10 text-xs font-bold text-muted-foreground/40 uppercase tracking-[0.2em]">
                <p>© 2024 Smart Menu Financial. All rights reserved.</p>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-primary transition-colors">Billing support</a>
                    <a href="#" className="hover:text-primary transition-colors">Terms of billing</a>
                    <a href="#" className="hover:text-primary transition-colors">Tax compliance</a>
                </div>
            </div>
        </div>
    );
}
