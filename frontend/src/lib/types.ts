

export type TCourse = {
    course_id: number;
    title: string;
    description: string;
    createdAt?: string;
    updatedAt?: string;
}


export type TModule = {
    id: number;
    title: string;
}

export type TLesson = {
    id: number;
    title: string;
    readingTime: string;
}