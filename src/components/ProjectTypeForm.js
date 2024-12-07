import React, { useState,useEffect } from 'react';
import { createProjectType,updateProjectType } from '../api/projectTypeApi';

const ProjectTypeForm = ({ selectedProjectType, onRefresh }) => {
    const [projectTypeName, setProjectTypeName] = useState('');

    useEffect(() => {
        if (selectedProjectType) {
            setProjectTypeName(selectedProjectType.projectTypeName);
        }
    }, [selectedProjectType]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const typeData = { projectTypeName };

        try {
            if (selectedProjectType) {
                await updateProjectType(selectedProjectType._id, typeData);
            } else {
                await createProjectType(typeData);
            }
            onRefresh();
            setProjectTypeName('');
        } catch (error) {
            console.error('Error saving project type:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>{selectedProjectType ? 'Update Project Type' : 'Add Project Type'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={projectTypeName}
                    onChange={(e) => setProjectTypeName(e.target.value)}
                    placeholder="Project Type Name"
                    required
                />
                <button type="submit">{selectedProjectType ? 'Update' : 'Add'} Project Type</button>
            </form>
        </div>
    );
};

export default ProjectTypeForm;
