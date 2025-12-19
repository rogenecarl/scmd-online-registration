import { LoginInForm } from "@/components/auth/login-form"

export default function LoginPage() {
    return (
        <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
            {/* Left Column: Visual/Marketing */}
            <div className="relative hidden lg:flex min-h-screen h-full w-full flex-col items-center justify-between overflow-hidden bg-slate-950 p-12 text-white">

                {/* Background Effects */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-slate-950" />
                    {/* Glowing Orbs */}
                    <div className="absolute -top-[20%] -left-[10%] h-[600px] w-[600px] rounded-full bg-indigo-600/20 blur-[100px]" />
                    <div className="absolute top-[30%] right-[10%] h-[300px] w-[300px] rounded-full bg-violet-500/10 blur-[80px]" />
                    <div className="absolute -bottom-[10%] -right-[10%] h-[600px] w-[600px] rounded-full bg-blue-600/20 blur-[100px]" />

                    {/* Technical Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />

                    {/* Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20" />
                </div>

                {/* Branding */}
                <div className="relative z-10 w-full flex items-center gap-3 text-lg font-medium tracking-tight animate-in fade-in slide-in-from-top-4 duration-700">
                    <span className="font-bold text-xl">SCMD Online Registration</span>
                </div>

                {/* Feature Showcase */}
                <div className="relative z-10 my-auto flex flex-col gap-8 max-w-[500px]">
                    <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Welcome back to SCMD Events
                        </h2>
                        <p className="text-lg text-slate-400">
                            Sign in to manage your church registrations, track delegate submissions, and coordinate event participation.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        {/* Feature 1 */}
                        <div className="group relative overflow-hidden rounded-2xl bg-white/5 p-4 hover:bg-white/10 transition-colors border border-white/10 animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Delegate Management</h3>
                                    <p className="text-sm text-slate-400">Register and manage your church delegates with detailed profiles.</p>
                                </div>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="group relative overflow-hidden rounded-2xl bg-white/5 p-4 hover:bg-white/10 transition-colors border border-white/10 animate-in fade-in slide-in-from-right-8 duration-700 delay-300">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                                        <line x1="16" x2="16" y1="2" y2="6" />
                                        <line x1="8" x2="8" y1="2" y2="6" />
                                        <line x1="3" x2="21" y1="10" y2="10" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Event Registration</h3>
                                    <p className="text-sm text-slate-400">Browse upcoming events and register your church&apos;s participation.</p>
                                </div>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="group relative overflow-hidden rounded-2xl bg-white/5 p-4 hover:bg-white/10 transition-colors border border-white/10 animate-in fade-in slide-in-from-right-8 duration-700 delay-400">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                        <polyline points="22 4 12 14.01 9 11.01" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Real-time Status</h3>
                                    <p className="text-sm text-slate-400">Track your registration approvals and receive instant notifications.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Metadata */}
                <div className="relative z-10 w-full flex justify-between text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} SCMD Online Registration</p>
                    <p>South Central Mindanao District</p>
                </div>
            </div>

            {/* Right Column: Form*/}
            <div className="min-h-screen flex items-center justify-center p-8 lg:p-12 bg-white dark:bg-[#0B0F19]">
                <div className="w-full max-w-[450px]">
                    <LoginInForm />
                </div>
            </div>
        </div>
    )
}
