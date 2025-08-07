export function getAccessToken(): string | null {
    return localStorage.getItem('access_token');
}

export function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login'; // или через navigate
}
