import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Globe,
  Bell,
  Search,
  X,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";
import { useERPStore } from "../../stores/erpStore";
import { useTranslation } from "react-i18next";
import { Notification } from "../../types";

const Header: React.FC = () => {
  const {
    darkMode,
    toggleTheme,
    notifications,
    markNotificationAsRead,
    clearNotifications,
  } = useERPStore();
  const { t, i18n } = useTranslation();
  const [showNotifications, setShowNotifications] = useState(false);

  const languages = [
    { code: "pt", name: "Português", flag: "🇧🇷" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
  ];

  const getNotificationIcon = (type: Notification["type"]) => {
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
  };

  const getNotificationColor = (type: Notification["type"]) => {
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
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`sticky top-0 z-50 p-6 border-b transition-colors duration-300 ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } shadow-sm`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search
              size={20}
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="text"
              placeholder={t("search")}
              className={`w-full pl-10 pr-4 py-3 rounded-2xl border transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                  : "bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500"
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative group">
            <button
              className={`p-2 rounded-xl transition-colors duration-300 ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <Globe size={20} />
            </button>
            <div
              className={`absolute right-0 top-12 w-48 py-2 rounded-xl shadow-2xl border transition-all duration-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => i18n.changeLanguage(lang.code)}
                  className={`w-full px-4 py-2 text-left transition-colors duration-200 flex items-center space-x-3 ${
                    i18n.language === lang.code
                      ? "text-blue-500 font-semibold"
                      : darkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`relative p-2 rounded-xl transition-colors duration-300 ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className={`absolute right-0 top-12 w-96 rounded-xl shadow-2xl border transition-colors duration-300 ${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div
                    className={`p-4 border-b ${
                      darkMode ? "border-gray-700" : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{t("notifications")}</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={clearNotifications}
                          className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                          {t("clearAll")}
                        </button>
                        <button
                          onClick={() => setShowNotifications(false)}
                          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        {t("noNotifications")}
                      </div>
                    ) : (
                      notifications.map((notification) => {
                        const IconComponent = getNotificationIcon(
                          notification.type
                        );
                        return (
                          <div
                            key={notification.id}
                            className={`p-4 border-b transition-colors duration-200 ${
                              darkMode
                                ? "border-gray-700 hover:bg-gray-750"
                                : "border-gray-200 hover:bg-gray-50"
                            } ${notification.read ? "opacity-60" : ""}`}
                            onClick={() =>
                              markNotificationAsRead(notification.id)
                            }
                          >
                            <div className="flex items-start space-x-3">
                              <IconComponent
                                size={20}
                                className={`flex-shrink-0 ${getNotificationColor(
                                  notification.type
                                )}`}
                              />
                              <div className="flex-1 min-w-0">
                                <p
                                  className={`text-sm ${
                                    darkMode ? "text-gray-200" : "text-gray-900"
                                  }`}
                                >
                                  {notification.message}
                                </p>
                                <p
                                  className={`text-xs ${
                                    darkMode ? "text-gray-400" : "text-gray-500"
                                  } mt-1`}
                                >
                                  {notification.timestamp.toLocaleDateString()}{" "}
                                  •{" "}
                                  {notification.timestamp.toLocaleTimeString(
                                    [],
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}
                                </p>
                              </div>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {notifications.length > 0 && (
                    <div
                      className={`p-3 border-t ${
                        darkMode ? "border-gray-700" : "border-gray-200"
                      }`}
                    >
                      <button className="w-full text-center text-sm text-blue-500 hover:text-blue-600 font-medium">
                        {t("viewAll")}
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className={`p-3 rounded-2xl transition-colors duration-300 ${
              darkMode ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
