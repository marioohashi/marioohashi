import styles from './app.module.css'
import { WORDS, type Challenge } from './utils/words-en'
import { useEffect, useMemo, useState } from 'react'
import { Header } from './components/Header'
import { Tip } from './components/Tip'
import { Letter } from './components/Letter'
import { Input } from './components/Input'
import { Button } from './components/Button'
import { LettersUsed, type LetterUsedProps } from './components/LettersUsed'

export default function App() {
  const [letter, setLetter] = useState('')
  const [lettersUsed, setLettersUsed] = useState<LetterUsedProps[]>([])
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing")


  const ATTEMPT_MARGIN = 5

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length)
    const randomWord = WORDS[index]

    setChallenge(randomWord)
    setLetter('')
    setLettersUsed([])
    setGameStatus("playing")
  }


  function handleRestartGame() {
    const isConfirmed = window.confirm('Are you sure you want to restart?')
    if (isConfirmed) {
      startGame()
      alert('Restarting the game...')
    }
  }

  function handleConfirm() {
    if (!challenge) return

    const raw = letter.trim()

    if (!raw) {
      alert('Please type a letter')
      return
    }

    if (!/^[A-Za-z]$/.test(raw)) {
      alert('Only letters A–Z are allowed')
      return
    }

    const value = raw.toUpperCase()

    const exists = lettersUsed.find(
      used => used.value.toUpperCase() === value
    )

    if (exists) {
      setLetter('')
      alert(`You already used the letter ${value}`)
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

  function endGame(message: string) {
    alert(message)
    startGame()
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

  useEffect(() => {
    if (!challenge) return

    if (correctLettersCount === uniqueLettersCount && uniqueLettersCount > 0) {
      setGameStatus("won")
      return
    }

    const attemptLimit = challenge.word.length + ATTEMPT_MARGIN

    if (lettersUsed.length >= attemptLimit) {
      setGameStatus("lost")
    }
  }, [challenge, correctLettersCount, uniqueLettersCount, lettersUsed.length])

  if (!challenge) {
    return null
  }

  const maxAttempts = challenge.word.length + ATTEMPT_MARGIN



  return (
    <div className={styles.container}>
      {gameStatus === "won" && (
        <div className={styles.overlayMessage}>
          <h2>Congratulations!</h2>
          <Button title="Play Again" onClick={startGame} />
        </div>
      )}

      {gameStatus === "lost" && (
        <div className={styles.overlayMessage}>
          <h2>You Lost!</h2>
          <Button title="Try Again" onClick={startGame} />
        </div>
      )}

      <main>
        <Header
          current={lettersUsed.length}
          max={maxAttempts}
          onRestart={handleRestartGame}
        />

        <Tip tip={challenge.tip} />

        <div className={styles.word}>
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

        <h4>Guess</h4>
        <div className={styles.guess}>
          <Input
            autoFocus
            maxLength={1}
            placeholder="?"
            value={letter}
            onChange={e => setLetter(e.target.value)}
          />
          <Button title="Confirm" onClick={handleConfirm} />
        </div>

        <LettersUsed data={lettersUsed} />
      </main>
    </div>
  )
}
