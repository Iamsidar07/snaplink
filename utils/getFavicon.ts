export async function getFaviconUrl(url: string) {
    try {
        // Fetch the HTML content of the given URL
        const response = await fetch(url);
        const html = await response.text();

        // Use a regular expression to find the favicon link in the HTML
        const faviconMatch = html.match(/<link.*?rel=['"]?icon['"]?.*?href=['"](.*?)['"].*?>/i);

        if (faviconMatch && faviconMatch[1]) {
            // If a favicon link is found, return its URL
            return new URL(faviconMatch[1], url).toString();
        } else {
            // If no favicon link is found, return a default favicon URL
            return 'https://example.com/favicon.ico'; // Replace with your default favicon URL
        }
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error fetching favicon:', error);
        return null;
    }
}

// Example usage:
const url = 'https://example.com';
getFaviconUrl(url)
    .then((faviconUrl) => {
        if (faviconUrl) {
            console.log('Favicon URL:', faviconUrl);
        } else {
            console.log('No favicon found for the URL.');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
