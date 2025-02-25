import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl"; // Import the useTranslations hook
import img1 from "@/public/assets/images/onsale3.png";
import img2 from "@/public/assets/images/onsale4.png"; // Correct the image import
import img3 from "@/public/assets/images/onsale5.png"; // Added a third image

const onsalesecond = () => {
  const t = useTranslations(); // Initialize the translation function

  // Static data for onsales
  const onsales = [
    {
      _id: "1",
      title: t("onsale_title_3"), // Using translated title
      description: t("onsale_description_3"), // Using translated description
      image: img1,
    },
    {
      _id: "2",
      title: t("onsale_title_4"), // Using translated title
      description: t("onsale_description_4"), // Using translated description
      image: img2,
    },
    {
      _id: "3",
      title: t("onsale_title_5"), // Using translated title
      description: t("onsale_description_5"), // Using translated description
      image: img3,
    },
  ];

  return (
    <div className="mt-2 flex flex-col items-center gap-8 py-8 px-5 md:px-8">
      {/* Onsale Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-full mx-auto">
        {/* Left Column - Full Height */}
        <div className="relative w-full h-80 md:h-full rounded-lg shadow-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="absolute inset-0 w-full h-full shadow-lg">
            <Image
              src={onsales[0].image}
              alt={onsales[0].title}
              layout="fill"
              objectFit="cover"
              className="object-center"
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-between p-6">
            <Link
              href="/browse?isSale=yes"
              className="bg-blue-600 text-white py-0.5 px-2 rounded-full text-xs font-semibold w-fit"
            >
              {t("onsale_title_1")}
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white mb-2">
                {onsales[0].title}
              </h1>
              <p className="text-sm text-white text-opacity-90 mb-4">
                {onsales[0].description}
              </p>
              <div className="flex items-center gap-2 text-white font-medium">
                <Link href="/browse?isSale=yes">
                  <p className="flex items-center gap-2 cursor-pointer">
                    <span>{t("shop_now")}</span>
                    <ArrowRight size={18} />
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Display 2nd and 3rd items */}
        <div className="flex flex-col gap-6">
          {onsales.slice(1).map((onsale) => (
            <div
              key={onsale._id}
              className="relative w-full h-40 rounded-lg shadow-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="absolute inset-0 w-full h-full shadow-lg">
                <Image
                  src={onsale.image}
                  alt={onsale.title}
                  layout="fill"
                  objectFit="cover"
                  className="object-center"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-between p-4">
                <Link
                  href="/browse?isSale=yes"
                  className="bg-blue-600 text-white py-0.5 px-2 rounded-full text-xs font-semibold w-fit"
                >
                  {t(`onsale_title_${onsale._id}`)}{" "}
                  {/* Dynamically rendering title */}
                </Link>
                <h1 className="text-lg font-bold text-white mb-1">
                  {onsale.title}
                </h1>
                <p className="text-xs text-white text-opacity-90">
                  {onsale.description}
                </p>
                <div className="flex items-center gap-2 text-white font-medium">
                  <Link href="/browse?isSale=yes">
                    <p className="flex items-center gap-2 cursor-pointer">
                      <span>{t("shop_now")}</span>
                      <ArrowRight size={18} />
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default onsalesecond;
