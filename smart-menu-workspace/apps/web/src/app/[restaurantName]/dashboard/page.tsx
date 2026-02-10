'use client';

import {
    StatsCard,
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
    AvatarImage,
    cn
} from '@smart-menu-workspace/shared-ui';
import {
    BarChart3,
    QrCode,
    Globe,
    Plus,
    Edit2,
    Download,
    Link as LinkIcon,
    Copy,
    MoreVertical,
    TrendingUp,
    TrendingDown
} from 'lucide-react';

const stats = [
    {
        title: 'Menu Usage',
        value: '2',
        total: '/ 5 Menus',
        change: 'Pro Plan: 3 slots remaining',
        trend: 'none',
        icon: BarChart3,
        iconBg: 'bg-primary/10',
        iconColor: 'text-primary',
        progress: 40,
        isLink: false
    },
    {
        title: 'Total QR Scans',
        value: '1,284',
        change: '+12%',
        trend: 'up',
        icon: QrCode,
        iconBg: 'bg-blue-500/10',
        iconColor: 'text-blue-500',
        description: 'Last 30 days performance',
        isLink: false
    },
    {
        title: 'Active Subdomain',
        value: 'italian-bistro.dinedash.com',
        trend: 'none',
        icon: Globe,
        iconBg: 'bg-purple-500/10',
        iconColor: 'text-purple-500',
        isLink: true
    },
] as const;

const recentMenus = [
    { name: 'Summer Specials 2024', status: 'Active', items: 42, modified: 'Aug 24, 2024' },
    { name: 'Main Dinner Menu', status: 'Draft', items: 65, modified: 'Jul 12, 2024' },
];

