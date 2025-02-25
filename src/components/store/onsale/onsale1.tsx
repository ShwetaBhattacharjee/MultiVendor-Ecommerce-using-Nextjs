import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl"; // Import the useTranslations hook
import img1 from "@/public/assets/images/onsale1.png";
import img2 from "@/public/assets/images/onsale2.png"; // Correct the image import

const OnsaleSection = () => {
  const t = useTranslations(); // Initialize the translation function

  // Static data for onsales
  const onsales = [
    {
      _id: "1",
      title: t("onsale_title_1"), // Using translated title
      description: t("onsale_description_1"), // Using translated description
      image: img1,
    },
    {
      _id: "2",
      title: t("onsale_title_2"), // Using translated title
      description: t("onsale_description_2"), // Using translated description
      image: img2,
    },
  ];

  return (
    <div className="mt-2 flex flex-col items-center gap-8 py-8 px-5 md:px-8">
      {/* Onsale Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-full mx-auto">
        {onsales.map((onsale) => (
          <div
            key={onsale._id}
            className="relative w-full h-80 rounded-lg shadow-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full shadow-lg">
              {" "}
              {/* Added shadow here */}
              <Image
                src={onsale.image}
                alt={onsale.title}
                layout="fill"
                objectFit="cover"
                className="object-center"
              />
            </div>

            {/* Overlay Content */}
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-between p-6">
              {/* Redirect Button */}
              <Link
                href="/browse?isSale=yes" // Updated link to redirect to the correct URL
                className="bg-blue-600 text-white py-0.5 px-2 rounded-full text-xs font-semibold w-fit"
              >
                {t("onsale_title_1")} {/* Display translated text */}
              </Link>

              {/* Content */}
              <div>
                <h1 className="text-xl font-bold text-white mb-2">
                  {onsale.title}
                </h1>
                <p className="text-sm text-white text-opacity-90 mb-4">
                  {onsale.description}
                </p>
                <div className="flex items-center gap-2 text-white font-medium">
                  <Link href="/browse?isSale=yes">
                    <p className="flex items-center gap-2 cursor-pointer">
                      <span>{t("shop_now")}</span>{" "}
                      {/* "Shop Now" button translation */}
                      <ArrowRight size={18} />
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnsaleSection;
