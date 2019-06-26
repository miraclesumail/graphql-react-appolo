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

//ReactDOM.render(<App />, document.getElementById('root'));

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('AUTH_TOKEN')
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjandsZ2x4YmcwMG51MGIwNXBwMGJ5cnBzIiwiaWF0IjoxNTU5ODczODYwfQ.28U--CfTdO_a-ViIHXfkbe9hS6WKpes4vftDoCvs_6w'
      }
    }
  })

const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
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




