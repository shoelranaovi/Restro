// 1 sample messsage

const generateSampleMessages = () => {
  const names = [
    "John Smith",
    "Sarah Johnson",
    "Mike Davis",
    "Emily Wilson",
    "David Brown",
    "Lisa Garcia",
    "James Miller",
    "Maria Rodriguez",
    "Robert Taylor",
    "Jennifer Lee",
    "Michael Anderson",
    "Jessica Martinez",
    "William Thomas",
    "Amanda Jackson",
    "Christopher White",
    "Ashley Harris",
    "Matthew Martin",
    "Stephanie Thompson",
    "Daniel Garcia",
    "Michelle Robinson",
    "Andrew Clark",
    "Nicole Lewis",
    "Joshua Walker",
    "Rachel Hall",
    "Ryan Young",
  ];
  const subjects = [
    "Food Quality Complaint",
    "Reservation Inquiry",
    "Compliment",
    "Delivery Issue",
    "Billing Question",
    "Menu Inquiry",
    "Catering Request",
    "Special Diet Requirements",
    "Event Booking",
    "Feedback",
  ];
  const messages = [
    "The pasta was overcooked and the sauce was too salty. Very disappointed with the quality.",
    "I would like to make a reservation for 6 people this Saturday evening at 7 PM.",
    "Excellent food and service. Will definitely come back again!",
    "My order was delivered 45 minutes late and the food was cold.",
    "There seems to be an error on my bill. Can you please check?",
    "Do you have any vegan options available?",
    "We need catering for 50 people for our corporate event.",
    "Can you accommodate gluten-free dietary requirements?",
    "Looking to book your private dining room for anniversary.",
    "Great atmosphere and friendly staff. Keep up the good work!",
  ];
  const statuses = ["pending", "replied", "resolved"];
  const priorities = ["low", "medium", "high"];

  const sampleMessages = [];
  for (let i = 1; i <= 47; i++) {
    sampleMessages.push({
      _id: i.toString(),
      name: names[Math.floor(Math.random() * names.length)],
      email: `customer${i}@email.com`,
      phone: `+1 234-567-${8900 + i}`,
      subject: subjects[Math.floor(Math.random() * subjects.length)],
      message: messages[Math.floor(Math.random() * messages.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      createdAt: new Date(
        Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
      ).toISOString(),
      reply:
        Math.random() > 0.7
          ? "Thank you for your message. We will address this promptly."
          : null,
      repliedBy:
        Math.random() > 0.7
          ? { name: "Admin", email: "admin@restaurant.com" }
          : null,
      repliedAt:
        Math.random() > 0.7
          ? new Date(
              Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000
            ).toISOString()
          : null,
    });
  }
  return sampleMessages;
};

// 2  Filter and sort messages
const filteredMessages = allMessages.filter((message) => {
  const matchesSearch =
    message.name.toLowerCase().includes(filters.search.toLowerCase()) ||
    message.email.toLowerCase().includes(filters.search.toLowerCase()) ||
    message.subject.toLowerCase().includes(filters.search.toLowerCase());
  const matchesStatus =
    filters.status === "all" || message.status === filters.status;
  const matchesPriority =
    filters.priority === "all" || message.priority === filters.priority;

  return matchesSearch && matchesStatus && matchesPriority;
});

//  3 Sort messages
const sortedMessages = [...filteredMessages].sort((a, b) => {
  const aValue = a[sortConfig.key];
  const bValue = b[sortConfig.key];

  if (sortConfig.direction === "asc") {
    return aValue > bValue ? 1 : -1;
  } else {
    return aValue < bValue ? 1 : -1;
  }
});

// 4. get color as per conditions

const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "text-orange-600 bg-orange-50";
    case "replied":
      return "text-blue-600 bg-blue-50";
    case "resolved":
      return "text-green-600 bg-green-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
};

// 5. get icon as per conditions

const getPriorityIcon = (priority) => {
  switch (priority) {
    case "high":
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    case "medium":
      return <Star className="w-4 h-4 text-yellow-500" />;
    case "low":
      return <Phone className="w-4 h-4 text-green-500" />;
    default:
      return null;
  }
};


// 6.format date

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// get 3 icon

const getSortIcon = (key) => {
  if (sortConfig.key !== key) return null;
  return sortConfig.direction === 'asc' ? '↑' : '↓';
};


