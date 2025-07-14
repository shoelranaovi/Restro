import HeroLeft from "./HeroLeft"
import HeroRight from "./HeroRight"


function Hero() {
  return (
    <div className="   grid grid-cols-1 md:grid-cols-2 gap-4 h-full ">
        <div className=" w-full ">
        
            <HeroLeft />
        </div>
        <div className="w-full  ">
     
          <HeroRight />
         

        </div>
    </div>
  )
}

export default Hero