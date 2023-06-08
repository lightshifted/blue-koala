import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../navBar/NavBar';

const ChatCard = () => {
  const [messages, setMessages] = useState([]); // array of message objects
  const [messageText, setMessageText] = useState(''); // text in the message input field
  const [status, setStatus] = useState('Ask a question'); // status message at the top of the chat window
  const [buttonText, setButtonText] = useState('Send'); // change the button text when the message is being sent
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // disable the button when the message is being sent

  const ws = useRef(null); // reference to the WebSocket object

  useEffect(() => {
    const endpoint = "ws://localhost:9000/summary";
    ws.current = new WebSocket(endpoint); // replace with your WebSocket URL
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.sender === 'bot') {
        if (data.type === 'start') {
          setStatus('Computing answer...');
          setMessages((prevMessages) => [...prevMessages, { sender: 'bot', message: 'Assistant: ' }]);
        } else if (data.type === 'stream') {
          setStatus('Chatbot is typing...');
          setMessages((prevMessages) => {
            const newMessages = [...prevMessages];
            newMessages[newMessages.length - 1].message += data.message === '\n' ? '<br>' : data.message;
            return newMessages;
          });
        } else if (data.type === 'info') {
          setStatus(data.message);
        } else if (data.type === 'end' || data.type === 'error') {
          setStatus('Ask a question');
          setButtonText('Send');
          setIsButtonDisabled(false);
          if (data.type === 'error') {
            setMessages((prevMessages) => {
              const newMessages = [...prevMessages];
              newMessages[newMessages.length - 1].message += data.message;
              return newMessages;
            });
          }
        }
      } else {
        setMessages((prevMessages) => [...prevMessages, { sender: 'client', message: 'You: ' + data.message }]);
      }
    };

    return () => {
      if (ws.current) {

    }
    };
  }, []);

  useEffect(() => {
    const endpoint = "ws://localhost:9000/chat";

    ws.current = new WebSocket(endpoint); // replace with your WebSocket URL

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.sender === 'bot') {
        if (data.type === 'start') {
          setStatus('Computing answer...');
          setMessages((prevMessages) => [...prevMessages, { sender: 'bot', message: 'Assistant: ' }]);
        } else if (data.type === 'stream') {
          setStatus('Chatbot is typing...');
          setMessages((prevMessages) => {
            const newMessages = [...prevMessages];
            newMessages[newMessages.length - 1].message += data.message === '\n' ? '<br>' : data.message;
            return newMessages;
          });
        } else if (data.type === 'info') {
          setStatus(data.message);
        } else if (data.type === 'end' || data.type === 'error') {
          setStatus('Ask a question');
          setButtonText('Send');
          setIsButtonDisabled(false);
          if (data.type === 'error') {
            setMessages((prevMessages) => {
              const newMessages = [...prevMessages];
              newMessages[newMessages.length - 1].message += data.message;
              return newMessages;
            });
          }
        }
      } else {
        setMessages((prevMessages) => [...prevMessages, { sender: 'client', message: 'You: ' + data.message }]);
      }
    };

    return () => {
      if (ws.current) {

    }
    };
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (messageText === '') {
      return;
    }

    ws.current.send(messageText);
    setMessageText('');

    setButtonText('Loading...');
    setIsButtonDisabled(true);
  };

  return (

<div className="flex flex-col h-screen bg-gradient-to-r from-gray-100 to-gray-100">
  <Navbar />
  {/* <h2 className="text-2xl font-bold text-center py-5 bg-blue-800 text-white shadow-md rounded-lg">{status}</h2> */}

  <div id="messages" className="px-10 py-2 overflow-y-auto flex-grow bg-gradient-radial shadow-inner">
  <div className="flex justify-center items-center">
  <div id="message-container" className="max-w-full sm:max-w-xl">
  </div>
    <div id="message-container" className="max-w-full sm:max-w-xl">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={
            msg.sender === 'bot'
              ? 'rounded-lg p-4 mb-4 bg-gray-200 shadow-md max-w-xl mx-auto'
              : 'rounded-lg p-4 mb-4 bg-blue-300 shadow-md max-w-xl mx-auto'
          }
          style={{ maxWidth: '800px', minWidth: '550px' }}
        >
          <p className="text-gray-800 font-roboto" dangerouslySetInnerHTML={{ __html: msg.message }} />
        </div>
      ))}
    </div>
  </div>
</div>

  <form onSubmit={sendMessage} className="flex items-center justify-center p-4 shadow-md overflow-auto">
    <div className="max-w-full sm:max-w-xl flex-grow">
      <input
        type="text"
        id="messageText"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        className="w-full p-2 rounded-lg border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:outline-none transition-colors box-shadow"
      />
    </div>
    <button
      type="submit"
      id="send"
      disabled={isButtonDisabled}
      className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded shadow-sm transition-colors"
    >
      {buttonText}
    </button>
  </form>
</div>
  );
};

export default ChatCard;
