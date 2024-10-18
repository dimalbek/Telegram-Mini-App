import { Progress } from "@/components/ui/progress"

const ProgressBar = ({value}: {value: number}) => {
  console.log(value);
  return (
    <Progress value={value} className='w-[85%] h-4'/>
  )
}

export default ProgressBar