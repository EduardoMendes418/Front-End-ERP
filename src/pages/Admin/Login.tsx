import type React from "react";
import { Suspense } from "react";
import { motion } from "framer-motion";
import Background from "../../components/Background";
import { AdminLoginForm } from "./components/AdminLoginForm";
import { LanguageSwitcher } from "../../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const AdminLogin: React.FC = () => {
	const { t } = useTranslation();

	return (
		<div className="relative min-h-screen bg-gray-900 overflow-hidden">
			<Suspense fallback={null}>
				<Background />
			</Suspense>

			<div className="absolute top-4 right-4 z-10">
				<LanguageSwitcher />
			</div>

			<div className="flex items-center justify-center min-h-screen">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="w-full max-w-md p-10 space-y-8 bg-white/5 backdrop-filter backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl"
				>
					<motion.div
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="flex flex-col items-center mb-8"
					>
						<h2
							className="mt-6 text-3xl font-bold text-center text-white"
							style={{ fontFamily: "'Poppins', sans-serif" }}
						>
							{t("welcomeAdmin")}
						</h2>
						<p className="mt-2 text-center text-gray-400">
							{t("loginSubtitleAdmin")}
						</p>
					</motion.div>

					<AdminLoginForm />
				</motion.div>
			</div>
		</div>
	);
};

export default AdminLogin;
