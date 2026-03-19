"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useEventsForFilter,
  useChurchesForFilter,
  useAdminAddParticipants,
} from "@/hooks/use-registrations";
import { Loader2, Plus, Trash2 } from "lucide-react";
import type { Gender } from "@/lib/generated/prisma";

type ParticipantEntry = {
  fullName: string;
  nickname: string;
  age: string;
  gender: Gender;
};

const emptyParticipant = (): ParticipantEntry => ({
  fullName: "",
  nickname: "",
  age: "",
  gender: "MALE",
});

interface AddParticipantsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddParticipantsDialog({
  open,
  onOpenChange,
}: AddParticipantsDialogProps) {
  const [eventId, setEventId] = useState("");
  const [churchId, setChurchId] = useState("");
  const [registrationFee, setRegistrationFee] = useState("");
  const [remarks, setRemarks] = useState("Discounted registration");
  const [delegates, setDelegates] = useState<ParticipantEntry[]>([emptyParticipant()]);
  const [cooks, setCooks] = useState<ParticipantEntry[]>([]);

  const { data: events } = useEventsForFilter();
  const { data: churches } = useChurchesForFilter();
  const addMutation = useAdminAddParticipants();

  const resetForm = () => {
    setEventId("");
    setChurchId("");
    setRegistrationFee("");
    setRemarks("Discounted registration");
    setDelegates([emptyParticipant()]);
    setCooks([]);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) resetForm();
    onOpenChange(newOpen);
  };

  const updateParticipant = (
    list: ParticipantEntry[],
    setList: (v: ParticipantEntry[]) => void,
    index: number,
    field: keyof ParticipantEntry,
    value: string
  ) => {
    const updated = [...list];
    updated[index] = { ...updated[index], [field]: value };
    setList(updated);
  };

  const addRow = (
    list: ParticipantEntry[],
    setList: (v: ParticipantEntry[]) => void
  ) => {
    setList([...list, emptyParticipant()]);
  };

  const removeRow = (
    list: ParticipantEntry[],
    setList: (v: ParticipantEntry[]) => void,
    index: number
  ) => {
    setList(list.filter((_, i) => i !== index));
  };

  const isValid = () => {
    if (!eventId || !churchId || !registrationFee) return false;
    const allParticipants = [...delegates, ...cooks];
    if (allParticipants.length === 0) return false;
    return allParticipants.every(
      (p) => p.fullName.trim() && p.age && Number(p.age) >= 1
    );
  };

  const handleSubmit = async () => {
    if (!isValid()) return;

    await addMutation.mutateAsync({
      eventId,
      churchId,
      delegates: delegates
        .filter((d) => d.fullName.trim())
        .map((d) => ({
          fullName: d.fullName.trim(),
          nickname: d.nickname.trim(),
          age: Number(d.age),
          gender: d.gender,
        })),
      cooks: cooks
        .filter((c) => c.fullName.trim())
        .map((c) => ({
          fullName: c.fullName.trim(),
          nickname: c.nickname.trim(),
          age: Number(c.age),
          gender: c.gender,
        })),
      registrationFee: Number(registrationFee),
      remarks,
    });

    handleOpenChange(false);
  };

  const renderParticipantRows = (
    label: string,
    list: ParticipantEntry[],
    setList: (v: ParticipantEntry[]) => void
  ) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addRow(list, setList)}
        >
          <Plus className="h-3.5 w-3.5 mr-1" />
          Add
        </Button>
      </div>
      {list.length === 0 && (
        <p className="text-xs text-muted-foreground">No {label.toLowerCase()} added</p>
      )}
      {list.map((entry, index) => (
        <div key={index} className="grid grid-cols-[1fr_auto] gap-2 items-start">
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Full name"
              value={entry.fullName}
              onChange={(e) =>
                updateParticipant(list, setList, index, "fullName", e.target.value)
              }
            />
            <Input
              placeholder="Nickname"
              value={entry.nickname}
              onChange={(e) =>
                updateParticipant(list, setList, index, "nickname", e.target.value)
              }
            />
            <Input
              type="number"
              placeholder="Age"
              min={1}
              max={120}
              value={entry.age}
              onChange={(e) =>
                updateParticipant(list, setList, index, "age", e.target.value)
              }
            />
            <Select
              value={entry.gender}
              onValueChange={(v) =>
                updateParticipant(list, setList, index, "gender", v)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-destructive"
            onClick={() => removeRow(list, setList, index)}
            disabled={label === "Delegates" && list.length <= 1}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Discounted Participants</DialogTitle>
          <DialogDescription>
            Add delegates and cooks with a discounted registration fee.
            These will be automatically approved.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {/* Event & Church Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Event</Label>
              <Select value={eventId} onValueChange={setEventId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select event" />
                </SelectTrigger>
                <SelectContent>
                  {events?.map((event) => (
                    <SelectItem key={event.id} value={event.id}>
                      {event.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Church</Label>
              <Select value={churchId} onValueChange={setChurchId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select church" />
                </SelectTrigger>
                <SelectContent>
                  {churches?.map((church) => (
                    <SelectItem key={church.id} value={church.id}>
                      {church.name}
                      <span className="text-muted-foreground ml-1">
                        ({church.divisionName})
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Registration Fee */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Registration Fee (per person)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                  ₱
                </span>
                <Input
                  type="number"
                  min={0}
                  placeholder="0"
                  value={registrationFee}
                  onChange={(e) => setRegistrationFee(e.target.value)}
                  className="pl-7"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Note</Label>
              <Textarea
                placeholder="e.g. Discounted registration"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={1}
                className="min-h-9 resize-none"
              />
            </div>
          </div>

          {/* Delegates */}
          {renderParticipantRows("Delegates", delegates, setDelegates)}

          {/* Cooks */}
          {renderParticipantRows("Cooks", cooks, setCooks)}
        </div>

        <DialogFooter className="gap-2 sm:gap-0 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={addMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={addMutation.isPending || !isValid()}
          >
            {addMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Add Participants
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
