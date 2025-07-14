import heroImage from "../../assets/Hero/Hero-Image-1.webp";
import image1 from "../../assets/Hero/1.webp";
import image2 from "../../assets/Hero/2.webp";
import image3 from "../../assets/Hero/3.webp";
import image4 from "../../assets/Hero/4.webp";

function HeroRight() {
  return (
    <div className=" w-full h-full flex justify-center items-center">
      <div className="relative  w-[440px] ">
        <div data-aos="fade-left">
          <img className="  w-full h-full " src={heroImage} />
        </div>
        <div
          data-aos="fade-down"
          className="absolute hidden -top-16  lg:flex lg:left-40"
        >
          <img className="w-[80%] md:w-full" src={image1} alt="" />
        </div>
        <div
          data-aos="fade-right"
          className="absolute hidden   -left-5 top-10 lg:flex"
        >
          <img className="w-[80%] md:w-full" src={image2} alt="" />
        </div>
        <div
          data-aos="fade-right"
          className="absolute hidden  -left-12  bottom-20 lg:flex"
        >
          <img className="w-[80%] md:w-full" src={image3} alt="" />
        </div>
        <div
          data-aos="fade-up"
          className="absolute hidden -bottom-12 left-40 lg:flex"
        >
          <img className="w-[80%] md:w-full" src={image4} alt="" />
        </div>
      </div>
    </div>
  );
}

export default HeroRight;
