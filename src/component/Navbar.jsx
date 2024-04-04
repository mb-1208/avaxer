import React from "react";
import { useState, useEffect } from "react";
import { shortenAddress, toFormatEther } from "../utils/globalUtils";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import config from "../config";

const Navbar = ({ contractRef }) => {
  const account = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [scrollAnimation, setScrollAnimation] = useState(false);
  const [contractAddress] = useState(contractRef.current?.address);
  const [contractBalance, setContractBalance] = useState(null);

  /*
     FOR OPENING SIDE BAR
  */

  const openSideBar = () => {
    setOpen(!open);
    setActive(!active);
  };


  const navClickFunc = (value) => {
    setActiveLink(value);
    setOpen(false);
    setActive(false);
    window.scrollTo({
      top: 0,
    });
  };

  const navItems = [
    { name: "Contract", url: config.link.contract },
    { name: "Audit", url: config.link.audit },
    { name: "Twitter", url: config.link.twitter },
    { name: "Telegram", url: config.link.telegram },
    { name: "Medium", url: config.link.medium },
  ];

  const setContractData = async () => {
    const balance = await contractRef.current?.getContractBalance();
    setContractBalance(toFormatEther(balance, 4));
  };

  useEffect(() => {
    setContractData();
  }, []);

  return (
    <nav className="width navbar h-[80px] flex items-center justify-between">
      <div className="logo py-3">
        <a
          to="/"
          className="flex items-center gap-x-3 "
          onClick={() => navClickFunc("img")}
        >
          <img src="/image/avaxer-logo.png" className="sm:w-[60px] w-[40px] object-cover" alt="" />
          <span className="font-primary text-red sm:text-[30px] text-[20px] font-bold uppercase">
            {" "}
            AVAXER
          </span>
        </a>
      </div>
      {/* LARGE SCREEN NAV-LINKS */}
      <div className="links_section lg:block hidden">
        <ul className="list-none flex items-center gap-x-6">
          {navItems.map((element, index) => {
            return (
              <li key={index}>
                <a
                  href={element.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="uppercase text-[16px] font-primary font-semibold transition duration-500 hover:text-red focus:text-red"
                  onClick={() => navClickFunc(element.name)}
                >
                  {element.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="lg:block hidden">
        <div className="flex gap-x-3">
          <button className="px-3 py-2 rounded-lg bg-red text-white font-secondary text-[13px] transition duration-300 hover:scale-105 ">
            Contract balance : {contractBalance} AVAX
          </button>
          <button onClick={() => {
            if (account?.address) {
              openAccountModal();
              return;
            }
            openConnectModal()
          }} className="px-3 py-2 rounded-lg bg-red text-white font-secondary text-[13px] transition duration-300 hover:scale-105 ">{account?.address ? shortenAddress(account?.address) : "Connect Wallet"} </button>
        </div>
      </div>
      {/* ANIMATED HAMBURGER */}
      <div className="lg:hidden">
        <button
          type="button"
          className="hamburger flex flex-col md:gap-y-[7px] gap-y-[6px]"
          onClick={openSideBar}
        >
          <span
            className={`md:w-[30px] w-[25px] md:h-[2.4px] h-[2.2px] bg-[#43525B] rounded-full transform transition duration-500 ease-in-out ${open
              ? "rotate-45 md:translate-y-[0.5rem] translate-y-[0.6rem]"
              : ""
              }`}
          ></span>
          <span
            className={`md:w-[30px] w-[25px] md:h-[2.4px] h-[2.4px] bg-[#43525B] rounded-full transform transition duration-500 ease-in-out ${open ? " opacity-0" : ""
              }`}
          ></span>
          <span
            className={`md:w-[30px] w-[25px] md:h-[2.4px] h-[2.2px] bg-[#43525B] rounded-full transform transition duration-500 ease-in-out ${open
              ? " -rotate-45 md:translate-y-[-.6rem] translate-y-[-.45rem]"
              : ""
              }`}
          ></span>
        </button>
      </div>

      {/* SMALL SCREEN NAV-LINKS */}
      <div
        className={` lg:hidden block absolute top-0 bg-white shadow-lg  w-[90%] h-screen z-50 duration-300 bg-blue-500 px-4 pt-4 left-[50%] translate-x-[-50%] ${active
          ? "top-[5rem] max-h-[350px] h-full opacity-100 "
          : "top-[5rem] max-h-[0px] opacity-0"
          } `}
      >
        {/* LNIKS SECTION */}
        <div className="w-full flex items-start justify-center flex-col pt-[20px] ">
          <ul className="list-none flex items-center justify-center flex-col gap-4 w-full   ">
            {navItems.map((item, index) => {
              return (
                <li key={index}>
                  <a
                    href={item.url} // Use item.url for the actual URL
                    target="_blank" // Assuming you want to open the link in a new tab
                    rel="noopener noreferrer" // Security measure for opening links in new tabs
                    className="uppercase text-[16px] font-primary font-semibold transition duration-500 hover:text-red focus:text-red"
                    onClick={() => navClickFunc(item.name)} // Pass item.name if you need to handle the click with the item's name
                  >
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="w-full flex flex-col items-center justify-center gap-y-3 mt-4">
            <button className="btn-primary max-w-[300px] w-full px-3 py-2 rounded-lg bg-red text-white font-primary text-[13px] transition duration-300 hover:scale-105 ">
              Contract balance : {contractBalance} AVAX
            </button>
            <button onClick={() => {
              if (account?.address) {
                openAccountModal();
                return;
              }
              openConnectModal()
            }} className="btn-primary max-w-[300px] w-full px-3 py-2 rounded-lg bg-red text-white font-primary text-[13px] transition duration-300 hover:scale-105 ">
              {account?.address ? shortenAddress(account?.address) : "Connect Wallet"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
