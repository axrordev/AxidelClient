import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const Navbar = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [isSearchVisible, setIsSearchVisible] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [userData, setUserData] = useState(null);

	const dropdownRef = useRef(null); // Ref for the dropdown

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
		setUserData(null);
		window.location.reload(); // Sahifani yangilash
	};

	const handleDropdownItemClick = () => {
		setIsDropdownOpen(false); // Element bosilganda dropdown yopiladi
	};

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen); // Dropdownni ko'rsatish yoki yashirish
	};

	const getUserIdFromToken = () => {
		const token = localStorage.getItem("token"); // Get token from local storage
		if (!token) {
			console.error("No token found");
			return null;
		}

		try {
			const decodedToken = jwtDecode(token); // Decode the token
			const userId = decodedToken.Id; // Extract the 'Id' from the decoded token
			return userId;
		} catch (error) {
			console.error("Error decoding token:", error);
			return null;
		}
	};
	// Dropdownni tashqi hududga bosilganda yopish
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [dropdownRef]);

	useEffect(() => {
		const savedMode = localStorage.getItem("darkMode") === "true";
		setIsDarkMode(savedMode);
		document.body.className = savedMode ? "dark" : "";

		const token = localStorage.getItem("token");
		if (token) {
			setIsLoggedIn(true);
			const userId = getUserIdFromToken(); // userIdni olamiz va fetchda foydalanamiz
			// Foydalanuvchi ma'lumotlarini olish
			fetch(
				`https://axidel-ezhzgse9eyacc6e9.eastasia-01.azurewebsites.net/api/Users/${userId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
				.then((response) => response.json())
				.then((data) => {
					if (data && data.data) {
						setUserData(data.data);
					}
				})
				.catch((error) => {
					console.error("Error fetching user data:", error);
				});
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

				{/* Search icon in mobile size */}
				<div className="flex-1 flex items-center justify-end md:hidden ">
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

				{/* Search input for desktop */}
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

				<div id="navbar-search">
					<nav>
						<ul className={isSearchVisible ? "hidden" : ""}>
							<li>
								{isLoggedIn ? (
									<div
										className="relative"
										ref={dropdownRef}
									>
										<span
											className="w-10 h-10 rounded-full cursor-pointer bg-cyan-600"
											onClick={toggleDropdown}
										>
											<FaRegUser className=" w-10 h-10 items-center p-2 justify-center text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" />
										</span>
										<div
											id="userDropdown"
											className={`absolute right-0 mt-2 z-50 ${
												isDropdownOpen ? "block" : "hidden"
											} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
										>
											<div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
												{userData ? (
													<>
														<div>
															{userData.firstName} {userData.lastName}
														</div>
														<div className="font-medium truncate">
															{userData.email}
														</div>
													</>
												) : (
													<div>Loading...</div>
												)}
											</div>
											<ul
												className="py-2 text-sm text-gray-700 dark:text-gray-200"
												aria-labelledby="avatarButton"
											>
												<li>
													<Link
														to="/"
														className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
														onClick={handleDropdownItemClick}
													>
														Home
													</Link>
												</li>
												<li>
													<Link
														to="/mycollection"
														className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
														onClick={handleDropdownItemClick}
													>
														My Collections
													</Link>
												</li>
												<li>
													<Link
														to="/services"
														className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
														onClick={handleDropdownItemClick}
													>
														Services
													</Link>
												</li>
											</ul>
											<div className="py-1">
												<a
													onClick={handleLogout}
													href="/"
													className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
												>
													Log out
												</a>
											</div>
										</div>
									</div>
								) : (
									<div
										className="relative"
										ref={dropdownRef}
									>
										<span
											className="w-10 h-10 rounded-full cursor-pointer bg-cyan-600"
											onClick={toggleDropdown}
										>
											<FaRegUser className=" w-10 h-10 items-center p-2 justify-center text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" />
										</span>
										<div
											id="userDropdown"
											className={`absolute right-0 mt-2 z-50 ${
												isDropdownOpen ? "block" : "hidden"
											} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
										>
											<div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
												<div>Please Log in</div>
											</div>
											<ul
												className="py-2 text-sm text-gray-700 dark:text-gray-200"
												aria-labelledby="avatarButton"
											>
												<li>
													<Link
														to="/"
														className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
														onClick={handleDropdownItemClick}
													>
														Home
													</Link>
												</li>
											</ul>
											<div className="py-1">
												<a
													onClick={handleLogout}
													href="/signin"
													className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
												>
													Log in
												</a>
											</div>
										</div>
									</div>
								)}
							</li>
						</ul>
					</nav>
				</div>
				
			</div>
		</nav>
	);
};

export default Navbar;
