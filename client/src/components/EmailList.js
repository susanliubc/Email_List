import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEmails, deleteEmail } from '../actions/emailAction';

const EmailList = ({ email: { emails }, isAuthenticated, getEmails, deleteEmail }) => {
  useEffect(() => {
    getEmails();
    //eslint-disable-next-line
  }, []);

  const handleDelete = id => {
    deleteEmail(id);
  };

  return (
    <Container>
      {isAuthenticated ? (
        <ListGroup>
          <TransitionGroup className='email-list'>
            {emails.map(({ _id, email }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem>
                  {email}
                  <Button
                    className='remove-btn float-right'
                    color='danger'
                    size='sm'
                    onClick={handleDelete.bind(this, _id)}
                  >
                    &times;
                  </Button>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      ) : null}
    </Container>
  );
};

EmailList.propTypes = {
  email: PropTypes.object.isRequired,
  getEmails: PropTypes.func.isRequired,
  deleteEmail: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  email: state.email,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getEmails, deleteEmail }
)(EmailList);
