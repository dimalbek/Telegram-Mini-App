

export type TCourse = {
    course_id: number;
    title: string;
    description: string;
    createdAt?: string;
    updatedAt?: string;
    is_enrolled: boolean;
}

export type TModule = {
    course_id: number;
    description: string;
    module_id: number;
    position: number;
    title: string;
    updatedAt: string;
}

export type TLesson = {
    description: string;
    image_url: string;
    lesson_id: number;
    have_passed: boolean;
    module_id: number;
    position: number;
    title: string;
}