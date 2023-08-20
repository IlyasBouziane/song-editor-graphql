import './style/style.css'
import React from 'react';
import ReactDOM from 'react-dom';
// what actually interacts with GraphQL server in the backend
// makes the requests for data and store the data locally when response comes back
// Apollo Client : it's not tight to any frontend
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import {Router, Route, hashHistory, IndexRoute} from 'react-router'


// if no config provided, ApolloClient makes assumptions on where your GraphQL server is
const client = new ApolloClient({
  dataIdFromObject: o => o.id
})

import SongList from './components/SongList';
import App from './components/App';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

const Root = () => {
  return(
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="song/new" component={SongCreate} />
          <Route path="songs/:id" component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  )
  
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
