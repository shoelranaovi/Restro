import Details from "./Details";

const AboutUs = () => {
  return (
    <div className="  flex flex-col justify-center items-center gap-4 w-full h-full lg:flex-row lg:gap-8  ">
      {/* image */}
      <div data-aos="fade-right" className="w-full lg:hidden flex justify-center h-62 lg:w-1/6 lg:h-62">
        <img
          className=" w-[80%] h-[100%]  rounded-lg bg-center object-fill bg-cover "
          src="https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/restaurant-1.webp"
          alt=""
        />
      </div>

    <div data-aos="fade-left"
     data-aos-easing="linear"
     data-aos-duration="1500" className="flex flex-col md:flex-row lg:w-5/6 " >
    <Details />

<div data-aos="fade-left" className="flex flex-col gap-4 lg:w-1/2   md:items-center md:justify-center">
<div className="w-full  flex justify-center h-62 md:w-[130%] h-[30%] lg:w-full lg:h-64 ">
  <img
    className=" w-[80%] h-[100%] rounded-lg bg-center  bg-cover"
    src="https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/table-served-for-festive-dinner-in-room.webp"
    alt=""
  />
</div>
<div className="w-full flex justify-center h-62 md:w-[130%] h-[30%] lg:w-full lg:h-64">
  <img
    className=" w-[80%] h-[100%] rounded-lg bg-center  bg-cover"
    src="https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/restaurant-1.webp"
    alt=""
  />
</div>

</div>
    </div>
    </div>
  );
};

export default AboutUs;
