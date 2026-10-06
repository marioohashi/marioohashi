import { useEffect, useRef, useState, type FormEvent } from 'react';

const MAX_LENGTH = 500;
const FALLBACK_ERROR = 'Oops, something went wrong while answering. Please try again!';

interface Message {
    sender: 'ai' | 'user';
    text: string;
}

export function InteractiveTerminal() {
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'ai', text: "Ask me about Mario's career, stack, and projects." }
    ]);
    const [loading, setLoading] = useState(false);
    const logRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
    }, [messages, loading]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userMsg = query.trim();
        if (!userMsg || loading) return;

        setQuery('');
        setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
        setLoading(true);

        try {
            const res = await fetch('/api/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || FALLBACK_ERROR);

            setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
        } catch {
            setMessages(prev => [...prev, { sender: 'ai', text: FALLBACK_ERROR }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <aside className="sb-terminal" aria-labelledby="ai-assistant-title">
            <span className="sb-tape sb-tape-right" />
            <div className="sb-code-bar"><i /><i /><i /> <span id="ai-assistant-title">ask-mario.ai</span></div>
            <div className="sb-terminal-body sb-mono">
                <div ref={logRef} role="log" aria-live="polite" className="space-y-2 mb-4 max-h-40 overflow-y-auto text-xs pr-1">
                    {messages.map((m, idx) => (
                        <p key={idx} className={m.sender === 'user' ? 'text-slate-900 font-semibold' : 'text-slate-700'}>
                            <b>{m.sender === 'user' ? '>' : '✦'}</b> {m.text}
                        </p>
                    ))}
                    {loading && <p className="dim animate-pulse text-xs"><b>✦</b> Thinking...</p>}
                </div>

                <form onSubmit={handleSubmit} className="sb-ai-input flex gap-2">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ask something about Mario..."
                        maxLength={MAX_LENGTH}
                        aria-label="Ask the AI assistant"
                        disabled={loading}
                        className="flex-1 bg-transparent border-b border-slate-400 text-xs outline-none py-1 text-slate-900 disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={loading || !query.trim()}
                        className="text-xs font-bold px-3 py-1 bg-slate-900 text-white rounded hover:bg-slate-800 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        Ask
                    </button>
                </form>
            </div>
        </aside>
    );
}