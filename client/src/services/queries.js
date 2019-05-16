import { gql } from 'apollo-boost';

export const getUsers = gql`
  {
    users {
      id
      name
    }
  }
`;

export const getUser = gql`
  query fetchUserById($user_id: ID) {
    user(user_id: $user_id) {
      id
      name
    }
  }
`;

export const getUserHealthData = gql`
  query getUserHealthData($user_id: ID) {
    userHealthData(user_id: $user_id) {
      date
      weight
      alcohol
      calories
      steps
    }
  }
`;

export const getAverageHealthData = gql`
  {
    healthAverageData {
      date
      weight
      alcohol
      calories
      steps
    }
  }
`;
