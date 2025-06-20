"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSupportStore, useTransactionStore, useUserStore } from "@/store";

import { useNotification } from "./notificationProvider";
import verifyToken from "@/lib/verifyToken";
import instance from "@/lib/axios";
import {
  getAllUsers,
  getSupports,
  getTransactions,
  getAllTransactions,
  getAllSupports,
} from "@/api";

type User = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
};

type AuthContextType = {
  user: User | undefined;
  isAuthenticated: boolean;
  login: (email: string, password: string, isRemember: boolean) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { signout, setUserData, user, users, setUsersData } = useUserStore();
  const { setTransactions, setAllTransactions, signoutTransaction } =
    useTransactionStore();
  const { setSupports, setAllSupports, signoutSupport } = useSupportStore();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useNotification();

  useEffect(() => {
    const init = async () => {
      try {
        const token: string | null = window.localStorage.getItem("token");
        const { isTokenValid, user }: { isTokenValid: boolean; user: any } =
          await verifyToken(token || "");

        if (user?.status === "SUSPENDED") {
          toast("Your account is suspended", "Warning");
          logout();
        } else if (user?.status === "FREEZE") {
          toast(
            "Your account is frozen now. Please contact to support team",
            "Warning"
          );
          setTimeout(() => {
            router.push("/dashboard/support");
          }, 1000);
        }

        const allowedRoutes = ["/account/signin", "/account/signup"];

        if (isTokenValid && allowedRoutes.includes(pathname)) {
          router.push("/dashboard");
        }

        if (isTokenValid) {
          await getTransactions(
            (transactions: any) => {
              setTransactions(transactions);
            },
            (message: string) => {
              toast(message, "Error");
            }
          );

          await getSupports(
            (supports: any) => {
              setSupports(supports);
            },
            (message: string) => {
              toast(message, "Error");
            }
          );

          if (user.role === "ADMIN") {
            await getAllUsers(
              (users: any) => {
                setUsersData(users);
              },
              (message: string) => {
                toast(message, "Error");
              }
            );

            await getAllTransactions(
              (transactions: any) => {
                setAllTransactions(transactions);
              },
              (message: string) => {
                toast(message, "Error");
              }
            );

            await getAllSupports(
              (supports: any) => {
                setAllSupports(supports);
              },
              (message: string) => {
                toast(message, "Error");
              }
            );
          }

          const newUser: any = {
            ...user,
            sentTransactions: [],
            receivedTransactions: [],
            recentDeposit: user.receivedTransactions
              ?.filter((transaction: any) => transaction.type === "DEPOSIT")
              .sort(
                (a: any, b: any) =>
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
              )[0]?.amount,
            recentWithdrawal: user.sentTransactions
              ?.filter((transaction: any) => transaction.type === "WITHDRAWAL")
              .sort(
                (a: any, b: any) =>
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
              )[0]?.amount,
            recentBonus: user.receivedTransactions
              ?.filter((transaction: any) => transaction.type === "BONUS")
              .sort(
                (a: any, b: any) =>
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
              )[0]?.amount,
            recentWithdrawStatus: user.sentTransactions
              ?.filter((transaction: any) => transaction.type === "WITHDRAWAL")
              .sort(
                (a: any, b: any) =>
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
              )[0]?.status,
          };
          setUserData(newUser);

          if (user.role === "USER" && pathname.includes("/admin-dashboard")) {
            router.push("/dashboard");
          }
        } else {
          localStorage.removeItem("token");
          delete instance.defaults.headers.common.Authorization;
          signout();
          signoutTransaction();
          signoutSupport();

          // Allow access to public routes without redirect
          const publicRoutes = [
            "/",
            "/account/signin",
            "/account/signup",
            "/account/forgot-password",
            "/account/email-sents",
          ];
          if (
            publicRoutes.includes(pathname) ||
            pathname.includes("/reset-password") ||
            pathname.includes("/verify-email")
          ) {
            return;
          }

          // Redirect to signin for protected routes when no valid token
          router.push("/account/signin");
        }
      } catch (err) {
        console.error(err);
      }
    };

    init();
  }, []);

  const login = async (
    email: string,
    password: string,
    isRemember: boolean
  ) => {
    try {
      const res = await instance.post("api/auth/signin", {
        email,
        password,
        isRemember,
      });

      if (res.status === 200) {
        const { token, user } = res.data;
        if (!user?.isEmailVerified) {
          router.push("/account/email-sents");
          return;
        }
        localStorage.setItem("token", token);
        instance.defaults.headers.common.Authorization = `Bearer ${token}`;

        const newUser: any = {
          ...user,
          sentTransactions: [],
          receivedTransactions: [],
          recentDeposit: user.receivedTransactions
            ?.filter((transaction: any) => transaction.type === "DEPOSIT")
            .sort(
              (a: any, b: any) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )[0]?.amount,
          recentWithdrawal: user.sentTransactions
            ?.filter((transaction: any) => transaction.type === "WITHDRAWAL")
            .sort(
              (a: any, b: any) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )[0]?.amount,
          recentBonus: user.receivedTransactions
            ?.filter((transaction: any) => transaction.type === "BONUS")
            .sort(
              (a: any, b: any) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )[0]?.amount,
          recentWithdrawStatus: user.sentTransactions
            ?.filter((transaction: any) => transaction.type === "WITHDRAWAL")
            .sort(
              (a: any, b: any) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )[0]?.status,
        };
        setUserData(newUser);

        await getTransactions(
          (transactions: any) => {
            setTransactions(transactions);
          },
          (message: string) => {
            toast(message, "Error");
          }
        );

        if (user.role === "ADMIN") {
          await getAllUsers(
            (users: any) => {
              setUsersData(users);
            },
            (message: string) => {
              toast(message, "Error");
            }
          );

          await getAllTransactions(
            (transactions: any) => {
              setAllTransactions(transactions);
            },
            (message: string) => {
              toast(message, "Error");
            }
          );
        }

        toast("Logged in successfully", "Success");

        if (user.role === "ADMIN") {
          router.push("/admin-dashboard");
        } else {
          router.push("/dashboard");
        }
      } else {
        toast(res.data.message, "Error");
      }
    } catch (error: any) {
      console.error("Error logging in:", error);
      toast(error.response.data.message, "Error");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete instance.defaults.headers.common.Authorization;
    signout();
    signoutTransaction();
    signoutSupport();
    router.push("/account/signin");
  };

  return (
    <AuthContext.Provider
      value={{ user: user as User, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
