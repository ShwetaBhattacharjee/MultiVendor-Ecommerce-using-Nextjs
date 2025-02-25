import { useState } from "react";

export default function SaleFilter({
  selectedSale,
  onSaleChange,
}: {
  selectedSale: boolean;
  onSaleChange: (value: boolean) => void;
}) {
  return (
    <div className="border-t py-2">
      <h3 className="text-sm font-semibold text-gray-700">On Sale</h3>
      <div className="flex items-center gap-x-2">
        <input
          type="checkbox"
          id="onSale"
          checked={selectedSale}
          onChange={(e) => onSaleChange(e.target.checked)}
          className="h-4 w-4"
        />
        <label htmlFor="onSale" className="text-sm">
          Show products on sale
        </label>
      </div>
    </div>
  );
}
