type Props = React.ComponentProps<"button"> & {
  title: string
}

export function Button({ title, ...rest }: Props) {
  return (
    <button
      type="button"
      className="h-12 px-6 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-slate-100 font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-600/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      {...rest}
    >
      {title}
    </button>
  )
}