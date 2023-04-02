import { Layout} from 'antd';
import { useNavigate } from 'react-router-dom';
//import { useSelector, useDispatch } from 'react-redux';
import s from './Header.module.css';
//import localforage from 'localforage';

export const Header = () => {

  let navigate = useNavigate()
   
    return (
      <Layout>
        <div className={s.HeaderOwn}>
          <div className={s.Container}>            
            <div className={s.Header}> 
              <img className={s.Logo} onClick={()=>{navigate('/')}} src="Logo.png" alt="My receipt"/>     
              <div className={s.HeaderContent} style={{height:'30px'}}>
                <ul className={s.MenuList}>
                  <li className={s.MenuItem} onClick={()=>{navigate('/medicines')}}>Medicines</li>
                  <li className={s.MenuItem} onClick={()=>{navigate('/pharmacies')}}>Pharmacies</li>
                  <li className={s.MenuItem} onClick={()=>{navigate('/doctors')}}>Doctors</li>
                </ul>
                <div className={s.buttons}>
                  <button className={s.ButtonLog}  onClick={()=>{navigate('/register')}}>Log in</button>
                  <button className={s.ButtonSign} onClick={()=>{navigate('/login')}}>Sign in</button>     
                </div>              
              </div> 
            </div>            
          </div>     
        </div>           
      </Layout>
    )
}