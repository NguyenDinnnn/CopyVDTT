import axios from 'axios';

const API_URL = 'https://localhost:7130/api/clinic';

export const getClinics = () => axios.get(API_URL);

export const getClinicById = (id) => axios.get(`${API_URL}/${id}`);

export const createClinic = (data) => axios.post(API_URL, data);

export const updateClinic = (id, data) => axios.put(`${API_URL}/${id}`, data);

export const deleteClinic = (id) => axios.delete(`${API_URL}/${id}`);
