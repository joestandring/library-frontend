/**
 * The highest level component
 * @module src/App
 * @author Joe Standring
 * @see components/ for components imported and used here
 * @see src/index.js for where the component is rendered
 * @see src/components/headercontent for the content displayed in the page header
 * @see src/components/footercontent for the content displayed in the page footer
 */

import { Layout } from 'antd';
import './App.css';

import Home from './components/home';
import HeaderContent from './components/headercontent';
import FooterContent from './components/footercontent';

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
        <Home />
      </Content>

      <Footer>
        <FooterContent />
      </Footer>
    </Layout>
  );
}

/** Export the component to be rendered in index.js */
export default App;
