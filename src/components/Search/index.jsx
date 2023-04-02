
import React from 'react';
import { Input, List, Card, Image, Button} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setSearchParamData, setSearchData, clearSearchData } from './../../reducers/SearchData';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import s from './Index.module.css';

export const Search = () => {

    const dispatch = useDispatch();

    const drugs = useSelector(state => state.Search.drugs);
    const pharmacies = useSelector(state => state.Search.pharmacies);
    const doctors = useSelector(state => state.Search.doctors);
    const SearchData = useSelector(state => state.Search.SearchData);

    const [tag, settag] = useState('');

    async function fetchData() {
      //let pageData=document.getElementsByClassName('ant-pagination-item-active')[0].attributes.title.value;
      const response = await fetch('http://localhost:54000/api/drugs/searchList?page=1&perPage=10');
      let dataS = await response.json();
      console.log(dataS);
      return dataS
    }

  

    useEffect(() => {

      const paramsSearch=[
        { path: '/medicines', data: { description_url: 'Medicine', name: 'Some Medicine', img: "drugs.jpg" }},
        { path: '/pharmacies', data: { description_url: 'Pharmacy', name: 'Some Pharmacy', img: "pharmacies.jpg" }}, 
        { path: '/doctors', data: { description_url: 'Doctor', name: 'Some Doctor', img:"doctors.jpg" }}
      ];
    

          for (let i=1;i<=paramsSearch.length-1; i++) {
            dispatch(setSearchParamData({path:paramsSearch[i].path, data:paramsSearch[i].data}));
          }
         fetchData().then((value) => {
            dispatch(setSearchParamData({path:paramsSearch[0].path, data:value}));
            console.log(value);
            });       
          
        
        },[dispatch]);
   

      useEffect(()=> {
        if (window.location.pathname !=='/login' || window.location.pathname !=='/register') {
          switch(window.location.pathname) {
            case '/medicines' :
              console.log(drugs);
              dispatch(setSearchData(drugs
                ));
              break;
            case '/pharmacies' :
              dispatch(setSearchData(Array.from({
                length: 23,
              }).map((_, i) => ({
                href: '#',
                description_url: `${pharmacies.description_url} ${i+1}`,
                name: pharmacies.name,
                img: pharmacies.img
              }))));
              break;
            default :
              dispatch(setSearchData(Array.from({
                length: 23,
              }).map((_, i) => ({
                href: '#',
                description_url: `${doctors.description_url} ${i+1}`,
                name: doctors.name,
                img: doctors.img
              }))));
              break;
  
          }
        }
  
        return() => {
          dispatch(clearSearchData([]));     
          settag(''); 
        }

        
      },[window.location.pathname, dispatch, drugs, pharmacies, doctors]);// eslint-disable-line react-hooks/exhaustive-deps

    
      console.log(SearchData);
      const DataLoader = () => {

      if (SearchData.length!==0) {

        return (
          <div>
            <Input placeholder='Search' style={{width:'300px', marginBottom:'25px'}}  onChange={(e) => {settag(e.target.value);}}/>

            <List className={s.list}
              grid={{
              gutter: 16,
              column: 4,
              }}
              pagination={{
                pageSize: 10,
              }}
              dataSource={SearchData.filter(item => item['description_url'].includes(String(tag))===true)}
              renderItem={(item) => (
              <List.Item
                key={item.title}>
                  <Card title={item.description_url}>
                    <Image
                      alt="logo"
                      src= {`${item.img}`}
                    />
                    <br/>
                    {item.name}</Card>
                </List.Item>
                )}              
            />           
        </div>
      
        )
      } else {
          return (
            <div style={{display:'flex', justifyContent: 'center', alignItems:'center', paddingBottom:'30px' }}>
              <BallTriangle color="#313252" height={80} width={80} />
            </div>
                    
          )
      }
    }

    return (
      <div >
         {DataLoader()} 
      </div>
    )  
}