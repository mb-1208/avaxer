import React from "react";
import config from "../config";

const Hero = () => {
  return (
    <main className="hero-section width lg:flex items-center justify-center lg:mt-1 mt-10 md:h-[80vh] ">
      {/* CONTENT SECTION */}
      <div className="content_section lg:max-w-[450px] lg:flex  justify-center flex-col">
        <h1 className="font-primary font-semibold lg:text-[40px] text-[30px] lg:leading-tight leading-8 lg:mb-6 mb-4 ">
          Stable & Profitable Yield Farming dApp
        </h1>
        <div className="lg:w-full max-w-[580px] h-[1.5px] bg-red" />
        <h1 className="font-primary font-semibold lg:text-[40px] text-[30px] lg:leading-tight leading-8 lg:mt-6 mt-4">
          Up to 20% Daily on AVAX Staking
        </h1>
        <div className="flex sm:items-start items-center sm:justify-start justify-center flex-wrap gap-3 mt-4">
          <a href={config.link.contract} target="_blank" className="text-[13px] px-4 py-2 rounded-lg bg-[#37a35f] text-white capitalize font-medium">Contract</a>
          <a href={config.link.audit} target="_blank" className="text-[13px] px-4 py-2 rounded-lg bg-[#37a35f] text-white capitalize font-medium">Audit</a>
          <a href={config.link.twitter} target="_blank" className="text-[13px] px-4 py-2 rounded-lg bg-red text-white capitalize font-medium">Twitter</a>
          <a href={config.link.telegram} target="_blank" className="text-[13px] px-4 py-2 rounded-lg bg-red text-white capitalize font-medium">Telegram</a>
          <a href={config.link.medium} target="_blank" className="text-[13px] px-4 py-2 rounded-lg bg-red text-white capitalize font-medium">Medium</a>
        </div>
      </div>
      {/* IMAGE SECTION */}
      <div className="img_section w-full flex items-center lg:justify-end justify-center relative lg:mt-0 mt-6">
        <img
          src="/image/hero-img.png"
          className="lg:max-w-[650px] max-w-[400px] lg:h-[450px] h-[300px] object-cover"
          alt=""
        />
        {/* <div className="img-shadow absolute bottom-[-1rem] left-[75%] translate-x-[-75%] rounded-full bg-black w-[200px] h-[10px]" /> */}
      </div>
    </main>
  );
};

export default Hero;
