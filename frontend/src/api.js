import { API_HOST } from "./constants.js";

export const fetchUserDetails = async (authToken) => {
    try {
        const response = await fetch(`${API_HOST}/api/users/details`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${authToken}`,
            },
        });

        if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage.error);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching user details:", error);
        throw error;
    }
};

export const loginUser = async (username, password) => {
    const response = await fetch(`${API_HOST}/api/users/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error);
    }

    return await response.json();
};

export const registerUser = async (username, email, password) => {
    const response = await fetch(`${API_HOST}/api/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error);
    }

    return await response.json();
};

export const changeUserPassword = async (authToken, current_password, new_password) => {
    const response = await fetch(`${API_HOST}/api/users/change-password/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`,
        },
        body: JSON.stringify({ current_password, new_password }),
    });

    if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error);
    }

    return await response.json();
};

export const getCart = async (authToken) => {
    const response = await fetch(`${API_HOST}/api/cart/`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${authToken}`,
        },
    });

    if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error);
    }

    return await response.json();
};

export const postCart = async (authToken, item_id) => {
    const response = await fetch(`${API_HOST}/api/cart/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`,
        },
        body: JSON.stringify({ item_id }),
    });

    if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error);
    }

    return await response.json();
};

export const putCart = async (authToken, item_id) => {
    const response = await fetch(`${API_HOST}/api/cart/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`,
        },
        body: JSON.stringify({ item_id }),
    });

    if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error);
    }

    return await response.json();
};

export const deleteCart = async (authToken) => {
    const response = await fetch(`${API_HOST}/api/cart/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Token ${authToken}`,
        },
    });

    if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error);
    }

    return await response.json();
};

export const getItems = async (authToken) => {
    const headers = authToken
        ? { 'Authorization': `Token ${authToken}` }
        : {};

    const response = await fetch(`${API_HOST}/api/items/`, {
        method: 'GET',
        headers,
    });

    if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error);
    }

    return await response.json();
}

export const postItem = async (authToken, item) => {
    const response = await fetch(`${API_HOST}/api/items/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`,
        },
        body: JSON.stringify(item),
    });

    if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error);
    }

    return await response.json();
}

export const getItemById = async (authToken, item_id) => {
    const headers = authToken
        ? { 'Authorization': `Token ${authToken}` }
        : {};

    const response = await fetch(`${API_HOST}/api/items/${item_id}`, {
        method: 'GET',
        headers,
    });

    if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error);
    }

    return await response.json();
}

export const getOrder = async (authToken) => {
    const response = await fetch(`${API_HOST}/api/order/`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${authToken}`,
        },
    });

    if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error);
    }

    return await response.json();
};