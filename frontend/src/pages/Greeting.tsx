
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
 
const formSchema = z.object({
    fieldName: z.string(),
    description: z.string(),
})

export const Greeting = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fieldName: "",
            description: "",
        },
      })

      const handleSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data)
      }
    
    return (
        <main className="w-full flex flex-col items-center h-screen justify-center gap-4 p-2">
            <h1 className="text-4xl px-4 font-bold w-full">Welcome!</h1>
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
                    <Button type="submit" className="w-full">Submit</Button>
                </form>
            </Form>
        </main>
    )
}
