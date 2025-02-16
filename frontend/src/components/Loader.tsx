import { Skeleton } from "./ui/skeleton"
import { Progress } from "./ui/progress"
import { useEffect, useState } from "react"

export default function Loader() {
  const [percent, setPercent] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev: number) => Math.min(prev + Math.random() * 10, 100))
    }, 10)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <Skeleton className='w-32 h-32 rounded-full' />
      <Progress className='w-64' value={percent} />
      <p className='text-gray-500'>Loading, please wait...</p>
    </div>
  )
}
