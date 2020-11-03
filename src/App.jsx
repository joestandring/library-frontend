/**
 * The highest level component
 * @module src/App
 * @author Joe Standring
 * @see components/ for components imported and used here
 * @see src/index.js for where the component is rendered
 */

import { Layout } from 'antd';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/home';
import Books from './components/books';
import BookView from './components/bookview';
import HeaderContent from './components/headercontent';
import FooterContent from './components/footercontent';
import Login from './components/login';
import User from './components/user';
import Account from './components/account'

const { Header, Content, Footer } = Layout;

/**
 * Display components of the app
 * @returns {string} The HTML code to display elements
 */
function App() {
  return (
    <Router>
      <Layout className="layout">
        <Header>
          <HeaderContent />
        </Header>

        <Content>
          <Switch>
            <Route path="/books/:id" children={ <BookView /> } />
            <Route path="/books" children={ <Books /> } />
            <Route path="/login" children={ <Login /> } />
            <Route path="/user" children={ <User /> } />
            <Route path="/account" children={ <Account /> } />
            <Route path="/" children={ <Home /> } />
          </Switch>
        </Content>

        <Footer>
          <FooterContent />
        </Footer>
      </Layout>
    </Router>
  );
}

/** Export the component to be rendered in index.js */
export default App;
