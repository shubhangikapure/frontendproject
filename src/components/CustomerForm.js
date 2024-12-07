import React, { useState,useEffect } from 'react';
import { createCustomer, updateCustomer } from '../api/customerApi';

const CustomerForm = ({ selectedCustomer, onRefresh }) => {
    const [customerName, setCustomerName] = useState('');

    useEffect(() => {
        if (selectedCustomer) {
            setCustomerName(selectedCustomer.customerName);
        }
    }, [selectedCustomer]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const customerData = { customerName };

        try {
            if (selectedCustomer) {
                await updateCustomer(selectedCustomer._id, customerData);
            } else {
                await createCustomer(customerData);
            }
            onRefresh();
            setCustomerName('');
        } catch (error) {
            console.error('Error saving customer:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>{selectedCustomer ? 'Update Customer' : 'Add Customer'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Customer Name"
                    required
                />
                <button type="submit">{selectedCustomer ? 'Update' : 'Add'} Customer</button>
            </form>
        </div>
    );
};

export default CustomerForm;
