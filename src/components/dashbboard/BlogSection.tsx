import React from "react";

const BlogSection: React.FC = () => {
  return (
    <div className="bg-gray-100 p-8 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="border-r border-gray-300">
          <h2 className="text-2xl font-bold mb-4">Read all About It</h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <span className="text-pink-500 mr-2">➤</span>
              <div>
                <h3 className="text-lg font-medium">Marketing trends</h3>
                <p className="text-sm text-gray-600">
                  Stay up-to-date with the latest insights
                </p>
              </div>
            </li>
            <li className="flex items-center">
              <span className="text-pink-500 mr-2">➤</span>
              <div>
                <h3 className="text-lg font-medium">Content strategy</h3>
                <p className="text-sm text-gray-600">
                  Plan and execute effective content marketing
                </p>
              </div>
            </li>
            <li className="flex items-center">
              <span className="text-pink-500 mr-2">➤</span>
              <div>
                <h3 className="text-lg font-medium">Social media marketing</h3>
                <p className="text-sm text-gray-600">
                  Engage and grow your social audience
                </p>
              </div>
            </li>
            <li className="flex items-center">
              <span className="text-pink-500 mr-2">➤</span>
              <div>
                <h3 className="text-lg font-medium">SEO optimization</h3>
                <p className="text-sm text-gray-600">
                  Improve your search engine visibility
                </p>
              </div>
            </li>
            <li className="flex items-center">
              <span className="text-pink-500 mr-2">➤</span>
              <div>
                <h3 className="text-lg font-medium">Email marketing</h3>
                <p className="text-sm text-gray-600">
                  Nurture leads and drive conversions
                </p>
              </div>
            </li>
            <li className="flex items-center">
              <span className="text-pink-500 mr-2">➤</span>
              <div>
                <h3 className="text-lg font-medium">Branding</h3>
                <p className="text-sm text-gray-600">
                  Develop a strong brand identity
                </p>
              </div>
            </li>
            <li className="flex items-center">
              <span className="text-pink-500 mr-2">➤</span>
              <div>
                <h3 className="text-lg font-medium">Case studies</h3>
                <p className="text-sm text-gray-600">
                  See how our work drives results
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">From the blog</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://via.placeholder.com/100"
                alt="Blog"
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-lg font-medium">
                  The Future of Marketing: Predictions for the Next 5 Years
                </h3>
                <a href="#" className="text-blue-500 text-sm hover:underline">
                  Read more &gt;
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <img
                src="https://via.placeholder.com/100"
                alt="Blog"
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-lg font-medium">
                  Crafting a Killer Content Strategy: Tips and Tricks for
                  Success
                </h3>
                <a href="#" className="text-blue-500 text-sm hover:underline">
                  Read more &gt;
                </a>
              </div>
            </div>
          </div>
          <a
            href="#"
            className="text-blue-500 text-sm hover:underline mt-4 block"
          >
            Browse all articles &gt;
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
