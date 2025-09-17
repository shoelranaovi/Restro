import { ArrowRight } from "lucide-react";
import PlayButton from "../Layout/PlayButton";
import { FaRegUser } from "react-icons/fa6";


function HeroLeft() {
  return (
    <div className=" h-full  flex flex-col md:justify-center lg:pl-10  pt-2 gap-8 pl-4  ">
      <div  className="flex flex-col mt-10 md:mt-0 gap-8 ">
        <div data-aos="fade-right" data-aos-once="false" >
          <button className="bg-sand text-sm px-4 py-2 rounded-2xl border-orange-500 border-dashed border-[1px]">
            Tasty Food Forever
          </button>
        </div>
        <div data-aos="fade-up" className=" text-4xl lg:text-5xl flex  justify-start   flex-wrap gap-4 ">
          <h1>Welcome To </h1>
          <div className="text-orange"> Restro </div>

          <h1> Flavorful Journeys </h1>
          <h1>Await</h1>
        </div>
        <div data-aos="fade-left" className="flex gap-4">
          <button className="  text-center px-4 py-2 bg-transparent border-green-700 border text-green flex gap-2 rounded-lg">
            Contact us <ArrowRight />{" "}
          </button>
          <button className="text-xs px-4 py-2 pr-10 relative bg-btn-orange rounded-lg">
            Order Now{" "}
            <div className="absolute -top-1  -right-4 bottom-5">
              <PlayButton />
            </div>{" "}
          </button>
        </div>
      </div>
      <div  data-aos="fade-left" className=" bg-black  grid grid-cols-2 justify-center items-center gap-3 md:grid-cols-2 lg:grid-cols-3 w-[90%]   " >
          <div className="bg-sand text-sm  p-1 gap-1 justify-start flex  items-start md:flex-row md:gap-4  rounded-2xl border-orange-500 border-dashed border-[1px]">
          <div className="  bg-green-300 rounded-full p-2">
          <FaRegUser size={24} />
            
          </div>
          <div>
          <p>1500+</p>
          <p>Customers</p>
          </div>
          </div>
          <div className="bg-sand   text-sm p-1 gap-1 justify-start flex  items-start md:flex-row md:gap-4  rounded-2xl border-orange-500 border-dashed border-[1px]">
          <div className="  bg-green-300 rounded-full p-2">
          <FaRegUser size={24} />
            
          </div>
          <div>
          <p>1500+</p>
          <p>Customers</p>
          </div>
          </div>
          <div className="bg-sand    text-sm  p-1 gap-1 justify-start flex  items-start md:flex-row md:gap-4  rounded-2xl border-orange-500 border-dashed border-[1px]">
          <div className="  bg-green-300 rounded-full p-2">
          <FaRegUser size={24} />
            
          </div>
          <div>
          <p>1500+</p>
          <p>Customers</p>
          </div>
          </div>
      </div>
    </div>
  );
}

export default HeroLeft;

