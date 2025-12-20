"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChefHat } from "lucide-react";
import type { Gender } from "@/lib/generated/prisma";

type Cook = {
  id: string;
  fullName: string;
  nickname: string | null;
  age: number;
  gender: Gender;
  createdAt: Date;
};

interface CooksTableProps {
  cooks: Cook[];
}

export function CooksTable({ cooks }: CooksTableProps) {
  if (cooks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <ChefHat className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">No cooks registered</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Nickname</TableHead>
            <TableHead className="text-center">Age</TableHead>
            <TableHead className="text-center">Gender</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cooks.map((cook, index) => (
            <TableRow key={cook.id}>
              <TableCell className="font-medium text-muted-foreground">
                {index + 1}
              </TableCell>
              <TableCell className="font-medium">{cook.fullName}</TableCell>
              <TableCell className="text-muted-foreground">
                {cook.nickname || "-"}
              </TableCell>
              <TableCell className="text-center">{cook.age}</TableCell>
              <TableCell className="text-center">
                <Badge variant={cook.gender === "MALE" ? "info" : "secondary"}>
                  {cook.gender}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
