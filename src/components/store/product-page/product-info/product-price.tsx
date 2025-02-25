"use client";

import { useCurrency } from "../../home/CurrencyContext";
import { convertCurrency } from "@/lib/currencyConverter";
import { CartProductType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { FC, useEffect, useState } from "react";

interface SimplifiedSize {
  id: string;
  size: string;
  quantity: number;
  price: number;
  discount: number;
}

interface Props {
  sizeId?: string | undefined;
  sizes: SimplifiedSize[];
  isCard?: boolean;
  handleChange: (property: keyof CartProductType, value: any) => void;
  weight?: number;
}

const ProductPrice: FC<Props> = ({
  sizeId,
  sizes,
  isCard,
  handleChange,
  weight,
}) => {
  const { selectedCurrency, exchangeRates } = useCurrency();
  const [selectedSize, setSelectedSize] = useState<SimplifiedSize | undefined>(
    undefined
  );

  useEffect(() => {
    if (sizes && sizes.length > 0 && sizeId) {
      const foundSize = sizes.find((size) => size.id === sizeId);
      if (foundSize) {
        setSelectedSize(foundSize);
        const discountedPrice =
          foundSize.price * (1 - foundSize.discount / 100);
        handleChange("price", discountedPrice);
        handleChange("stock", foundSize.quantity);
      }
    }
  }, [sizeId, sizes, handleChange]);

  const baseCurrency = "USD";
  const conversionRate = exchangeRates[selectedCurrency] || 1;
  const baseRate = exchangeRates[baseCurrency] || 1;

  // Convert price function
  const convertPrice = (price: number) =>
    convertCurrency(price, baseRate, conversionRate);

  // If no size is selected, display price range
  if (!sizeId && sizes.length > 0) {
    const discountedPrices = sizes.map(
      (size) => size.price * (1 - size.discount / 100)
    );
    const totalQuantity = sizes.reduce(
      (total, size) => total + size.quantity,
      0
    );

    const minPrice = Math.min(...discountedPrices);
    const maxPrice = Math.max(...discountedPrices);

    return (
      <div>
        <div className="text-orange-primary inline-block font-bold leading-none mr-2.5">
          <span
            className={cn("inline-block text-4xl text-nowrap", {
              "text-lg": isCard,
            })}
          >
            {selectedCurrency} {convertPrice(minPrice).toFixed(2)}
            {minPrice !== maxPrice &&
              ` - ${selectedCurrency} ${convertPrice(maxPrice).toFixed(2)}`}
          </span>
        </div>
        {!sizeId && !isCard && (
          <div className="text-orange-background text-xs leading-4 mt-1">
            <span>Note: Select a size to see the exact price</span>
          </div>
        )}
        {!sizeId && !isCard && (
          <p className="mt-2 text-xs">{totalQuantity} pieces</p>
        )}
      </div>
    );
  }

  // If size is selected, display specific price
  if (selectedSize) {
    const discountedPrice =
      selectedSize.price * (1 - selectedSize.discount / 100);
    return (
      <div>
        <div className="text-orange-primary inline-block font-bold leading-none mr-2.5">
          <span className="inline-block text-4xl">
            {selectedCurrency} {convertPrice(discountedPrice).toFixed(2)}
          </span>
        </div>
        {selectedSize.price !== discountedPrice && (
          <span className="text-[#999] inline-block text-xl font-normal leading-6 mr-2 line-through">
            {selectedCurrency} {convertPrice(selectedSize.price).toFixed(2)}
          </span>
        )}
        {selectedSize.discount > 0 && (
          <span className="inline-block text-orange-secondary text-xl leading-6">
            {selectedSize.discount}% off
          </span>
        )}
        <p className="mt-2 text-xs">
          {weight && <span>{weight}kg - </span>}
          {selectedSize.quantity > 0 ? (
            `${selectedSize.quantity} items`
          ) : (
            <span className="text-red-500">Out of stock</span>
          )}
        </p>
      </div>
    );
  }

  return null; // Return nothing if no valid sizeId
};

export default ProductPrice;
