import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = React.useState(null);

    const login = ({ username }) => {
        setUser({ username });
        navigate('/profile');
    };
    
    const logout = () => {
        setUser(null);
        navigate('/');
    };
    
    const auth = { user, login, logout };

    return (
        <AuthContext.Provider value={auth}>
        {children}
        </AuthContext.Provider>
    );
    }

function AuthRoute(props){
    const auth = useAuth();

    if (!auth.user) {
        return <Navigate to="/login" />;
    }

    return props.children;
}

function useAuth() {
    const auth = React.useContext(AuthContext)
    return auth;
}

export {
    AuthProvider,
    AuthRoute,
    useAuth,
};