# 🛍️ Kinbo E-Commerce Project Structure

Kinbo হলো একটি আধুনিক ই-কমার্স অ্যাপ্লিকেশন যা **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **TanStack React Query**, এবং **Axios** দিয়ে আর্কিটেক্ট করা হয়েছে।

---

## 📂 Overall Directory Tree

```text
ecommerce/
├── app/                       # Global/Mobile application space (if applicable)
├── backend/                   # Backend API server directory
├── frontend/                  # Next.js 16 Frontend Web Application
│   ├── public/                # Static assets (images, logos, SVGs)
│   │   ├── Kinbo-Logo.png     # Kinbo official brand logo
│   │   ├── file.svg
│   │   ├── globe.svg
│   │   ├── next.svg
│   │   ├── vercel.svg
│   │   └── window.svg
│   │
│   ├── src/
│   │   ├── app/               # Next.js App Router (Pages, Layouts & Global Styles)
│   │   │   ├── favicon.ico    # Website favicon icon
│   │   │   ├── globals.css    # Tailwind v4 configuration & brand color palette
│   │   │   ├── layout.tsx     # Root Layout (providers, font setup, persistent UI)
│   │   │   └── page.tsx       # Homepage (Hero, Product Catalog & Search)
│   │   │
│   │   ├── components/        # Reusable UI & Page Components
│   │   │   ├── home/          # Homepage specific sections
│   │   │   │   ├── HeroBanner.tsx      # Top promotional hero section
│   │   │   │   └── ProductCatalog.tsx  # Product listing, category tabs & filters
│   │   │   │
│   │   │   ├── layout/        # Global layout components
│   │   │   │   ├── Navbar.tsx          # Sticky navigation bar with search & cart button
│   │   │   │   └── Footer.tsx          # Footer links, newsletter & social icons
│   │   │   │
│   │   │   └── ui/            # UI widgets & interactive components
│   │   │       ├── CartDrawer.tsx        # Slide-over shopping cart drawer
│   │   │       ├── ProductCard.tsx       # Individual product display card
│   │   │       └── SupportChatWidget.tsx # Floating support popup (LiveChat, Messenger, WhatsApp)
│   │   │
│   │   ├── context/           # React Context Providers for global state
│   │   │   └── cart-context.tsx       # Cart state management (add, remove, quantity, totals)
│   │   │
│   │   ├── hooks/             # Custom React Hooks
│   │   │   └── use-products.ts        # TanStack Query hook for fetching products
│   │   │
│   │   ├── lib/               # Utility libraries & HTTP clients
│   │   │   └── axios.ts               # Pre-configured Axios instance with interceptors
│   │   │
│   │   ├── providers/         # Global Application Providers
│   │   │   └── query-provider.tsx     # TanStack React Query client provider
│   │   │
│   │   ├── services/          # Data layer & API services
│   │   │   └── product.service.ts     # Product fetch API & mock fallback database
│   │   │
│   │   └── types/             # TypeScript interfaces and type definitions
│   │       └── ecommerce.ts           # Product, CartItem, and Category types
│   │
│   ├── .env.example           # Environment variables template
│   ├── .env.local             # Local environment configurations
│   ├── .gitignore             # Git ignored files & directories
│   ├── eslint.config.mjs      # ESLint configuration
│   ├── next.config.ts         # Next.js configuration
│   ├── package.json           # Dependencies and build/dev scripts
│   ├── tsconfig.json          # TypeScript compiler configuration
│   └── README.md              # Project documentation
│
└── PROJECT_STRUCTURE.md       # Directory and file structure reference (This file)
```

---

## 🔍 Detailed Folder & File Breakdown

### 1. `frontend/src/app/` (Next.js App Router)
- **`layout.tsx`**: পুরো অ্যাপ্লিকেশনের মেইন রুট লেআউট। এখানে Geist ফন্ট, `QueryProvider`, `CartProvider`, `CartDrawer`, এবং `SupportChatWidget` মাউন্ট করা হয়েছে।
- **`page.tsx`**: হোমপেজের মেইন এন্ট্রি পয়েন্ট। এখানে `Navbar`, `HeroBanner`, `ProductCatalog`, এবং `Footer` সংযুক্ত।
- **`globals.css`**: Tailwind CSS v4 এর কোর স্টাইলিং ও কাস্টম কালার ভেরিয়েবলস (Primary, Secondary, Hover Orange, Light Blue Background, Main Text, Border)।

