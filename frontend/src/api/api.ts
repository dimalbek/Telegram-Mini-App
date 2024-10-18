
const BASE_URL = "https://5939-178-91-253-84.ngrok-free.app/docs";

export async function fetchUserData(userId: number){
    const url = `${BASE_URL}?user=${userId}`;

    const response = await fetch(url, {
        method: "POST"
    });
    const data = await response.json();
    return data;
}

