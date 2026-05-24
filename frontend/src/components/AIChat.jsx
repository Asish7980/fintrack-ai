import { useState } from 'react';

function AIChat() {

  const [message, setMessage] = useState('');

  const [chat, setChat] = useState([]);

  const [loading, setLoading] = useState(false);


  // =====================================
  // SIMPLE OFFLINE AI CHAT
  // =====================================
  const sendMessage = async () => {

    if (!message) return;

    setLoading(true);

    // USER MESSAGE
    const userMessage = {
      sender: 'user',
      text: message
    };

    setChat((prev) => [...prev, userMessage]);

    let aiReply = '';

    const lower = message.toLowerCase();


    // =====================================
    // AI RESPONSES
    // =====================================
    if (
      lower.includes('save') ||
      lower.includes('savings')
    ) {

      aiReply =
        'Try reducing unnecessary shopping and food expenses. Setting monthly savings goals can also improve financial discipline.';

    }

    else if (
      lower.includes('budget')
    ) {

      aiReply =
        'Create separate budgets for food, travel, shopping, and entertainment to better manage your finances.';

    }

    else if (
      lower.includes('expense') ||
      lower.includes('spending')
    ) {

      aiReply =
        'Your expenses can be controlled by tracking recurring subscriptions and limiting impulse purchases.';

    }

    else if (
      lower.includes('income')
    ) {

      aiReply =
        'Consider building additional income sources like freelancing, internships, or investments.';

    }

    else if (
      lower.includes('invest')
    ) {

      aiReply =
        'Start with low-risk investments like SIPs or index funds for long-term financial growth.';

    }

    else if (
      lower.includes('debt')
    ) {

      aiReply =
        'Focus on paying high-interest debt first while maintaining minimum payments on other loans.';

    }

    else {

      aiReply =
        'Track your income and expenses regularly to maintain healthy financial habits.';

    }


    // =====================================
    // DELAY FOR AI EFFECT
    // =====================================
    setTimeout(() => {

      const aiMessage = {
        sender: 'ai',
        text: aiReply
      };

      setChat((prev) => [...prev, aiMessage]);

      setLoading(false);

    }, 1000);

    setMessage('');

  };


  return (

    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mt-10">

      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        AI Financial Assistant
      </h2>


      {/* CHAT AREA */}
      <div className="h-80 overflow-y-auto border rounded-lg p-4 dark:border-gray-600">

        {chat.length === 0 && (

          <p className="text-gray-500 dark:text-gray-300">
            Ask AI anything about your finances...
          </p>

        )}

        {chat.map((msg, index) => (

          <div
            key={index}
            className={`mb-4 flex ${
              msg.sender === 'user'
                ? 'justify-end'
                : 'justify-start'
            }`}
          >

            <div
              className={`px-4 py-3 rounded-xl max-w-xs ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
              }`}
            >

              {msg.text}

            </div>

          </div>

        ))}

        {loading && (

          <div className="flex justify-start">

            <div className="bg-gray-200 dark:bg-gray-700 dark:text-white px-4 py-3 rounded-xl">

              Thinking...

            </div>

          </div>

        )}

      </div>


      {/* INPUT AREA */}
      <div className="
flex
flex-col
sm:flex-row
gap-4
mt-6
">

        <input
          type="text"
          placeholder="Ask AI about your finances..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {

            if (e.key === 'Enter') {

              sendMessage();

            }

          }}
          className="flex-1 p-4 rounded-lg border dark:bg-gray-700 dark:text-white"
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >

          {loading ? '...' : 'Send'}

        </button>

      </div>

    </div>

  );

}

export default AIChat;