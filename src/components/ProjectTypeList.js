import React, { useEffect, useState } from 'react';
import { getProjectTypes, deleteProjectType } from '../api/projectTypeApi'; // Ensure these API functions are defined

const ProjectTypeList = ({ onEdit, onRefresh }) => {
    const [projectTypes, setProjectTypes] = useState([]);

    // Fetch project types when the component mounts or when onRefresh changes
    useEffect(() => {
        const fetchProjectTypes = async () => {
            try {
                const { data } = await getProjectTypes(); // Call API to fetch project types
                setProjectTypes(data);
            } catch (error) {
                console.error('Error fetching project types:', error);
            }
        };
        fetchProjectTypes();
    }, [onRefresh]); // Dependency array ensures it runs when `onRefresh` changes

    // Function to delete a project type
    const handleDelete = async (id) => {
        try {
            await deleteProjectType(id); // Call API to delete the project type
            onRefresh(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting project type:', error);
        }
    };

    return (
        <div className="list-container">
            <h2>Project Type List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Project Type Name</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {projectTypes.map((type) => (
                        <tr key={type._id}>
                            <td>{type.projectTypeName}</td>
                           
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectTypeList  