import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const NewPostForm = (props) => {

    //Create state variables to store form information
    let [postTitle, setPostTitle] = useState("");
    let [postDesc, setPostDesc] = useState("");

    // state variable to store validation errors
    let [errors, setErrors] = useState({});

    // instead of useHistory, this becomes
    // const history = useHistory();
    // const history = useNavigate();
    const navigate = useNavigate();

    // instead of useHistory.push('/')
    navigate('/');

    // submithandler
    const addPost = (e) => {
        e.preventDefault();

        // what our useState will be listening for
        let formInfo = { postTitle, postDesc };

        // API call to our backend
        // allows passing formInfo along with it
        axios
            .post("http://localhost:8000/api/posts", formInfo)
            .then((res) => {
                console.log("response after posting form", res);

                // Validation errors on create form
                if (res.data.error) {
                    setErrors(res.data.error.errors);
                } else {
                    // after good validations and creation, clear value after the form submits
                    setPostTitle("");
                    setPostDesc("");

                    props.setNewPostToggle(!props.newPostToggle)

                    // history.push("/");
                    // instead of useHistory.push('/')
                    navigate('/');
                }

            })
            .catch((err) => console.log("error after posting the form", err));
    };

    return (
        <>
            <div className="bg-warning p-3">
                <div className="navbar">
                    <h3>Creating a new step for coding</h3>
                    <Link to="/" className="btn btn-primary">Dashboard</Link>
                </div>
                <p className="text-left"><span className="">Fill out this form of post</span></p>
                <form onSubmit={addPost} className="text-left">
                    <div className="form-group">
                        <label htmlFor="">Post Name:</label>
                        <input
                            type="text"
                            onChange={(e) => setPostTitle(e.target.value)}
                            className="form-control"
                            value={postTitle}
                        />
                        <p className="text-danger">{errors.postTitle?.message}</p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Post Description:</label>
                        <input
                            type="text"
                            onChange={(e) => setPostDesc(e.target.value)}
                            className="form-control"
                            value={postDesc}
                        />
                        <p className="text-danger">{errors.postDesc?.message}</p>
                    </div>


                    <input
                        type="submit"
                        value="Add Post"
                        className="btn btn-success mt-2"
                    />
                </form>
            </div>
        </>
    );
};

export default NewPostForm;