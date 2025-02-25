"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { fetchExchangeRates } from "@/lib/currencyConverter";
interface CurrencyContextType {
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
  exchangeRates: Record<string, number>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(
    {}
  );

  useEffect(() => {
    async function getRates() {
      const rates = await fetchExchangeRates("USD");
      if (rates) setExchangeRates(rates);
    }
    getRates();
  }, []);

  return (
    <CurrencyContext.Provider
      value={{ selectedCurrency, setSelectedCurrency, exchangeRates }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context)
    throw new Error("useCurrency must be used within CurrencyProvider");
  return context;
}
