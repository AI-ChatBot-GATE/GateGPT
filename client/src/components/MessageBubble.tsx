"use client";
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { User, Bot, Clipboard, Check, Bookmark } from 'lucide-react';
import { useState } from 'react';
import api from '@/lib/axios';

interface Message {
    _id?: string;
    role: 'user' | 'assistant';
    content: string;
}

export default function MessageBubble({ message, chatId }: { message: Message, chatId?: string }) {
    const isAi = message.role === 'assistant';
    const [copied, setCopied] = useState(false);
    const [saved, setSaved] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(message.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const saveToNotes = async () => {
        try {
            await api.post('/notes', {
                title: message.content.slice(0, 40) + (message.content.length > 40 ? '...' : ''),
                content: message.content,
                subject: 'Chat Insight',
                chatId: chatId,
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (error) {
            console.error('Error saving note:', error);
            alert('Failed to save note.');
        }
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
                        <div className="absolute top-0 right-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={saveToNotes}
                                title="Save to Notes"
                                className="p-2 text-gray-400 hover:text-orange-500 transition-colors"
                            >
                                {saved ? <Check size={16} className="text-orange-500" /> : <Bookmark size={16} />}
                            </button>
                            <button
                                onClick={copyToClipboard}
                                title="Copy to Clipboard"
                                className="p-2 text-gray-400 hover:text-white transition-colors"
                            >
                                {copied ? <Check size={16} className="text-green-500" /> : <Clipboard size={16} />}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
