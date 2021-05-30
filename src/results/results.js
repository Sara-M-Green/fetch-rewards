import React from 'react'
import List from '../list/list'
import './results.css'

class Results extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            error: null,
            listIds: []
        }
    }

    handleClick = () => {
        fetch('https://fetch-hiring.s3.amazonaws.com/hiring.json')
            .then(res => res.json())
            .then(
                (result) => { 
                    this.setState({
                        items: result
                    })
                },
                (error) => {
                    this.setState({
                        error
                    })
                }
            )
    }

    handleBack = () => {
        // refreshes page on back button click
        window.location.reload()
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

        // filter out null names
        const filteredList = items.filter(this.fiterOutNullNames)

        // sort by listId and name
        const sortedList = filteredList
                .sort(function(a,b){
                    return a.listId - b.listId || a.name.slice(5) - b.name.slice(5);
                })

        // group list by listId
        sortedList.forEach(item => {
            // creates a dynamic array containing all list ids
            if(this.state.listIds.indexOf(item.listId) === -1) {
                this.state.listIds.push(item.listId)
            }
        })

        // generates a list component for each list id
        let lists = this.state.listIds.map((id, i) => {
            return (
                <List
                    key={i}
                    id={id}
                    items={sortedList.filter(item => item.listId === id)} 
                />
            )
        })

        // error handling
        if (error) {
            return (
                <div>
                    <h2>Something went wrong, try again later</h2>
                </div>
            )
        }

        // no error
        return (
            <div>
                <button className={(items.length === 0 ? 'show'  : 'hidden' )} onClick={this.handleClick}>Get Items</button>                  
                <button className={(items.length === 0 ?  'hidden' : 'show' )} onClick={this.handleBack}>Back</button>
                <div className="list-container">
                    {lists}    
                </div>
            </div>
        )
    }
}

export default Results