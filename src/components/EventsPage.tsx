"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const EventsPage = () => {
  const [data, setData] = useState({ events: [], articles: [] });

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="bg-custom-blue p-8  text-white">
      {/* Upcoming Events Section */}
      <h2 className="text-3xl font-bold mb-4">UPCOMING EVENTS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {data.events.map((event: any) => (
          <div
            key={event.id}
            className="bg-white  text-black rounded-lg p-4 shadow-lg relative"
          >
            <Image
              src={event.image}
              alt={event.title}
              width={300}
              height={200}
              className="rounded-t-lg"
            />
            <div className="p-4 ">
              <span className="bg-blue-200 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full uppercase">
                {event.type}
              </span>
              <h3 className="mt-2 font-bold text-lg">{event.title}</h3>
              <p className="text-gray-600">{event.date}</p>
              <a
                href={event.link}
                className="text-yellow-500 font-semibold mt-4 inline-block"
              >
                {event.buttonText} &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
      <button className="bg-yellow-500 text-black font-bold py-3 px-6 rounded-full shadow-lg hover:bg-yellow-600 transition duration-200">
        View More Events
      </button>

      {/* Read About It Section */}
      <h2 className="text-3xl font-bold mt-12 mb-4">READ ABOUT IT...</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {data.articles.map((article: any) => (
          <div
            key={article.id}
            className="bg-white  text-black rounded-lg p-4 shadow-lg relative"
          >
            <Image
              src={article.image}
              alt={article.title}
              width={300}
              height={200}
              className="rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">{article.title}</h3>
              <p className="text-gray-600">{article.date}</p>
              <a
                href={article.link}
                className="text-yellow-500 font-semibold mt-4 inline-block"
              >
                {article.buttonText} &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
      <button className="bg-yellow-500 text-black font-bold py-3 px-6 rounded-full shadow-lg hover:bg-yellow-600 transition duration-200">
        View More Articles
      </button>
    </div>
  );
};

export default EventsPage;
