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
import { Users, UsersRound } from "lucide-react";
import type { Gender } from "@/lib/generated/prisma";

type Delegate = {
  id: string;
  fullName: string;
  nickname: string | null;
  age: number;
  gender: Gender;
  isSibling: boolean;
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

  const siblingCount = delegates.filter((d) => d.isSibling).length;

  return (
    <div className="rounded-lg border">
      {/* Sibling summary if there are siblings */}
      {siblingCount > 0 && (
        <div className="flex items-center gap-2 px-4 py-2 border-b bg-emerald-50/50 dark:bg-emerald-950/20">
          <UsersRound className="h-4 w-4 text-emerald-600" />
          <span className="text-xs text-emerald-700 dark:text-emerald-400">
            {siblingCount} sibling{siblingCount !== 1 ? "s" : ""} in this batch
          </span>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Nickname</TableHead>
            <TableHead className="text-center">Age</TableHead>
            <TableHead className="text-center">Gender</TableHead>
            <TableHead className="text-center">Type</TableHead>
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
              <TableCell className="text-center">
                {delegate.isSibling ? (
                  <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700">
                    Sibling
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground">
                    Regular
                  </Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
