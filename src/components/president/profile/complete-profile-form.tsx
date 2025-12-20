"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  useDivisionsWithChurches,
  useCompleteProfile,
} from "@/hooks/use-president-profile";
import { Loader2, Building2, Church, AlertCircle, CheckCircle } from "lucide-react";

const formSchema = z.object({
  divisionId: z.string().min(1, "Please select a division"),
  churchId: z.string().min(1, "Please select a church"),
});

type FormValues = z.infer<typeof formSchema>;

export function CompleteProfileForm() {
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const { data: divisions, isLoading: divisionsLoading } = useDivisionsWithChurches();
  const completeProfileMutation = useCompleteProfile();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      divisionId: "",
      churchId: "",
    },
  });

  const watchedChurchId = useWatch({ control: form.control, name: "churchId" });

  const selectedDivisionData = divisions?.find((d) => d.id === selectedDivision);
  const availableChurches = selectedDivisionData?.churches ?? [];

  const onSubmit = (data: FormValues) => {
    completeProfileMutation.mutate({ churchId: data.churchId });
  };

  const handleDivisionChange = (value: string) => {
    setSelectedDivision(value);
    form.setValue("divisionId", value);
    form.setValue("churchId", ""); // Reset church when division changes
  };

  if (divisionsLoading) {
    return (
      <Card className="w-full max-w-lg mx-auto">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!divisions || divisions.length === 0) {
    return (
      <Card className="w-full max-w-lg mx-auto">
        <CardContent className="py-12">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No divisions or churches available. Please contact the administrator.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="text-center p-4 md:p-6">
        <div className="mx-auto mb-3 md:mb-4 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-primary/10">
          <Church className="h-5 w-5 md:h-6 md:w-6 text-primary" />
        </div>
        <CardTitle className="text-xl md:text-2xl">Complete Your Profile</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Select your division and church to continue. This will associate you with
          your church for event registrations.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Division Selection */}
            <FormField
              control={form.control}
              name="divisionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Division
                  </FormLabel>
                  <Select
                    onValueChange={handleDivisionChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your division" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Divisions</SelectLabel>
                        {divisions.map((division) => (
                          <SelectItem key={division.id} value={division.id}>
                            {division.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the division your church belongs to
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Church Selection */}
            <FormField
              control={form.control}
              name="churchId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Church className="h-4 w-4" />
                    Church
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!selectedDivision}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            selectedDivision
                              ? "Select your church"
                              : "First select a division"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Churches</SelectLabel>
                        {availableChurches.length > 0 ? (
                          availableChurches.map((church) => (
                            <SelectItem
                              key={church.id}
                              value={church.id}
                              disabled={church.hasPresident}
                              className={church.hasPresident ? "opacity-60" : ""}
                            >
                              {church.name}
                              {church.hasPresident && " (Assigned)"}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectLabel className="font-normal text-muted-foreground">
                            No churches available in this division
                          </SelectLabel>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the church you represent as president
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Selected Church Info */}
            {watchedChurchId && selectedDivisionData && (
              <Alert className="bg-emerald-50 border-emerald-200">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <AlertDescription className="text-emerald-800">
                  You will be registered as president of{" "}
                  <strong>
                    {
                      availableChurches.find(
                        (c) => c.id === watchedChurchId
                      )?.name
                    }
                  </strong>{" "}
                  under <strong>{selectedDivisionData.name}</strong> division.
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full touch-target"
              disabled={completeProfileMutation.isPending}
            >
              {completeProfileMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Complete Profile
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
