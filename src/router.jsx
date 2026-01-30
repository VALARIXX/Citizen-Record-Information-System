import { createBrowserRouter } from 'react-router-dom';

import ProtectedRoute from './features/shared/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import CitizenDashboard from './features/citizen/CitizenDashboard';
import RegistrySearch from './features/census/RegistrySearch';
import AnalyticsDashboard from './features/admin/AnalyticsDashboard';
import CitizenProfile from './features/citizen/CitizenProfile';
import CertificateRequest from './features/citizen/CertificateRequest';
import HouseholdView from './features/citizen/HouseholdView';
import EnrollmentForm from './features/census/EnrollmentForm';
import ApplicationProcessing from './features/census/ApplicationProcessing';
import UserManagement from './features/admin/UserManagement';
import SystemLogs from './features/admin/SystemLogs';
import AdminProfile from './features/admin/AdminProfile';
import OfficerProfile from './features/census/OfficerProfile';
import OfficerDashboard from './features/census/OfficerDashboard';
import AdminDashboard from './features/admin/AdminDashboard';


const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: 'citizen',
        element: <ProtectedRoute allowedRoles={['CITIZEN']} />,
        children: [
            { path: '', element: <CitizenDashboard /> },
            { path: 'profile', element: <CitizenProfile /> },
            { path: 'household', element: <HouseholdView /> },
            { path: 'certificates', element: <CertificateRequest /> },
        ]
    },
    {
        path: 'census',
        element: <ProtectedRoute allowedRoles={['OFFICER']} />,
        children: [
            { path: '', element: <OfficerDashboard /> },
            { path: 'search', element: <RegistrySearch /> },
            { path: 'enroll', element: <EnrollmentForm /> },
            { path: 'tasks', element: <ApplicationProcessing /> },
            { path: 'profile', element: <OfficerProfile /> },
        ]
    },
    {
        path: 'admin',
        element: <ProtectedRoute allowedRoles={['ADMIN']} />,
        children: [
            { path: '', element: <AdminDashboard /> },
            { path: 'analytics', element: <AnalyticsDashboard /> },
            { path: 'users', element: <UserManagement /> },
            { path: 'logs', element: <SystemLogs /> },
            { path: 'profile', element: <AdminProfile /> },
        ]
    },
]);

export default router;
