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
        { sender: 'ai', text: "Ask me my career, stack, and projects." }
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
        <aside className="sb-paper sb-note" aria-labelledby="ai-assistant-title">
            <span className="sb-tape sb-tape-right" />
            <span className="sb-note-holes" aria-hidden="true"><i /><i /><i /></span>
            <p id="ai-assistant-title" className="sb-hand sb-note-title">Ask Mario&apos;s AI assistant ✎</p>
            <div ref={logRef} role="log" aria-live="polite" className="sb-note-log">
                {messages.map((m, idx) => (
                    <p key={idx} className={m.sender === 'user' ? 'sb-note-user' : 'sb-note-ai'}>
                        {m.text}
                    </p>
                ))}
                {loading && <p className="sb-note-ai sb-note-wait">mario: thinking…</p>}
            </div>

            <form onSubmit={handleSubmit} className="sb-note-form">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask something about Mario..."
                    maxLength={MAX_LENGTH}
                    aria-label="Ask the AI assistant"
                    disabled={loading}
                />
                <button type="submit" className="sb-btn sb-btn-ink" disabled={loading || !query.trim()}>
                    Ask <span aria-hidden="true">↗</span>
                </button>
            </form>
        </aside>
    );
}
