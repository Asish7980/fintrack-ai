import { useEffect, useState } from "react";
import axios from "axios";

function AIInsights() {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/ai/insights",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setInsights(response.data.insights);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        AI Financial Insights
      </h2>

      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="bg-blue-50 dark:bg-gray-700 border-l-4 border-blue-500 p-4 rounded"
          >
            <p className="text-gray-700 dark:text-gray-200">🤖 {insight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AIInsights;
