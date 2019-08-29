import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authAction';
import { clearErrors } from '../../actions/errorAction';

const RegisterModal = ({ isAuthenticated, error, register }) => {
  const [modal, setModal] = useState(false);
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    msg: null
  });

  useEffect(() => {
    if (error !== undefined) {
      //Check for register error
      if (error.id === 'REGISTER_FAIL') {
        setState({ msg: error.msg.msg });
      } else {
        setState({ msg: null });
      }
    }

    //If authenticated, close modal
    if (state.modal) {
      if (isAuthenticated) toggle();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated]);

  const toggle = () => {
    //Clear errors
    clearErrors();
    setModal(!modal);
  };

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const { name, email, password } = state;

    //Create user object
    const newUser = {
      name,
      email,
      password
    };

    //Attempt to register
    register(newUser);
  };
  return (
    <div>
      <NavLink onClick={toggle} href='#'>
        Register
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          {state.msg ? <Alert color='danger'>{state.msg}</Alert> : null}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input
                type='text'
                name='name'
                id='name'
                placeholder='Add Name'
                className='mb-3'
                onChange={handleChange}
              />
              <Label for='email'>Email</Label>
              <Input
                type='email'
                name='email'
                id='email'
                placeholder='Add Email'
                className='mb-3'
                onChange={handleChange}
              />
              <Label for='password'>Password</Label>
              <Input
                type='password'
                name='password'
                id='password'
                placeholder='Add Password'
                className='mb-3'
                onChange={handleChange}
              />
              <Button color='dark' style={{ marginTop: '2rem' }} block>
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

RegisterModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(RegisterModal);
