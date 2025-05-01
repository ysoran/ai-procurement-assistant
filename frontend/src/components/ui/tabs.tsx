import * as React from "react";
import { cn } from "@/lib/utils";

export const Tabs = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("tabs", className)} {...props} />
);

export const TabsList = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex space-x-2", className)} {...props} />
);

export const TabsTrigger = ({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className={cn("px-4 py-2 rounded-md text-sm font-medium", className)} {...props}>
    {children}
  </button>
);

export const TabsContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-4", className)} {...props} />
);
