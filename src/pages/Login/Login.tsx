import type React from "react";
import { useState, Suspense } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Background from "../../components/Background";

const Login: React.FC = () => {
	const { login } = useAuthStore();
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);

	const mockUser = {
		email: "test@test.com",
		password: "password",
	};

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email("Invalid email address")
				.required("Required"),
			password: Yup.string().required("Required"),
		}),
		onSubmit: (values) => {
			if (
				values.email === mockUser.email &&
				values.password === mockUser.password
			) {
				login();
				navigate("/");
			} else {
				setError("Invalid email or password");
			}
		},
	});

	return (
		<div className="relative min-h-screen bg-gray-900 overflow-hidden">
			<Suspense fallback={null}>
				<Background />
			</Suspense>
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
							Welcome
						</h2>
						<p className="mt-2 text-center text-gray-400">
							Enter your credentials to access your account
						</p>
					</motion.div>

					{error && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							className="p-4 mt-6 text-sm text-red-200 bg-red-500/50 rounded-lg"
						>
							{error}
						</motion.div>
					)}

					<form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
							className="relative"
						>
							<Mail className="absolute w-6 h-6 text-gray-400 top-3.5 left-4" />
							<input
								id="email"
								name="email"
								type="email"
								placeholder="Email"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.email}
								className="w-full py-4 pl-14 pr-4 text-white placeholder-gray-400 bg-white/10 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
							/>
						</motion.div>
						{formik.touched.email && formik.errors.email ? (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								className="text-sm text-red-400"
							>
								{formik.errors.email}
							</motion.div>
						) : null}

						<motion.div
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.6 }}
							className="relative"
						>
							<Lock className="absolute w-6 h-6 text-gray-400 top-3.5 left-4" />
							<input
								id="password"
								name="password"
								type="password"
								placeholder="Password"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.password}
								className="w-full py-4 pl-14 pr-4 text-white placeholder-gray-400 bg-white/10 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
							/>
						</motion.div>
						{formik.touched.password && formik.errors.password ? (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								className="text-sm text-red-400"
							>
								{formik.errors.password}
							</motion.div>
						) : null}

						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<input
									id="rememberMe"
									name="rememberMe"
									type="checkbox"
									onChange={formik.handleChange}
									checked={formik.values.rememberMe}
									className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
								/>
								<label
									htmlFor="rememberMe"
									className="block ml-2 text-sm text-gray-400"
								>
									Remember me
								</label>
							</div>
							<div className="text-sm">
								<a
									href="/forgot-password"
									className="font-medium text-purple-400 hover:text-purple-300"
								>
									Forgot your password?
								</a>
							</div>
						</div>

						<motion.div
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.8 }}
						>
							<button
								type="submit"
								className="w-full px-3 py-3 text-lg font-bold text-white bg-purple-600 border border-transparent rounded-xl shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
							>
								Sign In
							</button>
						</motion.div>
					</form>

					<p className="mt-8 text-sm text-center text-gray-400">
						Don't have an account?{" "}
						<a
							href="/signup"
							className="font-medium text-purple-400 hover:text-purple-300"
						>
							Sign up
						</a>
					</p>
				</motion.div>
			</div>
		</div>
	);
};

export default Login;
