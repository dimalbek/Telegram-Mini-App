import { useState } from "react";

export const Greeting = () => {

    const [fieldName, setFieldName] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    return (
        <main className="w-full flex flex-col items-center h-screen justify-center p-2">
            <h1 className="text-4xl font-bold text-center">Welcome!</h1>
            <div className="flex flex-col mt-4">
                <label htmlFor="name" className="text-lg">Name</label>
                <input type="text" id="name" className="border-2 border-gray-200 rounded-md p-2" value={fieldName} onChange={(e) => setFieldName(e.target.value)} />
            </div>
            <div className="flex flex-col mt-4">
                <label htmlFor="description" className="text-lg">Description</label>
                <textarea id="description" className="border-2 border-gray-200 rounded-md p-2" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
        </main>
    )
}