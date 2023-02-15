import React from 'react';
import list from './list.css'
import {Button} from "@material-ui/core";


export default class Items extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080")
            .then((response) => response.json())
            .then((result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                })
    }

    render() {
        const {error, isLoaded, items} = this.state
        if (error) {
            return <p>Error</p>
        } else if (!isLoaded) {
            return <p>Loading...</p>
        } else {
            return (
                <div>
                <Button href={"http://localhost:3000/change"}>Создать</Button>
                <ul>
                    {items.map(item => (
                        <div className="dropdown">
                            <Button className={"dropbtn"} key={item.id}> {item.name}</Button>
                            <div className="dropdown-content">
                                <Button onClick={(e) => deleteItem(item.id)}>Удалить</Button>
                                <Button href={"http://localhost:3000/change/" + item.id}>Редактировать</Button>
                            </div>
                        </div>
                    ))}
                </ul>
                </div>
            )
        }


    }
}

async function deleteItem(id){
    let response = await fetch("http://localhost:8080/" + id, {
        method:'DELETE'
    });
    if (response.ok){
        console.log("Item deleted")
    }else{
        console.log("no")
    }
}

