"use client";
import { useState, useEffect } from 'react';
import {
    ArrowLeft, BookOpen, FileText,
    ChevronRight, Brain, Zap, Star
} from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import api from '@/lib/axios';

export default function SubjectDetail() {
    const params = useParams();
    const router = useRouter();
    const [subject, setSubject] = useState<{ name: string, topics?: { name: string, description: string, formulas?: string[] }[] } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubject = async () => {
            try {
                const { data } = await api.get(`/learning/subjects/${params.name}`);
                setSubject(data);
            } catch (error) {
                console.error('Failed to fetch subject:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSubject();
    }, [params.name]);

    if (loading) return (
        <div className="flex items-center justify-center h-[50vh]">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!subject) return (
        <div className="p-8 text-center mt-20">
            <h1 className="text-2xl font-bold text-white">Subject not found</h1>
            <button onClick={() => router.push('/subjects')} className="mt-4 text-blue-500 hover:underline">Back to Explorer</button>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto p-8">
            <button
                onClick={() => router.push('/subjects')}
                className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-colors group"
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Subject Explorer
            </button>

            <div className="flex items-end gap-6 mb-12">
                <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-3xl shadow-xl shadow-blue-600/20 text-white font-black">
                    {subject.name[0]}
                </div>
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-white">{subject.name}</h1>
                    <p className="text-gray-400 mt-2 font-medium">GATE Computer Science • {subject.topics?.length || 0} Topics</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Topics List */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Course Syllabus</h3>
                    {subject.topics?.map((topic: { name: string, description: string }) => (
                        <div key={topic.name} className="bg-gray-900/40 border border-gray-800 p-6 rounded-3xl hover:border-blue-500/30 transition-all group cursor-pointer">
                            <div className="flex items-start justify-between">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-gray-800 text-gray-400 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <BookOpen size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1 group-hover:text-blue-400 transition-colors uppercase text-sm tracking-tight">{topic.name}</h4>
                                        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed italic">{topic.description}</p>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </div>
                        </div>
                    ))}

                    {/* Personal Notes Section */}
                    <div className="mt-12 pt-12 border-t border-gray-800">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 px-1 flex items-center gap-2">
                            <FileText size={14} className="text-orange-500" /> My {subject.name} Notes
                        </h3>
                        <SubjectNotes subjectName={subject.name} />
                    </div>
                </div>

                {/* Resources & Shortcuts */}
                <div className="space-y-6">
                    <section className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 p-8 rounded-3xl shadow-2xl">
                        <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-8">Subject Toolkit</h3>
                        <div className="space-y-4">
                            <button
                                onClick={() => router.push('/revision')}
                                className="w-full flex items-center gap-4 p-4 bg-gray-800/30 hover:bg-gray-800 border border-gray-700/50 rounded-2xl transition-all group"
                            >
                                <div className="w-10 h-10 bg-emerald-600/10 text-emerald-500 rounded-xl flex items-center justify-center">
                                    <Zap size={18} />
                                </div>
                                <span className="text-sm font-bold text-gray-300 group-hover:text-white uppercase tracking-tight">Revision Notes</span>
                            </button>
                            <button
                                onClick={() => router.push('/practice')}
                                className="w-full flex items-center gap-4 p-4 bg-gray-800/30 hover:bg-gray-800 border border-gray-700/50 rounded-2xl transition-all group"
                            >
                                <div className="w-10 h-10 bg-blue-600/10 text-blue-500 rounded-xl flex items-center justify-center">
                                    <Brain size={18} />
                                </div>
                                <span className="text-sm font-bold text-gray-300 group-hover:text-white uppercase tracking-tight">Practice Quiz</span>
                            </button>
                        </div>
                    </section>

                    <section className="bg-gray-900/40 border border-gray-800 p-8 rounded-3xl">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Star size={14} className="text-yellow-500" /> Must-Know Formulas
                        </h3>
                        <div className="space-y-3">
                            {subject.topics?.flatMap((t: { formulas?: string[] }) => t.formulas || []).length > 0 ? (
                                subject.topics.flatMap((t: { formulas?: string[] }) => t.formulas || []).slice(0, 5).map((formula: string, idx: number) => (
                                    <div key={idx} className="p-4 bg-gray-950 border border-gray-800 rounded-xl text-xs font-mono text-blue-400 break-words">
                                        {formula}
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600 text-xs italic">No formulas listed for this subject yet.</p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

function SubjectNotes({ subjectName }: { subjectName: string }) {
    const [notes, setNotes] = useState<{ _id: string, title: string, content: string, subject: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const { data } = await api.get('/notes');
                // Simple client-side filter for now, in a real app would filter on backend
                const filtered = data.filter((n: { subject: string }) =>
                    n.subject.toLowerCase() === subjectName.toLowerCase() ||
                    n.subject === 'Chat Insight' // Optionally show chat insights if relevant
                );
                setNotes(filtered);
            } catch (error) {
                console.error('Failed to fetch related notes:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchNotes();
    }, [subjectName]);

    if (loading) return <div className="p-4 text-gray-600 text-xs animate-pulse font-bold uppercase tracking-widest">Loading notes...</div>;

    if (notes.length === 0) return (
        <div className="p-8 border-2 border-dashed border-gray-800 rounded-3xl text-center opacity-40">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">No notes for {subjectName} yet.</p>
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notes.map(note => (
                <div key={note._id} className="p-6 bg-gray-900/60 border border-gray-800 rounded-2xl hover:border-orange-500/20 transition-all cursor-pointer group">
                    <h5 className="font-bold text-white mb-2 text-sm uppercase tracking-tight line-clamp-1 group-hover:text-orange-400 transition-colors">{note.title}</h5>
                    <p className="text-xs text-gray-500 line-clamp-2 italic">{note.content}</p>
                </div>
            ))}
        </div>
    );
}
