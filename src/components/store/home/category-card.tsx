import { FeaturedCategoryType } from "@/lib/types";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function CategoryCard({
  category,
}: {
  category: FeaturedCategoryType;
}) {
  const t = useTranslations();
  return (
    <div className="group border border-gray-300 rounded-lg shadow-md p-4 h-full bg-white">
      {/* Set background to white here */}
      <Link href={`/browse?category=${category.url}`}>
        <div className="flex gap-6 h-full">
          {/* Left Side: Image with border and slight rounding */}
          <div className="flex-shrink-0 w-1/3 p-2 flex justify-center items-center border border-gray-300 rounded-lg overflow-hidden h-full bg-white">
            {/* Add bg-white */}
            <Image
              src={category.image}
              alt={category.name}
              width={180}
              height={180}
              className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
          </div>

          {/* Right Side: Title and "View More" link */}
          <div className="flex flex-col justify-between w-2/3 h-full bg-white">
            {" "}
            {/* Add bg-white */}
            {/* Title */}
            <h2 className="text-xl font-semibold text-[#05568C] mb-2">
              {category.name}
            </h2>
            {/* "View More" link */}
            <div className="flex items-center gap-1 text-sm font-medium text-[#05568C]">
              <Link href={`/browse?category=${category.url}`}>
                <p className="flex items-center cursor-pointer">
                  All {category.name} <ArrowRight size={18} />
                </p>
              </Link>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
