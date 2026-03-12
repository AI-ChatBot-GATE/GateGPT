"use client";
import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { User, Mail, Save, ArrowLeft } from 'lucide-react';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const { user, setUser } = useAuthStore();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const { data } = await api.put('/auth/profile', { name, email });
            setUser(data);
            setMessage('Profile updated successfully!');
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            setMessage(err.response?.data?.message || 'Update failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-8 flex flex-col items-center">
            <div className="w-full">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft size={18} /> Back
                </button>

                <h1 className="text-3xl font-bold mb-8">My Profile</h1>

                <form onSubmit={handleUpdate} className="bg-chatgpt-ai p-8 rounded-2xl border border-gray-700 space-y-6">
                    {message && (
                        <div className={`p-4 rounded-lg text-sm ${message.includes('success') ? 'bg-green-500/10 text-green-500 border border-green-500/50' : 'bg-red-500/10 text-red-500 border border-red-500/50'}`}>
                            {message}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Display Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="text"
                                className="w-full bg-chatgpt-sidebar border border-gray-700 rounded-lg pl-10 p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="email"
                                className="w-full bg-chatgpt-sidebar border border-gray-700 rounded-lg pl-10 p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:bg-gray-700"
                    >
                        <Save size={18} />
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
}
