import React, { PureComponent } from 'react';
import { compose, graphql } from 'react-apollo';
import moment from 'moment';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

import { getUser, getUserHealthData } from '../services/queries';

class UserStats extends PureComponent {
  state = {
    selectedData: 'weight',
  };
  changeSelectedData = ({ target: { value: selectedData } }) => {
    this.setState({ selectedData });
  };
  render() {
    const {
      getUserHealthData: { userHealthData, loading },
      getUser: { user, loading: getUserLoading },
    } = this.props;

    const { selectedData } = this.state;

    const dataSelector = (
      <select onChange={this.changeSelectedData}>
        <option value="weight">Weight</option>
        <option value="alcohol">Alcohol</option>
        <option value="calories">Calories</option>
        <option value="steps">Steps</option>
      </select>
    );

    const formatedUserHealthData =
      !loading &&
      userHealthData.map(({ date, ...othersData }) => ({
        date: moment(date, 'x').format('DD-MM-YYYY'),
        ...othersData,
      }));
    const charts = !loading && (
      <LineChart width={600} height={300} data={formatedUserHealthData}>
        <Line type="monotone" dataKey={selectedData} stroke="blue" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
      </LineChart>
    );
    return (
      <div>
        <h2> {(!getUserLoading && user.name) || 'User'} health data</h2>
        <div>Select data to show : {dataSelector}</div>
        <div>{charts || '...loading'}</div>
      </div>
    );
  }
}

export default compose(
  graphql(getUserHealthData, {
    name: 'getUserHealthData',
    options: props => ({
      variables: {
        user_id: props.match.params.userId,
      },
    }),
  }),
  graphql(getUser, {
    name: 'getUser',
    options: props => ({
      variables: {
        user_id: props.match.params.userId,
      },
    }),
  })
)(UserStats);
