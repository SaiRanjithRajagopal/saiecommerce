import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const Bootstrap_Modal = ({ show, handleSave, handleClose, children }) => {
    return (
        <React.Fragment>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>{children}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

export default Bootstrap_Modal;
