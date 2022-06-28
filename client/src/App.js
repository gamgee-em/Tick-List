import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import DataForm from './components/DataForm/DataForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import SignInForm from './components/SignInForm/SignInForm';
import Profile from './pages/Profile/Profile';
import Chart from 'react-google-charts';
import TickList from './components/TickList/TickList';
import Footer from './components/Footer/Footer';

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      return alert(`Graphql Error ${message}`);
    });
  }
});

const httpLink = from([errorLink, createHttpLink({ uri: '/graphql' })]);

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path='/'
            exact
            element={
              <Home RegisterForm={RegisterForm} SignInForm={SignInForm} />
            }
          />
          <Route
            path='/me'
            exact
            element={
              <Profile DataForm={DataForm} Chart={Chart} TickList={TickList} />
            }
          />
        </Routes>
        <Footer />
      </Router>
    </ApolloProvider>
  );
};

export default App;
