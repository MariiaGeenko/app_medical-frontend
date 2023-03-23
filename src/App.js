//import 'antd/dist/antd.min.css';
import { Layout } from 'antd';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BrowserRouter } from 'react-router-dom'; 
import { Content } from 'antd/es/layout/layout';
import { RoutesAll } from './RoutesAll';

function App() {
  return (
    <BrowserRouter>
    <Layout className="layout" >
        <Header/>   
        <Layout>
          <Content>
              <RoutesAll />
          </Content>
        </Layout>
          <Footer/>
    </Layout>

  </BrowserRouter>

  );
}

export default App;
