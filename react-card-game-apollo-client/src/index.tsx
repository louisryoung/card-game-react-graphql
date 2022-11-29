import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'
import { App } from './App'
import reportWebVitals from './reportWebVitals'
import './styles/index.css'

const uri = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001'
const httpLink = createHttpLink({
  uri,
})
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
