import { Typography} from 'antd';
const { Title } = Typography;


export const Home = () => {
    return (
        <div style={{textAlign: 'center'}}>
              <Title level={5} >Добро пожаловать в программу My-receipt</Title>
              <br/>
              <img
                          width={272}
                          alt="logo"
                          src= {"imgOwn.jpg" }
                        />

        </div>   
        )
}