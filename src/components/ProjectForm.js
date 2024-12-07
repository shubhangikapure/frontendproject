import React, { useState, useEffect } from 'react';
import { createProject, updateProject } from '../api/projectApi';
import { getProjectTypes } from '../api/projectTypeApi';
import { getCustomers } from '../api/customerApi';

const ProjectForm = ({ selectedProject, onRefresh }) => {
    const [projectReferenceNumber, setProjectReferenceNumber] = useState('');
    const [projectName, setProjectName] = useState('');
    const [projectType, setProjectType] = useState('');
    const [status, setStatus] = useState('');
    const [customer, setCustomer] = useState('');
    const [projectTypes, setProjectTypes] = useState([]);
    const [customers, setCustomers] = useState([]);

    // Fetch project types and customers when the component mounts
    useEffect(() => {
        const fetchProjectTypes = async () => {
            try {
                const response = await getProjectTypes();
                setProjectTypes(response.data);
            } catch (error) {
                console.error('Error fetching project types:', error);
            }
        };

        const fetchCustomers = async () => {
            try {
                const response = await getCustomers();
                setCustomers(response.data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        fetchProjectTypes();
        fetchCustomers();
    }, []);

    // Populate form fields if editing an existing project
    useEffect(() => {
        if (selectedProject) {
            setProjectReferenceNumber(selectedProject.projectReferenceNumber);
            setProjectName(selectedProject.projectName);
            setProjectType(selectedProject.projectType._id);
            setStatus(selectedProject.status);
            setCustomer(selectedProject.customer._id);
        }
    }, [selectedProject]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const projectData = {
            projectReferenceNumber,
            projectName,
            projectType,
            status,
            customer,
        };

        try {
            if (selectedProject) {
                await updateProject(selectedProject._id, projectData);
            } else {
                await createProject(projectData);
            }
            onRefresh();
            setProjectReferenceNumber('');
            setProjectName('');
            setProjectType('');
            setStatus('');
            setCustomer('');
        } catch (error) {
            console.error('Error saving project:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>{selectedProject ? 'Update Project' : 'Add Project'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={projectReferenceNumber}
                    onChange={(e) => setProjectReferenceNumber(e.target.value)}
                    placeholder="Project Reference Number"
                    required
                />
                <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Project Name"
                    required
                />
                <select value={projectType} onChange={(e) => setProjectType(e.target.value)} required>
                    <option value="">Select Project Type</option>
                    {projectTypes.map((type) => (
                        <option key={type._id} value={type._id}>{type.projectTypeName}</option>
                    ))}
                </select>
                <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    placeholder="Status"
                    required
                />
                <select value={customer} onChange={(e) => setCustomer(e.target.value)} required>
                    <option value="">Select Customer</option>
                    {customers.map((cust) => (
                        <option key={cust._id} value={cust._id}>{cust.customerName}</option>
                    ))}
                </select>
                <button type="submit">{selectedProject ? 'Update' : 'Add'} Project</button>
            </form>
        </div>
    );
};

export default ProjectForm;
