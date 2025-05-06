// Type definitions
export interface TooltipProps {
    active?: boolean;
    payload?: Array<{ value: number; count?: number; name?: string }>;
    label?: string;
  }
  
  export interface CountryData {
    name: string;
    value: number;
    change: string;
  }
  
  export interface WeeklyVisitorData {
    subject: string;
    A: number;
    B: number;
    fullMark: number;
  }
  
  export interface LabelProps {
    dataKey: string;
    value: number;
    x: number;
    y: number;
    width: number;
  }
  
  export interface StatCardProps {
    title: string;
    value: string;
    changePercentage: string;
    isPositive?: boolean;
    subtitle?: string;
    isWarning?: boolean;
    warningText?: string;
    expiryDate?: string;
  }