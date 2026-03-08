"use client";
import { useState, useEffect } from 'react';
import {
    Bookmark, Search, Trash2, Edit3,
    Download, ExternalLink, Calendar, BookOpen,
    FileText, Tag as TagIcon, MoreVertical, X as XIcon, Share2
} from 'lucide-react';
import api from '@/lib/axios';

export default function NotesPage() {
    const [notes, setNotes] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedNote, setSelectedNote] = useState<any>(null);

    useEffect(() => {
        const fetchNotes = async () => {
            // Mock Data - In a real app we'd fetch from API
            setNotes([
                { id: 1, title: 'Process Scheduling Summary', content: 'CPU scheduling deals with the problem of switching among processes. The goal is to make the system efficient, fast and fair. Common algorithms include: 1. FCFS (First Come First Served), 2. SJF (Shortest Job First), 3. Priority Scheduling, 4. Round Robin (RR). GATE often asks about Average Waiting Time and Turnaround Time.', category: 'Operating Systems', date: 'Oct 24, 2024' },
                { id: 2, title: 'Dijkstra Complexity Proof', content: 'Dijkstra algorithm is used for finding the shortest paths between nodes in a graph. For a graph G=(V,E), the complexity is O(E + V log V) when implemented with a Fibonacci heap. With a binary heap, it is O((V+E)log V). Most GATE questions assume binary heap implementation.', category: 'Algorithms', date: 'Oct 25, 2024' },
                { id: 3, title: 'SQL Joins Cheat Sheet', content: '1. INNER JOIN: Returns records that have matching values in both tables. 2. LEFT JOIN: Returns all records from the left table, and the matched records from the right table. 3. RIGHT JOIN: Returns all records from the right table, and the matched records from the left table. 4. FULL JOIN: Returns all records when there is a match in either left or right table.', category: 'DBMS', date: 'Oct 26, 2024' },
            ]);
            setLoading(false);
        };
        fetchNotes();
    }, []);

    const filteredNotes = notes.filter(n => n.title.toLowerCase().includes(search.toLowerCase()) || n.category.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="max-w-6xl mx-auto p-8">
            <header className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                        <Bookmark className="text-orange-500" /> My Notes & Bookmarks
                    </h1>
                    <p className="text-gray-400">Your curated collection of AI insights and personal study notes.</p>
                </div>
                <button className="px-6 py-2.5 bg-gray-900 border border-gray-800 hover:bg-gray-800 rounded-xl text-sm font-bold transition-all flex items-center gap-2 uppercase tracking-widest text-white">
                    <PlusIcon size={16} /> New Note
                </button>
            </header>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-10">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search your notes..."
                        className="w-full bg-gray-900 border border-gray-800 rounded-2xl pl-12 p-4 text-white focus:outline-none focus:border-orange-500 transition-all font-medium"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-64 bg-gray-900/40 border border-gray-800 rounded-3xl animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNotes.map((note) => (
                        <div key={note.id} className="bg-gray-900/40 border border-gray-800 p-8 rounded-3xl hover:border-gray-700 transition-all group flex flex-col justify-between h-80 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div>
                                <div className="flex items-start justify-between mb-6">
                                    <span className="px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-orange-500/20">{note.category}</span>
                                    <button className="text-gray-600 hover:text-white transition-colors"><MoreVertical size={16} /></button>
                                </div>
                                <h3 className="text-xl font-bold mb-3 tracking-tight group-hover:text-orange-400 transition-colors uppercase leading-tight line-clamp-2">{note.title}</h3>
                                <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed italic">{note.content}</p>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-6">
                                    <Calendar size={12} /> {note.date}
                                </div>
                                <div className="flex items-center justify-between pt-6 border-t border-gray-800">
                                    <div className="flex gap-2">
                                        <button className="p-2 bg-gray-800/50 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-all"><Edit3 size={14} /></button>
                                        <button className="p-2 bg-gray-800/50 hover:bg-red-900/20 rounded-lg text-gray-400 hover:text-red-500 transition-all"><Trash2 size={14} /></button>
                                    </div>
                                    <button
                                        onClick={() => setSelectedNote(note)}
                                        className="flex items-center gap-1 text-[10px] font-bold text-orange-500 hover:text-orange-400 uppercase tracking-widest transition-colors"
                                    >
                                        Open Note <ExternalLink size={12} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {selectedNote && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-gray-900 border border-gray-800 max-w-2xl w-full rounded-3xl p-10 relative shadow-2xl overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-orange-500"></div>
                        <button
                            onClick={() => setSelectedNote(null)}
                            className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-xl"
                        >
                            <XIcon size={24} />
                        </button>

                        <span className="px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-orange-500/20 mb-6 inline-block">
                            {selectedNote.category}
                        </span>
                        <h2 className="text-3xl font-black mb-6 uppercase tracking-tight">{selectedNote.title}</h2>
                        <div className="prose prose-invert max-w-none">
                            <p className="text-gray-400 leading-loose text-lg whitespace-pre-wrap">{selectedNote.content}</p>
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-800 flex items-center justify-between">
                            <div className="flex gap-4">
                                <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">
                                    <Download size={16} /> Export PDF
                                </button>
                                <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">
                                    <Share2 size={16} /> Share
                                </button>
                            </div>
                            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Created: {selectedNote.date}</p>
                        </div>
                    </div>
                </div>
            )}

            {!loading && filteredNotes.length === 0 && (
                <div className="flex flex-col items-center justify-center p-20 text-center border-2 border-dashed border-gray-800 rounded-3xl opacity-20">
                    <FileText size={64} className="mb-6" />
                    <h3 className="text-xl font-bold">No notes found</h3>
                    <p className="max-w-xs mt-2 mx-auto">Try a different search term or create a new note.</p>
                </div>
            )}
        </div>
    );
}

function PlusIcon({ size }: { size: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
    );
}
