type Props = React.ComponentProps<"input">

export function LetterInput({ ...rest }: Props) {
  return (
    <input
      type="text"
      className="w-14 h-12 text-center text-xl font-bold bg-slate-800 border-2 border-slate-700 text-slate-100 rounded-xl uppercase focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-600"
      {...rest}
    />
  )
}