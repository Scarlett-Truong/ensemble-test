import { ApolloClient } from 'apollo-boost'
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const ENDPOINT = 'http://localhost:4000/graphql';

const httpLink = createHttpLink({uri: ENDPOINT,});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export { client }