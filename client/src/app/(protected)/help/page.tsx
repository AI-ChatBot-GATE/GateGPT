"use client";
import { HelpCircle, BookOpen, ExternalLink, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HelpPage() {
    const router = useRouter();

    return (
        <div className="max-w-3xl mx-auto p-8 flex flex-col items-center">
            <div className="w-full">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft size={18} /> Back
                </button>

                <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                    <HelpCircle className="text-blue-500" /> Help & Support
                </h1>

                <div className="space-y-6">
                    <HelpCard
                        title="How to prepare for GATE?"
                        description="Start by understanding the syllabus and exam pattern. Consistency is key. Practice previous year questions (PYQs) regularly."
                    />
                    <HelpCard
                        title="How does GateGPT help?"
                        description="GateGPT acts as your personal tutor. You can ask for step-by-step solutions to algorithm problems, explanations of complex OS concepts, or revision summaries."
                    />
                    <HelpCard
                        title="Is the AI always correct?"
                        description="While GateGPT is highly accurate for computer science subjects, always verify critical formulas and complex mathematical proofs with standard textbooks like Galvin (OS) or Cormen (Algorithms)."
                    />

                    <div className="mt-12 p-6 bg-blue-600/10 border border-blue-500/30 rounded-2xl">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <BookOpen size={20} /> Essential Resources
                        </h2>
                        <ul className="space-y-3">
                            <li>
                                <a href="https://gate.iitk.ac.in/" target="_blank" className="flex items-center justify-between p-3 bg-chatgpt-sidebar rounded-lg hover:bg-gray-800 transition-colors">
                                    <span>Official GATE Website</span>
                                    <ExternalLink size={14} />
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-between p-3 bg-chatgpt-sidebar rounded-lg hover:bg-gray-800 transition-colors text-gray-400">
                                    <span>GateGPT Syllabus Guide</span>
                                    <ExternalLink size={14} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

function HelpCard({ title, description }: { title: string, description: string }) {
    return (
        <div className="bg-chatgpt-ai p-6 rounded-2xl border border-gray-700">
            <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
            <p className="text-gray-400 leading-relaxed">{description}</p>
        </div>
    );
}
