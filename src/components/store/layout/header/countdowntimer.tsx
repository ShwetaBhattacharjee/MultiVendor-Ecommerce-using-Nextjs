"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const targetDate = new Date("2025-02-28T23:59:59").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft("00:00:00:00");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(
        `${days}:${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    };

    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Link href="/browse?isSale=yes">
      <div
        className="top-strip bg-gradient-to-r from-red-600 via-red-400 to-orange-400 text-white py-2 cursor-pointer"
        role="banner"
      >
        <div className="container text-center">
          <p className="mb-0 mt-0">
            May Edition Black Friday! <strong>35% Off Spare Parts</strong> |
            Free carbon neutral shipping on orders AED 400+ | End of Time:{" "}
            <span className="font-bold">{timeLeft}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CountdownTimer;
