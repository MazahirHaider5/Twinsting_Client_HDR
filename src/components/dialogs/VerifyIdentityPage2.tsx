import { useState } from "react";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";

export const VerifyIdentityPage2 = () => {
  const [isSubmittedDialogOpen, setIsSubmittedDialogOpen] = useState(false);

  return (
    <>
      {/* Submission Confirmation Dialog */}
      {isSubmittedDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30">
          <div className="container m-auto w-full">
            <div className="modal relative m-auto my-5 w-full rounded-lg bg-white px-6 py-8 lg:w-1/3">
              <div className="absolute top-5 right-5 cursor-pointer text-xl text-[#C3C3C4]">
                <RxCross1
                  onClick={() => setIsSubmittedDialogOpen(false)}
                  className="cursor-pointer text-gray-600 hover:text-black"
                />
              </div>
              <div className="top flex flex-col">
                <div className="absolute top-5 right-5 cursor-pointer text-xl text-[#C3C3C4]">
                  {/* <i class="fa-solid fa-xmark"></i> */}
                </div>
                <div className="flex flex-col items-start gap-3 py-4 text-center sm:items-center">
                  <div className="h-14 w-14 rounded-full bg-[#FEEDF4] p-4">
                    <Image src="/images/verifiedbadge.png" alt="dkfd" width={40} height={40} />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">Your information is submitted</p>
                    <p className="font-medium text-[#6E6E70]">We will notify you once you’re information is verified</p>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col items-center justify-center">
                <button className="relative mb-4 w-full cursor-pointer overflow-hidden rounded-lg bg-[#FEEDF4] py-3 font-semibold">
                  <span className="bg-gradient-to-r from-[#F5AF48] to-[#E32379] bg-clip-text text-transparent">
                    Back home
                  </span>
                </button>

                <button className="w-full cursor-pointer rounded-lg bg-gradient-to-b from-[#F5AF48] to-[#E32379] px-5 py-3 font-semibold text-white">
                  Back to Verification Center
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VerifyIdentityPage2;
