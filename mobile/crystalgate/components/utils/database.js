const BASE_URL = "http://192.168.176.34/CrystalGate/api/services/public";

const fetchData = async (service, action, data = null, file = false) => {
    const url = `${BASE_URL}/${service}.php?action=${action}`;

    const options = {
        method: data ? 'POST' : 'GET'
    };
    if(file){
        options.headers = {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
        }
    }

    if (data) {
        options.body = data;
    }

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
