import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

interface MaxWidthWrapperProps extends PropsWithChildren {
  className?: string;
}
export const MaxWidthWrapper = ({
  children,
  className,
}: MaxWidthWrapperProps) => {
  return (
    <div className={cn("max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
};
