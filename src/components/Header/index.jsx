import { Layout, Tag} from 'antd';
import { useNavigate, Link} from 'react-router-dom';
//import { useSelector, useDispatch } from 'react-redux';
import s from './Header.module.css';
import localforage from 'localforage';



export const Header = () => {

  let navigate = useNavigate();

  console.log(sessionStorage)
  const changeUser=() => {
  
    localforage.removeItem('drugs');
    localforage.removeItem('pharmacies');
    localforage.removeItem('doctors');
    localforage.clear();
    
    sessionStorage.clear();

    navigate('/')
    window.location.reload();
    
  }
   
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
                  <button className={s.ButtonLog} style={{display:(sessionStorage.length!==0)?'none':null}} onClick={()=>{navigate('/register')}}>Sign up</button>
                  <button className={s.ButtonSign} style={{display:(sessionStorage.length!==0)?'none':null}} onClick={()=>{navigate('/login')}}>Sign in</button>   
                  <Tag color="#108ee9" className={s.ButtonSign} 
                    style={{ display:((sessionStorage.length===0))?'none':null}}>
                    <Link to={(sessionStorage.length!==0 && sessionStorage.getItem('login').includes('patient')===true)?'/patientOffice':(sessionStorage.length!==0 && sessionStorage.getItem('login').includes('doctor')===true)?'/doctorOffice':'/pharmacistOffice'}>{(sessionStorage.length!==0 && (sessionStorage.getItem('login').includes('patient') || (sessionStorage.getItem('login').includes('doctor'))===true)?sessionStorage.getItem('surname')+' '+sessionStorage.getItem('name'):sessionStorage.getItem('name'))}</Link></Tag>
                  <a href="http://localhost:5588/admin" className={s.ButtonSign} style={{display:(sessionStorage.length!==0 && sessionStorage.getItem('login').includes('doctor')===true)?null:'none'}}>Admin</a>   
                  <button className={s.ButtonSign} size="small" style={{display:(window.sessionStorage.length===0)?'none':null, margin: '0 16px', verticalAlign: 'middle', border:'none'}} onClick={changeUser}>Sign out</button>
                </div>
                <div className={s.HeaderOwn} style={{height:'30px'}}>
                  
                </div>                
              </div> 
            </div>            
          </div>     
        </div>           
      </Layout>
    )
}