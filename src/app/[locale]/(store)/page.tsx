import AnimatedDeals from "@/components/store/home/animated-deals";
import HomeMainSwiper from "@/components/store/home/main/home-swiper";
import HomeUserCard from "../../../components/store/home/main/user/sellerdropdown";
import Sideline from "@/components/store/home/sideline/sideline";
import CategoriesHeader from "@/components/store/layout/categories-header/categories-header";
import Footer from "@/components/store/layout/footer/footer";
import Header from "@/components/store/layout/header/header";
import SuperDealsImg from "@/public/assets/images/ads/super-deals.avif";
import MainSwiper from "@/components/store/shared/swiper";
import { SimpleProduct } from "@/lib/types";
import { getHomeDataDynamic, getHomeFeaturedCategories } from "@/queries/home";
import { getProducts } from "@/queries/product";
import Image from "next/image";
import FeaturedCategories from "@/components/store/home/featured-categories";
import ProductCard from "@/components/store/cards/product/product-card";
import Featured from "@/components/store/home/main/featured";
import OnsaleSection from "@/components/store/onsale/onsale1";
import OnsaleSecond from "@/components/store/onsale/onsalesecond";
import SearchBoxCategory from "@/components/store/layout/header/search-category";

export default async function HomePage() {
  const productsData = await getProducts({}, "", 1, 100);
  const { products } = productsData;

  const { products_superdeals, products_best_deals, products_user_card } =
    await getHomeDataDynamic([
      { property: "offer", value: "best-deals", type: "simple" },
      { property: "offer", value: "superdeals", type: "full" },
      { property: "offer", value: "user-card", type: "simple" },
    ]);

  return (
    <>
      <Header />
      <CategoriesHeader />
      <div className="relative w-full">
        <div className="max-w-full  min-h-screen ">
          {/* Main Content */}
          <div className="w-full grid gap-2 min-[1170px]:grid-cols-[1fr_350px]">
            {/* Middle (Expanded HomeMainSwiper) */}
            <div className="space-y-2 h-fit col-span-2">
              <HomeMainSwiper />
            </div>
          </div>
          <SearchBoxCategory />
          <OnsaleSection />
          {/* Animated deals */}

          <div className="mt-10 space-y-10">
            <div className="bg-white rounded-md">
              <MainSwiper products={products_superdeals} type="curved">
                <div className="mb-4 pl-4 pr-4 flex items-center justify-between"> {/* Added padding-right (pr-4) */}
                  <Image
                    src={SuperDealsImg}
                    alt="Super deals"
                    width={300}
                    height={100}
                  />
                </div>
              </MainSwiper>
            </div>
            <FeaturedCategories />
            <OnsaleSecond />

            <div>
              {/* Header */}
              <div className="text-center h-[32px] leading-[32px] text-[24px] font-extrabold text-[#222] flex justify-center">
                <div className="h-[1px] flex-1 border-t-[2px] border-t-[hsla(0,0%,59.2%,.3)] my-4 mx-[14px]" />
                <span>More to love</span>
                <div className="h-[1px] flex-1 border-t-[2px] border-t-[hsla(0,0%,59.2%,.3)] my-4 mx-[14px]" />
              </div>
              <div className="mt-7 bg-white justify-center flex flex-wrap min-[1530px]:grid min-[1530px]:grid-cols-7 p-4 pb-16 rounded-md">
                {products.map((product, i) => (
                  <ProductCard key={i} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <HomeUserCard />
      <Footer />
    </>
  );
}
