"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Inbox, Bell, Tag, ShieldCheck, Check } from "lucide-react";

export default function InboxPage() {
  const notifications = [
    {
      id: "1",
      title: "Order #ORD-2026-9812 Dispatched",
      desc: "Your order containing Aura Wireless Headphones is out for delivery with our courier partner.",
      time: "2 hours ago",
      icon: <Bell className="w-4 h-4 text-[#082F6B]" />,
      unread: true,
    },
    {
      id: "2",
      title: "Exclusive Flash Promo - Flat 15% OFF",
      desc: "Use code KINBO15 at checkout to enjoy discounts on all audio and watches collection.",
      time: "1 day ago",
      icon: <Tag className="w-4 h-4 text-[#FF6B00]" />,
      unread: false,
    },
    {
      id: "3",
      title: "Account Security Verified",
      desc: "Two-step verification was successfully established for your profile login.",
      time: "3 days ago",
      icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
      unread: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F3F7FC]">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-10 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 mb-1">
              <Link href="/account" className="hover:text-[#082F6B]">
                Account
              </Link>
              <span>/</span>
              <span className="text-[#082F6B]">Inbox</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937]">
              Inbox & Notifications
            </h1>
          </div>

          <button
            type="button"
            className="text-xs font-semibold text-[#082F6B] hover:text-[#FF6B00] transition"
          >
            Mark all as read
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition flex items-start gap-4 ${
                item.unread
                  ? "bg-white border-[#082F6B]/30 shadow-2xs"
                  : "bg-white/80 border-[#E5E7EB]"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#F3F7FC] flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3
                    className={`text-sm ${
                      item.unread ? "font-bold text-[#1F2937]" : "font-semibold text-zinc-700"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <span className="text-[11px] text-zinc-400 whitespace-nowrap">
                    {item.time}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {item.unread && (
                <span className="w-2 h-2 rounded-full bg-[#FF6B00] mt-2 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
