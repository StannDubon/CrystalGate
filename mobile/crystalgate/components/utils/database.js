// utils/database.js

const BASE_URL = "http://192.168.88.57/CrystalGate/api/services/public";

const fetchData = async (service, action, data = null) => {
    const url = `${BASE_URL}/${service}.php?action=${action}`;

    const options = {
        method: data ? 'POST' : 'GET',
        
    };

    if (data) {
        options.body = data;
    }

    console.log(options.body);

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json(); // Parsear la respuesta como JSON
        return result; // Devolver el JSON de la respuesta
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

export default fetchData;
