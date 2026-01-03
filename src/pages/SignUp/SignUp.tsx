import type React from "react";
import { Suspense } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, User } from "lucide-react";
import { motion } from "framer-motion";
import Background from "../../components/Background";

const SignUp: React.FC = () => {
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		validationSchema: Yup.object({
			name: Yup.string().required("Required"),
			email: Yup.string()
				.email("Invalid email address")
				.required("Required"),
			password: Yup.string()
				.min(8, "Password must be at least 8 characters")
				.required("Required"),
			confirmPassword: Yup.string()
				.oneOf([Yup.ref("password")], "Passwords must match")
				.required("Required"),
		}),
		onSubmit: (_values) => {
			// Here you would typically handle the sign-up logic,
			// for example, by making an API call to create a new user.
			// For this example, we'll just navigate to the login page.
			navigate("/login");
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
							Create Account
						</h2>
						<p className="mt-2 text-center text-gray-400">
							Join us and start your journey
						</p>
					</motion.div>

					<form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
							className="relative"
						>
							<User className="absolute w-6 h-6 text-gray-400 top-3.5 left-4" />
							<input
								id="name"
								name="name"
								type="text"
								placeholder="Name"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.name}
								className="w-full py-4 pl-14 pr-4 text-white placeholder-gray-400 bg-gray-800 border-2 border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
							/>
						</motion.div>
						{formik.touched.name && formik.errors.name ? (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								className="text-sm text-red-400"
							>
								{formik.errors.name}
							</motion.div>
						) : null}

						<motion.div
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.5 }}
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
								className="w-full py-4 pl-14 pr-4 text-white placeholder-gray-400 bg-gray-800 border-2 border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
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
								className="w-full py-4 pl-14 pr-4 text-white placeholder-gray-400 bg-gray-800 border-2 border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
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

						<motion.div
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.7 }}
							className="relative"
						>
							<Lock className="absolute w-6 h-6 text-gray-400 top-3.5 left-4" />
							<input
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								placeholder="Confirm Password"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.confirmPassword}
								className="w-full py-4 pl-14 pr-4 text-white placeholder-gray-400 bg-gray-800 border-2 border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
							/>
						</motion.div>
						{formik.touched.confirmPassword &&
						formik.errors.confirmPassword ? (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								className="text-sm text-red-400"
							>
								{formik.errors.confirmPassword}
							</motion.div>
						) : null}

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
								Sign Up
							</button>
						</motion.div>
					</form>

					<p className="mt-8 text-sm text-center text-gray-400">
						Already have an account?{" "}
						<a
							href="/login"
							className="font-medium text-purple-400 hover:text-purple-300"
						>
							Sign in
						</a>
					</p>
				</motion.div>
			</div>
		</div>
	);
};

export default SignUp;
