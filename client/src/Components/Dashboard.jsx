import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="w-full app">
            <Navbar />
            <main className="main-content">
                <Outlet /> {/* This is where nested routes will be rendered */}
            </main>
        </div>
    );
};

export default Dashboard;
