<<<<<<< HEAD
import './index.css';
import Dashboard from './Components/Dashboard';
import Sidebar from './Components/Sidebar';
import { useState } from 'react';
=======
import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
>>>>>>> a81eee48cd041d920d23f99580395acb0113de80

function App() {
	const [sidebarToggle, setSidebarToggle] = useState(false)
  return (
<<<<<<< HEAD
    <div className='flex'>
			<Sidebar sidebarToggle={sidebarToggle}/>
			<Dashboard sidebarToggle={sidebarToggle} 
			setSidebarToggle={setSidebarToggle}/>
=======
    <div>
			<Navbar/>
>>>>>>> a81eee48cd041d920d23f99580395acb0113de80
		</div>
  );
}

export default App;
