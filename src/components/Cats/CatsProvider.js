import React, { useState, createContext } from "react"


/* -------------------- ALLOW IMPORT OF CONTEXT TO TO BE USED BY INDIVIDUAL COMPONENTS-------------------- */

export const CatContext = createContext()

/* -------------------- To have access to cats, and specific cats based on their properties -------------------- */

export const CatProvider = (props) => {
    const [cats, setCats] = useState([])

    const getCats = () => {
        return fetch("http://localhost:8088/cats")
        .then(res => res.json())
        .then(setCats)
    }
    const addCat = catObj => {
        return fetch("http://localhost:8088/cats?_expand=user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(catObj)
        })
        .then(getCats)
    }
    

    const getCatById = (id) => {
        return fetch(`http://localhost:8088/cats/${id}`)
            .then(res => res.json())
    }

    const deleteCat = catId => {
        return fetch(`http://localhost:8088/cats/${catId}`, {
            method: "DELETE"
        })
            .then(getCats)
    }

    /*
        You return a context provider which has the
        `cats` state, `getCats` deleteCats function,
        and the `addCats
` function as keys. This
        allows any child elements to access them.
    */
   /* -------------------- To make the cats, and the cat functions available to other components i.e. expose child elements -------------------- */
    return (
        <CatContext.Provider value={{
            cats, getCats, addCat, deleteCat, getCatById, 
    
        }}>
            {props.children}
        </CatContext.Provider>
    )
}