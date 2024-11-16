"use client";

import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { UserIcon, BotIcon, SendIcon, SunIcon, MoonIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const newMessage: Message = {
        id: uuidv4(),
        text: inputValue,
        isUser: true,
      };
      setMessages((prevMessages: Message[]) => [...prevMessages, newMessage]);
      setInputValue('');

      // Simulate a response from the system
      setTimeout(() => {
        const systemResponse: Message = {
          id: uuidv4(),
          text: 'This is a sample response from the chatbot.',
          isUser: false,
        };
        setMessages((prevMessages: Message[]) => [...prevMessages, systemResponse]);
      }, 500);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`flex justify-center items-center min-h-screen ${isDarkMode ? 'dark' : ''} font-roboto`}>
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Chatbot Interface</CardTitle>
            <button
              onClick={toggleTheme}
              className="px-2 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
            >
              {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className="chat-container h-[400px] overflow-y-auto p-4"
            ref={chatContainerRef}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-center ${
                  message.isUser ? 'justify-end' : 'justify-start'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {message.isUser ? <UserIcon /> : <BotIcon />}
                  <div
                    className={`px-4 py-2 rounded-lg shadow-md ${
                      message.isUser
                        ? 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-200'
                        : 'bg-blue-500 text-white dark:bg-blue-700'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-500 text-white flex items-center space-x-1"
              >
                <SendIcon className="w-4 h-4" />
                <span>Send</span>
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Chatbot;
