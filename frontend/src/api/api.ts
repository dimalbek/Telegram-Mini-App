
const BASE_URL = "https://telegram-mini-app-x496.onrender.com";

export async function fetchUserData(userId: number){
    const url = `${BASE_URL}/users?user_id=${userId}`;

    const response = await fetch(url, {
        method: "POST"
    });
    const data = await response.json();
    return data;
}

export async function fetchUserCourses(userId){
    return 1
}

