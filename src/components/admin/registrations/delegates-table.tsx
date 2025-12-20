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
import { Users } from "lucide-react";
import type { Gender } from "@/lib/generated/prisma";

type Delegate = {
  id: string;
  fullName: string;
  nickname: string | null;
  age: number;
  gender: Gender;
  createdAt: Date;
};

interface DelegatesTableProps {
  delegates: Delegate[];
}

export function DelegatesTable({ delegates }: DelegatesTableProps) {
  if (delegates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Users className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">No delegates registered</p>
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
          {delegates.map((delegate, index) => (
            <TableRow key={delegate.id}>
              <TableCell className="font-medium text-muted-foreground">
                {index + 1}
              </TableCell>
              <TableCell className="font-medium">{delegate.fullName}</TableCell>
              <TableCell className="text-muted-foreground">
                {delegate.nickname || "-"}
              </TableCell>
              <TableCell className="text-center">{delegate.age}</TableCell>
              <TableCell className="text-center">
                <Badge variant={delegate.gender === "MALE" ? "info" : "secondary"}>
                  {delegate.gender}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
