"use client";

import { CatgegoryWithSubsType } from "@/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function SubCategoryFilter({
  categories,
}: {
  categories: CatgegoryWithSubsType[];
}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const categoryQuery = searchParams.get("category");
  const subCategoryQuery = searchParams.get("subCategory");

  const [selectedCategory, setSelectedCategory] =
    useState<CatgegoryWithSubsType | null>(null);

  // Update selected category when URL changes
  useEffect(() => {
    const foundCategory = categories.find((cat) => cat.url === categoryQuery);
    setSelectedCategory(foundCategory || null);
  }, [categoryQuery, categories]);

  const handleSubCategoryChange = (sub: string) => {
    if (selectedCategory?.url !== categoryQuery) {
      params.set("category", selectedCategory?.url || "");
    }
    if (sub === subCategoryQuery) {
      params.delete("subCategory");
    } else {
      params.set("subCategory", sub);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="p-4">
      {selectedCategory && (
        <>
          <div className="grid grid-cols-3 gap-4">
            {selectedCategory.subCategories.map((sub) => (
              <div
                key={sub.id}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => handleSubCategoryChange(sub.url)}
              >
                <div
                  className={`w-[250px] h-[250px] rounded-full overflow-hidden border-4 shadow-md transition-transform duration-200 hover:scale-105 
                  ${
                    sub.url === subCategoryQuery
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  <Image
                    src={sub.image || "/default-image.jpg"} // Replace with actual image source
                    alt={sub.name}
                    width={250}
                    height={250}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-sm font-medium text-center mt-2">
                  {sub.name}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
