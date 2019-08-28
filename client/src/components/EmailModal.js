import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmail } from '../actions/emailAction';

const EmailModal = ({
  email: { emails },
  auth: { isAuthenticated },
  addEmail
}) => {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState('');

  const toggle = () => setModal(!modal);

  const handleChange = e => {
    setEmail(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newEmail = {
      email: email
    };

    //Add email by addEmail action
    addEmail(newEmail);

    //Close modal
    toggle();
  };
  return (
    <div>
      {isAuthenticated ? (
        <Button color='dark' style={{ marginBottom: '2rem' }} onClick={toggle}>
          Add Email
        </Button>
      ) : (
        <h4 className='mb-3 ml-4'>Please log in to manage emails</h4>
      )}

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add To EmailList</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for='email'>Email</Label>
              <Input
                type='text'
                name='email'
                id='email'
                placeholder='Add Email'
                onChange={handleChange}
              ></Input>
              <Button color='dark' style={{ marginTop: '2rem' }} block>
                Add Email
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

EmailModal.propTypes = {
  addEmail: PropTypes.func.isRequired,
  email: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  email: state.email,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addEmail }
)(EmailModal);
