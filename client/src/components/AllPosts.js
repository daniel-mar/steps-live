import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllPosts = (props) => {
    
    // allPosts state variable to store backend information
    const [allPosts, setAllPosts] = useState([]);

    const [deleteToggle, setDeleteToggle] = useState(false);

    // set useEffect for axios to render
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/posts")
            .then((res) => {
                console.log("response:", res);
                setAllPosts(res.data.results);
            })
            .catch((err) => {
                console.log("error:", err);
            });
    }, [deleteToggle, props.newPostToggle]);

    // delete post from db
    const deletePost = (id) => {
        console.log("deleting post with this id->", id);
        axios
            .delete(`http://localhost:8000/api/posts/${id}`)
            .then((res) => {
                console.log("res after deleting", res);
                setDeleteToggle(!deleteToggle);
            })
            .catch((err) => console.log(err));
    };

    // connect to AllPosts, view on table
    return (
        <div className="bg-success p-3 border">
            <div className="navbar">
                <p className="h4 text-left">These are posts / steps!</p>
                <Link to="/new" className="btn btn-primary">Add New Post</Link>
            </div>
            <table className="table table-striped border bg-light">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allPosts.map((postObj, idx) => (
                        <tr>
                            <td>{postObj.postTitle}</td>
                            <td>{postObj.postDesc}</td>
                            <td>
                                <Link
                                    to={`/posts/${postObj._id}`}
                                    className="btn btn-primary m-1"
                                >
                                    Details
                                </Link>
                                <Link to={`/edit/${postObj._id}`} className="btn btn-info m-1">
                                    Edit
                                </Link>
                                <button
                                    onClick={(e) => {
                                        deletePost(postObj._id);
                                    }}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllPosts;