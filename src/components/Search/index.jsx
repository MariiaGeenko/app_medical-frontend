import React from 'react';
import {  Input, List, Card, Image } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setSearchParamData, setSearchData, clearSearchData } from './../../reducers/SearchData';

export const Search = () => {

    const dispatch = useDispatch();

    const drugs = useSelector(state => state.Search.drugs);
    const pharmacies = useSelector(state => state.Search.pharmacies);
    const doctors = useSelector(state => state.Search.doctors);
    const SearchData = useSelector(state => state.Search.SearchData);

    const [tag, settag] = useState('');


    useEffect(() => {
 
        const paramsSearch=[
          { path: '/drugs', data: { title: 'Лекарство', content: 'Некоторое лекарство', img: "drugs.jpg" }},
          { path: '/pharmacies', data: { title: 'Аптека', content: 'Некоторая аптека', img: "pharmacies.jpg" }}, 
          { path: '/doctors', data: { title: 'Доктор', content: 'Некоторый доктор', img:"doctors.jpg" }}
        ];

        /*
          async function fetchData(path) {
            const response = await fetch(`${API_URL}${path}`);
            let dataS = await response.json();
            dispatch(setUserCard({path:path, data:dataS.data}))
          }
              
      
          for (let i=0;i<=paths.length-1; i++) {
            fetchData(paths[i]);
          }
          */
          for (let i=0;i<=paramsSearch.length-1; i++) {
            dispatch(setSearchParamData({path:paramsSearch[i].path, data:paramsSearch[i].data}));
          }

   
        
        },[dispatch]);

      useEffect(()=> {
        if (window.location.pathname !=='/login' || window.location.pathname !=='/register') {
          switch(window.location.pathname) {
            case '/drugs' :
              dispatch(setSearchData(Array.from({
                length: 23,
              }).map((_, i) => ({
                href: '#',
                title: `${drugs.title} ${i+1}`,
                content: drugs.content,
                img: drugs.img
              }))));
              break;
            case '/pharmacies' :
              dispatch(setSearchData(Array.from({
                length: 23,
              }).map((_, i) => ({
                href: '#',
                title: `${pharmacies.title} ${i+1}`,
                content: pharmacies.content,
                img: pharmacies.img
              }))));
              break;
            case '/doctors' :
              dispatch(setSearchData(Array.from({
                length: 23,
              }).map((_, i) => ({
                href: '#',
                title: `${doctors.title} ${i+1}`,
                content: doctors.content,
                img: doctors.img
              }))));
              break;
  
          }
        }
  
        return() => {
          dispatch(clearSearchData([]));
      
        }
      },[window.location.pathname, dispatch, drugs, pharmacies, doctors]);// eslint-disable-line react-hooks/exhaustive-deps

      

    return (
        <div>
             <Input placeholder='Поиск' style={{width:'300px', marginBottom:'25px'}} onChange={(e) => {
                        settag(e.target.value)
                    }}/>
             <List
                grid={{
                gutter: 16,
                column: 4,
                }}
                pagination={{
                    pageSize: 10,
                  }}
                dataSource={SearchData.filter(item => item['title'].includes(String(tag))===true)}
                renderItem={(item) => (
                <List.Item
                    key={item.title}>
                    <Card title={item.title}>
                        <Image
                          width={272}
                          alt="logo"
                          src= {`${item.img}`}
                        />
                        <br/>
                        {item.content}</Card>
                </List.Item>
                )}
              
            />
           
        </div>
    )
}
