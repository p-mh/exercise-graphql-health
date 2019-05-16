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

import { getAverageHealthData } from '../services/queries';

class AverageStats extends PureComponent {
  state = {
    selectedData: 'weight',
  };
  changeSelectedData = ({ target: { value: selectedData } }) => {
    this.setState({ selectedData });
  };
  render() {
    const {
      getAverageHealthData: { healthAverageData, loading },
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

    const formatedHealthAverageData =
      !loading &&
      healthAverageData.map(({ date, ...othersData }) => ({
        date: moment(date, 'x').format('DD-MM-YYYY'),
        ...othersData,
      }));

    const charts = !loading && (
      <div>
        <LineChart width={600} height={300} data={formatedHealthAverageData}>
          <Line type="monotone" dataKey={selectedData} stroke="blue" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
    );
    return (
      <div>
        <h2>Average health data</h2>
        <div>Select data to show : {dataSelector}</div>
        <div>{charts}</div>
      </div>
    );
  }
}

export default compose(
  graphql(getAverageHealthData, { name: 'getAverageHealthData' })
)(AverageStats);
