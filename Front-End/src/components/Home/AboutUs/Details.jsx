import { ArrowRight } from "lucide-react"


function Details() {
  return (
    <div data-aos="fade-left" className="px-8 py-4 flex flex-col w-full lg:w-1/2 gap-4 ">
        <div className="flex  items-center gap-3">
          <div className="flex space-x-1">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="w-1 h-1 bg-orange-500 rounded-full" />
              ))}
          </div>
          <h3 className="text-green font-bold text-lg">About Us</h3>
          <div className="flex space-x-1">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="w-1 h-1 bg-orange-500 rounded-full" />
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-8 ">
            <h1 className="text-2xl font-bold">A Passion for Culinary Excellence</h1>
            <h3 className="text-xs" >At Rasoi Reverie, we believe every meal tells a story. Nestled in the heart of City, our restaurant is a celebration of passion, creativity, and a deep love for exceptional food.</h3>
        </div>
        <div className="w-full flex flex-col gap-4" >
        <button className="bg-sand w-full text-sm px-4 py-3 rounded-sm border-orange-500 border-dashed border-[1px]">
        Crafted with Love
          </button>
          <button className="bg-sand w-full text-sm px-4 py-3 rounded-sm border-orange-500 border-dashed border-[1px]">
          Passionate Chefs
          </button>
          <button className="bg-sand w-full text-sm px-4 py-3 rounded-sm border-orange-500 border-dashed border-[1px]">
          Inviting Atmosphere
          </button>
          <button className="bg-sand w-full text-sm px-4 py-3 rounded-sm border-orange-500 border-dashed border-[1px]">
          Fresh Ingredients
          </button>
        </div>
        <button className=" w-52 px-4 py-3 flex  pr-10 relative bg-btn-orange rounded-lg">
           Book The Table <ArrowRight />
          </button>
    </div>
  )
}

export default Details
