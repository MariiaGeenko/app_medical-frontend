import s from './Footer.module.css';
//import localforage from 'localforage';

export const Footer = () => {  
    return (
          <div className={s.FooterOwn}>
            <div className={s.Container}>
              <div className={s.FooterMenu}>
                <div className={s.Footercolumn}>
                  <p>Legal information</p>  
                  <p>Сreated by Geekbrains Team</p> 
                </div>
                <div className={s.Footercolumn}>
                  <p>+7(800)5553535</p> 
                  <p>MyReceiptTeam@gmail.com</p> 
                </div>
              </div>    
            </div>                     
          </div> 
    )
}