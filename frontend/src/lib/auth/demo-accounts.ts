import type { AdminAccount, UploadedFile, VendorAccount } from "./types";

export const DEMO_PASSWORD = "Vendor@123";

export const DEMO_ADMIN: AdminAccount = {
  id: "admin-1",
  fullName: "Kinbo Admin",
  email: "admin@kinbo.com",
  password: "Admin@123",
};

const demoFile = (name: string, size: number, type = "image/jpeg"): UploadedFile => ({
  name,
  size,
  type,
});

export const DEMO_VENDORS: VendorAccount[] = [
  {
    id: "vendor-verified",
    fullName: "Rahim Uddin",
    email: "verified@kinbo.com",
    phone: "01711000001",
    password: DEMO_PASSWORD,
    emailVerified: true,
    status: "approved",
    store: {
      storeName: "Rahim Electronics",
      description: "Genuine gadgets, accessories and smart home devices with official warranty.",
      businessType: "sole-proprietorship",
      categories: ["electronics-gadgets", "home-appliances-furniture"],
      contact: {
        emails: ["verified@kinbo.com", "support@rahimelectronics.com"],
        phones: ["01711000001", "01911000001"],
      },
      address: { line: "House 12, Road 5", area: "Dhanmondi", city: "Dhaka", postalCode: "1205" },
      owner: {
        nidNumber: "1990123456789",
        nidFront: demoFile("nid-front.jpg", 180_000),
        nidBack: demoFile("nid-back.jpg", 175_000),
      },
      tradeLicense: {
        number: "TRAD/DNCC/012345/2026",
        file: demoFile("trade-license.pdf", 245_000, "application/pdf"),
      },
      tin: { number: "123456789012" },
      otherDocuments: [],
      payment: {
        method: "bank",
        accountName: "Rahim Uddin",
        accountNumber: "1234567890123",
        bankName: "Dutch-Bangla Bank",
        branch: "Dhanmondi",
        routingNumber: "090261725",
      },
    },
    submittedAt: "2026-09-20T10:00:00.000Z",
    reviewedAt: "2026-09-22T12:30:00.000Z",
    createdAt: "2026-09-19T09:00:00.000Z",
  },
  {
    id: "vendor-pending",
    fullName: "Karim Hossain",
    email: "pending@kinbo.com",
    phone: "01811000002",
    password: DEMO_PASSWORD,
    emailVerified: true,
    status: "pending",
    store: {
      storeName: "Karim Fashion House",
      description: "Trendy men's and women's clothing at affordable prices.",
      businessType: "individual",
      categories: ["fashion-clothing"],
      contact: { emails: ["pending@kinbo.com"], phones: ["01811000002"] },
      address: { line: "Shop 45, Level 3", area: "Bashundhara City", city: "Dhaka", postalCode: "1215" },
      owner: {
        nidNumber: "1992987654321",
        nidFront: demoFile("nid-front.jpg", 165_000),
        nidBack: demoFile("nid-back.jpg", 158_000),
      },
      otherDocuments: [],
      payment: {
        method: "bkash",
        accountName: "Karim Hossain",
        accountNumber: "01811000002",
      },
    },
    submittedAt: "2026-10-14T15:20:00.000Z",
    createdAt: "2026-10-14T14:00:00.000Z",
  },
];
