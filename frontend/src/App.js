import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Bookstore from './components/Bookstore';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserContext from './context/userContext';
import './Bookstore.css';

function App() {
	const [ userData, setUserData] = useState({
		token: undefined,
		user: undefined
		});
	return (
		<div>	
		<BrowserRouter>	
		<UserContext.Provider value={{ userData, setUserData }}>
		<Routes>
		<Route path='/' element={<Home/>}></Route>
		<Route path='/signup' element={<Register/>}></Route>
		<Route path='/login' element={<Login />}></Route>
		<Route path='/user/bookstore' element={<Bookstore />}></Route>
		</Routes>
		</UserContext.Provider>
		</BrowserRouter>
		</div>
			);
}
export default App;
