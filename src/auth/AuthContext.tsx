import React, { createContext, useContext, useEffect, useState } from 'react';

// Типы
interface User {
    username: string;
    email?: string;
    accessToken: string;
    refreshToken: string;
}

interface AuthContextType {
    user: User | null;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
    loading: boolean
}

// Создаём контекст
const AuthContext = createContext<AuthContextType | undefined>(undefined);


// Провайдер
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Чтение токена из localStorage при загрузке страницы (auto-login)
    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');
        console.log('[AuthProvider] access:', accessToken, 'refresh:', refreshToken);
        if (accessToken && refreshToken) {
            // тут можно распарсить JWT и достать email/username, если нужно
            setUser({ username: 'user', accessToken, refreshToken });
        }
        setLoading(false); // <- по-любому
    }, []);

    const login = (accessToken: string, refreshToken: string) => {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        setUser({ username: 'user', accessToken, refreshToken });
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading  }}>
            {children}
        </AuthContext.Provider>
    );
};

// Хук для использования
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth должен использоваться внутри AuthProvider');
    return ctx;
};
