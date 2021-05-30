import React from 'react'
import './list.css'
import Item from '../item/item'

class List extends React.Component {
    render() {
        return (
            <ul className='lists'>
                <h2 className='list-heading'>List {this.props.id}</h2>
                {this.props.items.map((item, i) =>
                    <Item
                        key={i}
                        id={item.id}
                        name={item.name}
                        listId={item.listId}
                    />
                )}
            </ul>
        )
    }
}

export default List