import React from "react";
import { IoSend } from "react-icons/io5";

// Chat Message Component
const ChatMessage = ({ message }: { message: string }) => {
  return (
    <div className="mb-4 flex items-start gap-3">
      <div className="h-8 w-8 rounded-full bg-gray-200" />
      <div>
        <p className="text-sm font-medium text-gray-700">Nico Robin</p>
        <p className="rounded-lg bg-white p-2 text-sm">{message}</p>
      </div>
    </div>
  );
};

// Chat Section Component
const ChatSection = () => {
  return (
    <div className="flex h-full flex-col">
      {/* Chat Header */}
      <div className="mb-4 flex gap-4 border-b pb-4">
        <button className="flex-1 rounded-full bg-white px-4 py-2 font-medium">Live Chat</button>
        <button className="flex-1 rounded-full px-4 py-2 text-gray-500">Top Chat</button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto">
        <ChatMessage message="This is Amazing!" />
        <ChatMessage message="This is Amazing!" />
        <ChatMessage message="This is Amazing!" />
        <ChatMessage message="This is Amazing!" />
        <ChatMessage message="This is Amazing!" />
        <ChatMessage message="This is Amazing!" />
        <ChatMessage message="This is Amazing!" />
      </div>

      {/* Chat Input */}
      <div className="mt-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a comment..."
          className="flex-1 rounded-full bg-white px-4 py-2 text-sm focus:outline-none"
        />
        <button className="rounded-full bg-[#FF6B6B] p-2 text-white">
          <IoSend size={20} />
        </button>
      </div>
    </div>
  );
};

const ServicesProfile = () => {
  return (
    <section className="flex flex-row p-4">
      {/* LEFT SECTION */}
      <div className="mx-auto w-[70%] max-w-6xl"></div>

      {/* RIGHT SECTION */}
      <div className="sticky top-4 m-10 h-[80vh] w-[20%] rounded-lg bg-gray-100 p-6 shadow-lg">
        <ChatSection />
      </div>
    </section>
  );
};

// // Stream Card Component
// const StreamCard = () => {
//   return (
//     <div className="overflow-hidden rounded-lg bg-white shadow">
//       <div className="relative h-48">
//         <Image src="/images/performance.jpg" alt="Live Performance" fill className="object-cover" />
//         <div className="absolute top-4 left-4 rounded bg-red-600 px-2 py-1 text-xs text-white">LIVE</div>
//         <div className="absolute bottom-4 left-4 rounded bg-black/50 px-2 py-1 text-xs text-white">1.3K viewers</div>
//       </div>
//       <div className="p-4">
//         <h3 className="mb-2 text-lg font-semibold">Performing Live Singing On The Stage Of DXD In Thailand</h3>
//         <div className="flex items-center gap-2">
//           <div className="h-8 w-8 rounded-full bg-gray-200"></div>
//           <div>
//             <p className="text-sm font-medium">Domenico</p>
//             <p className="text-xs text-gray-500">Dota 2</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default ServicesProfile;
