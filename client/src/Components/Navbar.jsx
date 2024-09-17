import React, { useState, useEffect } from "react";
import { FaSearch, FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [isSearchVisible, setIsSearchVisible] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Yangi state

	const toggleDarkMode = () => {
		const newMode = !isDarkMode;
		setIsDarkMode(newMode);
		localStorage.setItem("darkMode", newMode);
	};

	const toggleSearchVisibility = () => {
		setIsSearchVisible(!isSearchVisible);
	};

	const handleLogout = () => {
		localStorage.removeItem("token"); // Tokenni o'chirish
		setIsLoggedIn(false);
		window.location.reload(); // Sahifani yangilash
	};

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen); // Modalni ko'rsatish yoki yashirish
	};

	useEffect(() => {
		const savedMode = localStorage.getItem("darkMode") === "true";
		setIsDarkMode(savedMode);
		document.body.className = savedMode ? "dark" : "";

		const token = localStorage.getItem("token");
		if (token) {
			setIsLoggedIn(true);
		}
	}, []);

	useEffect(() => {
		document.body.className = isDarkMode ? "dark" : "";
	}, [isDarkMode]);

	return (
		<nav
			className={`bg-${
				isDarkMode ? "gray-900" : "white"
			} border-gray-200 dark:bg-gray-900 ${
				isDarkMode ? "border-b-2 border-white" : ""
			}`}
		>
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<Link
					to="/"
					className="text-white self-center text-2xl font-semibold whitespace-nowrap"
				>
					Axidel
				</Link>

				<div className="flex-1 flex items-center justify-end">
					<button
						type="button"
						aria-controls="navbar-search"
						aria-expanded={isSearchVisible}
						onClick={toggleSearchVisibility}
						className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
					>
						<FaSearch
							className="w-5 h-5"
							aria-hidden="true"
						/>
						<span className="sr-only">Search</span>
					</button>

					{/* Search input in desktop size */}
					<div className="relative hidden md:block">
						<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
							<FaSearch
								className="w-4 h-4 text-gray-500 dark:text-gray-400"
								aria-hidden="true"
							/>
							<span className="sr-only">Search icon</span>
						</div>

						<input
							type="text"
							id="search-navbar"
							className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Search..."
						/>
					</div>

					{/* Theme button */}
					<button
						type="button"
						onClick={toggleDarkMode}
						className="relative items-center p-2 ml-2 mr-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
					>
						<span className="sr-only">Toggle Dark Mode</span>
						{isDarkMode ? (
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M12 3v1m4.22 1.22l.78-.78M21 12h-1m-4.22 4.22l-.78.78M12 21v-1m-4.22-1.22l-.78-.78M3 12H2m4.22-4.22l-.78-.78M12 2a10 10 0 100 20 10 10 0 000-20z"
								/>
							</svg>
						) : (
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M20.354 15.354A9 9 0 018.647 3.647 9 9 0 1020.354 15.354z"
								/>
							</svg>
						)}
					</button>

					<div id="navbar-search">
						<nav>
							<ul
								className={`{
								isSearchVisible ? "hidden" : ""
							}`}
							>
								<li>
									{isLoggedIn ? (
										<div className="relative">
											<span
												className="w-10 h-10 rounded-full cursor-pointer bg-cyan-600"
												onClick={toggleDropdown}
											>
												<FaRegUser />
											</span>
											<div
												id="userDropdown"
												className={`absolute right-0 mt-2 z-50 ${
													isDropdownOpen ? "block" : "hidden"
												} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
											>
												<div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
													<div>Bonnie Green</div>
													<div className="font-medium truncate">
														name@flowbite.com
													</div>
												</div>
												<ul
													className="py-2 text-sm text-gray-700 dark:text-gray-200"
													aria-labelledby="avatarButton"
												>
													<li>
														<Link
															to="/"
															className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
														>
															Home
														</Link>
													</li>
													<li>
														<Link
															to="/mycollection"
															className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
														>
															My Collections
														</Link>
													</li>
													<li>
														<Link
															to="/services"
															className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
														>
															Services
														</Link>
													</li>
												</ul>
												<div className="py-1">
													<a
														href="/"
														onClick={handleLogout}
														className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
													>
														Sign out
													</a>
												</div>
											</div>
										</div>
									) : (
										<>
											<div className="relative">
												<img
													src="https://www.google.com/imgres?q=avatar%20user&imgurl=https%3A%2F%2Fe7.pngegg.com%2Fpngimages%2F84%2F165%2Fpng-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png&imgrefurl=https%3A%2F%2Fwww.pngegg.com%2Fen%2Fpng-zxkcc&docid=diHpHgcvAOmZ-M&tbnid=RdHRQ2dJN7LFaM&vet=12ahUKEwik6-rA-cmIAxVHRlUIHW2zGWAQM3oECHwQAA..i&w=900&h=512&hcb=2&ved=2ahUKEwik6-rA-cmIAxVHRlUIHW2zGWAQM3oECHwQAA" // Profil rasmi
													alt="User Avatar"
													className="w-10 h-10 rounded-full cursor-pointer"
													onClick={toggleDropdown} // Avatar tugmasiga bosilganda modalni ochish
												/>
												<div
													id="userDropdown"
													className={`absolute right-0 mt-2 z-50 ${
														isDropdownOpen ? "block" : "hidden"
													} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
												>
													<div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
														<div>Not Found</div>
													</div>
													<ul
														className="py-2 text-sm text-gray-700 dark:text-gray-200"
														aria-labelledby="avatarButton"
													>
														<li>
															<Link
																to="/"
																className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
															>
																Home
															</Link>
														</li>
													</ul>
													<div className="py-1">
														<Link
															to="/signin"
															className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
														>
															Sign In
														</Link>
													</div>
												</div>
											</div>
										</>
									)}
								</li>
							</ul>
						</nav>
					</div>
				</div>

				{/* Search input in mobile size */}
				{isSearchVisible && (
					<div className="relative md:hidden w-full mt-4">
						<input
							type="text"
							id="mobile-search-navbar"
							className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Search..."
						/>
					</div>
				)}

				{/* ul elements in desktop and mobile size */}
			</div>
		</nav>
	);
};

export default Navbar;
