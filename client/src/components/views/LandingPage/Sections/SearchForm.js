import React, { Component } from 'react'
import { Input } from 'antd'

const {Search } = Input;

export class SearchForm extends Component {
    render() {
        return (
            <div>
            <Search
                value
                onChange
                placeholder="Search by typing..."/>
        </div>
        )
    }
}

export default SearchForm
