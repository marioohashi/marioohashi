import { useMemo } from 'react'
import restart from '../../../assets/restart.svg'

type Props = {
  current: number
  max: number
  onRestart: () => void
}

export function GameHeader({ current, max, onRestart }: Props) {
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

  // Memoriza o estilo dos tiles para não sorteá-los novamente a cada digitação
  const tileStyles = useMemo(() => {
    return title.map(() => ({
      backgroundColor: randomColor(),
      transform: randomRotation()
    }))
  }, [])

  return (
    <div className="flex flex-col items-center text-center space-y-4 pb-4 border-b border-slate-800">
      <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2">
        {title.map((char, index) => {
          if (char === " ") {
            return <span key={index} className="w-3 sm:w-4" />
          }

          return (
            <span
              key={index}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center font-extrabold text-slate-950 rounded-lg text-sm sm:text-base shadow-md transition-transform select-none"
              style={tileStyles[index]}
            >
              {char}
            </span>
          )
        })}
      </div>

      <span className="text-xs sm:text-sm text-slate-400 font-medium">
        Guess the hidden word
      </span>

      <header className="w-full flex items-center justify-between pt-2 px-1 text-sm">
        <span className="text-slate-400 font-medium">
          <strong className="text-slate-100 font-bold text-base">{current}</strong> of {max} wrong attempts
        </span>

        <button 
          type="button" 
          onClick={onRestart}
          className="p-2 rounded-xl bg-slate-800 border border-slate-700/60 hover:bg-slate-700 hover:border-slate-600 transition-colors cursor-pointer group"
          title="Restart Game"
        >
          <img src={restart} alt="Restart icon" className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity" />
        </button>
      </header>
    </div>
  )
}