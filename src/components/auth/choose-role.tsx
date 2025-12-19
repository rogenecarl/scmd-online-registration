import React from 'react';
import { User, Church, Calendar, Users, ClipboardList, CheckCircle, Building2, FileText } from 'lucide-react';
import { RoleCard } from './role-card';
import { RoleOption, UserRole } from './types';
import Link from 'next/link';

const ChooseRole: React.FC = () => {
  const roles: RoleOption[] = [
    {
      id: UserRole.USER,
      title: "Church Member",
      description: "Register for church events, view your registrations, and track your participation status.",
      href: "/register",
      visualIcon: <User size={32} strokeWidth={2} />,
      primaryColor: "from-blue-500 to-cyan-500",
      buttonText: "Register as Member",
      features: [
        { icon: <Calendar />, text: "View upcoming SCMD events" },
        { icon: <ClipboardList />, text: "Register for events" },
        { icon: <CheckCircle />, text: "Track registration status" },
        { icon: <FileText />, text: "View event details" },
      ]
    },
    {
      id: UserRole.PRESIDENT,
      title: "Church President",
      description: "Manage your church's registrations, submit delegates, and coordinate event participation.",
      href: "/register-provider",
      visualIcon: <Church size={32} strokeWidth={2} />,
      primaryColor: "from-teal-500 to-emerald-500",
      buttonText: "Register as President",
      features: [
        { icon: <Users />, text: "Manage church delegates" },
        { icon: <Building2 />, text: "Update church profile" },
        { icon: <ClipboardList />, text: "Submit group registrations" },
        { icon: <CheckCircle />, text: "Track approval status" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] flex flex-col font-sans selection:bg-brand-100 selection:text-brand-900 transition-colors duration-300">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-100/40 dark:bg-cyan-900/20 rounded-full blur-3xl -z-10 opacity-50" />

        <div className="w-full max-w-5xl space-y-12">

          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Choose your <span className="text-brand-600 dark:text-cyan-400">Account Type</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
              Select the account type that best describes your role in SCMD events registration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {roles.map((role) => (
              <RoleCard key={role.id} role={role} />
            ))}
          </div>

          <p className="text-center text-sm text-slate-400 dark:text-slate-500 mt-8">
            Already have an account? <Link href="/login" className="text-brand-600 dark:text-cyan-400 hover:underline font-medium">Sign in here</Link>
          </p>

        </div>
      </main>

      <footer className="py-6 text-center text-slate-400 dark:text-slate-600 text-sm">
        &copy; {new Date().getFullYear()} SCMD Online Registration. South Central Mindanao District.
      </footer>
    </div>
  );
};

export default ChooseRole;
