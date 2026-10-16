import {
  BadgeCheck,
  BarChart3,
  Boxes,
  LayoutDashboard,
  MessageSquare,
  Package,
  Settings,
  ShoppingBag,
  Store,
  Users,
  Wallet,
} from "lucide-react";
import type { NavGroup } from "./DashboardShell";

export const VENDOR_NAV: NavGroup[] = [
  {
    items: [{ label: "Dashboard", href: "/vendor/dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Catalog",
    items: [
      { label: "Products", href: "/vendor/products", icon: Package, soon: true },
      { label: "Inventory", href: "/vendor/inventory", icon: Boxes, soon: true },
    ],
  },
  {
    title: "Sales",
    items: [
      { label: "Orders", href: "/vendor/orders", icon: ShoppingBag, soon: true },
      { label: "Earnings", href: "/vendor/earnings", icon: Wallet, soon: true },
      { label: "Reports", href: "/vendor/reports", icon: BarChart3, soon: true },
    ],
  },
  {
    title: "Store",
    items: [
      { label: "Messages", href: "/vendor/messages", icon: MessageSquare, soon: true },
      { label: "Store Settings", href: "/vendor/settings", icon: Settings, soon: true },
    ],
  },
];

export function adminNav(pendingApplications: number): NavGroup[] {
  return [
    {
      items: [{ label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard }],
    },
    {
      title: "Vendors",
      items: [
        {
          label: "Vendor Applications",
          href: "/admin/vendors",
          icon: BadgeCheck,
          badge: pendingApplications,
        },
        { label: "Stores", href: "/admin/stores", icon: Store, soon: true },
      ],
    },
    {
      title: "Marketplace",
      items: [
        { label: "Products", href: "/admin/products", icon: Package, soon: true },
        { label: "Orders", href: "/admin/orders", icon: ShoppingBag, soon: true },
        { label: "Customers", href: "/admin/customers", icon: Users, soon: true },
        { label: "Reports", href: "/admin/reports", icon: BarChart3, soon: true },
      ],
    },
    {
      title: "System",
      items: [{ label: "Settings", href: "/admin/settings", icon: Settings, soon: true }],
    },
  ];
}
