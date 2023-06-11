export async function queryBot(userMessage: string, history: string) {
    const url = "http://localhost:3000/chat";
    console.log(history)
    const content = JSON.stringify({ message: userMessage, history: history});
    console.log(content);
    return await fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: content,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    });
}
export async function parseBotResponse(response: Response) {
    if (!response.ok) {
        return "Sorry, I'm not feeling well today. Try again later.";
    }
    const responseMessage = await response.text();
    console.log("Got response:" + responseMessage);
    return responseMessage;
}