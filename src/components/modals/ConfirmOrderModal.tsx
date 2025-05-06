"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import apiClient from "@/lib/interceptor";

type ConfirmOrderModalProps = {
  serviceId: string;
  pricingType: string;
  deliveryTime: number;
  location: string
};

const ConfirmOrderModal = ({ serviceId, pricingType, deliveryTime, location }: ConfirmOrderModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleConfirmOrder = async () => {
    try {
      setLoading(true);

      // Calculate delivery date
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + deliveryTime);

      const res = await apiClient.post("/order/create", {
        serviceId,
        pricingType,
        deliveryDate: deliveryDate.toISOString(),
        location
      });

      if (res.data.success) {
        toast.success("Order created successfully!");
      } else {
        toast.error("Failed to create order.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleConfirmOrder}
      disabled={loading}
      className="rounded-full bg-gradient-to-r from-orange-400 to-red-500 px-3 py-2 text-white shadow-md"
    >
      {loading ? "Creating..." : "Confirm"}
    </button>
  );
};

export default ConfirmOrderModal;
