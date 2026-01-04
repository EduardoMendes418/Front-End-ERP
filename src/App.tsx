import type React from "react";
import { I18nextProvider } from "react-i18next";
import {
	Route,
	BrowserRouter as Router,
	Routes,
	Navigate,
	Outlet,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import i18n from "./i18n";
import Customers from "./pages/Customers/Customers";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory/Inventory";
import Reports from "./pages/Reports/Reports";
import Sales from "./pages/Sales/Sales";
import Settings from "./pages/Settings/Settings";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import SignUp from "./pages/SignUp/SignUp";
import { useAuthStore } from "./stores/authStore";

import "./styles/globals.css";

const PrivateRoutes: React.FC = () => {
	const { isAuthenticated } = useAuthStore();
	return isAuthenticated ? (
		<Layout>
			<Outlet />
		</Layout>
	) : (
		<Navigate to="/login" replace />
	);
};

const App: React.FC = () => {
	return (
		<I18nextProvider i18n={i18n}>
			<Router>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />

					<Route element={<PrivateRoutes />}>
						<Route path="/" element={<Dashboard />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/sales" element={<Sales />} />
						<Route path="/inventory" element={<Inventory />} />
						<Route path="/customers" element={<Customers />} />
						<Route path="/reports" element={<Reports />} />
						<Route path="/settings" element={<Settings />} />
					</Route>
				</Routes>
			</Router>
		</I18nextProvider>
	);
};

export default App;
