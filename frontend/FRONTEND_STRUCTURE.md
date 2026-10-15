# ⚡ Frontend Architecture & Directory Structure (Kinbo)

এই ডকুমেন্টটিতে Kinbo ই-কমার্স অ্যাপ্লিকেশনের পূর্ণাঙ্গ ফ্রন্টএন্ড স্ট্রাকচার, রাউটিং লেয়ার, মডুলার কম্পোনেন্টস এবং স্টেট আর্কিটেকচারের বিবরণ দেওয়া হলো।

---

## 🌳 Full Frontend Tree View

```text
frontend/
├── public/                               # স্ট্যাটিক ফাইলস
│   ├── images/
│   │   ├── logo.png                      # Kinbo লোগো
│   │   └── placeholder.png               # ইমেজ ফলব্যাক
│   └── icons/                            # কাস্টম SVG বা আইকন ফাইলস
│
├── src/
│   ├── app/                              # Next.js App Router (Routing Layer)
│   │   ├── layout.tsx                    # রুট লেআউট (HTML, ফন্ট, গ্লোবাল প্রোভাইডার)
│   │   ├── globals.css                   # Tailwind v4 গ্লোবাল সিএসএস ও ব্র্যান্ড কালারস
│   │   ├── not-found.tsx                 # গ্লোবাল 404 পেজ
│   │   ├── error.tsx                     # গ্লোবাল এরর হ্যান্ডলার
│   │   │
│   │   ├── page.tsx                      # হোমপেজ (/)
│   │   │
│   │   ├── products/                     # অল প্রোডাক্ট ক্যাটালগ ও ফিল্টার পেজ (/products)
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx               # ক্যাটালগ স্কেলিটন লোডার
│   │   │   │
│   │   │   └── [id]/                     # সিঙ্গেল প্রোডাক্ট ডিটেইলস পেজ (/products/123)
│   │   │       ├── page.tsx
│   │   │       ├── loading.tsx           # প্রোডাক্ট পেজ লোডার
│   │   │       └── not-found.tsx         # প্রোডাক্ট না পাওয়া গেলে কাস্টম 404
│   │   │
│   │   ├── cart/                         # ফুল শপিং কার্ট পেজ (/cart)
│   │   │   └── page.tsx
│   │   │
│   │   ├── checkout/                     # চেকআউট ও পেমেন্ট পেজ (/checkout)
│   │   │   ├── page.tsx
│   │   │   └── success/                  # অর্ডার সফল হওয়ার পেজ (/checkout/success)
│   │   │       └── page.tsx
│   │   │
│   │   └── contact/                      # যোগাযোগ / হেল্প সেন্টার পেজ (/contact)
│   │       └── page.tsx
│   │
│   ├── components/                       # রিইউজেবল UI লেয়ার
│   │   ├── ui/                           # বেস/অ্যাটমিক UI (Shadcn স্টাইল, নো বিজনেস লজিক)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── skeleton.tsx
│   │   │   └── modal.tsx
│   │   │
│   │   ├── layout/                       # ওয়েবসাইট ফ্রেমওয়ার্ক কম্পোনেন্টস
│   │   │   ├── Navbar.tsx                # ন্যাভবার, সার্চবার ও কার্ট ট্রিগার
│   │   │   └── Footer.tsx                # ফুটার লিংক ও কপিরাইট
│   │   │
│   │   ├── common/                       # অ্যাপ-ওয়াইড গ্লোবাল উইজেটস
│   │   │   └── SupportChatWidget.tsx     # ফ্লোটিং চ্যাট ও স্ক্রোল-টু-টপ
│   │   │
│   │   └── modules/                      # ফিচার-ভিত্তিক বিজনেস কম্পোনেন্টস
│   │       ├── home/
│   │       │   ├── HeroBanner.tsx
│   │       │   └── FeaturedSection.tsx
│   │       ├── product/
│   │       │   ├── ProductCard.tsx
│   │       │   ├── ProductGrid.tsx
│   │       │   └── ProductFilters.tsx
│   │       └── cart/
│   │           ├── CartDrawer.tsx        # সাইড স্লাইডার কার্ট
│   │           └── CartItemRow.tsx
│   │
│   ├── context/                          # ক্লায়েন্ট গ্লোবাল স্টেট
│   │   └── cart-context.tsx              # শপিং কার্ট স্টেট ও LocalStorage সিঙ্ক
│   │
│   ├── hooks/                            # কাস্টম হুকস
│   │   ├── use-products.ts               # TanStack Query (প্রোডাক্টস ফেচিং ও ক্যাশিং)
│   │   ├── use-cart.ts                   # Cart Context ব্যবহারের শর্টকাট হুক
│   │   └── use-debounce.ts               # লাইভ সার্চ অপটিমাইজেশন হুক
│   │
│   ├── lib/                              # লাইব্রেরি ইনস্ট্যান্স ও হেল্পার
│   │   ├── axios.ts                      # কাস্টম হেডার সহ Axios ক্লায়েন্ট
│   │   └── utils.ts                      # cn() ক্লাসনেম মার্জার ও কারেন্সি ফরম্যাটার
│   │
│   ├── providers/                        # সমস্ত প্রোভাইডারের সমন্বয়
│   │   ├── app-provider.tsx              # Cart + Query প্রোভাইডার একসাথে র্যাপ করা
│   │   └── query-provider.tsx            # TanStack React Query Client
│   │
│   ├── services/                         # ব্যাকএন্ড API সার্ভিস লেয়ার
│   │   └── product.service.ts            # API এন্ডপয়েন্ট কল ও ফলব্যাক ডেমো ডাটা
│   │
│   └── types/                            # TypeScript ইন্টারফেস ও টাইপস
│       └── ecommerce.ts                  # Product, CartItem, Category টাইপ ডেফিনিশন
│
├── .env.example                          # এনভায়রনমেন্ট ভেরিয়েবল স্যাম্পল
├── .env.local                            # লোকাল এনভায়রনমেন্ট ভেরিয়েবল
├── .gitignore
├── next.config.ts
├── package.json
├── tsconfig.json
└── FRONTEND_STRUCTURE.md
```

