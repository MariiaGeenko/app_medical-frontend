import { Typography} from 'antd';
const { Title } = Typography;


export const Home = () => {
    return (
        <div style={{textAlign: 'center'}}>
              <Title level={5} >Welcome to the program My-receipt</Title>
              <br/>
              <img
                          style={{ borderRadius: '200px', width: '272px'}}
                          alt="logo"
                          src= {"imgOwn.jpg" }
                        />

        </div>   
        )
}