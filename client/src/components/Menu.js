import React from 'react';
import { Link } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';
import { getUsers } from '../services/queries';

const Menu = ({ getUsers: { users, loading } }) => {
  const userLinks =
    !loading &&
    users.map(({ id, name }) => (
      <li key={id}>
        <Link to={`/healthStat/${id}`}>{name} stats</Link>
      </li>
    ));

  return (
    <div>
      <h1>Health App</h1>
      <ul>
        <li>
          <Link to="/averageStat/">Average Stats</Link>
        </li>
        {userLinks}
      </ul>
    </div>
  );
};

export default compose(graphql(getUsers, { name: 'getUsers' }))(Menu);
