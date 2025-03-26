import { useState, useEffect } from "react";
import { databases } from "../Appwrite/client"; // Ensure your Appwrite client is set up properly


const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [newsletters, setNewsletters] = useState([]);
  const [selectedNewsletter, setSelectedNewsletter] = useState(null); // For modal

  // Fetch newsletters when the component mounts
  useEffect(() => {
    fetchNewsletters();
  }, []);

  // Function to fetch newsletters from the Appwrite Newsletters collection
  const fetchNewsletters = async () => {
    try {
      const response = await databases.listDocuments(
        "67d4f0f2003cbfbe2a79", // Your Database ID
        "67e3563d00256a027e27"  // Your Newsletters collection ID
      );
      setNewsletters(response.documents);
    } catch (error) {
      console.error("Error fetching newsletters:", error);
      toast.error("Error fetching newsletters!");
    }
  };

  // Function to handle subscription
  const handleSubscribe = async () => {
    if (!email.trim()) return; // Avoid subscribing with an empty email

    try {
      await databases.createDocument(
        "67d4f0f2003cbfbe2a79", // Your Database ID
        "67e357be0035b88c2b7b", // Your Subscribers collection ID
        "unique()",            // Auto-generated unique ID
        { email }
      );
      toast.success("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      console.error("Subscription failed:", error);
      toast.error("Subscription failed. Please try again.");
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedNewsletter(null);
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-extrabold text-center mt-5 mb-6">📨 Newsletter</h1>
      <p className="text-center text-gray-700 mb-8">
        Stay updated with the latest news!
      </p>

      {/* Subscription Form */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full sm:w-auto flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          onClick={handleSubscribe}
          className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 transition text-white font-medium py-3 px-4 rounded-lg"
        >
          Subscribe
        </button>
      </div>

      {/* Newsletters List */}
      <h2 className="text-2xl font-semibold mb-4">📢 Recent Newsletters</h2>
      <ul className="grid grid-cols-1 gap-6">
        {newsletters.length ? (
          newsletters.map((newsletter) => (
            <li
              key={newsletter.$id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-400"
            >
              <h3 className="text-xl font-bold mb-2">{newsletter.title}</h3>
              <p className="text-sm text-gray-500 mb-2">
                {new Date(newsletter.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-4">
                {newsletter.content.substring(0, 100)}...
              </p>
              <button
                onClick={() => setSelectedNewsletter(newsletter)}
                className="text-orange-500 hover:underline font-medium"
              >
                Read More
              </button>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No newsletters available at the moment.</p>
        )}
      </ul>

      {/* Modal for "Read More" */}
      {selectedNewsletter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-50">
          <div className="bg-orange-200 p-8 rounded-lg shadow-xl max-w-lg w-full relative">
            <h3 className="text-2xl font-bold mb-2">{selectedNewsletter.title}</h3>
            <p className="text-sm text-gray-500 mb-4">
              {new Date(selectedNewsletter.date).toLocaleDateString()}
            </p>
            <div className="mb-6 overflow-auto max-h-80">
              <p className="text-gray-700 leading-relaxed">
                {selectedNewsletter.content}
              </p>
            </div>
            <button
              onClick={closeModal}
              className="absolute top-8 right-4 bg-orange-600 hover:bg-orange-700 text-white font-bold px-4 py-1 rounded-full transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsLetter;

