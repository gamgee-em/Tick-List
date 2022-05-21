import './App.css';
import { 
  ApolloClient, 
  InMemoryCache, 
  ApolloProvider, 
  createHttpLink,
  from
} from '@apollo/client';
//import { setContext } from '@apollo/client/link/context'

import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import DataForm from './components/DataForm/DataForm';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphqlErrors, networkError}) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      return alert(`Graphql Error ${message}`);
    });
  };
});

const httpLink = from ([
  errorLink,
  createHttpLink({ uri: 'http://localhost:3141/graphql' })
]) 

/* const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
}); */

const client = new ApolloClient({
  link: /* authLink.concat */(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      {/* {" "} */}
      <div className="App">
        <Navbar />
        <Home DataForm={ DataForm }/>      
      </div>
    </ApolloProvider>
    
  );
};

export default App;
