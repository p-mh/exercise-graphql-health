import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import Menu from './components/Menu';
import UserStats from './components/UserStats';
import AverageStats from './components/AverageStats';

const client = new ApolloClient({ uri: '/graphql' });

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Route path="/" component={Menu} />
          <Route path="/healthStat/:userId" component={UserStats} />
          <Route path="/averageStat/" component={AverageStats} />
        </ApolloProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
