import s from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchParamData } from './../../reducers/SearchData';

export const Home = () => {
  let navigate = useNavigate();



  const dispatch = useDispatch(); 

  useEffect(()=> {
    let urls=['/drugs','/pharmacies', '/doctors'];
    async function fetchData(url) {
      //let pageData=document.getElementsByClassName('ant-pagination-item-active')[0].attributes.title.value;
      const response = await fetch(`http://localhost:5588/api${url}`);
      let dataS = await response.json();
      dispatch(setSearchParamData({path:url, data:dataS}));

      return dataS
    };

    for(let i=0;i<=urls.length-1;i++) {
      fetchData(urls[i]);
    }
  },[dispatch]);


    return (
      <div className={s.HomeOwn}>
        <div className={s.Container}>
          <div className={s.HomeBlock} style={{textAlign: 'center'}}>
            <div className={s.Textcontent}>
              <p className={s.Title}>Medical care for patients, doctors, pharmacists, drug manufacturers</p>
              <p className={s.Text}>For the Ministry of Health in the Czech Republic.</p>
              <div className={s.buttons}>
                <button onClick={()=>{navigate('/register')}} className={s.ButtonSign}>Sign up</button>
                <button onClick={()=>{navigate('/login')}} className={s.ButtonLog}>Sign in</button>
              </div>
            </div>              
            <img className={s.Image} alt="logo" src= {"imgOwn.jpg"}/>
          </div>   
        </div>      
      </div>      
    )
}