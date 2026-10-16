import React from "react";

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

export default function SelectField({ id, label, value, onChange, options }: SelectFieldProps) {
  return (
    <div className="w-full space-y-1.5">
      <label htmlFor={id} className="block text-xs font-semibold text-[#1F2937]">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm text-[#1F2937] transition focus:border-[#082F6B] focus:outline-none focus:ring-2 focus:ring-[#082F6B]/20 cursor-pointer"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
