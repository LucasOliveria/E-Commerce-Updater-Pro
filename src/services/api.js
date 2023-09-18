import axios from "axios";

export default axios.create({
    baseURL: 'https://api-e-commerce-updater-pro.onrender.com',
    timeout: 10000,
    headers: { 'Content-type': 'application/json' }
});