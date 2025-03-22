import React, { useState, useEffect }  from 'react';
import "./styles.css";
import { useNavigate } from "react-router-dom";
import API from '../../../../services/Api';

const AllCategories = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCategoryDeleted, setIsCategoryDeleted] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    const getCategories = async () => {
        try{
            setIsLoading(true);
            const res = await API.get("task-management/category/all-categories");
            console.log(res.data);
            if(res.data.success === true){
                setCategories(res.data.data);
            }else{
                alert("Failed to load data");
            }
        }catch(err){
            console.log(err)
        }finally{
            setIsLoading(false);
        }
        
    }

    useEffect(() => {
        getCategories();
    }, []);

    const editCategory = (category_id) => {

    }
    const deleteCategory = (category_id) => {

    }
    return (
        <div className='categories-wrapper'>
            <h3 className='mx-3 my-3'>All Categories</h3>
            <div className="category-table-wrapper">
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Created By</th>
                                <th>Updated By</th>
                                <th>Deleted By</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isLoading ?
                                    (
                                        <tr>
                                            <td colSpan="8" className="text-center">Please wait. Loading data...</td>
                                        </tr>

                                    ) :
                                    categories.map((category, index) => {
                                        const isDeleted = category.deleted_at;
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1 }</td>
                                                <td>{category.title}</td>
                                                <td>{category.description}</td>
                                                <td>{category.created_by?.name || "N/A"}</td>
                                                <td>{category.updated_by?.name || "N/A"}</td>
                                                <td>{category.deleted_by?.name || "N/A"}</td>
                                                <td>{category.deleted_at ? <span className="badge bg-danger">Deleted</span> : <span className="badge bg-success">Active</span>}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-outline-primary mx-2" disabled={isDeleted} onClick={() => editCategory(category.id)}>Edit</button>
                                                    <button className="btn btn-sm btn-outline-danger mx-2" disabled={isDeleting || isDeleted} onClick={() => deleteCategory(category.id)}> {isDeleting ? 'Please wait...' : 'Delete'}</button>
                                                </td>
                                            </tr>
                                        )

                                    })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}


export default AllCategories;
