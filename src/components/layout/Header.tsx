import { AnimatePresence, motion } from "framer-motion";
import {
	AlertCircle,
	Bell,
	CheckCircle,
	Globe,
	Info,
	LogOut,
	Moon,
	Search,
	Sun,
	X,
} from "lucide-react";
import type React from "react";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../../stores/authStore";
import { useERPStore } from "../../stores/erpStore";
import type { Notification } from "../../types";

const Header: React.FC = () => {
	const {
		darkMode,
		toggleTheme,
		notifications,
		markNotificationAsRead,
		clearNotifications,
	} = useERPStore();
	const { logout } = useAuthStore();
	const { t, i18n } = useTranslation();
	const [showNotifications, setShowNotifications] = useState(false);

	const languages = useMemo(
		() => [
			{ code: "pt", name: t("portuguese"), flag: "🇧🇷" },
			{ code: "en", name: t("english"), flag: "🇺🇸" },
			{ code: "es", name: t("spanish"), flag: "🇪🇸" },
			{ code: "de", name: t("german"), flag: "🇩🇪" },
		],
		[t],
	);

	const getNotificationIcon = useCallback((type: Notification["type"]) => {
		switch (type) {
			case "success":
				return CheckCircle;
			case "warning":
				return AlertCircle;
			case "error":
				return AlertCircle;
			default:
				return Info;
		}
	}, []);

	const getNotificationColor = useCallback((type: Notification["type"]) => {
		switch (type) {
			case "success":
				return "text-green-500";
			case "warning":
				return "text-yellow-500";
			case "error":
				return "text-red-500";
			default:
				return "text-blue-500";
		}
	}, []);

	const unreadCount = useMemo(
		() => notifications.filter((n) => !n.read).length,
		[notifications],
	);

	const handleLanguageChange = useCallback(
		(code: string) => {
			i18n.changeLanguage(code);
		},
		[i18n],
	);

	const handleNotificationClick = useCallback(
		(id: number) => {
			markNotificationAsRead(id);
		},
		[markNotificationAsRead],
	);

	const handleToggleNotifications = useCallback(() => {
		setShowNotifications((prev) => !prev);
	}, []);

	const handleClearNotifications = useCallback(() => {
		clearNotifications();
	}, [clearNotifications]);

	const handleCloseNotifications = useCallback(() => {
		setShowNotifications(false);
	}, []);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent, callback: () => void) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				callback();
			}
		},
		[],
	);

	const NotificationItem: React.FC<{ notification: Notification }> = useMemo(
		() =>
			({ notification }) => {
				const IconComponent = getNotificationIcon(notification.type);

				return (
					<button
						type="button"
						key={notification.id}
						className={`w-full p-4 border-b text-left transition-colors duration-200 ${
							darkMode
								? "border-dark-200 hover:bg-dark-100"
								: "border-primary-100 hover:bg-primary-50"
						} ${notification.read ? "opacity-60" : ""}`}
						onClick={() => handleNotificationClick(notification.id)}
						onKeyDown={(e) =>
							handleKeyDown(e, () => handleNotificationClick(notification.id))
						}
					>
						<div className="flex items-start space-x-3">
							<IconComponent
								size={20}
								className={`flex-shrink-0 ${getNotificationColor(
									notification.type,
								)}`}
							/>
							<div className="flex-1 min-w-0">
								<p
									className={`text-sm ${
										darkMode ? "text-primary-50" : "text-dark-300"
									}`}
								>
									{notification.message}
								</p>
								<p
									className={`text-xs ${
										darkMode ? "text-gray-400" : "text-gray-500"
									} mt-1`}
								>
									{notification.timestamp.toLocaleDateString()} •{" "}
									{notification.timestamp.toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit",
									})}
								</p>
							</div>
							{!notification.read && (
								<div className="w-2 h-2 bg-secondary-500 rounded-full flex-shrink-0 mt-1" />
							)}
						</div>
					</button>
				);
			},
		[
			darkMode,
			getNotificationIcon,
			getNotificationColor,
			handleNotificationClick,
			handleKeyDown,
		],
	);

	return (
		<header>
			<motion.div
				initial={{ y: -50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				className={`sticky top-0 z-50 p-6 border-b transition-colors duration-300 ${
					darkMode
						? "bg-dark-200 border-dark-100"
						: "bg-white border-primary-100"
				} shadow-sm`}
			>
				<div className="flex items-center justify-between">
					<div className="flex-1 max-w-2xl">
						<form role="search" className="relative">
							<Search
								size={20}
								className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
									darkMode ? "text-gray-400" : "text-gray-500"
								}`}
							/>
							<input
								type="search"
								placeholder={t("search")}
								className={`w-full pl-10 pr-4 py-3 rounded-2xl border transition-colors duration-300 ${
									darkMode
										? "bg-dark-100 border-dark-200 text-white placeholder-gray-400 focus:border-secondary-500"
										: "bg-primary-50 border-primary-100 text-dark-300 placeholder-gray-500 focus:border-secondary-500"
								} focus:outline-none focus:ring-2 focus:ring-secondary-500/20`}
							/>
						</form>
					</div>

					<nav
						className="flex items-center space-x-4"
						aria-label="Secondary navigation"
					>
						<div className="relative group">
							<button
								type="button"
								className={`p-2 rounded-xl transition-colors duration-300 ${
									darkMode ? "hover:bg-dark-100" : "hover:bg-primary-100"
								}`}
								aria-label="Change language"
								aria-haspopup="true"
								aria-expanded="false"
							>
								<Globe size={20} />
							</button>
							<ul
								className={`absolute right-0 top-12 w-48 py-2 rounded-xl shadow-2xl border transition-all duration-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible ${
									darkMode
										? "bg-dark-200 border-dark-100"
										: "bg-white border-primary-100"
								}`}
							>
								{languages.map((lang) => (
									<li key={lang.code} role="none">
										<button
											type="button"
											role="menuitem"
											onClick={() => handleLanguageChange(lang.code)}
											onKeyDown={(e) =>
												handleKeyDown(e, () => handleLanguageChange(lang.code))
											}
											className={`w-full px-4 py-2 text-left transition-colors duration-200 flex items-center space-x-3 ${
												i18n.language === lang.code
													? "text-secondary-500 font-semibold"
													: darkMode
														? "text-primary-50 hover:text-white"
														: "text-dark-300 hover:text-dark-200"
											}`}
										>
											<span className="text-lg" aria-hidden="true">
												{lang.flag}
											</span>
											<span>{lang.name}</span>
										</button>
									</li>
								))}
							</ul>
						</div>

						<div className="relative">
							<button
								type="button"
								onClick={handleToggleNotifications}
								onKeyDown={(e) => handleKeyDown(e, handleToggleNotifications)}
								className={`relative p-2 rounded-xl transition-colors duration-300 ${
									darkMode ? "hover:bg-dark-100" : "hover:bg-primary-100"
								}`}
								aria-label={`Notifications ${unreadCount > 0 ? `${unreadCount} unread` : ""}`}
								aria-expanded={showNotifications}
								aria-haspopup="dialog"
							>
								<Bell size={20} />
								{unreadCount > 0 && (
									<span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
										{unreadCount}
										<span className="sr-only">unread notifications</span>
									</span>
								)}
							</button>

							<AnimatePresence>
								{showNotifications && (
									<motion.section
										initial={{ opacity: 0, y: 10, scale: 0.95 }}
										animate={{ opacity: 1, y: 0, scale: 1 }}
										exit={{ opacity: 0, y: 10, scale: 0.95 }}
										className={`absolute right-0 top-12 w-96 rounded-xl shadow-2xl border transition-colors duration-300 ${
											darkMode
												? "bg-dark-200 border-dark-100"
												: "bg-white border-primary-100"
										}`}
										role="dialog"
										aria-label="Notifications"
									>
										<header
											className={`p-4 border-b ${
												darkMode ? "border-dark-100" : "border-primary-100"
											}`}
										>
											<div className="flex items-center justify-between">
												<h2 className="font-semibold text-lg">
													{t("notifications")}
												</h2>
												<div className="flex space-x-2">
													<button
														type="button"
														onClick={handleClearNotifications}
														onKeyDown={(e) =>
															handleKeyDown(e, handleClearNotifications)
														}
														className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
													>
														{t("clearAll")}
													</button>
													<button
														type="button"
														onClick={handleCloseNotifications}
														onKeyDown={(e) =>
															handleKeyDown(e, handleCloseNotifications)
														}
														className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
														aria-label="Close notifications"
													>
														<X size={16} />
													</button>
												</div>
											</div>
										</header>

										<div className="max-h-96 overflow-y-auto">
											{notifications.length === 0 ? (
												<p className="p-4 text-center text-gray-500">
													{t("noNotifications")}
												</p>
											) : (
												<nav aria-label="Notifications list">
													{notifications.map((notification) => (
														<NotificationItem
															key={notification.id}
															notification={notification}
														/>
													))}
												</nav>
											)}
										</div>

										{notifications.length > 0 && (
											<footer
												className={`p-3 border-t ${
													darkMode ? "border-dark-100" : "border-primary-100"
												}`}
											>
												<button
													type="button"
													className="w-full text-center text-sm text-secondary-500 hover:text-secondary-600 font-medium"
													onKeyDown={(e) => handleKeyDown(e, () => {})}
												>
													{t("viewAll")}
												</button>
											</footer>
										)}
									</motion.section>
								)}
							</AnimatePresence>
						</div>

						<motion.button
							type="button"
							whileTap={{ scale: 0.95 }}
							onClick={toggleTheme}
							onKeyDown={(e) => handleKeyDown(e, toggleTheme)}
							className={`p-3 rounded-2xl transition-colors duration-300 ${
								darkMode
									? "bg-secondary-500 text-white"
									: "bg-primary-200 text-primary-700"
							}`}
							aria-label={
								darkMode ? "Switch to light mode" : "Switch to dark mode"
							}
						>
							{darkMode ? <Sun size={20} /> : <Moon size={20} />}
						</motion.button>
						<motion.button
							type="button"
							whileTap={{ scale: 0.95 }}
							onClick={logout}
							onKeyDown={(e) => handleKeyDown(e, logout)}
							className={`p-3 rounded-2xl transition-colors duration-300 ${
								darkMode
									? "bg-red-500 text-white"
									: "bg-primary-200 text-primary-700"
							}`}
							aria-label="Logout"
						>
							<LogOut size={20} />
						</motion.button>
					</nav>
				</div>
			</motion.div>
		</header>
	);
};

export default Header;
