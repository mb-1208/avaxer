import { useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import { useAccount, useWriteContract } from 'wagmi';
import config from "../config";
import ABI from "../ABI.json";

const Plan = ({ contractRef, getBalance }) => {
  const account = useAccount();
  const planContent = [
    {
      planIndex: 0,
      plan: "SAVINGS",
      title: "8% Daily",
      duration: "14 days",
      roi: "112%",
      btnTitle: "Contract start"
    },
    {
      planIndex: 1,
      plan: "CLASSIC",
      title: "7.5% Daily",
      duration: "21 days",
      roi: "157%",
      btnTitle: "Contract start"
    },
    {
      planIndex: 2,
      plan: "PREMIUM",
      title: "7% Daily",
      duration: "28 days",
      roi: "196%",
      btnTitle: "Contract start"
    },
    {
      planIndex: 3,
      plan: "SILVER",
      title: "8% Daily",
      duration: "14 days",
      roi: "197%",
      btnTitle: "Contract not started"
    },
    {
      planIndex: 4,
      plan: "GOLD",
      title: "7.5% Daily",
      duration: "21 days",
      roi: "365%",
      btnTitle: "Contract not started"
    },
    {
      planIndex: 5,
      plan: "PLATINUM",
      title: "7% Daily",
      duration: "28 days",
      roi: "582%",
      btnTitle: "Contract not started"
    },
  ];
  const [amounts, setAmounts] = useState(new Array(planContent.length).fill(''));

  const invest = async (amount, address, plan) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractAddress = config.contractAddress;
      const writeContract = new ethers.Contract(contractAddress, ABI, signer);
      const overrides = {
        value: ethers.utils.parseEther(amount)
      };
      const tx = await writeContract
        .invest(
          address,
          plan,
          overrides
        );
      await tx.wait().then(async () => {
        console.log('success');
        getBalance()
      });
    } catch (error) {
      console.log(error);
      throw new Error('Something wrong with the contract!');
    }
  };

  return (
    <main className="width mt-[60px] mb-[30px]">
      <section className="title text-left">
        <h2 className="font-semibold text-[30px] font-primary mb-6">
          Choose your plan
        </h2>
      </section>
      <section className="mt-[10px] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-7 gap-4">
        {planContent.map((element, index) => {
          const handleSubmit = (e) => {
            e.preventDefault();
            if (!amounts[index]) {
              alert("Please fill in the input field first.");
              return;
            }
            invest(amounts[index], account?.address, element.planIndex);
          };

          return (
            <form
              className=" plan-card p-4 rounded-[15px] bg-white shadow"
              onSubmit={handleSubmit}
              key={index}
            >
              <div className="plan-section text-center border-b-[2px] border-b-red">
                <span className="text-red uppercase font-primary text-[14px] font-bold">
                  {element.plan}
                </span>
                <h3 className="font-bold font-primary mb-2 text-[20px]">
                  {element.title}
                </h3>
              </div>
              <div className="duration-section text-center py-2 border-b-[2px] border-b-red flex items-center justify-between">
                <p className="uppercase font-primary font-[700]">Duration</p>
                <p className="font-[700] font-primary ">
                  {element.duration}
                </p>
              </div>
              <div className="roi-section text-center py-2 border-b-[2px] border-b-red flex items-center justify-between">
                <p className="uppercase font-primary font-[700]">ROI</p>
                <p className="font-[700] font-primary ">{element.roi}</p>
              </div>
              <div className="roi-section text-center py-2 mb-2  border-b-[2px] border-b-red flex items-center justify-between">
                <input
                  onChange={(e) => {
                    const newAmounts = [...amounts];
                    newAmounts[index] = e.target.value;
                    setAmounts(newAmounts);
                  }}
                  value={amounts[index]}
                  type="text"
                  className="bg-[#f6f3ef] py-2 px-3 rounded-lg flex items-center justify-between w-full text-gray text-[14px] font-semibold font-secondary"
                  placeholder="Minimum 0.05 AVAX"
                  required
                />
              </div>
              <button
                type="submit"
                className={`cursor-pointer bg-red w-full block py-3  text-white font-primary font-semibold mt-3 rounded-lg`}
              >
                Deposit
              </button>
            </form>
          );
        })}
      </section>
    </main>
  );
};

export default Plan;
