"use client";

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNotification } from "@/providers/notificationProvider";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IconEye, IconEyeOff } from "@/components/ui/icon";
import { useState } from "react";
import Link from "next/link";
import { IconLoader2 } from "@tabler/icons-react";
import { resetPassword } from "@/api";

const FormSchema = z
  .object({
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character",
      }),

    password2: z.string().nonempty({ message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.password2, {
    path: ["password2"],
    message: "Passwords do not match",
  });

const ResetPassword = () => {
  const { toast } = useNotification();
  const [isVisible, setIsVisible] = useState(true);
  const [isVisible2, setIsVisible2] = useState(true);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      password2: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token") || "";

    const newData = {
      ...data,
      token,
    };

    await resetPassword(
      newData,
      () => {
        toast("Password reset successfully", "Success");
        router.push("/account/signin");
      },
      (message: string) => {
        toast(message, "Error");
      }
    );
  }

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center bg-[url('/assets/signin/sign-bg.webp')] bg-cover bg-center bg-no-repeat">
        <div className="w-full max-w-[1440px] flex flex-col md:flex-row gap-4 lg:gap-20 justify-center items-center md:items-start px-4 py-4 lg:px-24">
          <div className="flex-1 max-w-[500px] flex flex-col gap-3 md:gap-6">
            <h1 className="!text-[24px] md:!text-5xl leading-[2rem] md:leading-[4rem] text-center md:text-start">
              Secure Your Crypto Journey
            </h1>
            <h4 className="text-center md:text-start">
              Register with your email to access your secure crypto wallet and
              manage your funds safely. Keep your balance, stay in control.
            </h4>
          </div>
          <div className="flex-1 w-full md:max-w-[500px] flex flex-col gap-5 md:gap-10 p-4 md:p-12 bg-[#ffffff1e] rounded-2xl">
            <Image
              src="/assets/logo.png"
              width={60}
              height={60}
              alt="logo"
              className="cursor-pointer"
              onClick={() => {
                router.push("/");
              }}
            />
            <div className="flex flex-col gap-2">
              <h3 className="!text-[20px] md:!text-3xl">Reset Password</h3>
              <h6>
                Enter your new password below to complete the reset process.
              </h6>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={`${isVisible ? "password" : "text"}`}
                            placeholder="Enter your password"
                            {...field}
                          />
                          <Button
                            type="button"
                            className="!p-0 !bg-transparent absolute right-2 top-0 h-full cursor-pointer"
                            onClick={() => {
                              setIsVisible(!isVisible);
                            }}
                          >
                            {isVisible ? (
                              <IconEye width="24" height="24" />
                            ) : (
                              <IconEyeOff width="24" height="24" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={`${isVisible2 ? "password" : "text"}`}
                            placeholder="Enter your password"
                            {...field}
                          />
                          <Button
                            type="button"
                            className="!p-0 !bg-transparent absolute right-2 top-0 h-full cursor-pointer"
                            onClick={() => {
                              setIsVisible2(!isVisible2);
                            }}
                          >
                            {isVisible2 ? (
                              <IconEye width="24" height="24" />
                            ) : (
                              <IconEyeOff width="24" height="24" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12 py-3 px-4 text-white bg-button-p hover:bg-button-pu cursor-pointer"
                >
                  {form.formState.isSubmitting && (
                    <IconLoader2 className="w-4 h-4 animate-spin" />
                  )}
                  Update Password
                </Button>
                <div className="flex gap-2 justify-center items-center">
                  <h6 className="!text-sm">Already have an account?</h6>
                  <Link
                    href="/account/signin"
                    className="text-[#00A6E8] hover:text-[#7cd5f8] text-sm"
                  >
                    Sign In
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
