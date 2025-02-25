import { cn } from "@/lib/utils";
import { Category, SubCategory } from "@prisma/client";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

// Custom hook for responsive category count
function useBreakpoints() {
  const mobile = useMediaQuery({ query: "(max-width: 640px)" });
  const sm = useMediaQuery({ query: "(min-width: 640px)" });
  const md = useMediaQuery({ query: "(min-width: 768px)" });
  const lg = useMediaQuery({ query: "(min-width: 1024px)" });
  const xl = useMediaQuery({ query: "(min-width: 1536px)" });

  if (xl) return 7;
  if (lg) return 6;
  if (md) return 4;
  if (sm) return 3;
  if (mobile) return 2;

  return 1;
}

export default function OfferTagsLinks({
  categories,
  open,
}: {
  categories: (Category & { subCategories: SubCategory[] })[];
  open: boolean;
}) {
  const splitPoint = useBreakpoints();
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  return (
    <div className="relative w-fit overflow-visible z-[9999]">
      <div
        className={cn(
          "flex items-center flex-wrap xl:-translate-x-6 transition-all duration-100 ease-in-out",
          {
            "!translate-x-0": open,
          }
        )}
      >
        {categories.slice(0, splitPoint).map((category, i) => (
          <div key={category.id} className="relative group">
            {/* Category Link with Dropdown Icon */}
            <div
              className="flex items-center space-x-2 cursor-pointer font-bold text-center text-white px-4 leading-10 rounded-[20px] hover:bg-[#ffffff33] relative z-[100]"
              onMouseEnter={() => setDropdownOpen(category.id)}
              onMouseLeave={() => setDropdownOpen(null)}
            >
              <Link
                href={`/browse?category=${category.url}`}
                className="text-black"
              >
                {category.name}
              </Link>
              {category.subCategories.length > 0 && (
                <ChevronDown className="w-4 h-4 text-black" />
              )}
            </div>

            {/* Dropdown Menu for Subcategories */}
            {category.subCategories.length > 0 &&
              dropdownOpen === category.id && (
                <div
                  className="absolute left-0 top-full bg-white shadow-lg rounded-lg z-[9999] overflow-visible w-48 border border-gray-200"
                  onMouseEnter={() => setDropdownOpen(category.id)}
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  {category.subCategories.map((subCategory) => (
                    <Link
                      key={subCategory.id}
                      href={`/browse?category=${category.url}&subCategory=${subCategory.url}`}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      {subCategory.name}
                    </Link>
                  ))}
                </div>
              )}
          </div>
        ))}

        {/* About Page Link */}
        <li className="relative flex items-center justify-between m-0 p-3 pl-6 hover:bg-white cursor-pointer">
          <Link href="/about" className="text-[#222] flex items-center">
            <span className="text-sm font-bold ml-2 overflow-hidden line-clamp-2 break-words text-main-primary">
              About Us
            </span>
          </Link>
        </li>
      </div>
    </div>
  );
}
