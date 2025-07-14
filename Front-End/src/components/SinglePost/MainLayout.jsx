import React from 'react';

const KitchenTeamPage = () => {
  // Data object containing all content
  const kitchenData = {
    imageUrl: "/api/placeholder/800/400",
    imageAlt: "Kitchen Team",
    title: "A Day in the Life of Our Kitchen Team",
    tags: ["Kitchen", "December 25, 2024"],
    introduction: "Our kitchen team is the heart of our restaurant, working tirelessly behind the scenes to bring every dish to life. From the crack of dawn to the last plate served, here's a glimpse into a day in their lives:",
    sections: [
      {
        id: 1,
        title: "Early Morning: Preparation and Planning",
        content: "The day begins early as the team gathers to ensure the kitchen is ready for the day ahead. Fresh ingredients arrive, and our chefs inspect each item meticulously for quality. Vegetables are washed, meats are trimmed, and sauces are prepped, setting the stage for a flawless service."
      },
      {
        id: 2,
        title: "Mid-Morning: Collaboration and Creativity",
        content: "With prep work complete, the team gathers to review the day's menu, discussing specials and any custom orders. This is also the time when our chefs brainstorm creative plating techniques and refine recipes, ensuring every dish meets our high standards."
      },
      {
        id: 3,
        title: "Lunch Rush: Precision in Action",
        content: "As the lunch crowd fills the dining area, the kitchen becomes a symphony of sizzling pans, chopping knives, and calling orders. Each member plays a vital role, from the line cooks ensuring consistency to the expeditors making sure every dish reaches the table on time. Communication is key, and the team works seamlessly under pressure."
      },
      {
        id: 4,
        title: "Afternoon: Reset and Recharge",
        content: "After the lunch rush, the team takes a well-deserved break. The kitchen is cleaned and reorganized, and ingredients are replenished for the dinner service. It's also a time to review feedback, celebrate successes, and address any challenges encountered during the lunch rush."
      },
      {
        id: 5,
        title: "Dinner Service: Excellence on Display",
        content: "Dinner is where the kitchen truly shines, with complex dishes and elaborate presentations taking center stage. The team balances speed and artistry, ensuring every plate is a masterpiece. It's a high-energy environment, but the team thrives on the adrenaline, delivering exceptional experiences for our guests."
      },
      {
        id: 6,
        title: "Closing Time: Reflection and Preparation",
        content: "As the day winds down, the kitchen is meticulously cleaned, and preparations for the next day begin. The team reflects on their performance, sharing highlights and discussing ways to improve."
      }
    ]
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-50 p-4 md:p-8 font-serif overflow-hidden">
      {/* Image Section */}
      <div className="w-full mb-6">
        <img 
          src={kitchenData.imageUrl} 
          alt={kitchenData.imageAlt} 
          className="w-full h-64 md:h-80 object-cover"
        />
      </div>

      {/* Title Section */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {kitchenData.title}
        </h1>

        <div className="flex flex-wrap gap-3 mb-4">
          {kitchenData.tags.map((tag, index) => (
            <div 
              key={index} 
              className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 text-sm"
            >
              {tag}
            </div>
          ))}
        </div>

        <p className="text-gray-700 mb-6">
          {kitchenData.introduction}
        </p>
      </div>

      {/* Content Sections */}
      <div data-aos="fade-right" className="space-y-8">
        {kitchenData.sections.map((section) => (
          <section key={section.id}>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {section.title}
            </h2>
            <p className="text-gray-700">
              {section.content}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
};

export default KitchenTeamPage;