import React from 'react';
import { Button } from 'react-bootstrap';
import User from '../components/User';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';

export default function Profile() {
  const { user } = useAuth();
  console.warn(user);
  return (
    <div>
      <h1>
        PHANTOM FARMER
      </h1>
      <User
        image={user.photoURL}
        email={user.email}
        name={user.name}
        lastLogin={user.metadata.lastSignInTime}
      />
      <Button variant="danger" onClick={signOut}>Sign Out</Button>
    </div>
  );
}
