import type { StoreInfo, UploadedFile } from "./types";

/** Every uploaded file in a store application, labelled for review screens. */
export function storeDocuments(store: StoreInfo): { label: string; file: UploadedFile }[] {
  return [
    { label: "NID — Front", file: store.owner.nidFront },
    { label: "NID — Back", file: store.owner.nidBack },
    ...(store.owner.photo ? [{ label: "Owner Photo", file: store.owner.photo }] : []),
    ...(store.tradeLicense ? [{ label: "Trade License", file: store.tradeLicense.file }] : []),
    ...(store.tin?.file ? [{ label: "e-TIN Certificate", file: store.tin.file }] : []),
    ...(store.payment?.proof ? [{ label: "Payment Proof", file: store.payment.proof }] : []),
    ...store.otherDocuments.map((file) => ({ label: "Other Document", file })),
  ];
}

export const formatAddress = (store: StoreInfo) =>
  [store.address.line, store.address.area, `${store.address.city}-${store.address.postalCode}`]
    .filter(Boolean)
    .join(", ");
