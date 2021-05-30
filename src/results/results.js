import React from 'react'
import Item from '../item/item'
import './results.css'

class Results extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            error: null
        }
    }

    handleClick = () => {
        fetch('https://fetch-hiring.s3.amazonaws.com/hiring.json')
            .then(res => res.json())
            .then(
                (result) => {
                this.setState({
                    items: result
                });
                },
                (error) => {
                this.setState({
                    error
                });
                }
            )
    }

    render() {
        const { error, items } = this.state
        const itemList = items.map((item, i) => {
            return (
                <Item
                    
                    key={i}
                    name={item.name}
                    id={item.id}
                    listId={item.listId}
                />
            ) 
        })

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        else {
            return (
                <div>
                     <button onClick={this.handleClick}>Get Items</button>
                     <ul>
                        {itemList}
                     </ul>
                    
                </div>
            )
            
            // return (
            //     <section>
            //        
            //         <ul>
            //         {items.map(item => (
            //             <li key={item.id}>
            //             <div>Item Id: {item.id}</div>
            //             <div>List Id: {item.listId}</div>
            //             <div>Name: {item.name}</div>
            //             </li>
            //         ))}
            //         </ul>
            //     </section>
            // )

        }
         
    }
}

export default Results