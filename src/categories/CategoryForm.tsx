import React, {useState} from "react";
import {addCategory} from "../services/apiFacade.ts";

interface newCategory {
    name: string
}

export default function CategoryForm() {
    const [name, setName] = useState("");

     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newCategory: newCategory = {
            name
        }
        const addedC = await addCategory(newCategory);
        alert("Category added successfully");
         console.log(addedC)
        setName("");
    }


    return (
        <>
            <div style={{display: "inline-block", width: "25%"}}>
                <h3>Add new category:</h3>
                <div >
                    <form onSubmit={handleSubmit} >
                        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr"}}>
                            <label htmlFor="name">Name</label>
                            <input style={{display: "inline-block"}} type="text" value={name} onChange={({target}) => setName(target.value)}/>

                        </div>

                        <div style={{display: "flex", justifyContent: "center", marginTop: "15px"}}>
                            <input type="submit" value="Submit"/>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}