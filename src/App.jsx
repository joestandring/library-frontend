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

import React from 'react';
import Home from './components/home';
import Books from './components/books';
import BookView from './components/bookview';
import HeaderContent from './components/headercontent';
import FooterContent from './components/footercontent';
import Login from './components/login';
import User from './components/user';
import Account from './components/account';
import AccountEdit from './components/accountedit';
import UserContext from './contexts/user';

const { Header, Content, Footer } = Layout;

/**
 * Display components of the app
 * @returns {string} The HTML code to display elements
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { loggedIn: false },
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  
  login(user, password) {
    user.loggedIn = true;
    user.password = password;
    this.setState({ user: user })
  }
  
  logout() {
    console.log('User removed from context');
    this.setState({ user: { loggedIn: false } })
  }
  
  render() {
    const context = {
      user: this.state.user,
      login: this.login,
      logout: this.logout,
    };
    
    return (
      <UserContext.Provider value={ context }>
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
                <Route path="/account/edit" children={ <AccountEdit /> } />
                <Route path="/account" children={ <Account /> } />
                <Route path="/" children={ <Home /> } />
              </Switch>
            </Content>

            <Footer>
              <FooterContent />
            </Footer>
          </Layout>
        </Router>
      </UserContext.Provider>
    );
  }
}

/** Export the component to be rendered in index.js */
export default App;
