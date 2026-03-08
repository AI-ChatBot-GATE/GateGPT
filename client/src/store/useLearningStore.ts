import { create } from 'zustand';
import api from '@/lib/axios';

interface Subject {
    _id: string;
    name: string;
    description: string;
    topics?: any[];
}

interface LearningState {
    subjects: Subject[];
    loading: boolean;
    error: boolean;
    lastFetched: number | null;
    fetchSubjects: (force?: boolean) => Promise<void>;
    setSubjects: (subjects: Subject[]) => void;
}

const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

export const useLearningStore = create<LearningState>((set, get) => ({
    subjects: [],
    loading: false,
    error: false,
    lastFetched: null,

    fetchSubjects: async (force = false) => {
        const { subjects, lastFetched } = get();
        const now = Date.now();

        // Return cached data if available and fresh
        if (!force && subjects.length > 0 && lastFetched && (now - lastFetched < CACHE_DURATION)) {
            return;
        }

        set({ loading: subjects.length === 0, error: false });
        try {
            const { data } = await api.get('/learning/subjects');
            set({
                subjects: data,
                lastFetched: now,
                loading: false
            });
        } catch (error) {
            console.error('Failed to fetch subjects:', error);
            set({ error: true, loading: false });

            // Fallback for demo/empty state if no subjects yet
            if (subjects.length === 0) {
                set({
                    subjects: [
                        { _id: '1', name: 'Operating Systems', description: 'Processes, Memory Management, File Systems, and I/O.' },
                        { _id: '2', name: 'Algorithms', description: 'Searching, Sorting, Graph Algorithms, and Dynamic Programming.' },
                        { _id: '3', name: 'Data Structures', description: 'Arrays, Linked Lists, Stacks, Queues, Trees, and Heaps.' },
                        { _id: '4', name: 'Digital Logic', description: 'Boolean Algebra, Combinational and Sequential Circuits.' }
                    ]
                });
            }
        }
    },

    setSubjects: (subjects) => set({ subjects }),
}));
