import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Spinner, Container } from 'react-bootstrap';

function ProtectedRoute({ children, requiredRole = null }) {
    const { user, loading, isAuthenticated, hasRole } = useAuth();

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && !hasRole(requiredRole)) {
        return (
            <Container className="text-center mt-5">
                <div className="alert alert-danger">
                    <h4>Access Denied</h4>
                    <p>You don't have permission to access this page.</p>
                </div>
            </Container>
        );
    }

    return children;
}

export default ProtectedRoute;