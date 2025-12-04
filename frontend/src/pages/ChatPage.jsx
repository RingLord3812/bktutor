import React, { useState } from 'react';
import { 
  Add as AddIcon, 
  Search as SearchIcon, 
  MoreHoriz as MoreHorizIcon, 
  Edit as EditIcon, 
  Send as SendIcon 
} from '@mui/icons-material';

const ChatPage = () => {
  const [activeUser, setActiveUser] = useState(1);
  const [messageInput, setMessageInput] = useState('');

  // Dummy Data
  const users = [
    {
      id: 1,
      name: 'Jane Cooper',
      avatar: 'https://i.pravatar.cc/150?u=1',
      status: 'online',
      lastMessage: 'I hope it goes well.',
      time: 'just now',
      unread: 2,
    },
    {
      id: 2,
      name: 'Jenny Wilson',
      avatar: 'https://i.pravatar.cc/150?u=2',
      status: 'offline',
      lastMessage: 'I am really impressed! The...',
      time: '2 d',
      unread: 0,
    },
    {
      id: 3,
      name: 'Robert Fox',
      avatar: 'https://i.pravatar.cc/150?u=3',
      status: 'online',
      lastMessage: 'Hello! How are you?',
      time: '1 w',
      unread: 0,
    },
  ];

  const messages = [
    {
      id: 1,
      senderId: 2, // Incoming
      text: 'Hi there! How can I help you today?',
      time: '10:00 AM',
    },
    {
      id: 2,
      senderId: 1, // Outgoing (Me)
      text: 'I have a question about the course schedule.',
      time: '10:02 AM',
    },
    {
      id: 3,
      senderId: 2, // Incoming
      text: 'Sure, what would you like to know?',
      time: '10:03 AM',
    },
    {
      id: 4,
      senderId: 1, // Outgoing (Me)
      text: 'Is there a slot available on Friday morning?',
      time: '10:05 AM',
    },
    {
      id: 5,
      senderId: 2, // Incoming
      text: 'Let me check for you. One moment please.',
      time: '10:06 AM',
    },
  ];

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    console.log('Sending message:', messageInput);
    setMessageInput('');
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Left Column: Sidebar List (30-35%) */}
      <div className="w-1/3 min-w-[320px] border-r border-gray-200 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center p-5">
          <h1 className="text-2xl font-bold text-gray-900">Chat</h1>
          <button className="bg-indigo-50 text-indigo-600 p-2 rounded-lg hover:bg-indigo-100 transition-colors">
            <AddIcon />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-5 pb-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-300 focus:ring focus:ring-blue-200 sm:text-sm transition duration-150 ease-in-out"
              placeholder="Search"
            />
          </div>
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => setActiveUser(user.id)}
              className={`flex items-center gap-3 p-4 cursor-pointer transition-colors ${
                activeUser === user.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="relative">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={user.avatar}
                  alt={user.name}
                />
                {user.status === 'online' && (
                  <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-green-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className={`text-sm font-bold truncate ${activeUser === user.id ? 'text-white' : 'text-gray-900'}`}>
                    {user.name}
                  </h3>
                  <span className={`text-xs ${activeUser === user.id ? 'text-blue-100' : 'text-gray-500'}`}>
                    {user.time}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className={`text-sm truncate ${activeUser === user.id ? 'text-blue-100' : 'text-gray-500'}`}>
                    {user.lastMessage}
                  </p>
                  {user.unread > 0 && (
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-600 rounded-full">
                      {user.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Chat Window (65-70%) */}
      <div className="flex-1 flex flex-col h-full">
        {/* Chat Header */}
        <div className="h-[80px] border-b border-gray-200 flex items-center justify-between px-6 bg-white shrink-0">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={users.find(u => u.id === activeUser)?.avatar || 'https://i.pravatar.cc/150'}
                alt="User"
              />
              <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-green-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {users.find(u => u.id === activeUser)?.name || 'User'}
              </h2>
              <p className="text-sm text-gray-500">Active Now</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizIcon />
          </button>
        </div>

        {/* Message Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          <div className="flex justify-center mb-6">
            <span className="bg-red-50 text-gray-500 text-xs px-3 py-1 rounded-lg">
              Today
            </span>
          </div>

          <div className="space-y-4">
            {messages.map((msg) => {
              const isOutgoing = msg.senderId === 1; // Assuming 1 is current user
              return (
                <div
                  key={msg.id}
                  className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'} items-end gap-2`}
                >
                  {!isOutgoing && (
                    <img
                      className="w-8 h-8 rounded-full object-cover mb-1"
                      src={users.find(u => u.id === activeUser)?.avatar} // Using active user avatar for incoming
                      alt="Sender"
                    />
                  )}
                  <div
                    className={`max-w-[70%] px-4 py-3 text-sm ${
                      isOutgoing
                        ? 'bg-blue-600 text-white rounded-2xl rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Footer */}
        <div className="p-5 border-t border-gray-200 bg-white shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EditIcon className="text-blue-600" fontSize="small" />
              </div>
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Type your message"
              />
            </div>
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors font-medium"
            >
              <SendIcon fontSize="small" />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
