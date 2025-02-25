"use client";
import { useEffect, useState } from "react";
import { getSubcategories } from "@/queries/subCategory";
import { Headset, ChevronUp } from "lucide-react";
import SocialLogo from "social-logos";
import Image from "next/image";
import Link from "next/link";
import Links from "./links";
import { useTranslations } from "next-intl";

export default function Footer() {
  const [subs, setSubs] = useState([]);
  const t = useTranslations();

  useEffect(() => {
    async function fetchData() {
      const data = await getSubcategories(7, true);
      setSubs(data);
    }
    fetchData();
  }, []);

  return (
    <div className="w-full bg-white">
      {/* Back to Top Button */}
      <div className="w-full bg-black text-white flex justify-center py-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center justify-center p-2 text-white"
        >
          <ChevronUp className="mr-2 h-5 w-5" />
          {t("Back to Top")}
        </button>
      </div>

      {/* Footer */}
      <div className="bg-[#05568C] text-white py-8">
        <div className="container grid grid-cols-5 gap-8 border-b border-[#05568C] items-start gap-y-8">
          {/* 1st Column */}
          <div className="flex flex-col space-y-4">
            <Image
              src="/assets/icons/logofooter.png"
              alt={t("HD PARTZ Logo - Premium Car Parts and Accessories")}
              width={200}
              height={200}
              loading="lazy"
            />
            <h2 className="text-lg font-bold">{t("WORLD OF AUTOMOTIVE")}</h2>
            <p className="text-sm">{t("company_description")}</p>
          </div>

          {/* 2nd Column */}
          <div className="flex flex-col space-y-4">
            <Headset className="scale-[190%] stroke-slate-400 mb-1" />
            <h2 className="text-lg font-bold">{t("Need Help?")}</h2>
            <p className="text-sm">+971 502 487 319</p>
            <p className="text-sm">
              {t("Monday - Friday: 9:00-20:00")} <br />
              {t("Saturday: 11:00-15:00")}
            </p>
            <div className="flex gap-3 mt-4">
              {[
                "facebook",
                "whatsapp",
                "pinterest",
                "linkedin",
                "instagram",
                "youtube",
                "telegram",
              ].map((icon) => (
                <SocialLogo
                  key={icon}
                  icon={icon}
                  size={28}
                  fill="#7C7C7C"
                  className="cursor-pointer hover:fill-slate-600"
                />
              ))}
            </div>
          </div>

          {/* 3rd Column */}
          <div className="flex flex-col space-y-4">
            <Links subs={subs} />
          </div>

          {/* 4th Column */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-lg font-bold">{t("Information")}</h2>
            <ul className="flex flex-col gap-y-1">
              {footer_links.slice(0, 6).map((link) => (
                <Link href={link.link} key={link.link}>
                  <li>
                    <span>{t(link.title)}</span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          {/* 5th Column */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-lg font-bold">{t("Customer Care")}</h2>
            <ul className="flex flex-col gap-y-1">
              {footer_links.slice(6).map((link) => (
                <Link href={link.link} key={link.link}>
                  <li>
                    <span>{t(link.title)}</span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="p-4">
          <div className="flex justify-center gap-3 text-sm mb-4">
            <Link href="/page/conditions-of-use">{t("Conditions of Use")}</Link>
            <Link href="/page/privacy-policy">{t("Privacy Notice")}</Link>
            <Link href="/page/help">{t("Help")}</Link>
          </div>
          <div className="flex justify-center text-sm mb-4">
            <p>{t("© HD PARTZ - All Rights Reserved")}</p>
          </div>
          <div className="flex justify-center text-sm text-gray-400">
            {t("Your Company Address | Your Company Phone")}
          </div>
        </div>
      </div>
    </div>
  );
}

const footer_links = [
  { title: "About", link: "/about" },
  { title: "Contact", link: "/contact" },
  { title: "Wishlist", link: "/profile/wishlist" },
  { title: "Compare", link: "/compare" },
  { title: "FAQ", link: "/faq" },
  { title: "Store Directory", link: "/profile" },
  { title: "My Account", link: "/profile" },
  { title: "Track your Order", link: "/track-order" },
  { title: "Customer Service", link: "/customer-service" },
  { title: "Returns/Exchange", link: "/returns-exchange" },
  { title: "FAQs", link: "/faqs" },
  { title: "Product Support", link: "/product-support" },
];
