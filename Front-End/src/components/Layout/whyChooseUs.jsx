const WhyChooseUs = () => {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-slate-200">
      <div data-aos="fade-left" className="text-center mb-10">
        <p className="text-green-600 font-semibold text-sm tracking-wider">
          --- Why Choose Us ---
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
          Exceptional Dining, Every Time
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          At Rasoi Reverie, we go above and beyond to make your dining experience unforgettable.
          From the quality of our dishes to the warmth of our service, we’re committed to exceeding your expectations.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-10">
        <div data-aos="fade-left" className="flex-1  space-y-8">
          <div className="flex flex-col items-center md:flex-row gap-4">
            <img src="https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/dish.webp" alt="Dish Icon" className="w-20 h-20 md:w-10 md:h-10" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Expertly Crafted Dishes</h3>
              <p className="text-gray-600 text-sm">
                Fusce semper vehicula eros sed scelerisque. Aliquam diam elit,
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center md:flex-row gap-4">
            <img src="https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/reservation.webp" alt="Dish Icon" className="w-20 h-20 md:w-10 md:h-10" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Inviting Ambiance</h3>
              <p className="text-gray-600 text-sm">
                Fusce semper vehicula eros sed scelerisque. Aliquam diam elit,
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center md:flex-row gap-4">
            <img src="https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/008-desk-bell.webp" alt="Dish Icon" className="w-20 h-20 md:w-10 md:h-10" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Unparalleled Service</h3>
              <p className="text-gray-600 text-sm">
                Fusce semper vehicula eros sed scelerisque. Aliquam diam elit,
              </p>
            </div>
          </div>

          
        </div>

        <div data-aos="fade-up"
     data-aos-duration="3000" className="flex-1 flex justify-center">
          <img
            src="https://th.bing.com/th/id/R.0a5ff9269f7d485895700daa46b8216c?rik=ks0%2bPBqoLDTWIQ&pid=ImgRaw&r=0"
            alt="Dining Room"
            className="rounded-lg  object-cover shadow-lg w-[80%]  "
          />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
