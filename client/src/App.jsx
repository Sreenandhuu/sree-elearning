import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import Catalog from './pages/Catalog';
import CourseDetail from './pages/CourseDetail';
import Learn from './pages/Learn';
import LiveClasses from './pages/LiveClasses';
import ParentDashboard from './pages/ParentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';

function Home() {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-10 text-sm text-muted">Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'parent') return <Navigate to="/parent" replace />;
  if (user.role === 'teacher' || user.role === 'admin')
    return <Navigate to="/teacher" replace />;
  return <StudentDashboard />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Catalog />} />
            <Route path="/courses/:slug" element={<CourseDetail />} />
            <Route
              path="/learn/:enrollmentId"
              element={
                <ProtectedRoute roles={['student']}>
                  <Learn />
                </ProtectedRoute>
              }
            />
            <Route
              path="/classes"
              element={
                <ProtectedRoute roles={['student']}>
                  <LiveClasses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/parent"
              element={
                <ProtectedRoute roles={['parent']}>
                  <ParentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher"
              element={
                <ProtectedRoute roles={['teacher', 'admin']}>
                  <TeacherDashboard />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
