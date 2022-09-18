import Spinner from './Spinner'

export default function SplashScreen() {
  return (
    <div className='min-h-screen bg-slate-500 flex flex-col justify-center items-center text-3xl'>
      <div className='font-anton md:text-5xl 2xl:text-9xl'>BLOGREAL</div>
      <Spinner/>
    </div>
  )
}
