"use client";

import React, { useRef, useState } from "react";
import { FaBold, FaItalic, FaLink, FaSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";

interface MessageInputBoxProps {
  messageText: string;
  setMessageText: (text: string) => void;
  handleSendMessage: () => void;
}

const MessageInputBox: React.FC<MessageInputBoxProps> = ({
  messageText,
  setMessageText,
  handleSendMessage
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const formatSelectedText = (symbol: string) => {
    const input = inputRef.current;
    if (!input) return;

    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const selected = messageText.slice(start, end);
    const formatted = `${symbol}${selected}${symbol}`;
    const updatedText =
      messageText.slice(0, start) + formatted + messageText.slice(end);

    setMessageText(updatedText);

    // Restore cursor position
    setTimeout(() => {
      input.setSelectionRange(start + symbol.length, end + symbol.length);
      input.focus();
    }, 0);
  };

  const addEmoji = (emojiData: any) => {
    const input = inputRef.current;
    if (!input) return;

    const emoji = emojiData.emoji;
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const updatedText =
      messageText.slice(0, start) + emoji + messageText.slice(end);

    setMessageText(updatedText);

    setTimeout(() => {
      input.focus();
      input.setSelectionRange(
        start + emoji.length,
        start + emoji.length
      );
    }, 0);
  };

  return (
    <div className="border-t border-gray-200 bg-white px-2 py-2 relative">
      <div className="mx-auto w-full rounded-xl bg-[#F7F7F8] p-2 shadow-inner lg:w-[98%]">
        <div className="flex w-full flex-wrap items-center justify-between rounded-lg border border-gray-300 p-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type here something..."
            className="min-w-0 flex-1 bg-transparent text-xs text-gray-700 placeholder-gray-400 outline-none sm:text-sm md:text-base lg:text-sm"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) =>
              e.key === "Enter" && handleSendMessage()
            }
          />
          <div className="ml-2 flex items-center space-x-2 sm:ml-4 sm:space-x-3">
            <FaBold
              onClick={() => formatSelectedText("**")}
              className="cursor-pointer text-xs text-gray-600 hover:text-black sm:text-sm"
            />
            <FaItalic
              onClick={() => formatSelectedText("*")}
              className="cursor-pointer text-xs text-gray-600 hover:text-black sm:text-sm"
            />
            <FaLink className="cursor-pointer text-xs text-gray-600 hover:text-black sm:text-sm" />
            <FaSmile
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              className="cursor-pointer text-xs text-gray-600 hover:text-black sm:text-sm"
            />
          </div>
          <div className="mt-2 ml-2 flex flex-wrap items-center space-x-2 sm:mt-0 sm:ml-4 sm:space-x-4">
            <button className="rounded-full bg-[#5865F2] px-3 py-1 text-xs font-medium text-white sm:px-4 sm:py-2 sm:text-sm">
              Create an offer
            </button>
            <span
              onClick={handleSendMessage}
              className="cursor-pointer text-xs text-gray-700 hover:underline sm:text-sm"
            >
              Send Message
            </span>
          </div>
        </div>
      </div>

      {showEmojiPicker && (
        <div className="absolute bottom-[60px] right-[20px] z-50">
          <EmojiPicker onEmojiClick={addEmoji} />
        </div>
      )}
    </div>
  );
};

export default MessageInputBox;
