const BASE_URL = "http://192.168.231.177/CrystalGate/api/services/public";

const fetchData = async (service, action, data = null) => {
    const url = `${BASE_URL}/${service}.php?action=${action}`;

    const options = {
        method: data ? 'POST' : 'GET',        
    };

    if (data) {
        options.body = data;
    }

    try {
        const response = await Promise.race([
            fetch(url, options),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), 10000))
        ]);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;    
    }
};

export default fetchData;
