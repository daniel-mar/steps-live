import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const EditPostForm = () => {

    // State variable to store the post's data and use on edit page
    // postInfo will be what is passed in the form to update db data
    // so we will access the form data in postInfo
    // with .postTitle or .postDesc
    const [postInfo, setPostInfo] = useState({});
    const { _id } = useParams();

    const navigate = useNavigate();

    
    

    // State variable to store validation errors inside of
    let [errors, setErrors] = useState({});

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/posts/${_id}`)
            .then((res) => {
                console.log("res-->", res);
                setPostInfo(res.data.results);
            })
            .catch((err) => console.log(err));
    }, []);

    // Add values for editing selected post
    const changeHandler = (e) => {
        setPostInfo({
            ...postInfo,
            [e.target.name]: e.target.value,
        });
    };

    // Submit updated post info handler
    const submitHandler = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/posts/${_id}`, postInfo)
            .then((res) => {
                console.log(res);

                if (res.data.error) {
                    setErrors(res.data.error.errors);
                } else {
                    setPostInfo("");
                    // history.push("/");
                    // instead of useHistory.push('/')
                    navigate('/');
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="bg-primary p-3 mt-3 text-light text-left">
            <div className="navbar">
                <h3>Insert the next step here</h3>
                <Link to="/" className="btn btn-warning">Dashboard</Link>
            </div>
            <form onSubmit={submitHandler}>
                <h3>Editing: {postInfo.postTitle}</h3>
                <div className="form-group">
                    <label htmlFor="">Post Name:</label>

                    <input
                        type="text"
                        name="postTitle"
                        onChange={changeHandler}
                        className="form-control"
                        value={postInfo.postTitle}
                    />
                </div>
                <p className="text-danger">{errors.postTitle?.message}</p>

                <div className="form-group">
                    <label htmlFor="">Post Description:</label>
                    <input
                        type="text"
                        name="postDesc"
                        onChange={changeHandler}
                        className="form-control"
                        value={postInfo.postDesc}
                    />
                </div>


                <input
                    type="submit"
                    value="Edit Post"
                    className="btn btn-success mt-2"
                />
            </form>
        </div>
    );
};

export default EditPostForm;