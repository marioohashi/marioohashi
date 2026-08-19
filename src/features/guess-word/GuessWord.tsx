import { WORDS, type Challenge } from '../../utils/words-en'
import { useEffect, useMemo, useState } from 'react'
import { GameHeader } from './components/GameHeader'
import { Tip } from './components/Tip'
import { Letter } from './components/Letter'
import { LetterInput } from './components/LetterInput'
import { Button } from './components/Button'
import { LettersUsed, type LetterUsedProps } from './components/LettersUsed'
import {Navbar} from '../../components/layout/Navbar'

export default function GuessWord() {
  const [letter, setLetter] = useState('')
  const [lettersUsed, setLettersUsed] = useState<LetterUsedProps[]>([])
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing")
  const [gameId, setGameId] = useState(0)
  
  // Estado para substituir o alert nativo do navegador
  const [alertMessage, setAlertMessage] = useState<string | null>(null)

  const ATTEMPT_MARGIN = 5

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length)
    const randomWord = WORDS[index]

    setChallenge(randomWord)
    setLetter('')
    setLettersUsed([])
    setGameStatus("playing")
    setAlertMessage(null)
    setGameId(prev => prev + 1)
  }

  function handleRestartGame() {
    const isConfirmed = window.confirm('Are you sure you want to restart?')
    if (isConfirmed) {
      startGame()
    }
  }

  function handleConfirm() {
    if (!challenge) return

    const raw = letter.trim()

    if (!raw) {
      setAlertMessage('Please type a letter')
      return
    }

    if (!/^[A-Za-z]$/.test(raw)) {
      setAlertMessage('Only letters A–Z are allowed')
      return
    }

    const value = raw.toUpperCase()

    const exists = lettersUsed.find(
      used => used.value.toUpperCase() === value
    )

    if (exists) {
      setLetter('')
      setAlertMessage(`You already used the letter ${value}`)
      return
    }

    const hits =
      challenge.word
        .toUpperCase()
        .split('')
        .filter(char => char === value).length

    const correct = hits > 0

    setLettersUsed(prev => [...prev, { value, correct }])
    setLetter('')
  }

  useEffect(() => {
    startGame()
  }, [])

  const uniqueLettersCount = useMemo(() => {
    if (!challenge) return 0
    return new Set(challenge.word.toUpperCase().split('')).size
  }, [challenge])

  const correctLettersCount = useMemo(
    () => lettersUsed.filter(l => l.correct).length,
    [lettersUsed]
  )

  const wrongLettersCount = useMemo(
    () => lettersUsed.filter(l => !l.correct).length,
    [lettersUsed]
  )

  const maxAttempts = ATTEMPT_MARGIN

  useEffect(() => {
    if (!challenge) return

    if (correctLettersCount === uniqueLettersCount && uniqueLettersCount > 0) {
      setGameStatus("won")
      return
    }

    if (wrongLettersCount >= maxAttempts) {
      setGameStatus("lost")
    }
  }, [challenge, correctLettersCount, uniqueLettersCount, wrongLettersCount, maxAttempts])

  if (!challenge) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative">
      {alertMessage && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md p-6 text-center">
          <div className="bg-slate-900 border border-amber-500/40 p-6 sm:p-8 rounded-3xl shadow-2xl max-w-sm w-full space-y-5">
            <span className="text-4xl block">⚠️</span>
            <h3 className="text-xl font-bold text-amber-400">
              Attention
            </h3>
            <p className="text-slate-300 text-sm font-medium leading-relaxed">
              {alertMessage}
            </p>
            <div className="pt-2">
              <Button title="Got it" onClick={() => setAlertMessage(null)} />
            </div>
          </div>
        </div>
      )}

      {gameStatus === "won" && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md p-6 text-center">
          <div className="bg-slate-900 border border-emerald-500/30 p-8 rounded-3xl shadow-2xl max-w-sm w-full space-y-6">
            <span className="text-5xl block">🎉</span>
            <h2 className="text-3xl font-extrabold text-emerald-400">
              Congratulations!
            </h2>
            <p className="text-slate-400 text-sm">
              You guessed the word correctly!
            </p>
            <div className="pt-2">
              <Button title="Play Again" onClick={startGame} />
            </div>
          </div>
        </div>
      )}

      {gameStatus === "lost" && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md p-6 text-center">
          <div className="bg-slate-900 border border-rose-500/30 p-8 rounded-3xl shadow-2xl max-w-sm w-full space-y-6">
            <span className="text-5xl block">💀</span>
            <h2 className="text-3xl font-extrabold text-rose-500">
              You Lost!
            </h2>
            <p className="text-slate-400 text-sm">
              The word was: <strong className="text-slate-200 uppercase">{challenge.word}</strong>
            </p>
            <div className="pt-2">
              <Button title="Try Again" onClick={startGame} />
            </div>
          </div>
        </div>
      )}
      <main className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <Navbar/>

        <GameHeader
          key={gameId}
          current={wrongLettersCount}
          max={maxAttempts}
          onRestart={handleRestartGame}
        />

        <Tip tip={challenge.tip} />

        {/* Display das Letras da Palavra */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-4">
          {challenge.word.split('').map((char, index) => {
            const letterUsed = lettersUsed.find(
              used => used.value.toUpperCase() === char.toUpperCase()
            )

            const value = letterUsed ? letterUsed.value : ''
            const color = !letterUsed
              ? 'default'
              : letterUsed.correct
                ? 'correct'
                : 'wrong'

            return (
              <Letter
                key={index}
                value={value}
                color={color}
              />
            )
          })}
        </div>

        {/* Campo de Palpite */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">
            Guess
          </h4>
          <div className="flex items-center justify-center gap-3 max-w-xs mx-auto">
            <LetterInput
              autoFocus
              maxLength={1}
              placeholder="?"
              value={letter}
              onChange={e => setLetter(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  handleConfirm()
                }
              }}
            />
            <Button title="Confirm" onClick={handleConfirm} />
          </div>
        </div>

        <LettersUsed data={lettersUsed} />
      </main>
    </div>
  )
}