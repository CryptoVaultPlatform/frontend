import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id?: string;
  avatar?: string;
  email?: string;
  full_name?: string;
}

interface Transaction {
  id?: string;
  amount?: number;
  type?: "DEPOSIT" | "WITHDRAWAL" | "TRANSFER" | "BONUS";
  status?: "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED";
  description?: string;
  created_at?: Date;
  updated_at?: Date;
  sender_id?: string;
  recipient_id?: string;

  sender?: User;
  recipient?: User;
}

interface TransactionState {
  transactions: Transaction[];
  allTransactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  setAllTransactions: (transactions: Transaction[]) => void;
  signoutTransaction: () => void;
}

export const useTransactionStore = create(
  persist<TransactionState>(
    (set) => ({
      transactions: [],
      allTransactions: [],
      setAllTransactions: (transactions: Transaction[]) => {
        set({ allTransactions: transactions });
      },
      setTransactions: (transactions: Transaction[]) => {
        set({ transactions });
      },
      signoutTransaction: () => {
        set({ transactions: [] });
        set({ allTransactions: [] });
      },
    }),
    {
      name: "transactionStatus",
    }
  )
);
