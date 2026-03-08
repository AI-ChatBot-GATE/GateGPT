"use client";
import { useState, useRef, useEffect } from 'react';
import { Send, Upload, Mic } from 'lucide-react';

interface ChatInputProps {
    onSend: (content: string) => void;
    disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
    const [input, setInput] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSend = () => {
        if (input.trim() && !disabled) {
            onSend(input);
            setInput('');
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    }, [input]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-chatgpt-main via-chatgpt-main to-transparent pt-10 pb-6 px-4">
            <div className="max-w-3xl mx-auto relative group">
                <textarea
                    ref={textareaRef}
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask GateGPT anything about GATE..."
                    disabled={disabled}
                    className="w-full bg-[#40414f] border border-gray-700/50 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white resize-none shadow-2xl transition-all"
                />
                <button
                    onClick={handleSend}
                    disabled={!input.trim() || disabled}
                    className="absolute right-3 bottom-3 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 transition-colors"
                >
                    <Send size={18} />
                </button>
                <div className="flex gap-4 mt-2 px-2 text-gray-500 text-xs">
                    <button className="flex items-center gap-1 hover:text-gray-300 transition-colors">
                        <Upload size={14} /> Attach File
                    </button>
                    <button className="flex items-center gap-1 hover:text-gray-300 transition-colors">
                        <Mic size={14} /> Voice Input
                    </button>
                </div>
            </div>
            <p className="text-center text-[10px] text-gray-500 mt-3 font-medium">
                GateGPT can make mistakes. Verify important formulas and solutions.
            </p>
        </div>
    );
}
