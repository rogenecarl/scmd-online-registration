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
} from "@/components/ui/form";
import { useCreateChurch, useUpdateChurch } from "@/hooks/use-churches";
import { useDivisionsForSelect } from "@/hooks/use-divisions";
import { churchSchema, type ChurchInput } from "@/schemas";
import { Loader2 } from "lucide-react";

interface ChurchFormProps {
  mode: "create" | "edit";
  initialData?: { id: string; name: string; divisionId: string };
}

export function ChurchForm({ mode, initialData }: ChurchFormProps) {
  const router = useRouter();
  const createMutation = useCreateChurch();
  const updateMutation = useUpdateChurch();
  const { data: divisions, isLoading: divisionsLoading } = useDivisionsForSelect();

  const form = useForm<ChurchInput>({
    resolver: zodResolver(churchSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      divisionId: initialData?.divisionId ?? "",
    },
  });

  const isPending = createMutation.isPending || updateMutation.isPending;

  const onSubmit = async (data: ChurchInput) => {
    try {
      if (mode === "create") {
        await createMutation.mutateAsync(data);
      } else if (initialData) {
        await updateMutation.mutateAsync({ id: initialData.id, input: data });
      }
      router.push("/admin/churches");
    } catch (error) {
      const err = error as Error & { fieldErrors?: Record<string, string[]> };
      if (err.fieldErrors) {
        Object.entries(err.fieldErrors).forEach(([field, messages]) => {
          form.setError(field as keyof ChurchInput, {
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
              <FormLabel>Church Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., First Baptist Church" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="divisionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Division</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={divisionsLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a division" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {divisions?.map((division) => (
                    <SelectItem key={division.id} value={division.id}>
                      {division.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === "create" ? "Create Church" : "Save Changes"}
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
