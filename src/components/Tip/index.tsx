import tipIcon from '../../assets/tip.svg'
type Props = {
  tip: string
}

export function Tip({ tip }: Props) {
  return (
    <div className="flex items-center gap-3.5 bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl">
      <img src={tipIcon} alt="Tip icon" className="w-6 h-6 object-contain shrink-0" />
      <div>
        <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
          Tip
        </h3>
        <p className="text-sm font-medium text-amber-200/90 leading-tight">
          {tip}
        </p>
      </div>
    </div>
  )
}