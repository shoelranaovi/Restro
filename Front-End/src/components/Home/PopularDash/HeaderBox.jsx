import { ArrowRight } from "lucide-react";

function HeaderBox() {
  return (
    <div data-aos="fade-right" className="flex flex-col lg:flex-row justify-start md:justify-between gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-4">
        <div className="flex  items-center gap-3">
          <div className="flex space-x-1">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="w-1 h-1 bg-orange-500 rounded-full" />
              ))}
          </div>
          <h3 className="text-green font-bold text-lg">Popular Dishes</h3>
          <div className="flex space-x-1">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="w-1 h-1 bg-orange-500 rounded-full" />
              ))}
          </div>
        </div>
        <div className="text-3xl font-bold">
          <h1>Popular Dishes You’ll Love</h1>
        </div>
      </div>

      <div className="md:w-2/6">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </p>
      </div>
      <div className="text-green font-bold flex justify-end md:items-center gap-2 ">
        <button> Learn More </button>
        <ArrowRight />
      </div>
    </div>
  );
}

export default HeaderBox;
