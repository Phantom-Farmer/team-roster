import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPlayer, updatePlayer } from '../../api/playerData';

const initialState = {
  first_name: '',
  last_name: '',
  position: '',
  nickname: '',
  imageURL: '',
  firebaseKey: '',
};

export default function NewPlayerForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey)setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePlayer(formInput).then(() => router.push('/roster'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPlayer(payload).then(() => {
        router.push('/roster');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Player</h2>
      <FloatingLabel controlId="floatingInput2" label="First Name" className="mb-3">
        <Form.Control type="text" placeholder="First Name" name="first_name" value={formInput.first_name} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Last Name" className="mb-3">
        <Form.Control type="text" placeholder="Last Name" name="last_name" value={formInput.last_name} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput3" label="Player Position" className="mb-3">
        <Form.Control type="text" placeholder="Player Position" name="position" value={formInput.position} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput4" label="Nickname" className="mb-3">
        <Form.Control type="text" placeholder="Nickname" name="nickname" value={formInput.nickname} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput5" label="Player Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter an image url" name="imageURL" value={formInput.imageURL} onChange={handleChange} required />
      </FloatingLabel>
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Player</Button>
    </Form>
  );
}

NewPlayerForm.propTypes = {
  obj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    position: PropTypes.string,
    nickname: PropTypes.string,
    imageURL: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

NewPlayerForm.defaultProps = {
  obj: initialState,
};
