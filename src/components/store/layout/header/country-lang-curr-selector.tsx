"use client";

// React, Next.js
import { useState, useEffect } from "react";
import { useCurrency } from "../../home/CurrencyContext";
// Icons
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { ChevronDown } from "lucide-react";

// Types
import { Country, SelectMenuOption } from "@/lib/types";

// Country selector
import CountrySelector from "@/components/shared/country-selector";

// countries data
import countries from "@/data/countries.json";
import { useRouter } from "next/navigation";

export default function CountryLanguageCurrencySelector({
  userCountry,
}: {
  userCountry: Country;
}) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    const currentLang = window.location.pathname.split("/")[1] || "en";
    setSelectedLanguage(currentLang);
  }, []);

  const handleCountryClick = async (country: string) => {
    const countryData = countries.find((c) => c.name === country);
    if (countryData) {
      const data: Country = {
        name: countryData.name,
        code: countryData.code,
        city: "",
        region: "",
      };
      try {
        const response = await fetch("/api/setUserCountryInCookies", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ userCountry: data }),
        });
        if (response.ok) {
          router.refresh();
        }
      } catch (error) {}
    }
  };

  const handleLanguageChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const language = event.target.value;
    setSelectedLanguage(language);
    const currentPath = window.location.pathname;
    const newPath = `/${language}${currentPath.slice(3)}`;
    router.push(newPath);
  };

  const { selectedCurrency, setSelectedCurrency } = useCurrency();

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
    document.cookie = `selectedCurrency=${currency}; path=/; max-age=31536000`;
    router.refresh();
  };

  return (
    <div className="relative inline-block group">
      <div>
        <div className="flex items-center h-11 py-0 px-2 cursor-pointer">
          <span className="mr-0.5 h-[33px] grid place-items-center">
            <span className={`fi fi-${userCountry.code.toLowerCase()}`} />
          </span>
          <div className="ml-1">
            <span className="block text-xs text-black leading-3 mt-2">
              {userCountry.name}/{selectedLanguage.toUpperCase()}/
            </span>
            <b className="text-xs font-bold text-black">
              USD
              <span className="text-white scale-[60%] align-middle inline-block">
                <ChevronDown />
              </span>
            </b>
          </div>
        </div>
      </div>
      <div className="absolute hidden top-0 group-hover:block cursor-pointer">
        <div className="relative mt-12 -ml-32 w-[300px] bg-white rounded-[24px] text-main-primary pt-2 px-6 pb-6 z-50 shadow-lg">
          <div className="w-0 h-0 absolute -top-1.5 right-24 border-l-[10px] border-l-transparent border-b-[10px] border-white border-r-[10px] border-r-transparent" />
          <div className="mt-4 leading-6 text-[20px] font-bold">Ship to</div>
          <div className="mt-2">
            <CountrySelector
              id={"countries"}
              open={show}
              onToggle={() => setShow(!show)}
              onChange={handleCountryClick}
              selectedValue={
                (countries.find(
                  (option) => option.name === userCountry?.name
                ) as SelectMenuOption) || countries[0]
              }
            />
            <div>
              <div className="mt-4 leading-6 text-[20px] font-bold">
                Language
              </div>
              <div className="relative mt-2.5 h-12 py-2 px-3 border-[1px] border-black/20 rounded-lg bg-white shadow-sm focus-within:ring-2 focus-within:ring-main-primary flex items-center cursor-pointer overflow-hidden">
                <select
                  id="languageSelect"
                  onChange={handleLanguageChange}
                  className="w-full h-full border-none bg-transparent text-main-primary focus:outline-none pr-10"
                  value={selectedLanguage}
                >
                  <option value="en">English</option>
                  <option value="ar">Arabic</option>
                </select>
                <span className="text-white scale-[60%] align-middle inline-block">
                  <ChevronDown />
                </span>
              </div>
            </div>
            <div>
              <div className="mt-4 leading-6 text-[20px] font-bold">
                Currency
              </div>
              <div className="relative mt-2 h-10 py-0 px-3 border-[1px] border-black/20 rounded-lg flex items-center cursor-pointer overflow-hidden">
                <select
                  id="currencySelect"
                  onChange={(e) => handleCurrencyChange(e.target.value)}
                  className="w-full h-full border-none bg-transparent text-main-primary focus:outline-none pr-10"
                  value={selectedCurrency}
                >
                  <option value="USD">USD (US Dollar)</option>
                  <option value="EUR">EUR (Euro)</option>
                  <option value="AED">AED (UAE Dirham)</option>
                  <option value="SAR">SAR (Saudi Riyal)</option>
                  <option value="KWD">KWD (Kuwaiti Dinar)</option>
                  <option value="QAR">QAR (Qatari Riyal)</option>
                  <option value="BHD">BHD (Bahraini Dinar)</option>
                  <option value="OMR">OMR (Omani Rial)</option>{" "}
                </select>
                <span className="text-white scale-[60%] align-middle inline-block">
                  <ChevronDown />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
