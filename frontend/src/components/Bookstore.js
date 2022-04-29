import React, { useEffect } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';
function Bookstore() {


    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:4000/user/bookstore/', {
            headers: { "auth-token": token }
        }).then(async function (response) {
            console.log(response);
            const decoded = jwt_decode(token);
            console.log(decoded)
        }).catch(function (error) {
            console.error(error);
            console.log('Unauthorized user')
        })

    }, [])

    return (
        <div>
            <h1>Online Bookstore 📚</h1>
            <div className='bookstore'>

            </div>
        </div>
    )
}

export default Bookstore;