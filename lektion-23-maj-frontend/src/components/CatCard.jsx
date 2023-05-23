import React from 'react'

export default function CatCard(props) {
    const cat = props.cat;
    async function editCat() {
        // om man trycker på edit, skall namnet uppdateras till 'Stefan'
        // const req,body = {
        //     id: id,
        //     whatToUpdate: name,
        //     updateto: 'Arnold'
        // }
        const update = {
            id: cat._id,
            whatToUpdate: 'name',
            updateTo: 'Stefan'
        };

        const response = await fetch('http://localhost:8888/api/updatecat', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(update)
        });

        console.log(response)

    }
    return (
        <article>
            <img src={cat.img}></img>
            <section>
                <h2>{cat.name}</h2>
                <p>{cat.age}</p>
            </section>
            <section>
                <button onClick={editCat}>EDIT</button>
            </section>
        </article>
    )
}
