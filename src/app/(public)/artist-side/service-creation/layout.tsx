import SellerArtistServicesProgressBar from "@/components/main/SellerArtistServiceProgressBar"


const servicecreationLayout  = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="p-6">
        <SellerArtistServicesProgressBar/>
        <div className="mt-6">{children}</div>
    </div>
  )
}

export default servicecreationLayout