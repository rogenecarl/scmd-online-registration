"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { SignInSchema } from "@/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import { Loader2, Mail, Lock } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { getRoleRedirect } from "@/config/auth"
import type { Role } from "@/types/auth"

export function LoginInForm() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    async function onSubmit(values: z.infer<typeof SignInSchema>) {
        setIsLoading(true);
        const toastId = toast.loading("Signing in...");

        try {
            const { error, data } = await authClient.signIn.email({
                email: values.email,
                password: values.password,
            });

            if (error) {
                toast.error(error.message || "Invalid email or password", { id: toastId });
                return;
            }

            if (data?.user) {
                toast.success("Signed in successfully", { id: toastId });

                // Get role from the signed-in user data
                const user = data.user as { role?: Role };
                const redirectPath = getRoleRedirect(user.role);

                // Refresh server components and navigate
                router.refresh();
                router.push(redirectPath);
            }
        } catch (error) {
            toast.error("An unexpected error occurred", { id: toastId });
            console.error("Sign in error:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full space-y-6">
            {/* Header Section */}
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    Welcome back
                </h1>
                <p className="text-sm text-muted-foreground">
                    Enter your credentials to access your account
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-foreground">Email</FormLabel>
                                    <FormControl>
                                        <div className="relative group">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                            <Input
                                                placeholder="name@example.com"
                                                type="email"
                                                {...field}
                                                className="pl-9 h-11 bg-background border-border focus:ring-2 focus:ring-primary/20 transition-all"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center justify-between">
                                        <FormLabel className="text-foreground">Password</FormLabel>
                                    </div>
                                    <FormControl>
                                        <div className="relative group">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                            <Input
                                                type="password"
                                                placeholder="Enter your password"
                                                {...field}
                                                className="pl-9 h-11 bg-background border-border focus:ring-2 focus:ring-primary/20 transition-all"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-11 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/30 transition-all cursor-pointer"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Signing in...
                            </>
                        ) : "Sign In"}
                    </Button>
                </form>
            </Form>

            <div className="text-center text-xs text-muted-foreground pt-2">
                By continuing, you agree to our Terms and Privacy Policy.
            </div>
        </div>
    )
}
