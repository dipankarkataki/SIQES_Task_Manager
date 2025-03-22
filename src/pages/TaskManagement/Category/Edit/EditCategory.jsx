import React, { useEffect, useState } from "react";
import "./styles.css";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../../services/Api";

const EditCategory = () => {
    const { category_id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSavingChanges, setSavingChanges] = useState(false);

    const getCategory = async () => {
        setIsLoading(true)
        try {
            const res = await API.get(`task-management/category/category-by-id/${category_id}`);
            if (res.data.success === true) {
                setTitle(res.data.data.title);
                setDescription(res.data.data.description);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getCategory();
    }, [])


    const handleEditCategory = async (e) => {
        e.preventDefault();
        setSavingChanges(true);

        try {
            const res = await API.put(`task-management/category/update-category/${category_id}`, {
                title, description
            });
            if (res.data.success === true) {
                alert("Category edited successfully.");
                setTimeout(() => {
                    navigate("/all-categories");
                }, 0);
            } else {
                alert(res.data.message || "Failed to edit category.");
            }
        } catch (err) {
            console.log(err)
        } finally {
            setSavingChanges(false);
        }
    }

    return (
        <div className="edit-category-wrapper">
            <h3 className="mx-3 my-3">Edit Category</h3>
            <div className="form-wrapper">
                <form className='form' onSubmit={handleEditCategory}>
                    {
                        isLoading ?
                        (
                            <p>Please wait. Loading data....</p>
                        ) :

                        (
                            <>
                                <div className='form-group mb-3'>
                                    <label htmlFor='title' className='form-label'>Title</label>
                                    <input type='text' id='title' name="title" className='form-control' value={title} placeholder='e.g Example category' onChange={(e) => setTitle(e.target.value)} maxLength={100} />
                                    <span className="max-char-allowed">Maximum characters allowed 100.</span>
                                </div>
                                <div className='form-group mb-3'>
                                    <label htmlFor='description' className='form-label'>Description</label>
                                    <textarea id='description' name="description" className='form-control' value={description} placeholder='e.g Description of category' onChange={(e) => setDescription(e.target.value)} rows="3" maxLength={200}></textarea>
                                    <span className="max-char-allowed">Maximum characters allowed 200.</span>
                                </div>
                                <div className='form-btn-wrapper d-grid'>
                                    <button type='submit' className='btn btn-outline-dark btn-block' disabled={isSavingChanges}> {isSavingChanges ? 'Please wait...' : 'Save Changes'} </button>
                                </div>
                            </>
                        )
                    }
                </form>
            </div>
        </div>
    )
};

export default EditCategory;