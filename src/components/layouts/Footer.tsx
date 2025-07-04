"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const footerNavigation = {
  company: [
    { name: "About", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
    { name: "Get in Touch", href: "#" },
  ],
  platform: [
    { name: "Dashboard", href: "#" },
    { name: "Wallet Features", href: "#" },
    { name: "Rewards", href: "#" },
    { name: "Security Overview", href: "#" },
  ],
  resources: [
    { name: "FAQ", href: "#" },
    { name: "Help Center", href: "#" },
    { name: "Live Support", href: "#" },
    { name: "Blog", href: "#" },
  ],
  legal: [
    { name: "Terms of Use", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "AML/KYC Policy", href: "#" },
    { name: "Risk Disclosure", href: "#" },
  ],
};

const Footer = () => {

  return (
    <>
      <div className="relative w-full bg-[#030014] border-t-[1px] border-border z-50">
        <div className="max-w-[1440px] m-auto px-2.5 lg:px-20">
          <div className="flex flex-col md:flex-row gap-5 pt-10 md:pt-20 pb-14">
            <div className="flex-1 flex flex-col gap-5 justify-between">
              <div className="flex gap-3 items-center">
                <Image
                  src="/assets/logo.png"
                  alt="logo"
                  width={36}
                  height={36}
                />
                <h6 className="font-bold">Controlled Custodial Crypto</h6>
              </div>
              <div className="flex gap-5 items-center">
                <Image
                  src="/assets/icon/discord.svg"
                  alt="discord"
                  width={24}
                  height={24}
                />
                <Image
                  src="/assets/icon/twitter.svg"
                  alt="twitter"
                  width={24}
                  height={24}
                />
              </div>
            </div>
            <div className="flex-2 grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 md:mt-0">
              <div className="flex flex-col gap-5">
                <h6 className="text-sm text-[#F4F0FF] font-bold">Company</h6>
                {footerNavigation.company.map((item) => (
                  <Link
                    key={item.name}
                    className="text-text hover:text-white transition-all duration-200"
                    href={item.href}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-5">
                <h6 className="text-sm text-[#F4F0FF] font-bold">Platform</h6>
                {footerNavigation.platform.map((item) => (
                  <Link
                    key={item.name}
                    className="text-text hover:text-white transition-all duration-200"
                    href={item.href}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-5">
                <h6 className="text-sm text-[#F4F0FF] font-bold">Resources</h6>
                {footerNavigation.resources.map((item) => (
                  <Link
                    key={item.name}
                    className="text-text hover:text-white transition-all duration-200"
                    href={item.href}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-5">
                <h6 className="text-sm text-[#F4F0FF] font-bold">Legal</h6>
                {footerNavigation.legal.map((item) => (
                  <Link
                    key={item.name}
                    className="text-text hover:text-white transition-all duration-200"
                    href={item.href}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Separator className="border-border" />
          <div className="py-10 flex flex-col md:flex-row gap-3 items-center justify-between">
            <h6 className="text-text text-[14px] text-center md:text-start">
              Secure Crypto Wallet Built for Performance & Protection.
            </h6>
            <h6 className="text-text text-[14px] text-center md:text-end">
              © 2025 Only-Stay. All rights reserved.
            </h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
