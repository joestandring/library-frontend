import { Layout } from 'antd';
import './App.css';

import Home from './components/home';
import HeaderContent from './components/headercontent';
import FooterContent from './components/footercontent';

const { Header, Content, Footer } = Layout;

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

export default App;
