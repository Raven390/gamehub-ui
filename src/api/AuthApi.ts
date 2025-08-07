import { apiFetch } from './http';

interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

export async function registerUser(payload: RegisterPayload): Promise<void> {
    await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
    }, false); // false — если регистрация не требует токена (гость)
}
