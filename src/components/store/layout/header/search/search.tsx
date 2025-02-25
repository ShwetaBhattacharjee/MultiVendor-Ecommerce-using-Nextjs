"use client";
import { SearchResult } from "@/lib/types";
import { Search as SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import SearchSuggestions from "./suggestions";
import { useTranslations } from "next-intl";
export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const { push, replace } = useRouter();
  const t = useTranslations();

  const search_query_url = params.get("search");

  const [searchQuery, setSearchQuery] = useState<string>(
    search_query_url || ""
  );
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (pathname !== "/browse") {
      // We are not in browse page
      push(`/browse?search=${searchQuery}`);
    } else {
      // We are in browse page
      if (!searchQuery) {
        params.delete("search");
      } else {
        params.set("search", searchQuery);
      }
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (pathname === "/browse") return;

    if (value.length >= 2) {
      try {
        const res = await fetch(`/api/search-products?search=${value}`);
        const data = await res.json();
        setSuggestions(data);
      } catch (error) {}
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="relative lg:w-full flex-1">
      <form
        onSubmit={handleSubmit}
        className="h-10 rounded-3xl bg-white relative border border-gray-300 flex"
      >
        <input
          type="text"
          placeholder={t("Search...")}
          className="bg-white text-black flex-1 border-none pl-2.5 m-2.5 outline-none"
          value={searchQuery}
          onChange={handleInputChange}
        />
        {suggestions.length > 0 && (
          <SearchSuggestions suggestions={suggestions} query={searchQuery} />
        )}
        <button
          type="submit"
          className="border-l border-gray-300 rounded-r-3xl w-[56px] h-full bg-gradient-to-r from-slate-500 to-slate-600 grid place-items-center cursor-pointer"
        >
          <SearchIcon />
        </button>
      </form>
    </div>
  );
}
