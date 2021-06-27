import React from 'react'

const MainHeader = (props) => {
    return (
            <h2 className='text-light p-2'>
            To Do List Manager ({props.list.filter((item) => !item.complete).length})
            </h2>
    )
}

export default MainHeader