### 2. `frontend/src/components/`
- **`home/HeroBanner.tsx`**: প্রিমিয়াম গ্রেডিয়েন্ট ব্যাকগ্রাউন্ড, হেডলাইন, অ্যাকশন বাটন এবং ভ্যালু প্রপোজিশন ব্যাজ সম্বলিত হিরো ব্যানার।
- **`home/ProductCatalog.tsx`**: ক্যাটাগরি ফিল্টার বাটন, লাইভ সার্চ রেজাল্ট এবং প্রোডাক্ট গ্রিড ডিসপ্লে।
- **`layout/Navbar.tsx`**: Kinbo লোগো, সার্চ ইনপুট ফিল্ড, ক্যাটাগরি মেনু এবং ব্যাজ সহ কার্ট ওপেনার বাটন।
- **`layout/Footer.tsx`**: ব্র্যান্ডিং, প্রয়োজনীয় কুইক লিংকস, সোশ্যাল মিডিয়া লিংক এবং কপিরাইট ইনফরমেশন।
- **`ui/ProductCard.tsx`**: প্রোডাক্টের ছবি, রেটিং স্টার, ক্যাটাগরি ব্যাজ, মূল্য, ছাড় এবং "Add to Cart" বাটন।
- **`ui/CartDrawer.tsx`**: ডানপাশ থেকে স্লাইড হয়ে আসা কার্ট ড্রয়ার। আইটেম সংখ্যা বাড়ানো/কমানো, রিমুভ করা এবং সাবটোটাল হিসাব করা।
- **`ui/SupportChatWidget.tsx`**: ফ্লোটিং বটম-রাইট সাপোর্ট চ্যাট উইজেট (LiveChat ডায়ালগ, Messenger লিংক, WhatsApp লিংক এবং Scroll-to-top বাটন)।

### 3. `frontend/src/context/`
- **`cart-context.tsx`**: পুরো অ্যাপে শপিং কার্ট স্টেট ম্যানেজ করে (আইটেম অ্যাড, রিমুভ, কোয়ান্টিটি আপডেট, মোট পণ্যের সংখ্যা ও টোটাল প্রাইজ হিসাব)।

### 4. `frontend/src/hooks/`
- **`use-products.ts`**: TanStack Query (`useQuery`) ব্যবহার করে স্বয়ংক্রিয় ক্যাশিং এবং প্রোডাক্ট ডাটা ফেচিং হুক।

### 5. `frontend/src/lib/`
- **`axios.ts`**: ব্যাকএন্ড API এর সাথে যোগাযোগের জন্য কনফিগার করা Axios ক্লায়েন্ট।

### 6. `frontend/src/providers/`
- **`query-provider.tsx`**: `@tanstack/react-query` এর `QueryClientProvider` যা ক্লায়েন্ট কম্পোনেন্টে সার্ভার স্টেট ম্যানেজ করে।

### 7. `frontend/src/services/`
- **`product.service.ts`**: প্রোডাক্ট ডাটা পাওয়ার সার্ভিস ফাংশনসমূহ (রিমোট API না থাকলে বিল্ট-ইন সমৃদ্ধ মক ডাটা দিয়ে লাইভ শপ পরিচালনা করে)।

### 8. `frontend/src/types/`
- **`ecommerce.ts`**: `Product`, `CartItem`, `Category` ইত্যাদির TypeScript টাইপ ডেফিনিশন।

---

## 🎨 Theme & Color Reference (`globals.css`)

| নাম | Color Code | Tailwind ক্লাস | কাজ / ব্যবহার |
|---|---|---|---|
| **Primary** | `#082F6B` | `bg-primary`, `text-primary`, `border-primary` | ডিপ নেভি ব্লু ব্র্যান্ড কালার |
| **Secondary** | `#FF6B00` | `bg-secondary`, `text-secondary`, `border-secondary` | ভাইব্রেন্ট অরেঞ্জ অ্যাকসেন্ট |
| **Hover Orange** | `#E85D00` | `hover:bg-hover-orange`, `text-hover-orange` | বাটন হোভার অ্যাকশন |
| **Light Blue Background** | `#F3F7FC` | `bg-light-blue` | ওয়েবসাইটের মূল প্রিমিয়াম ব্যাকগ্রাউন্ড |
| **Main Text** | `#1F2937` | `text-main-text` | হেডলাইন ও ডার্ক টেক্সট কালার |
| **Border** | `#E5E7EB` | `border-border` | কার্ড ও সেকশন ডিভাইডার বর্ডার |

---

## 🚀 Tech Stack Summary
- **Framework**: Next.js 16 (Turbopack)
- **Library**: React 19
- **Styling**: Tailwind CSS v4
- **Data Fetching / Caching**: TanStack React Query v5
- **HTTP Client**: Axios
- **Icons**: Lucide React
