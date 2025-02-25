import { SubCategory } from "@prisma/client";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Links({ subs }: { subs: SubCategory[] }) {
  const t = useTranslations();
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-bold">{t("Find it Fast")}</h1>
      <ul className="flex flex-col gap-y-1">
        {subs.map((sub) => (
          <Link key={sub.id} href={`/browse?subCategory=${sub.url}`}>
            <li>
              <span>{sub.name}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
