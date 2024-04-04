import React, { useState, useEffect } from "react";
import config from "../config";

const ContractStart = () => {
  const calculateTimeLeft = () => {
    const eventDate = new Date(config.eventDate);
    const currentDate = new Date();
    const difference = eventDate - currentDate;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <main className="width counter-section w-full sm:py-[30px] py-[20px] bg-red text-white rounded-[15px] text-center my-[60px] md:mx-auto">
      <p className="">CONTRACTS STARTS IN</p>
      <h2 className="font-primary md:text-[30px] text-[20px] font-semibold flex flex-wrap gap-x-4 items-center justify-center">
        <span className="" >{timeLeft.days} Days</span>
        <span className="" >{timeLeft.hours} Hours</span>
        <span className="" >{timeLeft.minutes} Minutes</span>
        <span className="" >{timeLeft.seconds} Seconds</span>
      </h2>
    </main>
  );
};

export default ContractStart;
