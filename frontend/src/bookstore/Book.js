import React, { useState } from "react";
import "./Book.css";
import { ToastContainer, toast } from "react-toastify";
// import UserContext from "../context/userContext";
import axios from "axios";
// import { useContext } from "react";

const Book = (props) => {
  const { _id, book, author, price, description, image } = props.book;
  const render = props.render;
  const setRender = props.setRender;
  const currentBook = {
    book: book,
    author: author,
    description: description,
    price: price,
    image: image
  }
  const [bookdetail, setBookdetail] = useState(currentBook);
  // const { userData } = useContext(UserContext);
  const token = sessionStorage.getItem("auth-token");

  //Handle Delete
  const handleDelete = async () => {
    try {
      alert("Are you sure to delete the book??");
      await axios
        .delete(`http://localhost:4000/user/bookstore/${_id}`, {
          headers: { "auth-token": token },
        })
        .then((res) => {
          setRender(!render)
          toast("Deleted Successfully");
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  // Update Book
  const handleChange = (e) => {
    setBookdetail({ ...bookdetail, [e.target.name]: e.target.value });
  }

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:4000/user/bookstore/${_id}`, bookdetail,{
          headers: { "auth-token": token },
        })
        .then((res) => {
          console.log(res);
          toast("Updated Successfully");
          setRender(!render)
        })
        .catch((err) => console.log(err));
    } catch (err) {
      toast("Something went wrong")
      console.log(err);
    }
  };

  return (
    <div className="card">
      <img src={image} alt={book} />
      <article style={{ fontFamily: "revert" }}>By {author}</article>
      <div className="bookName">
        <h5>{book}</h5>
      </div>
      <h4> Rs. {price}</h4>
      <div className="form-group">
        <button
          className="btn btn-primary"
          style={{
            color: "black",
            margin: "0",
            width: "80px",
            height: "40px",
            float: "left",
          }}
          onClick={handleDelete}
        >
          Delete
        </button>

        <button
          class="btn btn-primary"
          style={{ color: "black", margin: "0", width: "80px", height: "40px" }}
          data-toggle="modal"
          data-target={`#myModel${_id}`}
        >
          Edit
        </button>

        <div id={`myModel${_id}`} class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div style={{ color: "black" }} class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 class="modal-title">Update Book Details</h4>
              </div>
              <div style={{ color: "black" }} class="modal-body">
                <form method="post">
                  <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon" style={{fontWeight:"bold"}}> Book Name</span>
                        <input
                          type="text"
                          className="form-control"
                          name="book"
                          value={bookdetail.book}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon" style={{fontWeight:"bold"}}> Author</span>
                        <input
                          type="text"
                          className="form-control"
                          name="author"
                          value={bookdetail.author}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon" style={{fontWeight:"bold"}}> Description</span>
                        <input
                          type="text"
                          className="form-control"
                          name="description"
                          value={bookdetail.description}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon" style={{fontWeight:"bold"}}> Price</span>
                        <input
                          type="text"
                          className="form-control"
                          name="price"
                          value={bookdetail.price}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon" style={{fontWeight:"bold"}}> Image url</span>
                        <input
                          type="text"
                          className="form-control"
                          name="image"
                          value={bookdetail.image}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    
                    
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="submit"
                  class="btn btn-default"
                  data-dismiss="modal"
                  style={{ width: "auto" }}
                  onClick={handleUpdate}
                >
                  Update Book
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Book;
