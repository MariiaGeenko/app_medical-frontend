import s from './Home.module.css';
import { useNavigate } from 'react-router-dom';


export const Home = () => {
  let navigate = useNavigate()

    return (
      <div className={s.HomeOwn}>
        <div className={s.Container}>
          <div className={s.HomeBlock} style={{textAlign: 'center'}}>
            <div className={s.Textcontent}>
              <p className={s.Title}>Medical care for patients, doctors, pharmacists, drug manufacturers</p>
              <p className={s.Text}>For the Ministry of Health in the Czech Republic.</p>
              <button onClick={()=>{navigate('/register')}} className={s.Button}>Log in</button>
            </div>              
              <img
                style={{ borderRadius: '200px', width: '500px'}}
                alt="logo"
                src= {"imgOwn.jpg"}
              />
          </div>   
        </div>      
      </div>      
    )
}