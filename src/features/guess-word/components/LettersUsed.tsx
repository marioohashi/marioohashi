import { Letter } from './Letter'

export type LetterUsedProps = {
  value: string
  correct: boolean
}

type Props = {
  data: LetterUsedProps[]
}

export function LettersUsed({ data }: Props) {
  return (
    <div className="border-t border-slate-800 pt-5 space-y-3">
      <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">
        Letters Used
      </h5>
      <div className="flex flex-wrap items-center justify-center gap-2 max-h-32 overflow-y-auto p-1">
        {data.map(({ value, correct }) => (
          <Letter 
            key={value}
            value={value} 
            size="small" 
            color={correct ? "correct" : "wrong"} 
          />
        ))}
      </div>
    </div>
  )
}