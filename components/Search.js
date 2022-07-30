import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

function Search({ players, setPlayerFilter }) {
  const [searchInput, setSearchInput] = useState('');
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
    const results = players.filter((player) => player.first_name.toLowerCase().includes(value.toLowerCase()) || player.last_name.toLowerCase().includes(value.toLowerCase()) || player.position.toLowerCase().includes(value.toLowerCase()));
    setPlayerFilter(results);
  };
  return (
    <Form className="search">
      <Form.Control type="search" className="searchInput" placeholder="Search Players" value={searchInput} onChange={handleChange} />
    </Form>
  );
}

Search.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    position: PropTypes.string,
  })).isRequired,
  setPlayerFilter: PropTypes.func.isRequired,
};

export default Search;
