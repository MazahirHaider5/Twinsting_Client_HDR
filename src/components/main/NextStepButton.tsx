"use client";
import { useRouter } from "next/navigation";

const NextStepButton = ({nextPath, label, onClick}: {nextPath: string; label: string; onClick?: ()=> void}) => {
    const router = useRouter();

    const handleClick = () => {
      if (onClick) {
        onClick();
      } else {
        router.push(nextPath);
      }
    }

  return (
    <button
    onClick={handleClick}
    className="mt-4 px-6 py-2 bg-gradient-to-br from-[#F5AF48] via-[#F47C6A] to-[#E32379] text-white rounded-lg cursor-pointer"
    >
        {label}    
    </button>
  )
}

export default NextStepButton