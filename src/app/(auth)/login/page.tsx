import { LoginInForm } from "@/components/auth/login-form"
import Link from "next/link"

export default function LoginPage() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
            {/* Background Effects - Matching Landing Page */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient Orbs */}
                <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-[128px] animate-pulse" />
                <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-violet-500/10 blur-[128px] animate-pulse delay-700" />
                <div className="absolute bottom-1/4 left-1/3 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px] animate-pulse delay-1000" />

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                        backgroundSize: "64px 64px",
                    }}
                />

                {/* Radial Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-md mx-auto px-4 sm:px-6 py-12">
                <div className="flex flex-col items-center">
                    {/* Badge */}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 mb-8">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm hover:bg-background/80 transition-colors"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                            </span>
                            SCMD Online Registration
                        </Link>
                    </div>

                    {/* Login Card */}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 w-full rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 sm:p-8 shadow-xl shadow-black/5 dark:shadow-black/20">
                        <LoginInForm />
                    </div>

                    {/* Footer */}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 mt-8 text-center text-sm text-muted-foreground">
                        <p>South Central Mindanao District</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
