import axios from 'axios';

const API_URL = '/api/education';

// Get all education entries
export const getEducation = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching education data:', error);
    throw error;
  }
};

// Create a new education entry
export const createEducation = async (educationData) => {
  try {
    const response = await axios.post(API_URL, educationData);
    return response.data;
  } catch (error) {
    console.error('Error creating education entry:', error);
    throw error;
  }
};

// Update an education entry
export const updateEducation = async (id, educationData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, educationData);
    return response.data;
  } catch (error) {
    console.error('Error updating education entry:', error);
    throw error;
  }
};

// Delete an education entry
export const deleteEducation = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting education entry:', error);
    throw error;
  }
}; 