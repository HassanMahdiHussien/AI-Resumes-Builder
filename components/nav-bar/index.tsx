import React from "react";
import { ExternalLink } from "lucide-react";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  return (
    <div className="shadow-sm w-full sticky top-0  bg-white dark:bg-gray-900 z-[9999]">
      <div className="w-full mx-auto max-w-7xl p-3 px-5 flex items-center justify-between ">
        <div className="flex items-center flex-1 gap-9">
          <div>
            <h5 className="font-black text-lg text-primary flex items-center gap-2">
              <img src="https://hashtalenthub.com/wp-content/uploads/2025/06/logo_transparent-1.png" alt="Logo" style={{height: 56, width: 56}} />
            </h5>
          </div>

          <div className="hidden lg:flex">
            <ul className="flex items-center gap-5 text-[14px] font-medium text-black dark:text-white">
              <li>
                <Link href="#">AI Features</Link>
              </li>
              <li>
                <Link href="#">Pricing</Link>
              </li>
              <li>
                <Link href="#">Resources</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <LoginLink>
            <Button variant="outline" className="rounded-full px-6 py-2 font-bold uppercase tracking-widest shadow-none border-0 text-[#1A237E] bg-white hover:bg-gray-100 transition">Sign In</Button>
          </LoginLink>
          <RegisterLink>
            <Button className="rounded-full bg-[#FFD464] text-[#1A237E] font-bold uppercase tracking-widest px-6 py-2 shadow-none border-0 hover:bg-[#ffe28a] transition">Get Started</Button>
          </RegisterLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
