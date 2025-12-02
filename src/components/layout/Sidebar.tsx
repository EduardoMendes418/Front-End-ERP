import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
	LayoutDashboard,
	TrendingUp,
	Package,
	Users,
	FileText,
	Settings,
	BarChart3,
} from "lucide-react";
import { useERPStore } from "../../stores/erpStore";
import { useTranslation } from "react-i18next";

interface MenuItem {
	icon: React.ElementType;
	label: string;
	path: string;
	badge?: number;
}

const Sidebar: React.FC = () => {
	const { darkMode, notifications } = useERPStore();
	const { t } = useTranslation();
	const location = useLocation();

	const menuItems: MenuItem[] = [
		{ icon: LayoutDashboard, label: t("dashboard"), path: "/dashboard" },
		{ icon: TrendingUp, label: t("sales"), path: "/sales" },
		{ icon: Package, label: t("inventory"), path: "/inventory" },
		{ icon: Users, label: t("customers"), path: "/customers" },
		{ icon: BarChart3, label: t("reports"), path: "/reports" },
		{ icon: Settings, label: t("settings"), path: "/settings" },
	];

	const unreadNotifications = notifications.filter((n) => !n.read).length;

	return (
		<motion.div
			initial={{ x: -100, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			className={`w-64 min-h-screen p-6 transition-colors duration-300 ${
				darkMode ? "bg-gray-800" : "bg-white"
			} shadow-2xl relative flex flex-col`}
		>
			<div className="flex items-center space-x-3 mb-10">
				<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
					<span className="text-white font-bold text-lg">ERP</span>
				</div>
				<div>
					<span
						className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
					>
						Pro
					</span>
					<p
						className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
					>
						Business Suite
					</p>
				</div>
			</div>

			<nav className="space-y-2 flex-1">
				{menuItems.map((item, index) => (
					<motion.div
						key={item.label}
						initial={{ x: -20, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ delay: index * 0.1 }}
					>
						<Link
							to={item.path}
							className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
								location.pathname === item.path
									? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
									: darkMode
										? "text-gray-300 hover:bg-gray-700 hover:text-white"
										: "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
							}`}
						>
							<div className="flex items-center space-x-3">
								<item.icon size={20} />
								<span className="font-medium">{item.label}</span>
							</div>
							{item.badge && (
								<span
									className={`px-2 py-1 text-xs rounded-full ${
										location.pathname === item.path
											? "bg-white text-blue-500"
											: "bg-blue-500 text-white"
									}`}
								>
									{item.badge}
								</span>
							)}
						</Link>
					</motion.div>
				))}
			</nav>

			<motion.div
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.8 }}
				className={`p-4 rounded-2xl ${
					darkMode ? "bg-gray-700" : "bg-gray-100"
				} mt-6`}
			>
				<div className="flex items-center space-x-3">
					<div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
						AM
					</div>
					<div className="flex-1 min-w-0">
						<p
							className={`font-semibold truncate ${darkMode ? "text-white" : "text-gray-900"}`}
						>
							Admin Master
						</p>
						<p
							className={`text-sm truncate ${darkMode ? "text-gray-400" : "text-gray-500"}`}
						>
							admin@erp.com
						</p>
					</div>
					{unreadNotifications > 0 && (
						<span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
							{unreadNotifications}
						</span>
					)}
				</div>
			</motion.div>
		</motion.div>
	);
};

export default Sidebar;
