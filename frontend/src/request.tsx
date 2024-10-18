// @ts-ignore
const DEFAULT_URL = "";
//@ts-ignore
const TG = window.Telegram.WebApp;

async function getUserData(endpoint: string, method: string = "GET", data? : any){
    const options = {
        method,
        headers: {
            "Authorization" : TG.initData,
            "ContentType": "application/json"
        },
        body: data ? JSON.stringify(data) : undefined
    };

    const response = await fetch(endpoint, options);
    const jsonData = await response.json();

    if (response.ok){
        return jsonData;
    }
}

export {TG, getUserData};