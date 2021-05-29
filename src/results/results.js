import React from 'react'
import './results.css'

class Results extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            error: null
        }
    }   

    render() {
        return (
            <section>
                <button>Click Me</button>
            </section>
        ) 
    }
}

export default Results