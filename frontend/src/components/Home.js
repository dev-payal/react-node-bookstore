import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Home () {
  return (
    <div className='home'>
        <h1>Welcome to the bookstore📚</h1>
        <p>Register here to create your own custom bookstore!!</p>
        <div class="actions">
        <p>If you're a New User, sign up here👇</p>
				<button className="btn"><Link to="/signup">Sign Up</Link></button><br/>
                <p>A Verified User??</p>
				<button className="btn"><Link to="/login">Login</Link></button>
			</div>
    </div>
  )
}

export default Home;
