import HeroLeft from "./HeroLeft"
import HeroRight from "./HeroRight"


function Hero() {
  return (
    <div className=" md:h-screen grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-1 ">
        <div className=" w-full  ">
        
            <HeroLeft />
        </div>
        <div className="w-full   pb-12 ">
     
          <HeroRight />
         

        </div>
    </div>
  )
}

export default Hero