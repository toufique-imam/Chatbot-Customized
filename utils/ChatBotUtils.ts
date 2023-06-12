
export async function queryBot(question: string, history: string) {

    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            question: question,
            history: history,
        }),
    });
    return response;
}
export async function parseBotResponse(response: Response) {
    if (!response.ok) {
        return "Sorry, I'm not feeling well today. Try again later.";
    }
    const data = await response.json();
    console.log('data', data);
    if(data.error) {
        return data.error;
    }
    return data.text;
}