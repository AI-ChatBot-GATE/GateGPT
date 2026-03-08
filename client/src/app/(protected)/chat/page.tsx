"use client";
import ChatWindow from '@/components/ChatWindow';
import { useParams } from 'next/navigation';

export default function ChatPage() {
    const params = useParams();
    const chatId = params?.id as string | undefined;

    return (
        <ChatWindow chatId={chatId} />
    );
}
