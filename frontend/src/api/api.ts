export const BASE_URL = "https://telegram-mini-app-x496.onrender.com";

export async function fetchUserData(userId: number){
    const url = `${BASE_URL}/users`;
    const body = JSON.stringify({user_id: userId});
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body
    });
    const data = await response.json();
    return data;
}

// export async function fetchUserCourses(userId: any){
//     return 1
// }

