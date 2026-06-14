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
    Grid,
    List,
    Upload,
    Edit2,
    Blockquote,
    Trash2,
    MoreVertical,
    LayoutGrid,
    ChevronRight,
    Monitor,
    Smartphone,
    CheckCircle2,
    XCircle,
    Eye,
    Settings,
    Image as ImageIcon,
    Palette
} from 'lucide-react';

const templates = [
    {
        id: 1,
        name: 'Minimalist Zen',
        category: 'Modern',
        description: 'A sleek, white-space focused design ideal for high-end bistros and modern cafes.',
        status: 'Active',
        thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7ed9d42339?q=80&w=800&auto=format&fit=crop',
        lastUpdated: 'Oct 15, 2023',
        iconColor: 'text-primary'
    },
    {
        id: 2,
        name: 'Visual-Heavy Delight',
        category: 'Visual Focus',
        description: 'Puts photography front and center. Perfect for restaurants with stunning presentation.',
        status: 'Active',
        thumbnail: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=800&auto=format&fit=crop',
        lastUpdated: 'Oct 12, 2023',
        iconColor: 'text-emerald-500'
    },
    {
        id: 3,
        name: 'Italian Classic',
        category: 'Traditional',
        description: 'Warm, rustic tones with elegant typography. Best suited for traditional pizzerias.',
        status: 'Active',
        thumbnail: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop',
        lastUpdated: 'Oct 10, 2023',
        iconColor: 'text-orange-500'
    }
];

