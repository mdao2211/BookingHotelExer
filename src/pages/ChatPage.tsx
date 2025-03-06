import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

type Message = {
  sender: string;
  message: string;
};

export default function ChatPage() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // Khởi tạo kết nối socket khi component được mount
  useEffect(() => {
    const newSocket = io("http://localhost:3001/chat", {
      withCredentials: true,
    });
    setSocket(newSocket);

    newSocket.on("history", (data: Message[]) => {
      setMessages(data);
    });

    // Lắng nghe sự kiện 'message' từ server
    newSocket.on("message", (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    newSocket.on("messageDeleted", ({ id }: { id: number }) => {
      setMessages((prev) => prev.filter((msg: any) => msg.id !== id));
    });

    // Ngắt kết nối khi component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Xử lý khi người dùng nhấn Join Chat
  const handleJoin = () => {
    if (socket && username.trim() !== "") {
      socket.emit("join", { username });
      setJoined(true);
      console.log(username);
    }
  };

  // Xử lý khi gửi tin nhắn
  const handleSendMessage = () => {
    if (socket && newMessage.trim() !== "") {
      socket.emit("chat", { message: newMessage });
      setNewMessage("");
      console.log(messages);
    }
  };

  return (
    <div className="flex flex-col h-screen p-4">
      {!joined ? (
        <div className="flex flex-col items-center justify-center flex-1">
          <h1 className="text-2xl font-bold mb-4">Join Chat</h1>
          <input
            type="text"
            placeholder="Enter your username"
            className="border p-2 mb-4 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={handleJoin}
            className="bg-blue-500 text-white px-4 py-2 rounded">
            Join Chat
          </button>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-auto mb-4 border p-4 rounded">
            {messages.map((msg: any, index) => (
              <div
                key={index}
                className="mb-2 flex items-center justify-between">
                <div>
                  <span className="font-bold">{msg.sender}:</span>{" "}
                  <span>{msg.message}</span>
                </div>
                {/* Giả sử người dùng có thể xóa tin nhắn của chính mình */}
                {msg.sender === username && (
                  <button
                    onClick={() => {
                      socket?.emit("deleteMessage", { id: msg.id });
                    }}
                    className="text-red-500 ml-2">
                    Xóa
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 border p-2 rounded"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            <button
              onClick={handleSendMessage}
              className="bg-green-500 text-white px-4 py-2 ml-2 rounded">
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
}
