
import StepProgressBar from "@/components/main/StepProgressBar"

const CheckoutLayout  = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="p-6">
        <StepProgressBar/>
        <div className="mt-6">{children}</div>
    </div>
  )
}

export default CheckoutLayout