---

## 📌 প্রতিটি লেয়ার ও মডিউলের বিস্তারিত ব্যাখ্যা

### 1. `src/app/` (Next.js 16 App Router)
- **`layout.tsx`**: পুরো সাইটের মেইন রুট লেআউট। এখানে ফন্ট, এসইও মেটাডাটা, `AppProvider` (Query + Cart), এবং গ্লোবাল `SupportChatWidget` লোড করা থাকে।
- **`globals.css`**: Tailwind v4 এবং ব্র্যান্ড কালার প্যালেট (`--primary`, `--secondary`, `--hover-orange`, `--light-blue`, `--main-text`, `--border`) কনফিগারেশন।
- **`not-found.tsx` & `error.tsx`**: গ্লোবাল ৪MD পেজ এবং আনহ্যান্ডেলড এরর স্ক্রিন।
- **`page.tsx`**: মূল হোমপেজ (`/`)।
- **`products/`**:
  - `page.tsx`: সমস্ত প্রোডাক্টের সার্চ, ফিল্টারিং ও ক্যাটালগ পেজ (`/products`)।
  - `loading.tsx`: ক্যাটালগের জন্য স্কেলিটন লোডার।
  - `[id]/page.tsx`: ডায়নামিক সিঙ্গেল প্রোডাক্ট ডিটেইলস পেজ (`/products/:id`)।
  - `[id]/loading.tsx`: প্রোডাক্ট ডিটেইলস স্কেলিটন।
  - `[id]/not-found.tsx`: প্রোডাক্ট ডাটাবেসে না পাওয়া গেলে ইউজার-ফ্রেন্ডলি 404 পেজ।
- **`cart/page.tsx`**: ডেডিকেটেড ফুল-স্ক্রিন কার্ট পেজ (`/cart`)।
- **`checkout/page.tsx`**: শিপিং অ্যাড্রেস, পেমেন্ট মেথড ও অর্ডার সামারি পেজ (`/checkout`)।
- **`checkout/success/page.tsx`**: অর্ডার প্লেস করার পর কনফার্মেশন ও ট্র্যাকিং স্ক্রিন (`/checkout/success`)।
- **`contact/page.tsx`**: সাপোর্ট, কন্টাক্ট ফর্ম ও হেল্প সেন্টার পেজ (`/contact`)।

---

### 2. `src/components/` (মডুলার কম্পোনেন্ট আর্কিটেকচার)

