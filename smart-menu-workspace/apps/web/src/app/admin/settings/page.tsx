'use client';

import {
    Card,
    CardContent,
    Button,
    Badge,
    cn
} from '@smart-menu-workspace/shared-ui';
import {
    Settings,
    Shield,
    Zap,
    Layout,
    Bell,
    Lock,
    Code,
    Sparkles,
    Construction,
    Hammer,
    ChevronRight,
    ArrowRight
} from 'lucide-react';

const upcomingFeatures = [
    {
        icon: Shield,
        title: 'Security & Auth',
        description: 'Two-factor authentication and advanced session management controls.',
        status: 'In Development'
    },
    {
        icon: Sparkles,
        title: 'Custom Branding',
        description: 'Personalize the platform with your own logo, colors, and white-labeling.',
        status: 'Planned'
    },
    {
        icon: Zap,
        title: 'API Access',
        description: 'Developer keys to integrate Smart Menu with your existing POS systems.',
        status: 'Researching'
    },
    {
        icon: Bell,
        title: 'Notification Engine',
        description: 'Custom webhooks and email/SMS alert configuration for admins.',
        status: 'Planned'
    }
];

export default function SettingsPage() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 animate-in fade-in duration-1000">
            {/* Background Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full max-h-[600px] pointer-events-none">
                <div className="absolute top-0 left-0 w-72 h-72 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
            </div>

            <div className="relative z-10 w-full max-w-4xl space-y-12">
                {/* Hero Section */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-4 animate-bounce">
                        <Hammer size={18} />
                        <span className="text-xs font-black uppercase tracking-widest">Under Construction</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground italic uppercase">
                        Platform <span className="text-primary not-italic">Settings</span>
                    </h1>

                    <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                        We are engineering a powerful administration core. Soon, you will be able to orchestrate your entire platform's security, branding, and connectivity from here.
                    </p>
                </div>

                {/* Features Teaser Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {upcomingFeatures.map((feature, i) => (
                        <Card
                            key={i}
                            className="group border-border/40 bg-card/30 backdrop-blur-xl rounded-[2rem] p-8 shadow-2xl shadow-black/20 hover:border-primary/20 hover:bg-card/50 transition-all duration-500"
                        >
                            <div className="flex items-start gap-6">
                                <div className="p-4 rounded-2xl bg-muted/50 border border-border/50 text-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                    <feature.icon size={28} />
                                </div>
                                <div className="space-y-3 flex-1">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-xl font-bold tracking-tight text-foreground">{feature.title}</h3>
                                        <Badge variant="outline" className="bg-background/50 text-[10px] font-black uppercase tracking-tighter py-0 px-2 border-border/50 text-muted-foreground">
                                            {feature.status}
                                        </Badge>
                                    </div>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Progress Visual */}
                <Card className="border-border/40 bg-primary/5 backdrop-blur-md rounded-[2.5rem] p-10 text-center space-y-8 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                    <div className="space-y-4">
                        <h3 className="text-2xl font-black uppercase tracking-tight italic">Engineering Progress</h3>
                        <div className="w-full h-4 bg-background/50 rounded-full border border-border/50 overflow-hidden relative">
                            <div
                                className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_20px_rgba(19,236,182,0.6)] animate-progress-glow"
                                style={{ width: '65%' }}
                            />
                        </div>
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                            <span>Foundation Layer</span>
                            <span className="text-primary">65% Deployed</span>
                            <span>Final Polish</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <p className="text-sm font-bold text-muted-foreground italic">Want to be a beta tester for new features?</p>
                        <Button className="rounded-xl h-12 px-8 font-black bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:scale-[1.05] transition-all gap-2">
                            Join Waitlist
                            <ArrowRight size={18} />
                        </Button>
                    </div>
                </Card>
            </div>

            <style jsx global>{`
        @keyframes progress-glow {
          0% { opacity: 0.8; transform: translateX(-2%); }
          50% { opacity: 1; transform: translateX(0%); }
          100% { opacity: 0.8; transform: translateX(-2%); }
        }
        .animate-progress-glow {
          animation: progress-glow 3s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
}
