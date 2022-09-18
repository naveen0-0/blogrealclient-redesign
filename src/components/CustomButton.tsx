
export default function CustomButton({ children, goto }:any) {
  return (
    <button onClick={goto} className="bg-slate-500 hover:bg-slate-400 px-2 py-1 rounded-full flex items-center w-full md:mr-2">
      {children}
    </button>
  )
}
