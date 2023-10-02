
export const getHistory = async () => {
    try {
        const res = await fetch(`/api/all`);
        const data = await res.json();
        return data.result;

    } catch (error: any) {
        console.error(error)
    }
}