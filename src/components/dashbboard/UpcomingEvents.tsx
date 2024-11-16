import React from "react";

const events = [
  {
    id: 1,
    date: "July 20, 2024",
    title: "WFH: Is the New Normal?",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    date: "July 20, 2024",
    title: "WFH: Is the New Normal?",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    date: "July 20, 2024",
    title: "WFH: Is the New Normal?",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    date: "July 20, 2024",
    title: "WFH: Is the New Normal?",
    image: "https://via.placeholder.com/150",
  },
];

const UpcomingEvents: React.FC = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Upcoming Events in Your City</h2>
        <button className="bg-custom-blue text-white px-4 py-2 rounded-lg hover:bg-teal-600">
          View All
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white p-4 rounded-lg shadow-md text-center"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <p className="text-sm text-gray-500">{event.date}</p>
            <h3 className="text-lg font-medium mb-2">{event.title}</h3>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600">
              Register →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
