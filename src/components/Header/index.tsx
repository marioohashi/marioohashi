import styles from './styles.module.css'
import restart from '../../assets/restart.svg'

type Props = {
  current: number
  max: number
  onRestart: () => void
}

export function Header({ current, max, onRestart }: Props) {
  const title = "WORD GUESS".split("")

  function randomColor() {
    const colors = ["#FF6B6B", "#4ECDC4", "#556EE6", "#FFD93D", "#6BCB77", "#FF9F1C"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  function randomRotation() {
    const min = -10
    const max = 10
    const degrees = Math.floor(Math.random() * (max - min + 1)) + min
    return `rotate(${degrees}deg)`
  }

  return (
    <div className={styles.container}>
      <div className={styles.logoTiles}>
        {title.map((char, index) => {
          if (char === " ") {
            return <span key={index} className={styles.wordSpace}></span>
          }

          return (
            <span
              key={index}
              className={styles.tile}
              style={{ backgroundColor: randomColor(), transform: `${randomRotation()}` }}
            >
              {char}
            </span>
          )
        })}
      </div>

      <span className={styles.subtitle}>Guess the hidden word</span>

      <header>
        <span>
          <strong>{current}</strong> of {max} attempts
        </span>

        <button type="button" onClick={onRestart}>
          <img src={restart} alt="Restart icon" />
        </button>
      </header>
    </div>
  )
}