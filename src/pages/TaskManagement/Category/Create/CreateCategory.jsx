import React, {useState} from "react";
import "./styles.css";
import API from "../../../../services/Api";

const CreateCategory = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try{
            const res = await API.post("/task-management/category/create-category", {title, description});
            if(res.data.success === true){
                alert("Category created successfully");
                setTitle("");
                setDescription("");
            }else{
                alert("Failed to create category");
            }
        }catch(err){
            console.log(err)
        }finally{
            setIsLoading(false);
        }
    }

    return (
        <div className="create-category-wrapper">
            <h3 className="mx-3 my-3">Create Category</h3>
            <div className="form-wrapper">
                <form className='form' onSubmit={handleCreateCategory}>
                    <div className='form-group mb-3'>
                        <label htmlFor='title' className='form-label'>Title</label>
                        <input type='text' id='title' name="title" className='form-control' value={title} placeholder='e.g Example category' onChange={(e) => setTitle(e.target.value)} maxLength={100} required />
                        <span className="max-char-allowed">Maximum characters allowed 100.</span>
                    </div>
                    <div className='form-group mb-3'>
                        <label htmlFor='description' className='form-label'>Description</label>
                        <textarea id='description' name="description" className='form-control' value={description} placeholder='e.g Description of category' onChange={(e) => setDescription(e.target.value)} rows="3" maxLength={200}></textarea>
                        <span className="max-char-allowed">Maximum characters allowed 200.</span>
                    </div>
                    <div className='form-btn-wrapper d-grid'>
                        <button type='submit' className='btn btn-outline-dark btn-block' disabled={isLoading}> {isLoading ? 'Please wait...' : 'Create'} </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateCategory;