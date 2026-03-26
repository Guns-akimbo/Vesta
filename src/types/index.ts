export type ExpenseCategory =
  | "food"
  | "transport"
  | "entertainment"
  | "shopping"
  | "bills"
  | "health"
  | "education"
  | "other";

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: string; // YYYY-MM-DD
  createdAt: string; // ISO string
}

export interface Habit {
  id: string;
  name: string;
  icon?: string;
  createdAt: string; // ISO string
}

export interface HabitCompletion {
  habitId: string;
  date: string; // YYYY-MM-DD
  completed: boolean;
}

export type InvestmentType = "stocks" | "crypto" | "real_estate" | "bonds" | "mutual_funds" | "other";
export type InvestmentStatus = "active" | "sold";

export interface Investment {
  id: string;
  name: string;
  type: InvestmentType;
  amountInvested: number;
  currentValue: number;
  date: string; // YYYY-MM-DD
  status: InvestmentStatus;
  ticker?: string; // Stock ticker symbol (e.g., AAPL, KO, MSFT)
  notes?: string;
  createdAt: string;
}

export interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  previousClose: number;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string; // YYYY-MM-DD
  icon?: string;
  createdAt: string;
}

export interface SavingsTransaction {
  id: string;
  goalId: string;
  amount: number; // positive = deposit, negative = withdrawal
  date: string;
  note?: string;
  createdAt: string;
}

export interface AiInsight {
  content: string;
  generatedAt: string; // ISO string
}

export interface ParsedExpense {
  type: "expense";
  amount: number;
  category: ExpenseCategory;
  description: string;
}

export interface ParsedHabitCompletion {
  type: "habit_completion";
  habitName: string;
  habitId?: string;
}

export type ParsedInput = ParsedExpense | ParsedHabitCompletion;
