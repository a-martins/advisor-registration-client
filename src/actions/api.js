import axios from 'axios';

const baseUrl = "http://localhost:59749/api/"

export default {
    advisor(url = baseUrl + 'advisor') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(`${url}\\${id}`),
            create: newAdvisor => axios.post(url, newAdvisor),
            update: (id, updatedAdvisor) => axios.put(`${url}\\${id}`, updatedAdvisor),
            delete: id => axios.delete(`${url}\\${id}`)
        }
    }
}