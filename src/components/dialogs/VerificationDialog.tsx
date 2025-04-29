import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import Image from "next/image";

const VerificationDialog = () => {
  const [verificationDialog, setVerificationDialog] = useState(false);
  const [identityDialog, setIdentityDialog] = useState(false);

  return (
    <div className="container m-auto w-full">
      {verificationDialog && (
        <div className="modal relative m-auto my-5 w-full rounded-lg bg-white px-6 py-8 lg:w-2/3">
          <div className="top flex flex-col items-center text-center">
            <div className="ml-auto px-2">
              <RxCross1 onClick={() => setVerificationDialog(false)} className="cursor-pointer" />
            </div>
            <div className="absolute top-5 right-5 cursor-pointer text-xl text-[#C3C3C4]">
              {/* <i class="fa-solid fa-xmark"></i> */}
            </div>
            <div className="h-18 w-18 rounded-full bg-[#F3FBF9] p-3">
              <Image src="/images/shield.png" alt="" width={50} height={50} />
            </div>
            <h1 className="pt-4 text-2xl font-bold">Verify yourself to activate your account</h1>

            <p className="pt-1 text-[#929294]">Complete following steps to complete verification</p>
          </div>

          <div className="verify-box-main flex flex-col items-center justify-between gap-6 pt-6 md:flex-row">
            <div className="box-left  border-2 rounded-lg border-[#ECECEC] bg-[#FAFAFA] px-4 py-5">
              <div className="flex items-center justify-between">
                <div className="">
                  <Image src="/images/email.png" alt="Image" width={40} height={40} />
                </div>
                <div className="text-sm">Ni*******78@gmail.com</div>
              </div>
              <p className="py-2 font-bold">Verify email</p>
              <p className="text-sm/6 text-[#454548]">
                Lorem ipsum dolor sit amet consectetur. Auctor pellentesque egestas quam sed augue at. Con
              </p>

              <div className="btn-bottom relative flex items-center justify-between pt-5 text-sm">
                <button className="cursor-pointer bg-gradient-to-b from-[#F5AF48] to-[#E32379] bg-clip-text font-bold text-transparent after:absolute after:bottom-2 after:left-0 after:h-[2px] after:w-6.5 after:bg-gradient-to-r after:from-[#F5AF48] after:to-[#E32379] after:content-['']">
                  Edit
                </button>

                <button className="flex cursor-pointer gap-2 rounded-lg border-2 border-[#C3C3C4] px-3 py-2 font-semibold">
                  Verify now
                  <span>{/* <i class="fa-solid fa-arrow-right"></i> */}</span>
                </button>
              </div>
            </div>

            <div className="box-right rounded-lg border-2 border-[#ECECEC] bg-[#FAFAFA] px-4 py-5">
              <div className="flex items-center justify-between">
                <div className="">
                  <Image src="/images/phone.png" alt="Frame" width={40} height={40} />
                </div>
                <div className="text-sm">+32**********23</div>
              </div>
              <p className="py-2 font-bold">Verify phone number</p>
              <p className="text-sm/6 text-[#454548]">
                Lorem ipsum dolor sit amet consectetur. Auctor pellentesque egestas quam sed augue at. Con
              </p>

              <div className="btn-bottom relative flex items-center justify-between pt-5 text-sm">
                <button className="cursor-pointer bg-gradient-to-b from-[#F5AF48] to-[#E32379] bg-clip-text font-bold text-transparent after:absolute after:bottom-2 after:left-0 after:h-[2px] after:w-6.5 after:bg-gradient-to-r after:from-[#F5AF48] after:to-[#E32379] after:content-['']">
                  Edit
                </button>

                <button className="flex cursor-pointer gap-2 rounded-lg bg-gradient-to-b from-[#F5AF48] to-[#E32379] px-3 py-2.5 font-semibold text-white">
                  <span>{/* <i class="fa-solid fa-check"></i> */}</span>
                  Verify now
                </button>
              </div>
            </div>
          </div>
          <div className="verify-box-main flex flex-col items-center justify-between gap-6 pt-6 md:flex-row">
            <div className="box-left rounded-lg border-2 border-[#ECECEC] bg-[#FAFAFA] px-4 py-5">
              <div className="flex items-center justify-start">
                <div className="">
                  <Image src="/images/verifyIdentityLogo.png" alt="Frame" width={40} height={40} />
                </div>
              </div>
              <p className="py-2 font-bold">Verify your identity</p>
              <p className="text-sm/6 text-[#454548]">
                Lorem ipsum dolor sit amet consectetur. Auctor pellentesque egestas quam sed augue at. Con
              </p>

              <div className="btn-bottom relative flex items-center justify-end pt-5 text-sm">
                <button
                  className="flex cursor-pointer gap-2 rounded-lg border-2 border-[#C3C3C4] px-7 py-2 font-semibold"
                  onClick={() => setIdentityDialog(true)}
                >
                  Start
                </button>
              </div>
            </div>

            <div className="box-right rounded-lg border-2 border-[#ECECEC] bg-[#FAFAFA] px-4 py-5">
              <div className="flex items-center justify-start">
                <div className="">
                  <Image src="/images/verifyIdentityLogo.png" alt="Frame" width={40} height={40} />
                </div>
              </div>
              <p className="py-2 font-bold">Verify your Company Account</p>
              <p className="text-sm/6 text-[#454548]">
                Lorem ipsum dolor sit amet consectetur. Auctor pellentesque egestas quam sed augue at. Con
              </p>

              <div className="btn-bottom relative flex items-center justify-end pt-5 text-sm">
                <button className="flex cursor-pointer gap-2 rounded-lg border-2 border-[#C3C3C4] px-7 py-2 font-semibold">
                  Start
                  <span>{/*  <i class="fa-solid fa-arrow-right"></i> */}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {identityDialog && (
        <div className="modal relative m-auto my-5 w-full rounded-lg bg-white px-6 py-8 lg:w-2/3">
          <div className="top flex flex-col items-center text-center">
            <div className="ml-auto px-2">
              <RxCross1 onClick={() => setIdentityDialog(false)} className="cursor-pointer" />
            </div>
            <h1 className="pt-4 text-2xl font-bold">Verify your identity</h1>
            {/* Additional content for identity verification can go here */}
          </div>
        </div>
      )}

      <button onClick={() => setVerificationDialog(true)}>Open Verification Dialog</button>
      <button onClick={() => setIdentityDialog(true)}>Open Identity Dialog</button>
    </div>
  );
};

export default VerificationDialog;
