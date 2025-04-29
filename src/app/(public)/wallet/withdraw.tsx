import React from "react";
import Image from "next/image";
interface WithdrawBalanceProps {
  onClose: () => void;
}

const WithdrawBalance: React.FC<WithdrawBalanceProps> = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/50">
      {/* Changed bg-opacity-50 to bg-opacity-20 */}
      <div className="modal relative w-full rounded-lg bg-white px-6 py-8 sm:m-auto lg:w-2/5">
        <div className="top flex flex-col">
          <div className="absolute top-5 right-5 cursor-pointer text-xl text-[#C3C3C4]" onClick={onClose}>
            <Image src="/wallet-page/cross.svg" width={30} height={30} className="" alt="cross" />
          </div>
          <div>
            <div className="pt-4 text-center">
              <p className="text-xl font-semibold">Withdraw Balance</p>
              <p className="lg-text-lg pt-2 text-sm text-[#6E6E70] xl:text-xl">
                To begin the withdrawal process, select your preferred payout method.
              </p>
            </div>
          </div>
        </div>

        <div className="">
          <button className="my-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#ECECEC] bg-[#FAFAFA] px-8 py-4 font-semibold text-black">
            <Image src="/wallet-page/PayPal.svg" width={30} height={30} className="" alt="cross" />
            PayPal Account
          </button>
          <button className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-[#ECECEC] bg-[#FAFAFA] px-8 py-4 font-semibold text-black">
            <Image src="/wallet-page/bank.svg" width={30} height={30} className="" alt="cross" />
            Bank Transfer
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawBalance;