#### ক. `components/ui/` (Atomic / Reusable UI)
কোনো বিজনেস বা শপ লজিক ছাড়াই স্বাধীনভাবে রিইউজ করা যায়:
- **`button.tsx`**: ভ্যারিয়েন্ট (Primary, Secondary, Outline, Ghost) সহ স্ট্যান্ডার্ড বাটন।
- **`input.tsx`**: টেক্সট ইনপুট, সার্চ ইনপুট ও এরর মেসেজ রেন্ডারিং।
- **`badge.tsx`**: ডিসকাউন্ট বা স্টক স্ট্যাটাস নির্দেশক ট্যাগ।
- **`skeleton.tsx`**: ডাটা লোডিং এর সময় অ্যানিমেটেড প্লেসহোল্ডার।
- **`modal.tsx`**: পপআপ ও ডায়ালগ ফ্রেমওয়ার্ক।

#### খ. `components/layout/` (ওয়েবসাইট ফ্রেমওয়ার্ক)
- **`Navbar.tsx`**: স্টিকি হেডার, Kinbo লোগো, ক্যাটাগরি মেনু, সার্চ ফিল্ড এবং কার্ট বাটন।
- **`Footer.tsx`**: ফুটনোট, কপিরাইট, সোশ্যাল মিডিয়া ও কুইক লিংকস।

#### গ. `components/common/` (গ্লোবাল উইজেটস)
- **`SupportChatWidget.tsx`**: ফ্লোটিং লাইভ সাপোর্ট (LiveChat, Messenger, WhatsApp) এবং পেজ স্ক্রোল-টু-টপ বাটন।

#### ঘ. `components/modules/` (ফিচার-ভিত্তিক কম্পোনেন্ট)
- **`home/`**:
  - `HeroBanner.tsx`: হিরো হেডলাইন, ভ্যালু প্রপোজিশন ও কল-টু-অ্যাকশন।
  - `FeaturedSection.tsx`: ট্রেন্ডিং ও বেস্ট সেলিং সেকশন।
- **`product/`**:
  - `ProductCard.tsx`: সিঙ্গেল প্রোডাক্ট প্রিভিউ কার্ড।
  - `ProductGrid.tsx`: রেসপনসিভ গ্রিড লেআউট।
  - `ProductFilters.tsx`: প্রাইস রেঞ্জ, ক্যাটাগরি ও সর্টিং ফিল্টার।
- **`cart/`**:
  - `CartDrawer.tsx`: রাইট সাইড স্লাইড-ওভার কার্ট।
  - `CartItemRow.tsx`: কার্টের প্রতিটি আইটেম রো (ছবি, কোয়ান্টিটি চেঞ্জার, ডিলিট বাটন)।

---

### 3. `src/context/` & `src/hooks/`
- **`cart-context.tsx`**: কার্ট স্টেট এবং ব্রাউজারের `localStorage` এর সাথে অটো সিঙ্ক।
- **`use-products.ts`**: TanStack Query দিয়ে অটো ক্যাশিং, ব্যাকগ্রাউন্ড রিফেচ এবং ডাটা লোডিং।
- **`use-cart.ts`**: কার্ট সহজে ব্যবহার করার হুক (`useCart()`)।
- **`use-debounce.ts`**: সার্চ ইনপুটে অতিরিক্ত API রিকোয়েস্ট থামিয়ে পারফরম্যান্স বাড়ানোর ডিবাইউন্স হুক।

---

### 4. `src/lib/` & `src/providers/`
- **`axios.ts`**: ব্যাকএন্ড API এর জন্য প্রি-কনফিগার করা Axios ক্লায়েন্ট।
- **`utils.ts`**: `cn()` ক্লাসনেম মার্জার, `formatPrice(amount)` কারেন্সি ফরম্যাটিং ইত্যাদি।
- **`app-provider.tsx`**: `QueryProvider` ও `CartProvider`-কে একক প্রোভাইডারে র‍্যাপ করে `layout.tsx`-কে পরিচ্ছন্ন রাখা।
- **`query-provider.tsx`**: TanStack React Query ক্লায়েন্ট।

---

### 5. `src/services/` & `src/types/`
- **`product.service.ts`**: API কল এবং ব্যাকএন্ড অফলাইনে থাকলেও সাইট সচল রাখার মক ডাটাবেস।
- **`ecommerce.ts`**: `Product`, `CartItem`, `Category`, `FilterState` ইত্যাদি টাইপস্ক্রিপ্ট টাইপস।

---

### 6. কালার স্কিম ও থিম রেফারেন্স (`globals.css`)
- **Primary**: `#082F6B`
- **Secondary**: `#FF6B00`
- **Hover Orange**: `#E85D00`
- **Light Blue Background**: `#F3F7FC`
- **Main Text**: `#1F2937`
- **Border**: `#E5E7EB`
