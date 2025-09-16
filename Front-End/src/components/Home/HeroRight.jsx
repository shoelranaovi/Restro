import heroImage from "../../assets/Hero/Hero-Image-1.webp";
import image1 from "../../assets/Hero/1.webp";
import image2 from "../../assets/Hero/2.webp";
import image3 from "../../assets/Hero/3.webp";
import image4 from "../../assets/Hero/4.webp";

function HeroRight() {
  return (
    <div className="  w-full  h-full flex justify-center items-center">
      <div className="relative  w-[280px] lg:w-[370px] ">
        <div data-aos="fade-left">
          <img className="  w-full h-full " src={heroImage} />
        </div>
        <div
          data-aos="fade-down"
          className="absolute  -top-10 lg:-top-14  left-[32%]"
        >
          <img className="w-[80%] lg:w-full" src={image1} alt="" />
        </div>
        <div
          data-aos="fade-right"
          className="absolute    -left-8 top-20 lg:top-24 lg:flex"
        >
          <img className="w-[80%] lg:w-full" src={image2} alt="" />
        </div>
        <div
          data-aos="fade-right"
          className="absolute   left-[32%]  -bottom-10 lg:-bottom-12 "
        >
          <img className="w-[80%] lg:w-full" src={image3} alt="" />
        </div>
        <div
          data-aos="fade-up"
          className="absolute  top-20 lg:top-24  -right-16 "
        >
          <img className="w-[80%] lg:w-full" src={image4} alt="" />
        </div>
      </div>
    </div>
  );
}

export default HeroRight;
