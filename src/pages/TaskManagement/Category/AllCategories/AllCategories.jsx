import React, { useState, useEffect }  from 'react';
import "./styles.css";
import { useNavigate } from "react-router-dom";
import API from '../../../../services/Api';

const AllCategories = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCategoryDeleted, setIsCategoryDeleted] = useState(false);
    const [deletingCategory, setDeletingCategory] = useState(null);
    const navigate = useNavigate();

    const getCategories = async () => {
        try{
            setIsLoading(true);
            const res = await API.get("/task-management/category/all-categories");
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
    }, [isCategoryDeleted]);

    const editCategory = (category_id) => {
        navigate(`/edit-category/${category_id}`);

    }
    const deleteCategory = async (category_id) => {
        setDeletingCategory(category_id);
        try{
            const res = await API.delete(`/task-management/category/delete-category/${category_id}`);
            if (res.data.success === true) {
              alert('Category deleted successfully');
              setIsCategoryDeleted(prev => !prev);
            } else {
              alert("Failed to delete category");
            }
        }catch(err){
            console.log(err)
        }finally{
            setDeletingCategory(null);
        }
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
                                                <td className='wrap_text'>{category.title}</td>
                                                <td className='wrap_text'>{category.description ?? 'N/A' }</td>
                                                <td>{category.created_by?.name || "N/A"}</td>
                                                <td>{category.updated_by?.name || "N/A"}</td>
                                                <td>{category.deleted_by?.name || "N/A"}</td>
                                                <td>{category.deleted_at ? <span className="badge bg-danger">Deleted</span> : <span className="badge bg-success">Active</span>}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-outline-primary mx-2" disabled={isDeleted} onClick={() => editCategory(category.id)}>Edit</button>
                                                    <button className="btn btn-sm btn-outline-danger mx-2" disabled={deletingCategory === category.id || isDeleted} onClick={() => deleteCategory(category.id)}> {deletingCategory === category.id ? 'Please wait...' : 'Delete'}</button>
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
