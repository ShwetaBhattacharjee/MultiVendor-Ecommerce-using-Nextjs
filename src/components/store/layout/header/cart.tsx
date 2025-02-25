"use client";
import Link from "next/link";
import { CartIcon } from "@/components/store/icons";
import { useCartStore } from "@/cart-store/useCartStore";
import { useTranslations } from "next-intl";

export default function Cart() {
  // Get total items in the cart
  const totalItems = useCartStore((state) => state.totalItems);
  const t = useTranslations();
  return (
    <div className="relative flex h-11 items-center px-2 cursor-pointer">
      <Link href="/cart" className="flex items-center text-black">
        <span className="text-[32px] inline-block">
          <CartIcon />
        </span>
        <div className="ml-1">
          <div className="min-h-3 min-w-6 -mt-1.5">
            <span className="inline-block text-xs text-main-primary leading-4  bg-slate-600  rounded-lg text-center font-bold min-h-3 px-1 min-w-6">
              {totalItems}
            </span>
          </div>
          <b className="text-xs font-bold text-wrap leading-4">{t("Cart")}</b>
        </div>
      </Link>
    </div>
  );
}
