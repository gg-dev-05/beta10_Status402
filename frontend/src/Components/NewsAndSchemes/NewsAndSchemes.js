import React, { useEffect, useState } from "react";
import './NewsAndSchemes.css';
import axios from 'axios';
function NewsAndSchemes(){
    const [repo, setRepo] = useState([]);
    const getRepo = () => {
    axios.get('https://newsapi.org/v2/everything?q=tesla&from=2021-09-30&sortBy=publishedAt&apiKey=ee3ec560dbab4a31937a2c16359daa9c')
    .then((response) => {
    console.log(response);
    const myRepo = response.data;
    setRepo(myRepo);
    });
    };
    useEffect(() => getRepo(), []);

    return (
        <div className="NewsAndSchemes">
            

        </div>
    )
}

export default NewsAndSchemes;