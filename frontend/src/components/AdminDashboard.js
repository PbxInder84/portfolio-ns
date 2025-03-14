import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import DashboardHome from './admin/DashboardHome';
import ProfileManager from './admin/ProfileManager';
import EducationManager from './admin/EducationManager';
import ExperienceManager from './admin/ExperienceManager';
import ProjectManager from './admin/ProjectManager';
import BlogManager from './admin/BlogManager';
import SettingsManager from './admin/SettingsManager';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/profile" element={<ProfileManager />} />
        <Route path="/education" element={<EducationManager />} />
        <Route path="/experience" element={<ExperienceManager />} />
        <Route path="/projects" element={<ProjectManager />} />
        <Route path="/blog" element={<BlogManager />} />
        <Route path="/settings" element={<SettingsManager />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard; 