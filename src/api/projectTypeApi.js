import API from './index';

export const getProjectTypes = () => API.get('/project-types');
export const createProjectType = (typeData) => API.post('/project-types', typeData);
export const updateProjectType = (id, typeData) => API.put(`/project-types/${id}`, typeData);
export const deleteProjectType = (id) => API.delete(`/project-types/${id}`);
