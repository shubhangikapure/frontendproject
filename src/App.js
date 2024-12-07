import React, { useState } from 'react';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';
import ProjectTypeForm from './components/ProjectTypeForm';
import ProjectTypeList from './components/ProjectTypeList';

import "./App.css"

function App() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedProjectType, setSelectedProjectType] = useState(null);

    const handleEditProject = (project) => setSelectedProject(project);
    const handleEditCustomer = (customer) => setSelectedCustomer(customer);
    const handleEditProjectType = (projectType) => setSelectedProjectType(projectType);

    const handleRefresh = () => {
        setSelectedProject(null);
        setSelectedCustomer(null);
        setSelectedProjectType(null);
    };

    return (
        <div>
            <h1>Project Management</h1>
            <ProjectForm selectedProject={selectedProject} onRefresh={handleRefresh} />
            <ProjectList onEdit={handleEditProject} onRefresh={handleRefresh} />
            <CustomerForm selectedCustomer={selectedCustomer} onRefresh={handleRefresh} />
            <CustomerList onEdit={handleEditCustomer} onRefresh={handleRefresh} />
            <ProjectTypeForm selectedProjectType={selectedProjectType} onRefresh={handleRefresh} />
            <ProjectTypeList onEdit={handleEditProjectType} onRefresh={handleRefresh} />
        </div>
    );
}

export default App;
