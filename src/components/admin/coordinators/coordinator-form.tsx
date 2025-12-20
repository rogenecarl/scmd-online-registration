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
  useCreateCoordinator,
  useUpdateCoordinator,
} from "@/hooks/use-coordinators";
import {
  useDivisionsWithoutCoordinator,
  useDivisionsForSelect,
} from "@/hooks/use-divisions";
import { coordinatorSchema, type CoordinatorInput } from "@/schemas";
import { Loader2 } from "lucide-react";

interface CoordinatorFormProps {
  mode: "create" | "edit";
  initialData?: {
    id: string;
    name: string;
    divisionId: string;
  };
}

export function CoordinatorForm({ mode, initialData }: CoordinatorFormProps) {
  const router = useRouter();
  const createMutation = useCreateCoordinator();
  const updateMutation = useUpdateCoordinator();

  // For create mode, only show divisions without coordinators
  // For edit mode, show all divisions (including current one)
  const { data: availableDivisions, isLoading: divisionsLoading } =
    useDivisionsWithoutCoordinator();
  const { data: allDivisions } = useDivisionsForSelect();

  // In edit mode, include the current division in the list
  const divisions = mode === "edit" ? allDivisions : availableDivisions;

  const form = useForm<CoordinatorInput>({
    resolver: zodResolver(coordinatorSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      divisionId: initialData?.divisionId ?? "",
    },
  });

  const isPending = createMutation.isPending || updateMutation.isPending;

  const onSubmit = async (data: CoordinatorInput) => {
    try {
      if (mode === "create") {
        await createMutation.mutateAsync(data);
      } else if (initialData) {
        await updateMutation.mutateAsync({ id: initialData.id, input: data });
      }
      router.push("/admin/coordinators");
    } catch (error) {
      const err = error as Error & { fieldErrors?: Record<string, string[]> };
      if (err.fieldErrors) {
        Object.entries(err.fieldErrors).forEach(([field, messages]) => {
          form.setError(field as keyof CoordinatorInput, {
            type: "server",
            message: messages[0],
          });
        });
      }
    }
  };

  const noDivisionsAvailable =
    mode === "create" && (!divisions || divisions.length === 0);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md">
        {noDivisionsAvailable && (
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
            All divisions already have coordinators assigned. Create a new
            division first or remove an existing coordinator.
          </div>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Coordinator Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., John Smith" {...field} />
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
                disabled={divisionsLoading || noDivisionsAvailable}
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
              {mode === "create" && (
                <FormDescription>
                  Only divisions without coordinators are shown
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
          <Button type="submit" disabled={isPending || noDivisionsAvailable} className="touch-target">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === "create" ? "Create Coordinator" : "Save Changes"}
          </Button>
        </FormActions>
      </form>
    </Form>
  );
}
