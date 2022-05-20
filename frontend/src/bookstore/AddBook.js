import React from "react";
import { ToastContainer, toast } from "react-toastify";
// import { useContext } from "react";
// import UserContext from "../context/userContext";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function AddBook() {
	// const { userData } = useContext(UserContext);
	const token = sessionStorage.getItem("auth-token")
	const navigate = useNavigate()
	const bookSpan = {
		backgroundColor: "skyblue",
		width: "100px", 
		height:"40px",
		color:"black",
        textShadow: "3px 3px 3px gray",
        fontWeight:"bold",
	}
	const[sent,setSent]=useState(false)
	const [bookData, setBookData] = useState({})

	const inputHandler = (e) => {
		e.preventDefault();
		setBookData({ ...bookData, [e.target.name]: e.target.value });
		console.log(bookData)
	};

	const handleBookSubmit = async (e) => {
	 e.preventDefault();
		// const formData = new FormData();
		// formData.append("book", bookData.book);
		// formData.append("description", bookData.description);
		// formData.append("author", bookData.author);
		// formData.append("price", bookData.price);
		// formData.append("image", bookData.image);
		// console.log(formData)
		try {
		  axios
			.post('http://localhost:4000/user/bookstore', bookData, {
			  headers: { "auth-token": token },
			})
			.then((res) => {
			  console.log(res);
			  setSent(true)
			  toast("Book Added Successfully");
			})
			.catch((err) => console.log(err));
		} catch (err) {
		  console.log(err);
		  toast("Something went wrong!!")
		}
	  };
  return (
    <div>
	  {!sent ? (
      <form style={{position:"fixed"}} onSubmit={handleBookSubmit} method="post">
        <div
          className="form-group"
          style={{ width: "500px", marginTop: "100px", marginLeft: "400px" }}
        >
          <legend
            style={{
              color: "white",
              fontWeight: "bold",
              textShadow: "3px 3px 5px darkbrown",
			  textAlign:"center"
            }}
          >
            Enter Book Details
          </legend>
		  <div className="input-group" style={{ width: "480px" }}  >
            <span className="input-group-addon" style={bookSpan}>Book Name</span>
            <input style={{ height: "40px", fontFamily:"sans-serif", fontWeight:"bold" }} 
                type="text"
				name="book"
				value={bookData.book}
				// onChange={(e)=>setBookData(e.target.value)}
				onChange={inputHandler}
                className="form-control"
                placeholder="Enter the book title here"
				// required="required"
                 />
        </div >
		<div className="input-group" style={{ width: "480px" }}  >
            <span className="input-group-addon" style={bookSpan}>Author</span>
            <input style={{ height: "40px", fontFamily:"sans-serif", fontWeight:"bold" }} 
                type="text"
				name="author"
				value={bookData.author}
				onChange={inputHandler}
                className="form-control"
                placeholder="Enter author name"
                 />
        </div >
		<div className="input-group" style={{ width: "480px" }}  >
            <span className="input-group-addon" style={bookSpan}>Description</span>
            <textarea style={{ height: "100px", fontFamily:"sans-serif", fontWeight:"bold" }} 
                type="text"
				name="description"
				value={bookData.description}
				// onChange={(e)=>setBookData(e.target.value)}
				onChange={inputHandler}
                className="form-control"
                placeholder="Enter book description"
				// required="required"
                 />
        </div >
		<div className="input-group" style={{ width: "480px" }}  >
            <span className="input-group-addon" style={bookSpan}>Price</span>
            <input style={{ height: "40px", fontFamily:"sans-serif", fontWeight:"bold" }} 
                type="text"
				name="price"
				value={bookData.price}
				// onChange={(e)=>setBookData(e.target.value)}
				onChange={inputHandler}
                className="form-control"
                placeholder="Enter book price"
				// required="required"
                 />
        </div >
		<div className="input-group" style={{ width: "480px" }}  >
            <span className="input-group-addon" style={bookSpan}>Image</span>
            <input style={{ height: "40px", fontFamily:"sans-serif", fontWeight:"bold" }} 
                type="text"
				name="image"
				value={bookData.image}
				// onChange={(e)=>setBookData(e.target.value)}
				onChange={inputHandler}
                className="form-control"
                placeholder="Enter the image url"
				// required="required"
                 />
        </div >
          <button
            className="btn btn-primary"
			type="submit"
            style={{
              color: "black",
              marginTop: "20px",
              width: "auto",
              height: "40px",
            }}
          >
            Add Book
          </button>
        </div>
      </form>
	  ) : ( 
		navigate('/user/bookstore')
	  )}
	  <ToastContainer/>
    </div>
  );
}

export default AddBook;
