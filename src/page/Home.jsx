import React from "react";
import Hero from "../component/Hero";
import ContractStart from "../component/ContractStart";
import Plan from "../component/Plan";
import Earning from "../component/Earning";
import Navbar from "../component/Navbar";
import { useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import ABI from "../ABI.json";
import Deposits from "../component/Deposits";
import config from "../config";

const Home = () => {
  const provider = new ethers.providers.JsonRpcProvider(config.rpc);
  const contractAddress = config.contractAddress;
  const contractRef = useRef(null);
  const [isContractLoaded, setIsContractLoaded] = useState(false);
  
  const getBalance = async () => {
    const contract = new ethers.Contract(contractAddress, ABI, provider);
    contractRef.current = contract;
    setIsContractLoaded(true);
  };

  useEffect(() => {
    try {
      getBalance();
    } catch (error) {
      console.log(error);
      throw new Error('Something wrong with the contract!');
    }
  }, []);

  return (
    <>
      {isContractLoaded && (
        <>
          <Navbar contractRef={contractRef} />
          <Hero contractRef={contractRef} />
          <ContractStart contractRef={contractRef} />
          <Plan contractRef={contractRef} getBalance={getBalance} />
          <Earning contractRef={contractRef} getBalance={getBalance} />
          <Deposits contractRef={contractRef} />
        </>
      )}
    </>
  );
};

export default Home;
