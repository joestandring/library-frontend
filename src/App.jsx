/**
 * The highest level component
 * @module src/App
 * @author Joe Standring
 * @see components/ for components imported and used here
 * @see src/index.js for where the component is rendered
 */

import { Layout } from 'antd';
import './App.css';

import Home from './components/home';
import Books from './components/books';
import BookView from './components/bookview';
import HeaderContent from './components/headercontent';
import FooterContent from './components/footercontent';
import Login from './components/login';
import User from './components/user';

const { Header, Content, Footer } = Layout;

/**
 * Display components of the app
 * @returns {string} The HTML code to display elements
 */
function App() {
  return (
    <Layout className="layout">
      <Header>
        <HeaderContent />
      </Header>

      <Content>
        <User />
      </Content>

      <Footer>
        <FooterContent />
      </Footer>
    </Layout>
  );
}

/** Export the component to be rendered in index.js */
export default App;
