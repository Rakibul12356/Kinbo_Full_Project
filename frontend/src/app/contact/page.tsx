"use client";

import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <PageLayout>

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#082F6B]/10 text-[#082F6B] text-xs font-bold uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Customer Care</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937]">
              Get in Touch with Kinbo
            </h1>
            <p className="text-sm text-zinc-500 max-w-lg mx-auto">
              Have questions regarding products, shipping, or returns? Our dedicated team is available 24/7 to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Details */}
            <div className="space-y-4">
              <div className="p-5 bg-white rounded-2xl border border-[#E5E7EB] shadow-2xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#082F6B]/10 flex items-center justify-center text-[#082F6B]">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-[#1F2937]">Email Us</h3>
                <p className="text-xs text-zinc-500">support@kinboshop.com</p>
                <p className="text-xs text-zinc-400">Response within 2 hours</p>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-[#E5E7EB] shadow-2xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00]">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-[#1F2937]">Call Us</h3>
                <p className="text-xs text-zinc-500">+880 1700-000000</p>
                <p className="text-xs text-zinc-400">Mon - Sat, 9am - 9pm</p>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-[#E5E7EB] shadow-2xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-[#1F2937]">Headquarters</h3>
                <p className="text-xs text-zinc-500">Gulshan-2, Dhaka 1212</p>
                <p className="text-xs text-zinc-400">Bangladesh</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2 bg-white rounded-3xl border border-[#E5E7EB] p-6 sm:p-8 shadow-xs">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1F2937]">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                    Thank you for reaching out. One of our support specialists will review your message and get back to you shortly.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSubmitted(false)}
                    className="text-xs mt-2"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold text-[#1F2937] mb-2">
                    Send Us a Message
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Your Name" placeholder="e.g. John Doe" required />
                    <Input label="Email Address" type="email" placeholder="john@example.com" required />
                  </div>

                  <Input label="Subject" placeholder="Inquiry about order, warranty, etc." required />

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#1F2937]">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Write your message here..."
                      className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm text-[#1F2937] placeholder:text-zinc-400 focus:border-[#082F6B] focus:outline-none focus:ring-2 focus:ring-[#082F6B]/20"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isSubmitting}
                    className="w-full sm:w-auto px-8"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    <span>Send Message</span>
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
