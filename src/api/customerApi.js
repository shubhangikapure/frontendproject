import API from './index';

export const getCustomers = () => API.get('/customers');
export const createCustomer = (customerData) => API.post('/customers', customerData);
export const updateCustomer = (id, customerData) => API.put(`/customers/${id}`, customerData);
export const deleteCustomer = (id) => API.delete(`/customers/${id}`); // Make sure this matches your backend route
