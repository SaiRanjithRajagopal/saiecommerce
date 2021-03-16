import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';

const ByCategory = ({ categories, category, setCategory }) => {
    return (
        <div>
            <h4>Categories</h4>
            <ListGroup>
                {categories.map(currentCategory => (
                    <ListGroup.Item as="li" className={(currentCategory == 'All' && category == '') ? 'active' : (currentCategory == category ? 'active onMouseHover' : 'onMouseHover')}
                        key={currentCategory}
                        onClick={() => {
                            if (currentCategory == 'All') { setCategory('') } else { setCategory(currentCategory) }
                        }}
                    >{currentCategory}</ListGroup.Item>
                ))}
            </ListGroup>
            <br /><br /><br />
            <hr />
        </div>
    )
}

export default ByCategory
