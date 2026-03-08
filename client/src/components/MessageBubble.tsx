"use client";
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { User, Bot, Clipboard, Check } from 'lucide-react';
import { useState } from 'react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function MessageBubble({ message }: { message: Message }) {
    const isAi = message.role === 'assistant';
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(message.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`py-8 w-full ${isAi ? 'bg-chatgpt-ai' : 'bg-chatgpt-user'}`}>
            <div className="max-w-3xl mx-auto flex gap-6 px-4">
                <div className={`w-8 h-8 rounded-sm flex items-center justify-center shrink-0 ${isAi ? 'bg-emerald-600' : 'bg-blue-600'}`}>
                    {isAi ? <Bot size={20} /> : <User size={20} />}
                </div>
                <div className="flex-1 prose prose-invert overflow-hidden markdown relative group">
                    <ReactMarkdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                    >
                        {message.content}
                    </ReactMarkdown>

                    {isAi && (
                        <button
                            onClick={copyToClipboard}
                            className="absolute top-0 right-0 p-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            {copied ? <Check size={16} className="text-green-500" /> : <Clipboard size={16} />}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
