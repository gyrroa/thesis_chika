// src/features/users/service.ts
import {
    UpdateUserPayload,
    UpdateUserResponse,
    UpdateChildPayload,
    Child,
    ValidationErrorResponse,
} from './types';

const API = process.env.NEXT_PUBLIC_API_URL;

export async function updateUser(payload: UpdateUserPayload): Promise<UpdateUserResponse> {
    const token = localStorage.getItem('access_token'); 

    const res = await fetch(`${API}/users/me`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(payload),
    });

    const body = await res.json();

    if (!res.ok) {
        if (res.status === 422 && Array.isArray(body.detail)) {
            throw body as ValidationErrorResponse;
        }
        throw new Error(body.detail || res.statusText);
    }

    return body as UpdateUserResponse;
}


export async function updateChild(child_id: string, payload: UpdateChildPayload): Promise<Child> {
    const res = await fetch(`${API}/users/child/${child_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    const body = await res.json();

    if (!res.ok) {
        if (res.status === 422 && Array.isArray(body.detail)) {
            throw body as ValidationErrorResponse;
        }
        throw new Error(body.detail || res.statusText);
    }

    return body as Child;
}

export async function getChild(child_id: string): Promise<Child> {
    const res = await fetch(`${API}/users/child/${child_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    const body = await res.json();

    if (!res.ok) {
        if (res.status === 422 && Array.isArray(body.detail)) {
            throw body as ValidationErrorResponse;
        }
        throw new Error(body.detail || res.statusText);
    }

    return body as Child;
}

export async function getUserChildren(user_id: string): Promise<Child[]> {
    const token = localStorage.getItem('access_token');
    const res = await fetch(`${API}/users/children/${user_id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
        const body = await res.json();
        throw new Error(body.detail || 'Failed to fetch children');
    }

    return res.json();
}
