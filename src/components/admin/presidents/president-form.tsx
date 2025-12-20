"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { FormActions } from "@/components/shared";
import {
  useSeedPresident,
  useUpdatePresident,
  useChurchesWithoutPresident,
} from "@/hooks/use-presidents";
import { useChurches } from "@/hooks/use-churches";
import {
  seedPresidentSchema,
  updatePresidentSchema,
  type SeedPresidentInput,
  type UpdatePresidentInput,
} from "@/schemas";
import { Loader2 } from "lucide-react";

interface PresidentFormProps {
  mode: "create" | "edit";
  initialData?: {
    id: string;
    name: string;
    email: string;
    churchId: string | null;
  };
}

export function PresidentForm({ mode, initialData }: PresidentFormProps) {
  const router = useRouter();
  const seedMutation = useSeedPresident();
  const updateMutation = useUpdatePresident();

  // For create mode, only show churches without presidents
  // For edit mode, show all churches
  const { data: availableChurches, isLoading: churchesLoading } =
    useChurchesWithoutPresident();
  const { data: allChurchesData } = useChurches();

  const churches = mode === "edit" ? allChurchesData?.items : availableChurches;

  // Use appropriate schema based on mode
  const form = useForm<SeedPresidentInput | UpdatePresidentInput>({
    resolver: zodResolver(mode === "create" ? seedPresidentSchema : updatePresidentSchema),
    defaultValues:
      mode === "create"
        ? {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            churchId: "",
          }
        : {
            name: initialData?.name ?? "",
            email: initialData?.email ?? "",
            churchId: initialData?.churchId ?? "",
          },
  });

  const isPending = seedMutation.isPending || updateMutation.isPending;

  const onSubmit = async (data: SeedPresidentInput | UpdatePresidentInput) => {
    try {
      if (mode === "create") {
        await seedMutation.mutateAsync(data as SeedPresidentInput);
      } else if (initialData) {
        await updateMutation.mutateAsync({
          id: initialData.id,
          input: data as UpdatePresidentInput,
        });
      }
      router.push("/admin/presidents");
    } catch (error) {
      const err = error as Error & { fieldErrors?: Record<string, string[]> };
      if (err.fieldErrors) {
        Object.entries(err.fieldErrors).forEach(([field, messages]) => {
          form.setError(field as keyof SeedPresidentInput, {
            type: "server",
            message: messages[0],
          });
        });
      }
    }
  };

  const noChurchesAvailable =
    mode === "create" && (!churches || churches.length === 0);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md">
        {noChurchesAvailable && (
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
            All churches already have presidents assigned. Create a new church
            first or deactivate an existing president.
          </div>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., John Smith" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="e.g., president@church.org"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This will be used for login and notifications
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {mode === "create" && (
          <>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter a secure password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Must be at least 8 characters with uppercase, lowercase, and
                    a number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm the password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <FormField
          control={form.control}
          name="churchId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Church</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value ?? undefined}
                disabled={churchesLoading || noChurchesAvailable}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a church" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {churches?.map((church) => (
                    <SelectItem key={church.id} value={church.id}>
                      {church.name}
                      {"division" in church && church.division && (
                        <span className="text-muted-foreground ml-2">
                          ({church.division.name})
                        </span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {mode === "create" && (
                <FormDescription>
                  Only churches without presidents are shown
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormActions>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isPending}
            className="touch-target"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending || noChurchesAvailable} className="touch-target">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === "create" ? "Create President" : "Save Changes"}
          </Button>
        </FormActions>
      </form>
    </Form>
  );
}
