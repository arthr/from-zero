import io from "socket.io-client";

class SocketService {
	constructor() {
		this.socket = null;
	}

	connect() {
		if (!this.socket) {
			const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
			this.socket = io(SOCKET_URL);
		}
		return this.socket;
	}

	disconnect() {
		if (this.socket) {
			this.socket.disconnect();
			this.socket = null;
		}
	}

	on(event, callback) {
		if (this.socket) {
			this.socket.on(event, callback);
		}
	}

	emit(event, data) {
		if (this.socket) {
			this.socket.emit(event, data);
		}
	}
}

export const socketService = new SocketService();
