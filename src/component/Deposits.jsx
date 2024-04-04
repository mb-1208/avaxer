import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";

const Deposits = ({ contractRef }) => {
    const account = useAccount();
    const [DepositsInfo, setDepositsInfo] = useState();
    
    useEffect(() => {
        if (!account?.address || !contractRef.current) {
            return;
        }

        const fetchData = async () => {
            const depositsAmount = await contractRef.current.getUserAmountOfDeposits(account.address);
            const depositsNum = Number(depositsAmount);

            if (depositsNum === 0) {
                setDepositsInfo([]);
                return;
            }

            const newDepositsInfo = [];
            for (let i = 0; i < depositsNum; i++) {
                const depositInfo = await contractRef.current.getUserDepositInfo(account.address, i);

                const startDate = new Date(Number(depositInfo.start) * 1000);
                const finishDate = new Date(Number(depositInfo.finish) * 1000);
                const difference = finishDate - startDate;
                const differenceInDays = difference / (1000 * 3600 * 24);

                const depositAmount = ethers.utils.formatEther(depositInfo.amount);
                const profitAmount = Number(ethers.utils.formatEther(depositInfo.profit)).toFixed(2);

                let planStatus;
                if (depositInfo.plan >= 0 && depositInfo.plan <= 2) {
                    planStatus = "unlock";
                } else if (depositInfo.plan >= 3 && depositInfo.plan <= 5) {
                    planStatus = "lock";
                } else {
                    planStatus = "unknown";
                }

                let planType;
                switch (depositInfo.plan) {
                    case 0:
                        planType = "SAVINGS";
                        break;
                    case 1:
                        planType = "CLASSIC";
                        break;
                    case 2:
                        planType = "PREMIUM";
                        break;
                    case 3:
                        planType = "SILVER";
                        break;
                    case 4:
                        planType = "GOLD";
                        break;
                    case 5:
                        planType = "PLATINUM";
                        break;
                    default:
                        planType = "UNKNOWN";
                }

                newDepositsInfo.push({
                    type: planType,
                    status: planStatus,
                    days: differenceInDays.toFixed(0),
                    depositAmount,
                    profitAmount,
                    count: calculateCount(depositInfo.start)
                });
            }

            setDepositsInfo(newDepositsInfo);
        };

        const calculateCount = (startTimestamp) => {
            const startDate = new Date(startTimestamp * 1000);
            const currentDate = new Date();
            const difference = currentDate - startDate;

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            return `${days}:${hours}:${minutes}:${seconds}`;
        };

        fetchData();

        const interval = setInterval(fetchData, 1000);
        return () => clearInterval(interval);
    }, [account?.address, contractRef.current]);

    if (!account?.address) {
        return;
    }

    return (
        <main className="width mt-[60px] mb-[30px]">
            <section className="title text-left">
                <h2 className="font-semibold text-[30px] font-primary mb-6">
                    Deposits
                </h2>
            </section>
            {DepositsInfo?.length > 0 ?
                <section className="mt-[10px] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-7 gap-4">
                    {DepositsInfo?.map((element, index) => {
                        return (
                            <div
                                className=" plan-card p-4 rounded-[15px] bg-[#ea5355] shadow"
                                key={index}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="text-white uppercase font-primary text-[14px]">
                                        {element.type}
                                    </span>
                                    <h3 className={`font-primary mb-2 text-[14px] ${element.status === "lock" ? "text-[#fef851]" : "text-white"} `}>
                                        {element.status === 'unlock' ?
                                            <svg className="w-5 h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor"><path d="M352 144c0-44.2 35.8-80 80-80s80 35.8 80 80v48c0 17.7 14.3 32 32 32s32-14.3 32-32V144C576 64.5 511.5 0 432 0S288 64.5 288 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H352V144z" /></svg>
                                            :
                                            <svg className="w-4 h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" /></svg>
                                        }
                                    </h3>
                                </div>
                                <div className="plan-section text-center">
                                    <span className="text-red uppercase font-primary text-[14px] font-bold">
                                        {element.plan}
                                    </span>
                                    <h3 className="font-bold font-primary mb-2 text-[20px]">
                                        {element.title}
                                    </h3>
                                </div>
                                <div className="my-10 text-center">
                                    <div className="bg-white rounded-full w-16 h-16 content-center mx-auto">
                                        <p className="text-[#ea5355] text-[25px] font-bold leading-none">{element.days}</p>
                                        <p className="uppercase text-[#ea5355] text-xs leading-none">Days</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="flex-1 uppercase font-primary">
                                        <p className={`text-[20px] font-bold  ${element.status === 'lock' ? "text-[#fef851]" : "text-[#242444]"}`}>{element.depositAmount}</p>
                                        <p className="text-[14px] text-white">AVAX</p>
                                    </div>
                                    <h3 className={`flex-initial font-primary text-[14px] ${element.status === "lock" ? "text-[#fef851]" : "text-white"} `}>
                                        {element.status === 'unlock' ?
                                            ""
                                            :
                                            <p className="text-[20px] font-bold text-[#242444]">{element.count}</p>
                                        }
                                    </h3>
                                    <div className="flex-1 text-white uppercase font-primary text-end">
                                        <p className={`text-[20px] font-bold  ${element.status === 'lock' ? "text-[#fef851]" : "text-[#242444]"}`}>{element.profitAmount}</p>
                                        <p className="text-[14px]">AVAX</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </section>
                :
                <div className="text-start my-10">
                    <p className="text-[14px]">You don't have any deposits yet!</p>
                </div>
            }
        </main>
    );
};

export default Deposits;
