"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/dashboard";
import { Calculator, Users, ChefHat, Receipt, UsersRound } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeeSummaryProps {
  delegateCount: number;
  siblingCount: number;
  cookCount: number;
  delegateFee: number;
  siblingDiscountFee: number;
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
  siblingCount,
  cookCount,
  delegateFee,
  siblingDiscountFee,
  cookFee,
  feeType,
  className,
}: FeeSummaryProps) {
  // Sibling discount applies when 3+ siblings are registered AND discount fee is available
  const siblingDiscountApplies = siblingCount >= 3 && siblingDiscountFee > 0;

  // Calculate fees
  const delegateTotal = delegateCount * delegateFee;
  const siblingTotal = siblingDiscountApplies
    ? siblingCount * siblingDiscountFee
    : siblingCount * delegateFee; // If less than 3 siblings, they pay regular rate
  const cookTotal = cookCount * cookFee;
  const grandTotal = delegateTotal + siblingTotal + cookTotal;

  // Calculate potential savings
  const potentialSavings = siblingCount >= 3 && siblingDiscountFee > 0
    ? siblingCount * (delegateFee - siblingDiscountFee)
    : 0;

  return (
    <Card className={cn("lg:sticky lg:top-6", className)}>
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
          <Calculator className="h-4 w-4 md:h-5 md:w-5" />
          Fee Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6 pt-0 md:pt-0">
        {/* Fee Type Badge */}
        <div className="rounded-lg bg-primary/10 p-3 text-center">
          <p className="text-xs font-medium text-muted-foreground">Current Rate</p>
          <p className="font-semibold text-primary">{feeType}</p>
        </div>

        {/* Delegates */}
        {delegateCount > 0 && (
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
        )}

        {/* Siblings */}
        {siblingCount > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className={cn(
                "flex items-center gap-2",
                siblingDiscountApplies ? "text-emerald-600" : "text-muted-foreground"
              )}>
                <UsersRound className="h-4 w-4" />
                Siblings
                {siblingDiscountApplies && (
                  <span className="text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded">
                    Discounted
                  </span>
                )}
              </span>
              <span>{siblingCount}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className={cn(
                "pl-6",
                siblingDiscountApplies ? "text-emerald-600" : "text-muted-foreground"
              )}>
                × {formatCurrency(siblingDiscountApplies ? siblingDiscountFee : delegateFee)} each
              </span>
              <span className={cn(
                "font-medium",
                siblingDiscountApplies && "text-emerald-600"
              )}>
                {formatCurrency(siblingTotal)}
              </span>
            </div>
            {siblingCount > 0 && siblingCount < 3 && siblingDiscountFee > 0 && (
              <p className="text-xs text-amber-600 pl-6">
                Add {3 - siblingCount} more to get {formatCurrency(siblingDiscountFee)}/sibling
              </p>
            )}
          </div>
        )}

        {/* Show delegates placeholder if none */}
        {delegateCount === 0 && siblingCount === 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                Delegates
              </span>
              <span>0</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground pl-6">
                × {formatCurrency(delegateFee)} each
              </span>
              <span className="font-medium">{formatCurrency(0)}</span>
            </div>
          </div>
        )}

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

        {/* Savings */}
        {potentialSavings > 0 && (
          <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 p-3 text-center">
            <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              You save {formatCurrency(potentialSavings)} with sibling discount!
            </p>
          </div>
        )}

        {/* Note */}
        <p className="text-xs text-muted-foreground">
          This amount will be recorded with your registration.
        </p>
      </CardContent>
    </Card>
  );
}
