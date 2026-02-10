'use client'

import {
  StatsCard,
  ActivityItem,
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
  cn
} from '@smart-menu-workspace/shared-ui';
import {
  Users,
  CreditCard,
  DollarSign,
  Clock,
  MoreHorizontal,
  Plus,
  Filter,
  UserPlus,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  FileText
} from 'lucide-react';

const stats = [
  { title: 'Total Restaurants', value: '1,284', change: '12%', trend: 'up', icon: Users, iconBg: 'bg-primary/10', iconColor: 'text-primary' },
  { title: 'Active Subscriptions', value: '942', change: '5%', trend: 'up', icon: CreditCard, iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-500' },
  { title: 'Monthly Revenue', value: '$45,200', change: '8%', trend: 'up', icon: DollarSign, iconBg: 'bg-blue-500/10', iconColor: 'text-blue-500' },
  { title: 'Pending Onboarding', value: '18', change: '2%', trend: 'down', icon: Clock, iconBg: 'bg-orange-500/10', iconColor: 'text-orange-500' },
] as const;

const activities = [
  { title: 'Le Petit Bistro', description: 'Joined Premium Plan', time: '2 MINS AGO', icon: UserPlus, iconColor: 'bg-primary' },
  { title: 'Burger Kingdom', description: 'Updated Menu Template', time: '1 HOUR AGO', icon: RefreshCw, iconColor: 'bg-orange-500' },
  { title: 'Taco Station', description: 'Subscription Expiring', time: '4 HOURS AGO', icon: AlertTriangle, iconColor: 'bg-destructive' },
  { title: 'Sushi Zen', description: 'Onboarding Completed', time: 'YESTERDAY', icon: CheckCircle2, iconColor: 'bg-emerald-500' },
];

const restaurants = [
  { name: 'Le Petit Bistro', location: 'Paris, France', plan: 'Premium', status: 'Active' },
  { name: 'Sushi Zen', location: 'Tokyo, Japan', plan: 'Basic', status: 'Active' },
  { name: 'Burger Kingdom', location: 'New York, USA', plan: 'Enterprise', status: 'Inactive' },
  { name: 'Pasta Palace', location: 'Rome, Italy', plan: 'Premium', status: 'Active' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-10 max-w-[1600px] mx-auto animate-in fade-in duration-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground font-medium">Welcome back. Monitoring <span className="text-primary font-bold">1,284</span> active venues across all regions.</p>
        </div>
        <Button className="gap-2.5 h-11 px-6 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
          <FileText size={18} />
          Export Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} trend={stat.trend as 'up' | 'down'} />
        ))}
      </div>

      {/* Middle Section: Chart & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Growth Chart Card */}
        <Card className="lg:col-span-2 border-border/50 shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 p-8 border-b border-border/10 bg-muted/5">
            <div className="space-y-1">
              <CardTitle className="text-xl font-black tracking-tight">Subscription Growth</CardTitle>
              <CardDescription className="font-medium text-muted-foreground">New subscriptions vs cancellations</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="h-9 px-4 text-xs font-bold uppercase tracking-wider rounded-xl border-border/50 bg-background/50">
              Last 6 Months
            </Button>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-[340px] w-full mt-2 rounded-2xl flex items-end justify-between px-10 pb-6 relative">
              {/* Chart Grid Lines (Visual only) */}
              <div className="absolute inset-x-10 inset-y-6 flex flex-col justify-between pointer-events-none opacity-[0.03]">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-full h-px bg-foreground" />
                ))}
              </div>

              {/* Mock Chart Bars */}
              {[40, 60, 45, 80, 55, 90].map((height, i) => (
                <div key={i} className="flex flex-col items-center gap-4 group cursor-pointer relative z-10 w-full max-w-[60px]">
                  <div className="relative w-full flex items-end justify-center">
                    <div
                      className="w-full bg-primary/10 rounded-2xl transition-all duration-500 group-hover:bg-primary/20"
                      style={{ height: `${height}%` }}
                    />
                    <div
                      className="absolute bottom-0 w-1/3 bg-primary rounded-t-lg transition-all duration-500 group-hover:scale-y-110 origin-bottom shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                      style={{ height: `${height * 0.7}%` }}
                    />
                  </div>
                  <span className="text-[11px] uppercase font-bold text-muted-foreground group-hover:text-primary transition-colors tracking-widest">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities Card */}
        <Card className="border-border/50 shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 p-8 border-b border-border/10 bg-muted/5">
            <CardTitle className="text-xl font-black tracking-tight">Recent Activities</CardTitle>
            <Button variant="link" size="sm" className="h-8 px-0 text-primary text-xs font-black uppercase tracking-widest hover:no-underline hover:opacity-80 transition-all">
              View All
            </Button>
          </CardHeader>
          <CardContent className="p-6 space-y-2">
            {activities.map((activity, i) => (
              <ActivityItem key={i} {...activity} />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section: Table */}
      <Card className="border-border/50 shadow-sm rounded-3xl overflow-hidden mb-10">
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-8 border-b border-border/10 bg-muted/5">
          <div className="space-y-1">
            <CardTitle className="text-xl font-black tracking-tight">Recently Onboarded Restaurants</CardTitle>
            <CardDescription className="font-medium text-muted-foreground">Tracking new partner activations</CardDescription>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="gap-2 h-11 px-5 font-bold rounded-xl border-border/50 bg-background/50 hover:bg-accent hover:text-accent-foreground">
              <Filter size={16} />
              Filter
            </Button>
            <Button size="sm" className="gap-2 h-11 px-5 font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
              <Plus size={18} />
              Add Restaurant
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-border/5 bg-muted/10">
                <TableHead className="pl-8 h-14 text-[11px] uppercase font-black tracking-widest text-muted-foreground/80">Restaurant</TableHead>
                <TableHead className="h-14 text-[11px] uppercase font-black tracking-widest text-muted-foreground/80">Location</TableHead>
                <TableHead className="h-14 text-[11px] uppercase font-black tracking-widest text-muted-foreground/80">Plan</TableHead>
                <TableHead className="h-14 text-[11px] uppercase font-black tracking-widest text-muted-foreground/80">Status</TableHead>
                <TableHead className="pr-8 h-14 text-right text-[11px] uppercase font-black tracking-widest text-muted-foreground/80">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {restaurants.map((res) => (
                <TableRow key={res.name} className="group transition-colors hover:bg-muted/30 border-b border-border/5 last:border-0">
                  <TableCell className="pl-8 py-5">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10 rounded-xl border border-border shadow-sm group-hover:scale-110 transition-transform duration-300">
                        <AvatarFallback className="bg-primary/10 text-primary text-[11px] font-black uppercase">
                          {res.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-bold text-sm tracking-tight group-hover:text-primary transition-colors">{res.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground font-medium">{res.location}</TableCell>
                  <TableCell>
                    <span className="text-sm font-bold tracking-tight">{res.plan}</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={res.status === 'Active' ? 'default' : 'secondary'}
                      className={cn(
                        "px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border shadow-sm transition-all duration-300",
                        res.status === 'Active'
                          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-emerald-950"
                          : "bg-muted/50 text-muted-foreground border-border/50 group-hover:bg-muted group-hover:text-foreground"
                      )}
                    >
                      {res.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="pr-8 text-right">
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5">
                      <MoreHorizontal size={20} />
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
