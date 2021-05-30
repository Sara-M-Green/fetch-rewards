import React from 'react'
import './item.css'

class Item extends React.Component {
    render() {
        return (
                <div className='list-item'>
                    <li key={this.props.id} className={(this.props.listId % 2 === 0 ? 'even' : 'odd')}>
                        {/* <div>List Id: {this.props.listId}</div> */}
                        <div>Name: {this.props.name}</div>
                        <div>Item Id: {this.props.id}</div>
                    </li>
                </div>        
        )
    }
}

export default Item