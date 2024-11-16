import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { UserIcon, BotIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const ChatbotInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom of the chat container when new messages are added
    if (chatContainerRef.current) {
        // Scroll to the bottom of the chat container when new messages are added
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
  }, [messages]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const newMessage = {
        id: uuidv4(),
        text: inputValue,
        isUser: true,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputValue('');

      // Simulate a response from the system
      setTimeout(() => {
        const systemResponse = {
          id: uuidv4(),
          text: 'This is a sample response from the chatbot.',
          isUser: false,
        };
        setMessages((prevMessages) => [...prevMessages, systemResponse]);
      }, 500);
    }
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Chatbot Interface</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className="chat-container h-[400px] overflow-y-auto"
          ref={chatContainerRef}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-end mb-2 ${
                message.isUser ? 'justify-end' : 'justify-start'
              }`}
            >
              {!message.isUser && <BotIcon className="mr-2" size={24} />}
              <div
                className={`px-4 py-2 rounded-lg max-w-[70%] ${
                  message.isUser
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-200 rounded-bl-none'
                }`}
              >
                {message.text}
              </div>
              {message.isUser && <UserIcon className="ml-2" size={24} />}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center">
          <input
            type="text"
            className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none"
            placeholder="Type your message..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatbotInterface;