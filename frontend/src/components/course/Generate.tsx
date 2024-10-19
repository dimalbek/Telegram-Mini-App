
import { Textarea } from "@/components/ui/textarea"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypographyH3 } from "../ui/typography"
import { useGlobalContext } from "@/context/GlobalContext"
import { useState } from "react"
import { Loader } from "lucide-react"
 
const formSchema = z.object({
    fieldName: z.string(),
    description: z.string(),
})

export const Generate = () => {

    const { user } = useGlobalContext()
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fieldName: "",
            description: "",
        },
      })

      const handleSubmit = (data: z.infer<typeof formSchema>) => {
        if (user) {
            setLoading(true)
            fetch(`https://telegram-mini-app-x496.onrender.com/courses/generate?learning_field=${data.fieldName}&description=${data.description}&user_id=${user.id}`, {
                method: 'POST',
            })
            .then(response => response.json())
            .then(() => {
                setTimeout(() => {
                    setLoading(false)
                    window.location.href = '/courses'
                }, 10000)
            })
        }
        
      }
    
    return (
        <div className="w-full flex flex-col items-center gap-4">
            <TypographyH3 className='text-[24px]'>Generate your own course!</TypographyH3>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 w-full px-4">
                    <FormField
                        control={form.control}
                        name="fieldName"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel htmlFor="fieldName">What do you want to learn?</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel htmlFor="fieldName">Please tell me about yourself</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={loading} className="w-full">{loading ? <Loader className="animate-spin" /> : 'Submit'}</Button>
                </form>
            </Form>
        </div>
    )
}
