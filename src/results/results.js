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
                });
                },
                (error) => {
                this.setState({
                    error
                });
                }
            )
    }

    handleBack = () => {
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
            if(this.state.listIds.indexOf(item.listId) === -1) {
                this.state.listIds.push(item.listId)
            }
        })

        let lists = this.state.listIds.map((id, i) => {
            return (
                <List
                    key={i}
                    id={id}
                    items={sortedList.filter(item => item.listId === id)} 
                />
            )
        })


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