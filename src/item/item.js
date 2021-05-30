import React from 'react'

class Item extends React.Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (
            <div>
                <li key={this.props.id}>
                    <div>Item Id: {this.props.id}</div>
                    <div>List Id: {this.props.listId}</div>
                    <div>Name: {this.props.name}</div>
                </li>
            </div>    
        )
    }
}

export default Item