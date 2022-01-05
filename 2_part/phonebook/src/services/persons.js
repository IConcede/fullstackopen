import axios from 'axios';
const baseURL = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseURL).then(response => response.data);

const create = newObj => axios.post(baseURL, newObj).then(response => response.data);

const update = (id, newObj) => axios.put(`${baseURL}/${id}`, newObj).then(response => response.data);

const remove = (id) => axios.delete(`${baseURL}/${id}`);

export const personsService = {getAll, create, update, remove}
