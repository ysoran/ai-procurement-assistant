import * as React from "react";
import { cn } from "@/lib/utils";

// `Tabs` Component: The main container
export const Tabs = ({ className, activeTab, onTabChange, ...props }: React.HTMLAttributes<HTMLDivElement> & { activeTab: string, onTabChange: (tab: string) => void }) => (
  <div className={cn("tabs", className)} {...props} />
);

// `TabsList` Component: The container for all the triggers
export const TabsList = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex space-x-2", className)} {...props} />
);

// `TabsTrigger` Component: The clickable buttons to switch tabs
export const TabsTrigger = ({
  className,
  children,
  tabValue,
  activeTab,
  onTabChange,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { tabValue: string, activeTab: string, onTabChange: (tab: string) => void }) => (
  <button
    className={cn(
      "px-4 py-2 rounded-md text-sm font-medium",
      activeTab === tabValue ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300", 
      className
    )}
    onClick={() => onTabChange(tabValue)}
    {...props}
  >
    {children}
  </button>
);

// `TabsContent` Component: The content area for each tab
export const TabsContent = ({
  className,
  children,
  tabValue,
  activeTab,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { tabValue: string, activeTab: string }) => (
  <div className={cn("mt-4", className, activeTab === tabValue ? "block" : "hidden")} {...props}>
    {children}
  </div>
);
