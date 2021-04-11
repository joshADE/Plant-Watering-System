import axios from "axios";

const baseUrl = "http://localhost:49686/api/";

const api = {
    plants(url = baseUrl + 'plants/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newPlant => axios.post(url, newPlant),
            update: (id, updatedPlant) => axios.put(url + id, updatedPlant),
            delete: id => axios.delete(url + id),
            updateWateringStatus: (updates) => axios.put(url, updates)
        }
    }
}

export default api