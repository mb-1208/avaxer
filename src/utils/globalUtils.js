import { ethers } from "ethers";

export function shortenAddress(address, chars = 4) {
    if (!ethers.utils.isAddress(address)) {
        throw new Error('Invalid address');
    }
    return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
}

export function toFormatEther(balance) {
    const numberInEther = ethers.utils.formatEther(balance);
    const etherNumber = Number(numberInEther);
    const formattedNumber = etherNumber.toLocaleString({ style: 'decimal', minimumFractionDigits: 1, maximumFractionDigits: 8 });
    return formattedNumber;
}

export function formatLargeNumber(value) {
    const units = ["", "Thousand", "Million", "Billion", "Trillion", "Quadrillion", "Quintillion", "Sextillion", "Septillion", "Octillion", "Nonillion", "Decillion", "Undecillion", "Duodecillion", "Tredecillion", "Quattuordecillion", "Quindecillion", "Sexdecillion", "Septendecillion", "Octodecillion", "Novemdecillion", "Vigintillion"];

    if (value === 0) return "0";

    let exponent = Math.floor(Math.log10(Math.abs(value)));
    let unitIndex = Math.floor(exponent / 3);

    unitIndex = Math.min(unitIndex, units.length - 1);
    let num = (value / Math.pow(10, unitIndex * 3)).toFixed(2);

    return `${num} ${units[unitIndex]}`;
}