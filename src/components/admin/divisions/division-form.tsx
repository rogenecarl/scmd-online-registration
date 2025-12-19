"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCreateDivision, useUpdateDivision } from "@/hooks/use-divisions";
import { divisionSchema, type DivisionInput } from "@/schemas";
import { Loader2 } from "lucide-react";

interface DivisionFormProps {
  mode: "create" | "edit";
  initialData?: { id: string; name: string };
}

export function DivisionForm({ mode, initialData }: DivisionFormProps) {
  const router = useRouter();
  const createMutation = useCreateDivision();
  const updateMutation = useUpdateDivision();

  const form = useForm<DivisionInput>({
    resolver: zodResolver(divisionSchema),
    defaultValues: {
      name: initialData?.name ?? "",
    },
  });

  const isPending = createMutation.isPending || updateMutation.isPending;

  const onSubmit = async (data: DivisionInput) => {
    try {
      if (mode === "create") {
        await createMutation.mutateAsync(data);
      } else if (initialData) {
        await updateMutation.mutateAsync({ id: initialData.id, input: data });
      }
      router.push("/admin/divisions");
    } catch (error) {
      // Handle field errors from mutation
      const err = error as Error & { fieldErrors?: Record<string, string[]> };
      if (err.fieldErrors) {
        Object.entries(err.fieldErrors).forEach(([field, messages]) => {
          form.setError(field as keyof DivisionInput, {
            type: "server",
            message: messages[0],
          });
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Division Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Northern Division" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === "create" ? "Create Division" : "Save Changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isPending}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
