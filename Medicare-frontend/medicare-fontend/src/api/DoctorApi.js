import axios from 'axios';

const API_URL = 'https://localhost:7130/api/doctor';

export const getAllDoctors = () => axios.get(API_URL);

export const getDoctorById = (id) => axios.get(`${API_URL}/${id}`);

export const createDoctor = (data) => axios.post(API_URL, data);

export const updateDoctor = (id, data) => axios.put(`${API_URL}/${id}`, data);

export const deleteDoctor = (id) => axios.delete(`${API_URL}/${id}`);
