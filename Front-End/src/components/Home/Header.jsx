import Navbar from "../Layout/Navbar";
import Hero from "./Hero";


function Header() {
  return (
    <div
     style={{
        background: `linear-gradient(90deg, rgba(228, 242, 230, 1) 0%, rgba(199, 242, 208, 1) 50%, rgba(182, 240, 195, 1) 100%)`,
      }} 
      className="flex flex-col items-center w-full  py-1 md:py-0 ">
      <div className="w-full font-bold">
        <Navbar />
        <Hero />
      </div>
    </div>
  );
}

export default Header;
