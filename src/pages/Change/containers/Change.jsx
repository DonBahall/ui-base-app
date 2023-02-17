import {Button, TextField} from "@material-ui/core";
import React, {useRef} from 'react';
import {useParams} from "react-router-dom";
import listManager from 'pages/Change/reducer/reducer'

const Change = () => {

    const inputRef = useRef(null);
    const inputRef2 = useRef(null);
    const {item_id} = useParams();
    let i;
    if (item_id != null) {
       i = getItem();
        console.log(i)
    }


    async function getItem() {
        return await fetch("http://localhost:8080/change/" + item_id, {
            method: 'GET',
        }).then((response) => response.json())
    }

    function up() {
        let name = inputRef.current.value;
        let price = inputRef2.current.value;
        if (item_id != null) {
            update(name, price, item_id)
        } else save(name, price);
    }

    return (
        <div>
            <p><TextField inputRef={inputRef} title={"Name"} value={i.name} >Name</TextField></p>
            <p><TextField inputRef={inputRef2} title={"Price"} value={i.price}>Price</TextField></p>
            <Button onClick={up}>Сохранить</Button>
            <Button href={"http://localhost:3000/list"}>Отменить</Button>
        </div>
    )
}

function save(value, price) {
    const data = {name: value, price: price};
    fetch("http://localhost:8080/change", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'content-type': 'application/json'}
    }).then((result) => result.ok).
    catch((error) =>{
        console.log(error)
    })
}

function update(value, price, id) {
    const data = {name: value, price: price};
    fetch("http://localhost:8080/change/" + id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {'content-type': 'application/json'}
    }).then((result) => result.json())
}

export default Change