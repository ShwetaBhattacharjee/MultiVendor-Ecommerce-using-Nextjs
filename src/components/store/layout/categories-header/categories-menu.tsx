import { cn } from "@/lib/utils";
import { Category, SubCategory } from "@prisma/client";
import { ChevronDown, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslations } from "next-intl";

export default function CategoriesMenu({
  categories,
  open,
  setOpen,
}: {
  categories: (Category & { subCategories: SubCategory[] })[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [subDropdown, setSubDropdown] = useState<string | null>(null);
  const t = useTranslations();

  const toggleMenu = (state: boolean) => {
    setOpen(state);
    if (state) {
      setTimeout(() => {
        setDropdownVisible(true);
      }, 100);
    } else {
      setDropdownVisible(false);
      setSubDropdown(null); // Hide subcategories when main menu closes
    }
  };

  return (
    <div
      className="relative w-10 h-10 xl:w-[256px] z-50"
      onMouseEnter={() => toggleMenu(true)}
      onMouseLeave={() => toggleMenu(false)}
    >
      {/* Trigger and Dropdown Container */}
      <div className="relative">
        {/* Trigger */}
        <div
          className={cn(
            "w-12 xl:w-[256px] h-12 rounded-full -translate-y-1 xl:translate-y-0 xl:h-11 bg-[#535353] text-white text-[20px] relative flex items-center cursor-pointer transition-all duration-100 ease-in-out",
            {
              "w-[256px] bg-[#f5f5f5] text-black text-base rounded-t-[20px] rounded-b-none scale-100":
                open,
              "scale-75": !open,
            }
          )}
        >
          {/* Menu Icon */}
          <Menu
            className={cn("absolute top-1/2 -translate-y-1/2 xl:ml-1", {
              "left-5": open,
              "left-3": !open,
            })}
          />

          <span
            className={cn("hidden xl:inline-flex xl:ml-11", {
              "inline-flex !ml-14": open,
            })}
          >
            {t("All Categories")}
          </span>

          <ChevronDown
            className={cn("hidden xl:inline-flex scale-75 absolute right-3", {
              "inline-flex": open,
            })}
          />
        </div>

        {/* Main Dropdown */}
        <ul
          className={cn(
            "absolute top-10 left-0 w-[256px] bg-[#f5f5f5] shadow-lg transition-all duration-100 ease-in-out scrollbar overflow-y-auto z-50",
            {
              "max-h-[523px] opacity-100": dropdownVisible, // Show dropdown
              "max-h-0 opacity-0": !dropdownVisible, // Hide dropdown
            }
          )}
        >
          {categories.map((category) => (
            <li
              key={category.id}
              className="relative flex items-center justify-between m-0 p-3 pl-6 hover:bg-white cursor-pointer"
              onMouseEnter={() => setSubDropdown(category.id)}
              onMouseLeave={() => setSubDropdown(null)}
            >
              {/* Category Link */}
              <Link
                href={`/browse?category=${category.url}`}
                className="text-[#222] flex items-center"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  width={100}
                  height={100}
                  className="w-[18px] h-[18px]"
                />
                <span className="text-sm font-normal ml-2 overflow-hidden line-clamp-2 break-words text-main-primary">
                  {category.name}
                </span>
              </Link>

              {/* Dropdown Arrow for Subcategories */}
              {category.subCategories.length > 0 && (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              )}

              {/* Subcategory Dropdown */}
              {category.subCategories.length > 0 &&
                subDropdown === category.id && (
                  <ul className="absolute top-0 left-full bg-white shadow-lg rounded-lg w-48 ml-2 z-50">
                    {category.subCategories.map((subCategory) => (
                      <li
                        key={subCategory.id}
                        className="p-3 hover:bg-gray-200"
                      >
                        <Link
                          href={`/browse?category=${category.url}&subcategory=${subCategory.url}`}
                          className="text-gray-800 block"
                        >
                          {subCategory.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
