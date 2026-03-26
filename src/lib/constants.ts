import { ExpenseCategory, InvestmentType } from "@/types";

export const STORAGE_KEYS = {
  EXPENSES: "et_expenses",
  HABITS: "et_habits",
  COMPLETIONS: "et_completions",
  INVESTMENTS: "et_investments",
  SAVINGS_GOALS: "et_savings_goals",
  SAVINGS_TRANSACTIONS: "et_savings_txns",
  AI_INSIGHTS: "et_ai_insights",
} as const;

export const EXPENSE_CATEGORIES: {
  value: ExpenseCategory;
  label: string;
  emoji: string;
}[] = [
  { value: "food", label: "Food", emoji: "🍔" },
  { value: "transport", label: "Transport", emoji: "🚗" },
  { value: "entertainment", label: "Entertainment", emoji: "🎬" },
  { value: "shopping", label: "Shopping", emoji: "🛍️" },
  { value: "bills", label: "Bills", emoji: "📄" },
  { value: "health", label: "Health", emoji: "💊" },
  { value: "education", label: "Education", emoji: "📚" },
  { value: "other", label: "Other", emoji: "📦" },
];

export const CATEGORY_MAP: Record<ExpenseCategory, { label: string; emoji: string }> = {
  food: { label: "Food", emoji: "🍔" },
  transport: { label: "Transport", emoji: "🚗" },
  entertainment: { label: "Entertainment", emoji: "🎬" },
  shopping: { label: "Shopping", emoji: "🛍️" },
  bills: { label: "Bills", emoji: "📄" },
  health: { label: "Health", emoji: "💊" },
  education: { label: "Education", emoji: "📚" },
  other: { label: "Other", emoji: "📦" },
};

export const INVESTMENT_TYPES: { value: InvestmentType; label: string; emoji: string }[] = [
  { value: "stocks", label: "Stocks", emoji: "📈" },
  { value: "crypto", label: "Crypto", emoji: "₿" },
  { value: "real_estate", label: "Real Estate", emoji: "🏠" },
  { value: "bonds", label: "Bonds", emoji: "🏦" },
  { value: "mutual_funds", label: "Mutual Funds", emoji: "📊" },
  { value: "other", label: "Other", emoji: "💼" },
];

export const INVESTMENT_TYPE_MAP: Record<InvestmentType, { label: string; emoji: string }> = {
  stocks: { label: "Stocks", emoji: "📈" },
  crypto: { label: "Crypto", emoji: "₿" },
  real_estate: { label: "Real Estate", emoji: "🏠" },
  bonds: { label: "Bonds", emoji: "🏦" },
  mutual_funds: { label: "Mutual Funds", emoji: "📊" },
  other: { label: "Other", emoji: "💼" },
};

export const SAVINGS_ICONS = ["🎯", "🏖️", "🏠", "🚗", "💻", "📱", "🎓", "💍", "🛫", "🏥", "👶", "🎁"];

export const INSIGHTS_CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours
