function generateSearchParams(key: string, value?: string, keysToRemove: string[] = []) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.has(key) ? searchParams.set(key, value!) : searchParams.append(key, value!);

    for (const keyToRemove of keysToRemove) {
        searchParams.delete(keyToRemove);
    }

    const updatedUrl = `${window.location.pathname}?${searchParams.toString()}`;
    return updatedUrl;
}

export default generateSearchParams;
