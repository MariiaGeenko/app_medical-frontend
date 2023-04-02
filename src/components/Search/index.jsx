
import React from 'react';
import { Input, List, Card, Image, Select, Typography, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setSearchData, clearSearchData } from './../../reducers/SearchData';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import s from './Index.module.css';

const { Title } = Typography;
const { Paragraph } = Typography;
const { Option } = Select;


export const Search = ({ path }) => {

  const dispatch = useDispatch();

  const drugs = useSelector(state => state.Search.drugs);
  const pharmacies = useSelector(state => state.Search.pharmacies);
  const doctors = useSelector(state => state.Search.doctors);
  const SearchData = useSelector(state => state.Search.SearchData);

  const [tag, settag] = useState('');

  useEffect(() => {

    if (window.location.pathname !== '/login' || window.location.pathname !== '/register') {
      switch (path) {
        case '/medicines':
          console.log(drugs);
          dispatch(setSearchData(drugs));
          break;
        case '/pharmacies':
          console.log(pharmacies);
          dispatch(setSearchData(pharmacies));
          break;
        case '/doctors':
          console.log(doctors);
          dispatch(setSearchData(doctors));
          break;
      }
    }

    return () => {
      settag('');
      // document.querySelector('input').value='';
      dispatch(clearSearchData());

    }

  }, [path, dispatch, drugs, pharmacies, doctors]);

  console.log(SearchData);

  const DataLoader = () => {
    if (drugs.length !== 0 && pharmacies.length !== 0 && doctors.length !== 0 && SearchData.length !== 0) {
      if (SearchData[0].hasOwnProperty('drugsPharmacy') === true) {
        return (
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'flex' }}>
              <Input placeholder='Search' style={{ width: '300px', marginBottom: '25px' }} onChange={(e) => {
                settag(e.target.value);

              }} />

            </div>
            <List
              grid={{
                gutter: 16,
                column: 4,
              }}
              pagination={{
                pageSize: 10,
              }}
              dataSource={SearchData.filter(item => ((path === '/doctors') ? (item['surname'] + ' ' + item['name']) || item[''] : item['name']).includes(String(tag)) === true)}
              renderItem={(item) => (
                <List.Item
                  key={(window.location.pathname === '/doctors') ? item.surname + ' ' + item.name : item.name}
                >
                  <Card title={(window.location.pathname === '/doctors') ? item.surname + ' ' + item.name : item.name}>
                    <Image style={{ padding: '15px' }}

                      width={300}
                      height={230}
                      alt="logo"
                      src={(path === '/medicines') ? 'drugs.jpg' : (path === '/pharmacies') ? 'pharmacies.jpg' : 'doctors.jpg'}
                    />

                    {(window.location.pathname === '/medicines') ? item.description_url : (window.location.pathname === '/doctors') ? item.caption : item.address}

                    <Title level={5} style={{ padding: '10px', alignItems: 'center', display: (window.location.pathname === '/pharmacies') ? null : 'none' }}>Medicines</Title>
                    <Select style={{ width: '200px', display: (window.location.pathname === '/pharmacies' || window.location.pathname === '/medicines') ? null : 'none' }} allowClear="true"
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) => option.children.includes(input)}
                    //  filterSort={(optionA, optionB) =>
                    //     optionA.children.localeCompare(optionB.children)
                    // }
                    >
                      {SearchData.filter(element => element.name === item.name)[0]['drugsPharmacy'].map(element => <Option key={element}>{element}</Option>)}


                    </Select>

                  </Card>
                </List.Item>
              )}
            />
          </div>
        )
      } else if (SearchData[0].hasOwnProperty('pharmacyDrugs') === true) {

        return (
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'flex' }}>
              <Input placeholder='Search' style={{ width: '300px', marginBottom: '25px' }} onChange={(e) => {
                settag(e.target.value);

              }} />
            </div>
            <List
              grid={{
                gutter: 16,
                column: 4,
              }}
              pagination={{
                pageSize: 10,
              }}
              dataSource={SearchData.filter(item => ((path === '/doctors') ? (item['surname'] + ' ' + item['name']) || item[''] : item['name']).includes(String(tag)) === true)}
              renderItem={(item) => (
                <List.Item
                  key={(window.location.pathname === '/doctors') ? item.surname + ' ' + item.name : item.name}
                >
                  <Card title={(window.location.pathname === '/doctors') ? item.surname + ' ' + item.name : item.name}>
                    <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
                      <Image
                        style={{ paddingRight: '50px' }}
                        width={300}
                        height={230}
                        alt="logo"
                        src={(path === '/medicines') ? 'drugs.jpg' : (path === '/pharmacies') ? 'pharmacies.jpg' : 'doctors.jpg'}
                      />

                      <br />
                      {(window.location.pathname === '/medicines') ? item.description_url : (window.location.pathname === '/doctors') ? item.caption : item.address}


                      <Title level={5} style={{ padding: '10px', alignItems: 'center', display: (window.location.pathname === '/medicines') ? null : 'none' }}>Pharmacies</Title>
                      <Select style={{ width: '200px', display: (window.location.pathname === '/pharmacies' || window.location.pathname === '/medicines') ? null : 'none' }} allowClear="true"
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) => option.children.includes(input)}
                      //  filterSort={(optionA, optionB) =>
                      //     optionA.children.localeCompare(optionB.children)
                      // }
                      >
                        {SearchData.filter(element => element.name === item.name)[0]['pharmacyDrugs'].map(element => <Option key={element}>{element}</Option>)}


                      </Select>
                    </div>

                  </Card>
                </List.Item>
              )}
            />
          </div>
        )

      } else {

        return (
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'flex' }}>
              <Input placeholder='Search' style={{ width: '300px', marginBottom: '25px' }} onChange={(e) => {
                settag(e.target.value);

              }} />

            </div>
            <List
              grid={{
                gutter: 16,
                column: 4,
              }}
              pagination={{
                pageSize: 10,
              }}
              dataSource={SearchData.filter(item => ((path === '/doctors') ? (item['surname'] + ' ' + item['name']) || item['caption'] : item['name']).includes(String(tag)) === true)}
              renderItem={(item) => (
                <List.Item
                  key={(window.location.pathname === '/doctors') ? item.surname + ' ' + item.name : item.name}
                >
                  <Card title={(window.location.pathname === '/doctors') ? item.surname + ' ' + item.name : item.name}>
                    <Image
                      width={250}
                      height={210}
                      alt="logo"
                      src={(path === '/medicines') ? 'drugs.jpg' : (path === '/pharmacies') ? 'pharmacies.jpg' : 'doctors.jpg'}
                    />
                    <br />
                    {(window.location.pathname === '/medicines') ? item.description_url : (window.location.pathname === '/doctors') ? item.caption_speciality : item.address}
                  </Card>
                </List.Item>
              )}

            />

          </div>

        )


      }
    } else {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '30px', paddingBottom: '30px', height: '600px' }}>
          <BallTriangle color="#313252" height={100} width={100} />
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


