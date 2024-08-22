import './index.css';
import Dashboard from './Components/Dashboard';
import Sidebar from './Components/Sidebar';
import { useState } from 'react';

function App() {
	const [sidebarToggle, setSidebarToggle] = useState(false)
  return (
    <div className='flex'>
			<Sidebar sidebarToggle={sidebarToggle}/>
			<Dashboard sidebarToggle={sidebarToggle} 
			setSidebarToggle={setSidebarToggle}/>
		</div>
  )
}

export default App;