export default function TemplatesPage() {
    return (
        <div className="space-y-10 animate-in fade-in duration-700 max-w-[1600px] mx-auto pb-20">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black tracking-tight text-foreground">Menu Template Pool</h1>
                    <p className="text-muted-foreground font-medium max-w-2xl">
                        Manage and curate digital menu layouts for all restaurant subscribers. These templates define the visual identity of the customer-facing menus.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button className="gap-2.5 h-12 px-6 rounded-xl font-black shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all bg-primary text-primary-foreground">
                        <Upload size={20} />
                        Upload New Template
                    </Button>
                </div>
            </div>

            {/* Filters Area */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-border/10 pb-8">
                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                    <Button variant="default" className="bg-primary text-primary-foreground font-bold px-6 h-10 rounded-xl shadow-md border-transparent">
                        All Templates
                    </Button>
                    <Button variant="outline" className="h-10 px-5 rounded-xl font-bold border-border/50 bg-background/50 hover:bg-accent/50 group gap-2">
                        Minimalist
                        <ChevronRight size={14} className="rotate-90 text-muted-foreground" />
                    </Button>
                    <Button variant="outline" className="h-10 px-5 rounded-xl font-bold border-border/50 bg-background/50 hover:bg-accent/50 group gap-2">
                        Visual-Heavy
                        <ChevronRight size={14} className="rotate-90 text-muted-foreground" />
                    </Button>
                </div>

                <div className="flex items-center gap-4 w-full lg:w-auto">
                    <div className="relative group flex-1 min-w-[300px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" size={18} />
                        <Input
                            placeholder="Search templates..."
                            className="pl-11 h-11 bg-background/40 border-border/50 focus-visible:bg-background/80 focus-visible:ring-primary/20 transition-all duration-300 rounded-xl text-sm font-medium"
                        />
                    </div>
                    <div className="flex bg-accent/20 p-1 rounded-xl border border-border/50">
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg bg-background shadow-sm text-primary">
                            <Grid size={18} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground">
                            <List size={18} />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Grid View */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                {templates.map((template) => (
                    <Card key={template.id} className="group border-border/40 shadow-xl shadow-black/20 rounded-[2rem] overflow-hidden bg-card/40 backdrop-blur-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500 flex flex-col">
                        <div className="relative w-full aspect-[16/10] overflow-hidden">
                            <img
                                src={template.thumbnail}
                                alt={template.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                            <div className="absolute top-4 left-4">
                                <Badge className="bg-primary/90 text-primary-foreground font-black px-3 py-1 text-[10px] uppercase tracking-widest border-transparent shadow-lg shadow-black/40">
                                    {template.category}
                                </Badge>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                <div className="flex gap-2">
                                    <Button size="icon" className="h-9 w-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-primary hover:text-primary-foreground transition-all">
                                        <Monitor size={16} />
                                    </Button>
                                    <Button size="icon" className="h-9 w-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-primary hover:text-primary-foreground transition-all">
                                        <Smartphone size={16} />
                                    </Button>
                                </div>
                                <Button size="sm" variant="secondary" className="rounded-xl font-bold bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black">
                                    Preview
                                </Button>
                            </div>
                        </div>
                        <div className="p-7 flex flex-col flex-1">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-extrabold text-xl tracking-tight leading-none group-hover:text-primary transition-colors">{template.name}</h3>
                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                                    <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                                    <span className="text-[10px] font-black uppercase text-primary tracking-tighter">Active</span>
                                </div>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">
                                {template.description}
                            </p>
                            <div className="flex gap-3">
                                <Button variant="outline" className="flex-1 rounded-xl h-11 font-bold bg-background/40 border-border/50 hover:bg-accent hover:border-border transition-all gap-2">
                                    <Edit2 size={16} className="text-muted-foreground" />
                                    Edit Design
                                </Button>
                                <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 border border-transparent hover:border-destructive/20 transition-all">
                                    <Trash2 size={18} />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}

                {/* Add New Layout Card */}
                <div className="group border-2 border-dashed border-border/40 rounded-[2rem] flex flex-col items-center justify-center p-10 text-center hover:border-primary/50 hover:bg-primary/5 transition-all duration-500 cursor-pointer bg-card/10 backdrop-blur-sm">
                    <div className="size-20 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-xl shadow-primary/5">
                        <Plus size={36} className="text-primary" />
                    </div>
                    <h3 className="text-foreground text-xl font-black mb-2 italic">New Concept?</h3>
                    <p className="text-muted-foreground text-sm font-medium">Add a new custom template design to the global pool.</p>
                </div>
            </div>

            {/* Detailed Inventory Table Section */}
            <div className="pt-20 space-y-8">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-lg shadow-primary/5">
                        <Settings size={22} />
                    </div>
                    <h2 className="text-2xl font-black tracking-tight text-foreground italic uppercase">Detailed Inventory</h2>
                </div>

                <Card className="border-border/40 shadow-2xl shadow-black/40 rounded-[2.5rem] overflow-hidden bg-card/40 backdrop-blur-xl">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-b border-border/10 bg-muted/10 h-16">
                                    <TableHead className="pl-10 text-[11px] uppercase font-black tracking-[0.15em] text-muted-foreground/70">Template Name</TableHead>
                                    <TableHead className="text-[11px] uppercase font-black tracking-[0.15em] text-muted-foreground/70">Category</TableHead>
                                    <TableHead className="text-[11px] uppercase font-black tracking-[0.15em] text-muted-foreground/70">Status</TableHead>
                                    <TableHead className="text-[11px] uppercase font-black tracking-[0.15em] text-muted-foreground/70">Last Updated</TableHead>
                                    <TableHead className="pr-10 text-right text-[11px] uppercase font-black tracking-[0.15em] text-muted-foreground/70">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {templates.map((template) => (
                                    <TableRow key={template.id} className="group transition-all hover:bg-primary/5 border-b border-border/5 last:border-0 h-20">
                                        <TableCell className="pl-10">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-card border border-border overflow-hidden">
                                                    <img src={template.thumbnail} className="w-full h-full object-cover" />
                                                </div>
                                                <span className="font-extrabold text-base tracking-tight text-foreground group-hover:text-primary transition-colors">{template.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="bg-accent/50 text-muted-foreground border-border/50 font-bold px-3 py-1 rounded-lg">
                                                {template.category}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-primary shadow-[0_0_8px_rgba(19,236,182,0.5)]" />
                                                <span className="text-sm font-bold text-foreground">Active</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground font-medium">
                                            {template.lastUpdated}
                                        </TableCell>
                                        <TableCell className="pr-10">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5">
                                                    <Eye size={18} />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5">
                                                    <Edit2 size={18} />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/5">
                                                    <XCircle size={18} />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* Footer Meta */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-6 pt-10 text-xs font-bold text-muted-foreground/40 uppercase tracking-[0.2em]">
                <p>© 2024 Smart Menu Platform. Super Admin Portal v2.4.0</p>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-primary transition-colors">Help Center</a>
                    <a href="#" className="hover:text-primary transition-colors">API documentation</a>
                    <a href="#" className="hover:text-primary transition-colors">Security</a>
                </div>
            </div>
        </div>
    );
}
