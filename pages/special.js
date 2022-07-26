import { useAuth } from '../utils/context/authContext';

function Special() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>I LOVE YOU, COHORT 19, KEEP IT SEXY!  A special message from {user.displayName}</h1>
    </div>
  );
}

export default Special;
