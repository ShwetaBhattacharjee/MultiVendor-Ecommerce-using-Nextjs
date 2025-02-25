import Link from "next/link";
import UserMenu from "./user-menu/user-menu";
import CountdownTimer from "./countdowntimer";
import Cart from "./cart";
import DownloadApp from "./download-app";

import Search from "./search/search";
import { cookies } from "next/headers";
import Image from "next/image"; // Import the Image component
import LogoImg from "@/public/assets/icons/logo.png";
import { Country } from "@/lib/types";
import CountryLanguageCurrencySelector from "./country-lang-curr-selector";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations();
  // Get cookies from the store
  const cookieStore = cookies();
  const userCountryCookie = cookieStore.get("userCountry");

  // Set default country if cookie is missing
  let userCountry: Country = {
    name: t("United States"),
    city: "",
    code: "US",
    region: "",
  };

  // If cookie exists, update the user country
  if (userCountryCookie) {
    userCountry = JSON.parse(userCountryCookie.value) as Country;
  }

  return (
    <div className="bg-white">
      {/* Countdown Timer placed at the top */}
      <CountdownTimer />

      <div className="h-full w-full lg:flex text-black px-4 lg:px-12">
        <div className="flex lg:w-full lg:flex-1 flex-col lg:flex-row gap-3 py-3">
          <div className="flex items-center justify-between">
            <Link href="/">
              {/* Replace the h1 with the Image component */}
              <Image
                src={LogoImg} // Path to logo
                alt="Logo"
                width={130} // Adjust width and height as needed
                height={30}
                className="object-contain" // Optional for maintaining aspect ratio
              />
            </Link>
            <div className="flex lg:hidden">
              <UserMenu />
              <Cart />
            </div>
          </div>
          <Search />
        </div>
        <div className="hidden lg:flex w-full lg:w-fit lg:mt-2 justify-end mt-1.5 pl-6">
          <CountryLanguageCurrencySelector userCountry={userCountry} />
          <UserMenu />

          <Cart />
        </div>
      </div>
    </div>
  );
}
