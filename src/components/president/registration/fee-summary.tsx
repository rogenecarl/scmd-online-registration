"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/dashboard";
import { Calculator, Users, ChefHat, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeeSummaryProps {
  delegateCount: number;
  cookCount: number;
  delegateFee: number;
  cookFee: number;
  feeType: string;
  className?: string;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function FeeSummary({
  delegateCount,
  cookCount,
  delegateFee,
  cookFee,
  feeType,
  className,
}: FeeSummaryProps) {
  const delegateTotal = delegateCount * delegateFee;
  const cookTotal = cookCount * cookFee;
  const grandTotal = delegateTotal + cookTotal;

  return (
    <Card className={cn("sticky top-6", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Fee Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Fee Type Badge */}
        <div className="rounded-lg bg-primary/10 p-3 text-center">
          <p className="text-xs font-medium text-muted-foreground">Current Rate</p>
          <p className="font-semibold text-primary">{feeType}</p>
        </div>

        {/* Delegates */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              Delegates
            </span>
            <span>{delegateCount}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground pl-6">
              × {formatCurrency(delegateFee)} each
            </span>
            <span className="font-medium">{formatCurrency(delegateTotal)}</span>
          </div>
        </div>

        {/* Cooks */}
        {(cookCount > 0 || cookFee > 0) && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <ChefHat className="h-4 w-4" />
                Cooks
              </span>
              <span>{cookCount}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground pl-6">
                × {formatCurrency(cookFee)} each
              </span>
              <span className="font-medium">{formatCurrency(cookTotal)}</span>
            </div>
          </div>
        )}

        {/* Total */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 font-semibold">
              <Receipt className="h-4 w-4" />
              Total Amount
            </span>
            <span className="text-xl font-bold text-primary">
              {formatCurrency(grandTotal)}
            </span>
          </div>
        </div>

        {/* Note */}
        <p className="text-xs text-muted-foreground">
          This amount will be recorded with your registration.
        </p>
      </CardContent>
    </Card>
  );
}
