type Props = {
  value?: string
  size?: "default" | "small"
  color?: "default" | "correct" | "wrong"
}

export function Letter({ value = "", size = "default", color = "default" }: Props) {
  const sizeClasses = {
    default: "w-11 h-13 sm:w-12 sm:h-14 text-2xl rounded-xl",
    small: "w-8 h-9 text-sm rounded-lg"
  }

  const colorClasses = {
    default: "bg-slate-800 text-slate-100 border-2 border-slate-700 shadow-md",
    correct: "bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/50 shadow-emerald-500/10",
    wrong: "bg-rose-500/20 text-rose-400 border-2 border-rose-500/50 shadow-rose-500/10"
  }

  return (
    <div
      className={`
        flex items-center justify-center font-extrabold uppercase transition-all duration-200 select-none
        ${sizeClasses[size]}
        ${colorClasses[color]}
      `}
    >
      <span>{value}</span>
    </div>
  )
}