import { refreshToken } from '@/features/auth/service';

export async function auth(input: RequestInfo, init: RequestInit = {}) {
    const accessToken = localStorage.getItem('access_token');

    const authInit = {
        ...init,
        headers: {
            ...init.headers,
            Authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
    };

    let res = await fetch(input, authInit);

    if (res.status === 401) {
        // Try refresh
        const refresh_token = localStorage.getItem('refresh_token');
        if (refresh_token) {
            const { access_token } = await refreshToken({ refresh_token: refresh_token });
            localStorage.setItem('access_token', access_token);

            // Retry original request
            authInit.headers = {
                ...authInit.headers,
                Authorization: `Bearer ${access_token}`,
            };
            res = await fetch(input, authInit);
        } else {
            localStorage.clear();
            window.location.href = '/';
        }
    }

    return res;
}
