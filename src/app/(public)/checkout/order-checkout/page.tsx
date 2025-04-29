import NextStepButton from "@/components/main/NextStepButton";
import Image from "next/image";

const OrderCheckout = () => {
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10">
      <h1 className="text-base font-semibold sm:text-base md:text-lg lg:text-lg 2xl:text-xl">Checkout</h1>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex w-full flex-col">
          <div className="w-full rounded-3xl border border-gray-300 bg-gray-50 p-4 sm:p-6 lg:w-[80%] 2xl:w-[80%]">
            <p className="pb-2 font-semibold">Payment Options</p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="rounded-lg border border-gray-300 bg-white p-2 sm:px-6 sm:py-3">
                <Image alt="" src="/images/VaultIcon.png" width={30} height={30} />
              </div>
              <div className="rounded-lg border border-gray-300 bg-white p-2 sm:px-6 sm:py-3">
                <Image alt="" src="/images/PaymentIcon.png" width={30} height={30} />
              </div>
              <div className="rounded-lg border border-gray-300 bg-white p-2 sm:px-6 sm:py-3">
                <Image alt="" src="/images/GooglePayIcon.png" width={60} height={60} />
              </div>
              <div className="rounded-lg border border-gray-300 bg-white p-2 sm:px-6 sm:py-3">
                <Image alt="" src="/images/ApplePayIcon.png" width={60} height={60} />
              </div>
              <div className="rounded-lg border border-gray-300 bg-white p-2 sm:px-6 sm:py-3">
                <Image alt="" src="/images/RPaymentIcon.png" width={30} height={30} />
              </div>
            </div>
            <div className="flex flex-col pt-6">
              <p>Name</p>
              <input
                type="text"
                defaultValue=""
                className="my-2 h-12 w-full rounded-lg border border-gray-300 bg-gray-100 px-2"
                placeholder="Type here"
              />
              <p>Card Number</p>
              <input
                type="text"
                defaultValue=""
                className="my-2 h-12 w-full rounded-lg border border-gray-300 bg-gray-100 px-2"
                placeholder="Type here"
              />
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <p>Expiry</p>
                  <input
                    type="text"
                    defaultValue=""
                    className="my-2 h-12 w-full rounded-lg border border-gray-300 bg-gray-100 px-2"
                    placeholder="Type here"
                  />
                </div>
                <div className="flex-1">
                  <p>CVV</p>
                  <input
                    type="text"
                    defaultValue=""
                    className="my-2 h-12 w-full rounded-lg border border-gray-300 bg-gray-100 px-2"
                    placeholder="Type here"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="my-8 w-full rounded-3xl border border-gray-300 bg-gray-50 p-4 sm:p-6 lg:w-[80%] 2xl:w-[80%]">
            <p className="font-semibold text-gray-900">
              Related Services <span className="text-gray-400">(Optional)</span>
            </p>
            <div className="mx-2 flex items-center justify-between pt-2 sm:mx-4">
              <p className="text-gray-500">Window Cleaning:</p>
              <p className="text-gray-900">$10.99 </p>
            </div>
            <div className="mx-2 flex items-center justify-between pt-2 sm:mx-4">
              <p className="text-gray-500">House Renovation:</p>
              <p className="text-gray-900">$89.99</p>
            </div>
            <div className="mx-2 flex items-center justify-between pt-2 sm:mx-4">
              <p className="text-gray-500">Car wash:</p>
              <p className="text-gray-900">$15.00</p>
            </div>
            <div className="mx-2 flex items-center justify-between pt-2 sm:mx-4">
              <p className="text-gray-500">Baby sitting:</p>
              <p className="text-gray-900">$45.99</p>
            </div>
            <div className="mx-2 flex items-center justify-between pt-2 sm:mx-4">
              <p className="text-gray-500">House Cleaning:</p>
              <p className="text-gray-900">$30.00</p>
            </div>
          </div>
        </div>

        <div className="w-full rounded-3xl border border-gray-300 bg-gray-50 p-4 sm:p-6 lg:w-[60%] 2xl:w-[60%]">
          <p className="font-semibold">Order Summary</p>
          <div className="flex flex-row gap-4 pt-4">
            <Image alt="img" src="/images/orderSummaryImg.png" width={100} height={100} />
            <p className="text-sm sm:text-base">Providing Multiple Services for Companies - Easy</p>
          </div>
          <div className="my-2 w-full border-b border-gray-200"></div>
          <div className="mx-2 flex items-center justify-between pt-2 sm:mx-4">
            <p className="text-gray-500">Service:</p>
            <p className="text-gray-900">Artists </p>
          </div>
          <div className="mx-2 flex items-center justify-between pt-2 sm:mx-4">
            <p className="text-gray-500">Qty:</p>
            <p className="text-gray-900">1x </p>
          </div>
          <div className="mx-2 flex items-center justify-between pt-2 sm:mx-4">
            <p className="text-gray-500">Tax:</p>
            <p className="text-gray-900">$70.00</p>
          </div>
          <div className="mx-2 flex items-center justify-between pt-2 sm:mx-4">
            <p className="text-gray-500">Subtotal:</p>
            <p className="text-gray-900">$70.00</p>
          </div>
          <div className="my-2 w-full border-b border-gray-200 pt-2"></div>
          <div className="mx-2 flex items-center justify-between pt-3 sm:mx-4">
            <p className="font-semibold text-gray-900">Total Price:</p>
            <p className="font-semibold text-gray-900">$70.00</p>
          </div>
          <div className="flex items-center justify-center py-4">
            <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg">
              {/* Input Field */}
              <input
                type="text"
                placeholder="Coupon code..."
                className="w-full rounded-lg border border-gray-200 bg-white py-3 pr-16 pl-4 text-gray-700 placeholder-gray-400 outline-none"
              />

              {/* Apply Button (Fixed Inside Input) */}
              <button className="absolute top-1/2 right-2 -translate-y-1/2 rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white shadow-md md:px-5 md:text-base lg:px-6">
                Apply
              </button>
            </div>
          </div>

          <div className="flex items-end justify-end">
            <NextStepButton nextPath="/checkout/confirm-pay" label="Proceed to Confirmation" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCheckout;
