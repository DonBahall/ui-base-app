import {Button, TextField} from "@material-ui/core";
import React, {useRef} from 'react';
import {useParams} from "react-router-dom";

const Change = () => {

    const inputRef = useRef(null);
    const inputRef2 = useRef(null);
    const {item_id} = useParams();

    if (item_id != null) {
      let i = getItem()
        console.log(i)
    }

    async function getItem() {
        //не понял как правильно разбить json что бы поместить в textField
        let i;
         await fetch("http://localhost:8080/change/" + item_id, {
            method: 'GET',
        }).then((response) => response.json())
            .then((response) => i = JSON.parse(response))
        return i
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
            <p><TextField inputRef={inputRef} title={"Name"} >Name</TextField></p>
            <p><TextField inputRef={inputRef2} title={"Price"}>Price</TextField></p>
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
    catch()
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