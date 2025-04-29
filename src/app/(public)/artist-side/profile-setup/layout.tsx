import SellerArtistProgressBar from "@/components/main/SellerArtistProgressBar"


const ProfileSetupLayout  = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="p-6">
        <SellerArtistProgressBar/>
        <div className="mt-6">{children}</div>
    </div>
  )
}

export default ProfileSetupLayout