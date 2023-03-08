import { Layout, Menu, Tag, Button} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
//import { useSelector, useDispatch } from 'react-redux';
import s from './Header.module.css';
//import localforage from 'localforage';




export const Header = () => {

  let navigate = useNavigate()


  const changeUser=() => {
    
    sessionStorage.clear();

    navigate('/home')
    window.location.reload();
    
  }

    // формирование и рендер меню
  const items = [
    {
      label:<Link to='/drugs'>Лекарства</Link>,
      key: 'drugs'
    },
    {
      label:<Link to='/pharmacies'>Аптеки</Link>,
      key: 'pharmacies'
    }

  ];
   
    return (
      <Layout>
        <div className={s.HeaderOwn}>
          <Menu mode="horizontal" style={{width:'200px'}} items={items}/>
          <div className={s.HeaderOwn} style={{height:'30px'}}>
          <Tag color="blue">{(sessionStorage.length===0)?'Не авторизован':sessionStorage.getItem('login')}</Tag>
          <Button size="small" style={{ margin: '0 16px', verticalAlign: 'middle', border:'none'}} onClick={changeUser}>Выход</Button>
          </div>
          
        </div>
        
  
      </Layout>
    )

}