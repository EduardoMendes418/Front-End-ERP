export interface User {
	id: number;
	name: string;
	email: string;
	role: string;
	avatar: string;
	department: string;
}

export interface Product {
	id: number;
	name: string;
	category: string;
	price: number;
	stock: number;
}

export interface DashboardData {
	revenue: number;
	orders: number;
	customers: number;
	growth: number;
}

export interface Notification {
	id: number;
	message: string;
	type: "info" | "success" | "warning" | "error";
	read: boolean;
	timestamp: Date;
}

export interface ERPState {
	darkMode: boolean;
	toggleTheme: () => void;
	users: User[];
	dashboardData: DashboardData;
	products: Product[];
	notifications: Notification[];
	addUser: (user: Omit<User, "id">) => void;
	updateUser: (id: number, updatedUser: Partial<User>) => void;
	deleteUser: (id: number) => void;
	addNotification: (
		notification: Omit<Notification, "id" | "read" | "timestamp">,
	) => void;
	markNotificationAsRead: (id: number) => void;
	clearNotifications: () => void;
}
