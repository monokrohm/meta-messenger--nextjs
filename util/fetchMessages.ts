// For SWR
const fetcher = async () => {
    const res = await fetch("/api/getMessages");
    const data = await res.json();
    const messages = data.messages;

    return messages;
}

export default fetcher;