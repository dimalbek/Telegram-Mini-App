import { cn } from "@/lib/utils"
import { FC } from "react"

interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement> {
}

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
}


export const TypographyH1: FC<TypographyProps> = ({children, ...props}) => {
    return (
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl" {...props}>
        {children}
      </h1>
    )
  }
  

  export const TypographyH2: FC<TypographyProps> = ({children, ...props}) => {
    return (
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl" {...props}>
        {children}
      </h1>
    )
  }
  

  export const TypographyH3: FC<TypographyProps> = ({children, ...props}) => {
    return (
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl" {...props}>
        {children}
      </h1>
    )
  }
  
  export const TypographyP: FC<ParagraphProps> = ({className, ...props}) =>  {
    return (
      <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)} {...props}>
        {props.children}
      </p>
    )
  }
  