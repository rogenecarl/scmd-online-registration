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
import { useCreatePastor, useUpdatePastor } from "@/hooks/use-pastors";
import { useChurchesWithoutPastor, useChurches } from "@/hooks/use-churches";
import { pastorSchema, type PastorInput } from "@/schemas";
import { Loader2 } from "lucide-react";

interface PastorFormProps {
  mode: "create" | "edit";
  initialData?: {
    id: string;
    name: string;
    churchId: string;
  };
}

export function PastorForm({ mode, initialData }: PastorFormProps) {
  const router = useRouter();
  const createMutation = useCreatePastor();
  const updateMutation = useUpdatePastor();

  // For create mode, only show churches without pastors
  // For edit mode, show all churches (including current one)
  const { data: availableChurches, isLoading: churchesLoading } =
    useChurchesWithoutPastor();
  const { data: allChurchesData } = useChurches();

  // In edit mode, include the current church in the list
  const churches = mode === "edit" ? allChurchesData?.items : availableChurches;

  const form = useForm<PastorInput>({
    resolver: zodResolver(pastorSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      churchId: initialData?.churchId ?? "",
    },
  });

  const isPending = createMutation.isPending || updateMutation.isPending;

  const onSubmit = async (data: PastorInput) => {
    try {
      if (mode === "create") {
        await createMutation.mutateAsync(data);
      } else if (initialData) {
        await updateMutation.mutateAsync({ id: initialData.id, input: data });
      }
      router.push("/admin/pastors");
    } catch (error) {
      const err = error as Error & { fieldErrors?: Record<string, string[]> };
      if (err.fieldErrors) {
        Object.entries(err.fieldErrors).forEach(([field, messages]) => {
          form.setError(field as keyof PastorInput, {
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
            All churches already have pastors assigned. Create a new church
            first or remove an existing pastor.
          </div>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pastor Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Rev. John Smith" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="churchId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Church</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
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
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {mode === "create" && (
                <FormDescription>
                  Only churches without pastors are shown
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button type="submit" disabled={isPending || noChurchesAvailable}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === "create" ? "Create Pastor" : "Save Changes"}
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
