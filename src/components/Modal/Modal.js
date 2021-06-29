import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import BootstrapModal from 'react-bootstrap/Modal';

const Modal = (props) => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState(props.item.text);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    setText(e.target.value);
  }

  const handleSave = (e) => {
    console.log('saved');
    setShow(false);
  }

  return (
    <>
      <Button
        onClick={handleShow}
        className='float-right p-0 mr-2'
        variant='light'
      >
        Edit
      </Button>

      <BootstrapModal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title>Edit To Do</BootstrapModal.Title>
        </BootstrapModal.Header>
        <BootstrapModal.Body>
          <input
            className='form-control'
            name='text'
            type='text'
            value={text}
            placeholder='Add To Do List Item'
            onChange={handleInputChange}
          />
        </BootstrapModal.Body>
        <BootstrapModal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleSave} variant='primary'>Save</Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};

export default Modal;
