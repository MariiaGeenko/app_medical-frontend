//import 'antd/dist/antd.min.css';
import { Layout } from 'antd';
import { Header } from './components/Header';
import { BrowserRouter } from 'react-router-dom'; 
import { Content } from 'antd/es/layout/layout';
import { RoutesAll } from './RoutesAll';
const {Footer} = Layout;

function App() {
  return (
    <BrowserRouter>
    <Layout className="layout" >
        <Header/>   
        <Layout style={{alignItems:'center'}}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              height: '500px'
             
            }}
          >
              <RoutesAll />
          </Content>
        </Layout>
          <Footer style={{textAlign: 'center'}}>
            
              Search for drugs
          </Footer>
    </Layout>

  </BrowserRouter>

  );
}

export default App;
