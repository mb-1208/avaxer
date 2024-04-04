import { useState, useEffect } from "react";
import { toFormatEther } from "../utils/globalUtils";
import { ethers } from "ethers";
import { useAccount } from 'wagmi';
import config from "../config";
import ABI from "../ABI.json"

const Earning = ({ contractRef, getBalance }) => {
  const account = useAccount();
  const [TotalDeposit, setTotalDeposit] = useState();
  const [Dividends, setDividends] = useState();
  const [Available, setAvailable] = useState();
  const [RefCount, setRefCount] = useState();
  const [AvailableRE, setAvailableRE] = useState();
  const [TotalRE, setTotalRE] = useState();
  const [IsWithdraw, setIsWithdraw] = useState(false);

  const handleCopy = () => {
    const linkToCopy = document.getElementById("linkToCopy").innerText;
    navigator.clipboard.writeText(linkToCopy);
    alert("Text copied");
  };

  const setContractData = async () => {
    const totalDeposit = await contractRef.current?.getUserTotalDeposits(account?.address);
    const totalDividends = await contractRef.current?.getUserDividends(account?.address);
    const referralBonus = await contractRef.current?.getUserReferralBonus(account?.address);
    const referralTotalBonus = await contractRef.current?.getUserReferralTotalBonus(account?.address);
    const downlineCount = await contractRef.current?.getUserDownlineCount(account?.address);

    setTotalDeposit(toFormatEther(totalDeposit));
    setDividends(toFormatEther(totalDividends));
    const divInEther = ethers.utils.formatEther(totalDividends);
    const refInEther = ethers.utils.formatEther(referralBonus);
    const countDivNum = Number(divInEther) + Number(refInEther);
    const formattedNumber = countDivNum.toLocaleString({ style: 'decimal', minimumFractionDigits: 1, maximumFractionDigits: 8 });
    setAvailable(formattedNumber);
    const dc1InEther = ethers.utils.formatEther(downlineCount[0]);
    const dc2InEther = ethers.utils.formatEther(downlineCount[1]);
    const dc3InEther = ethers.utils.formatEther(downlineCount[2]);
    const countDCNum = Number(dc1InEther) + Number(dc2InEther) + Number(dc3InEther);
    setRefCount(countDCNum);
    setAvailableRE(toFormatEther(referralBonus));
    setTotalRE(toFormatEther(referralTotalBonus));
    if (Number(divInEther) !== 0) {
      setIsWithdraw(true);
    }
  };

  const withdraw = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractAddress = config.contractAddress;
      const writeContract = new ethers.Contract(contractAddress, ABI, signer);
      const tx = await writeContract
        .withdraw();
      await tx.wait().then(async () => {
        console.log('success');
        getBalance();
      });
    } catch (error) {
      console.log(error);
      throw new Error('Something wrong with the contract!');
    }
  };

  useEffect(() => {
    if (!account?.address) {
      return;
    }

    setContractData();
  }, []);

  if (!account?.address) {
    return;
  }

  return (
    <>
      <main className="width mt-[60px] mb-[30px]">
        <section className="title text-left">
          <h2 className="font-semibold text-[30px] font-primary mb-6">
            Earnings
          </h2>
        </section>
        <section className="mt-[10px] md:grid grid-cols-12 lg:gap-x-8 md:gap-6">
          <div className="lg:col-span-4 col-span-5 plan-card p-4 rounded-[15px] bg-red shadow md:mb-0 mb-6">
            <div className="plan-section border-b-[2px] border-b-[#facc1552] ">
              <span className="text-white uppercase font-primary text-[14px] font-semibold">
                Total Deposit
              </span>
              <h3 className="font-semibold text-white font-primary mb-3 text-[20px]">
                {TotalDeposit} AVAX
              </h3>
            </div>
            <div className="duration-section border-b-[2px] border-b-[#facc1552] ">
              <span className="text-white uppercase font-primary text-[14px] font-semibold block mt-3">
                Dividends
              </span>
              <h3 className="font-semibold text-white font-primary mb-3 text-[20px]">
                {Dividends} AVAX
              </h3>
            </div>
            <div className="roi-section border-b-[2px] border-b-[#facc1552] ">
              <span className="text-white uppercase font-primary text-[14px] font-semibold block mt-3">
                Available (Referral + Dividends)
              </span>
              <h3 className="font-semibold text-white font-primary mb-3 text-[20px]">
                {Available} AVAX
              </h3>
            </div>
            <button
              className={`w-full block py-3 bg-white text-black font-primary font-semibold mt-3 rounded-lg`}
              onClick={() => {
                if (IsWithdraw) {
                  withdraw();
                } else {
                  console.log('insufficient balance');
                }
              }}
            >
              {IsWithdraw ? "Withdraw" : "Nothing to withdraw"}
            </button>
          </div>
          <div className="lg:col-span-8 col-span-7 p-4 pb-2 rounded-[15px] bg-white shadow h-max">
            <div className="plan-section border-b-[2px] border-b-[#facc1552] ">
              <span className="text-black  font-primary text-[14px] font-semibold">
                Referral link
              </span>
              <h3
                className="font-semibold text-black font-primary mb-3"
                id="linkToCopy"
              >
                https://{config.referralDomain}/?ref={account?.address}{" "}
                <span
                  onClick={handleCopy}
                  className="px-2 py-1 rounded-lg cursor-pointer text-white text-[14px] inline-block ms-2 bg-[#0ea5e9]"
                >
                  Copy
                </span>
              </h3>
            </div>
            <div className="duration-section border-b-[2px] border-b-[#facc1552] ">
              <span className="text-black  font-primary text-[14px] font-semibold block mt-3">
                Referral Count
              </span>
              <h3 className="font-semibold text-red font-primary mb-3 text-[20px]">
                {RefCount} AVAX
              </h3>
            </div>
            <div className="roi-section border-b-[2px] border-b-[#facc1552] ">
              <span className="text-black  font-primary text-[14px] font-semibold block mt-3">
                Available referral earnings
              </span>
              <h3 className="font-semibold text-red font-primary mb-3 text-[20px]">
                {AvailableRE} AVAX
              </h3>
            </div>
            <div className="roi-section ">
              <span className="text-black  font-primary text-[14px] font-semibold block mt-3">
                Total referral earnings
              </span>
              <h3 className="font-semibold text-red font-primary mb-3 text-[20px]">
                {TotalRE} AVAX
              </h3>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Earning;
