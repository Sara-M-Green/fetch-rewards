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

    fiterOutNullNames = (item) => {
        if (item.name) {
            return true
        }
        else {
            return false
        }
    }

    render() {
        const { error, items } = this.state

            const itemList = items.filter(this.fiterOutNullNames)

            const sortedList = [].concat(itemList)
            .sort(function(a,b){
                return a.listId - b.listId || a.name.slice(5) - b.name.slice(5);
            })
            .map((item, i) => {
                return (
                    <Item
                    key={i}
                    listId={item.listId}
                    name={item.name}
                    id={item.id}
                    
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
                        {sortedList}
                     </ul>
                </div>
            )
        }
         
    }
}

export default Results