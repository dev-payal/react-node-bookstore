import React, { useEffect, useState } from "react";
// import UserContext from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Link} from 'react-router-dom'
import Book from "../bookstore/Book";
import "../bookstore/Book.css";

const URL = "http://localhost:4000/user/bookstore";
function Bookstore() {
  const navigate = useNavigate()
  const handleLogout = () => {
    alert("Are you sure to log out?")
    sessionStorage.removeItem('auth-token')
    navigate('/')
  }
  const token = sessionStorage.getItem("auth-token")
  
  const [books, setBooks] = useState("");
  const [render, setRender] = useState(false)
  const fetchResponse = async () => {
    return await axios
      .get(URL, { headers: { "auth-token": token } })
      .then((res) => res.data);
  };
  useEffect(() => {
    console.log(token)
    if(!token){
      navigate('/')
    }
    else{
      fetchResponse().then((data) => setBooks(data.books));
    }
  }, [render]);
  console.log(books);

  return (
    <div>
     <div className='header'>
        <div>
                <Link to='/user/bookstore' class="navbar-brand ">📚 BookStore</Link>
            </div>
        <ul class="nav justify-content-center|justify-content-end" style={{display: 'flex', marginLeft: '250px'}} >
            <li class="nav-item" >
                <Link to='/user/addBook' class="nav-link active" style={{color:'peru'}} >Add Book</Link>
            </li>
            <ul class="nav navbar-nav navbar-right">
                    <button type="button" style={{marginLeft:'800px', position:"fixed", color:"black" }}
                        class="btn btn-info" id="Chromeform" onClick={handleLogout}>Logout</button></ul>
        </ul>
    </div>
      <div className="bookstore">
        <ul>
          {books &&
            books.map((book, i) => (
              <div key={i}>
                <Book book={book} render={render} setRender={setRender} />
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Bookstore;
