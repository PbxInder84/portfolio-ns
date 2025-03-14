import React, { useState, useEffect } from 'react';
import { getEducation, createEducation, updateEducation, deleteEducation } from '../services/educationApi';

function EducationManager() {
  const [educationList, setEducationList] = useState([]);
  const [newEducation, setNewEducation] = useState({ degree: '', institution: '', year: '' });

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const data = await getEducation();
      setEducationList(data);
    } catch (error) {
      console.error('Failed to fetch education data:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await createEducation(newEducation);
      fetchEducation();
      setNewEducation({ degree: '', institution: '', year: '' });
    } catch (error) {
      console.error('Failed to create education entry:', error);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await updateEducation(id, updatedData);
      fetchEducation();
    } catch (error) {
      console.error('Failed to update education entry:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEducation(id);
      fetchEducation();
    } catch (error) {
      console.error('Failed to delete education entry:', error);
    }
  };

  return (
    <div>
      <h2>Manage Education</h2>
      <ul>
        {educationList.map((edu) => (
          <li key={edu._id}>
            {edu.degree} at {edu.institution} ({edu.year})
            <button onClick={() => handleUpdate(edu._id, { degree: 'Updated Degree', institution: edu.institution, year: edu.year })}>Update</button>
            <button onClick={() => handleDelete(edu._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <h3>Add New Education</h3>
        <input
          type="text"
          placeholder="Degree"
          value={newEducation.degree}
          onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
        />
        <input
          type="text"
          placeholder="Institution"
          value={newEducation.institution}
          onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
        />
        <input
          type="text"
          placeholder="Year"
          value={newEducation.year}
          onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
        />
        <button onClick={handleCreate}>Add Education</button>
      </div>
    </div>
  );
}

export default EducationManager; 