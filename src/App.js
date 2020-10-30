import { Layout } from 'antd';
import './App.css';

import Home from './components/home';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Header>
      </Header>

      <Content>
        <Home />
      </Content>

      <Footer>
      </Footer>
    </Layout>
  );
}

export default App;
