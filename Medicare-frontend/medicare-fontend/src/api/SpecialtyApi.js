import axios from 'axios';

const API_URL = 'https://localhost:7130/api/specialty';

export const getSpecialties = () => axios.get(API_URL);

export const getSpecialtyById = (id) => axios.get(`${API_URL}/${id}`);

export const createSpecialty = (data) => axios.post(API_URL, data);

export const updateSpecialty = (id, data) => axios.put(`${API_URL}/${id}`, data);

export const deleteSpecialty = (id) => axios.delete(`${API_URL}/${id}`);