export default function RestaurantDashboard() {
    return (
        <div className="space-y-8 animate-in fade-in duration-700 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center bg-card/40 backdrop-blur-md p-6 rounded-3xl border border-border/50 shadow-sm">
                <div>
                    <h1 className="text-2xl font-black text-foreground tracking-tight">Dashboard Overview</h1>
                    <p className="text-muted-foreground font-medium">Welcome back, Marco. Here's what's happening today.</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-black rounded-2xl h-12 px-6 gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95">
                    <Plus size={20} />
                    Create New Menu
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i} className="border-border/50 shadow-sm rounded-3xl overflow-hidden bg-card/40 backdrop-blur-md hover:shadow-md transition-all duration-300 group">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground/80">{stat.title}</p>
                                <div className={cn("p-2.5 rounded-xl shadow-inner transition-transform duration-500 group-hover:scale-110", stat.iconBg)}>
                                    <stat.icon size={20} className={stat.iconColor} />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-3xl font-black text-foreground tracking-tight">
                                        {stat.value}
                                    </h3>
                                    {'total' in stat && <span className="text-muted-foreground font-bold text-sm tracking-tight">{stat.total}</span>}
                                    {stat.trend === 'up' && (
                                        <span className="flex items-center gap-0.5 text-emerald-500 text-xs font-black bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                            <TrendingUp size={12} /> {stat.change}
                                        </span>
                                    )}
                                </div>

                                {'progress' in stat && (
                                    <div className="pt-2">
                                        <div className="w-full bg-accent/30 h-2 rounded-full overflow-hidden border border-border/50">
                                            <div className="bg-primary h-full rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]" style={{ width: `${stat.progress}%` }} />
                                        </div>
                                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-2">{stat.change}</p>
                                    </div>
                                )}

                                {stat.isLink && (
                                    <div className="pt-2 overflow-hidden">
                                        <p className="text-xs font-bold text-foreground truncate mb-2">{stat.value}</p>
                                        <button className="text-primary text-xs font-black uppercase tracking-widest flex items-center gap-1 hover:underline active:opacity-70">
                                            View Live Site <Edit2 size={10} />
                                        </button>
                                    </div>
                                )}

                                {stat.trend === 'up' && 'description' in stat && (
                                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-2">{stat.description}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Active Menu Section */}
            <Card className="border-border/50 shadow-sm rounded-3xl overflow-hidden bg-card/40 backdrop-blur-md">
                <div className="p-8 border-b border-border/10 flex flex-wrap items-center justify-between gap-6 bg-muted/5">
                    <div className="space-y-1">
                        <h3 className="text-xl font-black text-foreground tracking-tight">Current Active Menu</h3>
                        <p className="text-sm text-muted-foreground font-medium">This menu is currently visible to your customers via QR codes.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="rounded-2xl h-11 px-5 border-border/50 font-bold gap-2 hover:bg-accent/50 bg-background/50 text-foreground">
                            <Edit2 size={16} className="text-muted-foreground" />
                            Edit Menu
                        </Button>
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-black rounded-2xl h-11 px-6 gap-2 shadow-lg shadow-primary/10">
                            <Download size={18} />
                            Download QR
                        </Button>
                    </div>
                </div>
                <CardContent className="p-8 bg-gradient-to-br from-transparent to-primary/5 flex flex-col md:flex-row items-center gap-10">
                    <div className="relative group shrink-0">
                        <div className="w-44 h-44 bg-white/5 p-3 rounded-2xl shadow-xl border border-border/50 flex items-center justify-center backdrop-blur-sm">
                            <QrCode size={120} className="text-muted-foreground/30" />
                        </div>
                        <div className="absolute inset-0 bg-background/60 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <span className="text-foreground text-xs font-black uppercase tracking-widest px-4 py-2 bg-accent rounded-full shadow-lg border border-border/50">Preview</span>
                        </div>
                    </div>

                    <div className="space-y-6 flex-1 text-center md:text-left">
                        <div className="space-y-3">
                            <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                Live & Online
                            </Badge>
                            <h4 className="text-3xl font-black text-foreground tracking-tight">Summer Specials 2024</h4>
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-8">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-muted-foreground/80 uppercase tracking-widest">Items Count</p>
                                <p className="text-sm font-bold text-foreground">42 Dishes & Drinks</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-muted-foreground/80 uppercase tracking-widest">Last Updated</p>
                                <p className="text-sm font-bold text-foreground">2 hours ago</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-accent/30 p-3.5 rounded-2xl border border-border/50 w-fit mx-auto md:mx-0 shadow-sm backdrop-blur-sm">
                            <LinkIcon size={16} className="text-muted-foreground" />
                            <span className="text-sm font-bold text-muted-foreground">summer-specials.dinedash.com</span>
                            <button className="ml-2 text-primary hover:text-primary/80 transition-colors bg-primary/10 p-1.5 rounded-lg">
                                <Copy size={14} />
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Recent Menus Table */}
            <Card className="border-border/50 shadow-sm rounded-3xl overflow-hidden bg-card/40 backdrop-blur-md mb-10">
                <CardHeader className="p-8 border-b border-border/10 flex flex-row items-center justify-between bg-muted/5">
                    <CardTitle className="text-xl font-black text-foreground tracking-tight">Recent Menus</CardTitle>
                    <Button variant="link" className="text-primary font-black uppercase text-[10px] tracking-widest p-0 h-auto hover:no-underline hover:opacity-80 transition-all">View All</Button>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/10 hover:bg-transparent border-b border-border/10">
                                <TableHead className="pl-8 h-12 text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Menu Name</TableHead>
                                <TableHead className="h-12 text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Status</TableHead>
                                <TableHead className="h-12 text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Items</TableHead>
                                <TableHead className="h-12 text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Modified</TableHead>
                                <TableHead className="pr-8 h-12 text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentMenus.map((menu, i) => (
                                <TableRow key={i} className="hover:bg-accent/30 border-b border-border/5 last:border-0 transition-colors group">
                                    <TableCell className="pl-8 py-4 font-black text-sm text-foreground tracking-tight group-hover:text-primary transition-colors">{menu.name}</TableCell>
                                    <TableCell>
                                        <Badge variant={menu.status === 'Active' ? 'default' : 'secondary'} className={cn(
                                            "px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest border shadow-sm",
                                            menu.status === 'Active'
                                                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                                : "bg-muted/50 text-muted-foreground border-border/50"
                                        )}>
                                            {menu.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-sm font-bold text-muted-foreground">{menu.items}</TableCell>
                                    <TableCell className="text-sm font-bold text-muted-foreground">{menu.modified}</TableCell>
                                    <TableCell className="pr-8 text-right">
                                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5">
                                            <MoreVertical size={18} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
