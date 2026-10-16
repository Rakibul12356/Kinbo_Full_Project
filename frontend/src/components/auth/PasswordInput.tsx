"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import Input, { type InputProps } from "@/components/ui/input";

export default function PasswordInput(props: Omit<InputProps, "type" | "leftIcon" | "rightIcon">) {
  const [visible, setVisible] = useState(false);
  return (
    <Input
      {...props}
      type={visible ? "text" : "password"}
      leftIcon={<Lock className="h-4 w-4" />}
      rightIcon={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="text-zinc-400 hover:text-[#082F6B] cursor-pointer"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      }
    />
  );
}
