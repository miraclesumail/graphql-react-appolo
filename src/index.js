import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { setContext } from 'apollo-link-context'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import gql from 'graphql-tag';

const typeDefs = gql`
  type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
    todo(name:String!): Todo
  }

  type Todo {
    name: String,
    completed: Boolean,
    time: String!
  }

  type Launch {
    isInCart: Boolean!
  }

  type Mutation {
    addOrRemoveFromCart(id: ID!): [Launch]
  }
`;

export const resolvers = {
   
};

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('AUTH_TOKEN')
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjandsZ2x4YmcwMG51MGIwNXBwMGJ5cnBzIiwiaWF0IjoxNTU5ODczODYwfQ.28U--CfTdO_a-ViIHXfkbe9hS6WKpes4vftDoCvs_6w'
      }
    }
  })

let cache = new InMemoryCache(); 

const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    typeDefs,
    resolvers 
})

cache.writeData({
    data: {
        isLogin: '顶顶顶顶',
        todos: [
            {name: 'write code', completed: true, time: '2019-6-29'},
            {name: 'play chess', completed: true, time: '2019-6-29'},
            {name: 'swim pool', completed: false, time: '2019-6-29'},
        ]
    }
})

ReactDOM.render(
   <BrowserRouter>
      <ApolloProvider client={client}>
        <Provider store={store}>
              <App />
        </Provider> 
      </ApolloProvider>
    </BrowserRouter>,
    document.getElementById('root')
  )

serviceWorker.unregister();




