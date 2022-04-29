
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate()

	const handleSubmit = async (event) => {
			event.preventDefault();
			await axios.post('http://localhost:4000/api/v1/login/', {
					email,
					password,
			}).then(function (res){
				toast('Login successful')
				console.log(res);
				const token = res.data['user'];
				localStorage.setItem('token', token)
				console.log({token: token});
				navigate('/user/bookstore')
			}).catch( function(err){
				toast("Login failed! Email or password is wrong!");
				console.log(err)
			})
	}

	return (
		<div className="signup-form">
			<form onSubmit={handleSubmit} method="post">
				<h2>Member Login</h2>
				<p>Please enter the details to login to your account!</p>
				<hr />
				<div className="form-group">
					<div className="input-group">
						<span className="input-group-addon"><i className="fa fa-paper-plane"></i></span>
						<input type="email"
							className="form-control"
							name="email"
							value={email}
							placeholder="Email Address"
							onChange={(e) => setEmail(e.target.value)}
							required="required" />
					</div>
				</div>
				<div className="form-group">
					<div className="input-group">
						<span className="input-group-addon"><i className="fa fa-lock"></i></span>
						<input type="text"
							className="form-control"
							name="password"
							value={password}
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
							required="required" />
					</div>
				</div>
				<div className="form-group">
					<button type="submit"
						className="btn btn-primary btn-lg">Login</button>
				</div>
			</form>
			<div className="text-center">Don't have an account? <Link to="/signup">Register here</Link></div>
			<div className="text-center">Go to <Link to="/">Home Page 🏠</Link></div>
			<ToastContainer />
		</div>
	)
}
