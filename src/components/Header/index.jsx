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
    },
    {
      label:<Link to='/doctors'>Врачи</Link>,
      key: 'doctors'
    }


  ];
   
    return (
      <Layout>
        <div className={s.HeaderOwn}>
          <Menu mode="horizontal" style={{width:'300px', visibility: (document.location.pathname !== '/login' || document.location.pathname !== '/register')?'visible':'hidden'}} items={items}/>
          <div className={s.HeaderOwn} style={{height:'30px'}}>
          <Tag color="blue" style={{visibility: (sessionStorage.length!==0)? 'visible': 'hidden'}}>{sessionStorage.getItem('login')}</Tag>
          <Button size="small" style={{visibility: (sessionStorage.length!==0)? 'visible': 'hidden', margin: '0 16px', verticalAlign: 'middle', border:'none'}} onClick={changeUser}>Выход</Button>
          <Button size="small" style={{visibility: (sessionStorage.length===0)? 'visible': 'hidden', margin: '0 16px', verticalAlign: 'middle', border:'none'}} onClick={()=>{navigate('/register')}}>Регистрация</Button>
          <Button size="small" style={{visibility: (sessionStorage.length===0)? 'visible': 'hidden', margin: '0 16px', verticalAlign: 'middle', border:'none'}} onClick={()=>{navigate('/login')}}>Вход</Button>
          </div>
          
        </div>
        
  
      </Layout>
    )

}