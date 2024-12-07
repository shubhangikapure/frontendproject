import React, { useEffect, useState } from 'react';
import { getProjects, deleteProject } from '../api/projectApi';

const ProjectList = ({ onEdit, onRefresh }) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data } = await getProjects();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, [onRefresh]);

    const handleDelete = async (id) => {
        try {
            const response = await deleteProject(id);
            console.log('Project deleted successfully:', response);
            onRefresh();
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    return (
        <div className="list-container">
            <h2>Project List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Reference Number</th>
                        <th>Project Name</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Customer</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project._id}>
                            <td>{project.projectReferenceNumber}</td>
                            <td>{project.projectName}</td>
                            <td>{project.projectType ? project.projectType.projectTypeName : 'N/A'}</td>
                            <td>{project.status}</td>
                            <td>{project.customer ? project.customer.customerName : 'N/A'}</td>
                            <td>
                                <button onClick={() => onEdit(project)}>Edit</button>
                                <button onClick={() => handleDelete(project._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectList;
