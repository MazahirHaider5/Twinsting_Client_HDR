"use client";

import React, { useRef, useState, useEffect } from "react";
import { FaBold, FaItalic, FaLink, FaSmile, FaPaperclip } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";

interface MessageInputBoxProps {
  messageText: string;
  setMessageText: (text: string) => void;
  handleSendMessage: () => void;
  onFileShare?: (files: File[]) => void;
}

const MessageInputBox: React.FC<MessageInputBoxProps> = ({
  messageText,
  setMessageText,
  handleSendMessage,
  onFileShare = () => {}
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [formattedText, setFormattedText] = useState("");

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current && 
        !emojiPickerRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('.emoji-trigger')
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Format selected text with HTML tags for bold or italic
  const formatSelectedText = (format: 'bold' | 'italic') => {
    const textArea = textAreaRef.current;
    if (!textArea) return;

    const start = textArea.selectionStart || 0;
    const end = textArea.selectionEnd || 0;
    const selected = messageText.slice(start, end);
    
    // Don't format if no text is selected
    if (start === end) return;
    
    let updatedText;
    if (format === 'bold') {
      updatedText = 
        messageText.slice(0, start) + 
        `<b>${selected}</b>` + 
        messageText.slice(end);
    } else {
      updatedText = 
        messageText.slice(0, start) + 
        `<i>${selected}</i>` + 
        messageText.slice(end);
    }

    setMessageText(updatedText);

    // Restore cursor position with offset for the HTML tags
    const tagLength = format === 'bold' ? 3 : 3; // <b> or <i> is 3 chars
    setTimeout(() => {
      textArea.focus();
      textArea.setSelectionRange(start + tagLength, end + tagLength);
    }, 0);
  };

  const addEmoji = (emojiData: any) => {
    const textArea = textAreaRef.current;
    if (!textArea) return;

    const emoji = emojiData.emoji;
    const start = textArea.selectionStart || 0;
    const end = textArea.selectionEnd || 0;
    const updatedText =
      messageText.slice(0, start) + emoji + messageText.slice(end);

    setMessageText(updatedText);

    setTimeout(() => {
      textArea.focus();
      textArea.setSelectionRange(
        start + emoji.length,
        start + emoji.length
      );
    }, 0);
  };

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const filesArray = Array.from(files);
      onFileShare(filesArray);
      
      // Add file names to message input
      const fileNames = filesArray.map(file => file.name).join(", ");
      const textArea = textAreaRef.current;
      if (textArea) {
        const start = textArea.selectionStart || 0;
        const end = textArea.selectionEnd || 0;
        const updatedText =
          messageText.slice(0, start) + 
          `[Files: ${fileNames}] ` + 
          messageText.slice(end);
        
        setMessageText(updatedText);
      }
      
      // Reset the file input to allow selecting the same file again
      e.target.value = '';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white px-2 py-2 relative">
      <div className="mx-auto w-full rounded-xl bg-[#F7F7F8] p-2 shadow-inner lg:w-[98%]">
        <div className="flex w-full flex-wrap items-center justify-between rounded-lg border border-gray-300 p-2">
          <textarea
            ref={textAreaRef}
            placeholder="Type here something..."
            className="min-w-0 flex-1 bg-transparent text-xs text-gray-700 placeholder-gray-400 outline-none resize-none sm:text-sm md:text-base lg:text-sm"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyPress}
            rows={1}
          />
          <div className="ml-2 flex items-center space-x-2 sm:ml-4 sm:space-x-3">
            <FaBold
              onClick={() => formatSelectedText("bold")}
              className="cursor-pointer text-xs text-gray-600 hover:text-black sm:text-sm"
              title="Bold"
            />
            <FaItalic
              onClick={() => formatSelectedText("italic")}
              className="cursor-pointer text-xs text-gray-600 hover:text-black sm:text-sm"
              title="Italic"
            />
            <FaPaperclip
              onClick={handleFileSelect}
              className="cursor-pointer text-xs text-gray-600 hover:text-black sm:text-sm"
              title="Attach File"
            />
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              multiple
              onChange={handleFileChange}
            />
            <FaSmile
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              className="emoji-trigger cursor-pointer text-xs text-gray-600 hover:text-black sm:text-sm"
              title="Emoji"
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
        <div 
          ref={emojiPickerRef} 
          className="absolute bottom-[60px] right-[20px] z-50"
        >
          <EmojiPicker onEmojiClick={addEmoji} />
        </div>
      )}
    </div>
  );
};

export default MessageInputBox;