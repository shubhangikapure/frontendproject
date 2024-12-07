import React, { useEffect, useState } from 'react';
import { getCustomers, deleteCustomer } from '../api/customerApi';

const CustomerList = ({ onEdit, onRefresh }) => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const { data } = await getCustomers();
                setCustomers(data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };
        fetchCustomers();
    }, [onRefresh]);

    const handleDelete = async (id) => {
        try {
            console.log('Attempting to delete customer with ID:', id); // Debugging line
            const response = await deleteCustomer(id);
            console.log('Delete response:', response); // Log the response for debugging
            onRefresh(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };
    

    return (
        <div className="list-container">
            <h2>Customer List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                      
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer._id}>
                            <td>{customer.customerName}</td>
                           
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerList;
