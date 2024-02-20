const apiUrl = 'https://backend-work-track-app.vercel.app/api/users/login';

export const login = async credentials => {
    return fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then(res => {
        if (!res.ok) throw new Error ('Invalid username or password')
        return res.json();
    })
}