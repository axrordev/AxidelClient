import React from 'react'
import Navbar from './Navbar'
import MainPage from './MainPage';

const Dashboard = () => {
	return (
		<div className="w-full app">
			<Navbar/>
			<MainPage/>
		</div>
	)
}

export default Dashboard;