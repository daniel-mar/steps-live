import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
// react-router-dom v6 uses useNavigate instead of useHistory
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const OnePost = () => {

    const { _id } = useParams();

    // State variable to store a single posts's info
    const [postInfo, setPostInfo] = useState({});

    // instead of useHistory, this becomes
    // const history = useHistory();
    const navigate = useNavigate();
    // instead of useHistory.push('/')
    // must use the following inside a useffect thing
    // navigate('/');


    useEffect(() => {
        //Step 10 - make API call
        axios
            .get(`http://localhost:8000/api/posts/${_id}`)
            .then((res) => {
                console.log(res);
                setPostInfo(res.data.results);
            })
            .catch((err) => console.log(err));
    }, []);

    // delete post
    const deletePost = () => {
        axios
            .delete(`http://localhost:8000/api/posts/${_id}`)
            .then((res) => {
                console.log("res=>", res);
                // history.push("/");
                // instead of useHistory.push('/')
                navigate('/');
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <div className="navbar bg-primary p-3">
                <h3>Details about: {postInfo.postTitle}</h3>
                <div>
                    <Link to="/" className="btn btn-success">Dashboard
                    </Link>
                    <button onClick={deletePost} className="btn btn-danger ml-2">
                        Remove Post {postInfo.postTitle}
                    </button>
                </div>
            </div>

            <div className="bg-warning p-3 h5 text-left">
                <p>Post Title: {postInfo.postTitle}</p>
                <p>Description: {postInfo.postDesc}</p>
            </div>
        </>
    );
};

export default OnePost;