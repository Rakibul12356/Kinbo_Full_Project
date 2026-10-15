"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  User,
  Camera,
  Wallet,
  Megaphone,
  Package,
  Bell,
  Heart,
  FileText,
  PackagePlus,
  MapPin,
  Star,
  Bike,
  ChevronRight,
  ChevronDown,
  Calendar,
  CheckCircle2,
  Check,
} from "lucide-react";

export default function AccountPage() {
  const [fullName, setFullName] = useState("Rakibul Hasan");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const email = "rakibulhasan.maktech@gmail.com";
  const mobile = "+8801328524369";
  const [isLanguageBn, setIsLanguageBn] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const sidebarMenuItems = [
    {
      id: "balance",
      label: "Balance",
      icon: Wallet,
      extra: "৳ 0",
      extraClass: "text-[#082F6B] font-bold text-xs",
    },
    { id: "refer", label: "Refer and Earn", icon: Megaphone },
    { id: "products", label: "My Products", icon: Package },
    { id: "notified", label: "Notified Products", icon: Bell },
    { id: "wishlists", label: "Wishlists", icon: Heart },
    { id: "prescriptions", label: "Prescriptions", icon: FileText },
    { id: "suggest", label: "Suggest Products", icon: PackagePlus },
    { id: "address", label: "Delivery Address", icon: MapPin },
    { id: "product-review", label: "Product Review", icon: Star },
    { id: "rider-review", label: "Rider Review", icon: Bike },
  ];

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3500);
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 sm:py-8 ">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-500 mb-6 font-medium">
          <Link href="/" className="hover:text-[#082F6B] transition-colors">
            Home
          </Link>
          <span className="text-zinc-400">&gt;</span>
          <span className="text-zinc-800 font-semibold">Account</span>
        </div>

        {/* Success Toast */}
        {showSuccessToast && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center justify-between shadow-xs animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Profile information updated successfully!</span>
            </div>
            <button
              onClick={() => setShowSuccessToast(false)}
              className="text-xs text-emerald-600 hover:text-emerald-900 font-bold px-2 py-1"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Sidebar */}
          <div className="lg:col-span-4 space-y-2.5">
            {/* User Info Card */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 flex items-center gap-3.5 shadow-2xs">
              <div className="w-14 h-14 rounded-full border-2 border-zinc-200 bg-zinc-50 flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-zinc-700 stroke-[1.7]" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm sm:text-base text-[#1F2937] truncate">
                  {fullName}
                </h3>
                <p className="text-xs text-zinc-500 truncate">{mobile}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs font-semibold text-zinc-600">BN</span>
                  <button
                    type="button"
                    onClick={() => setIsLanguageBn(!isLanguageBn)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${
                      isLanguageBn ? "bg-[#082F6B]" : "bg-zinc-300"
                    }`}
                    aria-label="Toggle language"
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                        isLanguageBn ? "translate-x-4.5" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar Navigation Items */}
            <div className="space-y-2 pt-1">
              {sidebarMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full bg-white border rounded-xl px-4 py-3 flex items-center justify-between text-xs sm:text-sm transition shadow-2xs cursor-pointer group text-left ${
                      isActive
                        ? "border-[#082F6B] text-[#082F6B] bg-[#F3F7FC]/70 font-semibold"
                        : "border-[#E5E7EB] text-[#1F2937] hover:border-zinc-300 hover:bg-[#F3F7FC]/50"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className="w-4.5 h-4.5 text-zinc-600 group-hover:text-[#082F6B] transition-colors flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {item.extra && (
                        <span className={item.extraClass}>{item.extra}</span>
                      )}
                      <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-[#082F6B] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Profile Edit Form */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-10 shadow-2xs">
            {/* Center Profile Avatar with Upload Camera Badge */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-zinc-300 bg-zinc-50 flex items-center justify-center overflow-hidden">
                  <User className="w-16 h-16 sm:w-20 sm:h-20 text-zinc-700 stroke-[1.5]" />
                </div>
                <label
                  htmlFor="profile-avatar-upload"
                  className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#082F6B] text-white flex items-center justify-center shadow-md cursor-pointer hover:bg-[#062452] active:scale-95 transition"
                  title="Upload Photo"
                >
                  <Camera className="w-4 h-4" />
                  <input
                    id="profile-avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={() => {
                      alert("Photo upload ready! Image can be updated here.");
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleUpdateProfile} className="space-y-5 sm:space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1F2937] mb-1.5">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-[#E5E7EB] text-sm text-[#1F2937] placeholder:text-zinc-400 focus:outline-none focus:border-[#082F6B] focus:ring-1 focus:ring-[#082F6B]/20 transition bg-white"
                />
              </div>

              {/* Gender and Date of Birth */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#1F2937] mb-1.5">
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full appearance-none px-4 py-2.5 sm:py-3 rounded-lg border border-[#E5E7EB] text-sm text-[#1F2937] focus:outline-none focus:border-[#082F6B] focus:ring-1 focus:ring-[#082F6B]/20 transition bg-white pr-10 cursor-pointer"
                    >
                      <option value="">Select an option</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#1F2937] mb-1.5">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-[#E5E7EB] text-sm text-[#1F2937] focus:outline-none focus:border-[#082F6B] focus:ring-1 focus:ring-[#082F6B]/20 transition bg-white pr-10"
                    />
                    <Calendar className="w-4 h-4 text-zinc-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Email Address and Mobile No */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#1F2937] mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      readOnly
                      className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-[#E5E7EB] text-sm text-zinc-600 bg-zinc-100/80 pr-10 cursor-not-allowed select-none"
                    />
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                      <CheckCircle2 className="w-4.5 h-4.5 fill-emerald-500 text-white" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#1F2937] mb-1.5">
                    Mobile No
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={mobile}
                      readOnly
                      className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-[#E5E7EB] text-sm text-zinc-600 bg-zinc-100/80 pr-10 cursor-not-allowed select-none"
                    />
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                      <CheckCircle2 className="w-4.5 h-4.5 fill-emerald-500 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Update Profile Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full sm:w-auto min-w-[200px] py-3 px-8 rounded-lg bg-[#082F6B] hover:bg-[#062452] active:scale-[0.99] text-white font-semibold text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isUpdating ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Updating...</span>
                    </div>
                  ) : (
                    <span>Update Profile</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
