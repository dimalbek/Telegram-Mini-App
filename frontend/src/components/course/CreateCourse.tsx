
import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchForCourse } from "./SearchForCourse";
import { Generate } from "@/components/course/Generate";

interface Props {}

export const CreateCourse: FC<Props> = ({}) => {
    return (
        <div className="w-full p-4 h-[75dvh]">
            <Tabs defaultValue="search" className="w-full">
            <TabsList className="w-full">
                <TabsTrigger className="w-full" value="search">Search</TabsTrigger>
                <TabsTrigger className="w-full" value="generate">Generate</TabsTrigger>
            </TabsList>
            <TabsContent value="search"><SearchForCourse /></TabsContent>
            <TabsContent value="generate"><Generate /></TabsContent>
            </Tabs>
        </div>
    )
}