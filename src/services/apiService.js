const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const apiService = {
	async get(endpoint) {
		const response = await fetch(`${SERVER_URL}${endpoint}`);
		return response.json();
	},

	async post(endpoint, data) {
		const response = await fetch(`${SERVER_URL}${endpoint}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		return response.json();
	},

	async put(endpoint, data) {
		const response = await fetch(`${SERVER_URL}${endpoint}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		return response.json();
	},

	async delete(endpoint) {
		const response = await fetch(`${SERVER_URL}${endpoint}`, {
			method: "DELETE",
		});
		return response.json();
	},
};
