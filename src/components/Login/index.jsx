import { Input, Button, Form, Typography, Select} from 'antd';
import {  Link, useNavigate } from "react-router-dom";
import {  useState } from 'react';
import React from 'react';
import { ModalWarning } from '../ModalWarning';
import s from './Login.module.css';
import axios from 'axios';

const { Option } = Select;

export const Login= () => {

   const API_URL = "http://localhost:5588";

   const [form] = Form.useForm();
/*
   const instanceAPI = axios.create({
    //withCredentials: true,
    baseURL: API_URL
    });

    instanceAPI.interceptors.request.use(function (config) {

        config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
        return config;
    }, function (error) {
        // Do something with request error
        console.log('Ошибка в axios интерсепторе ')
        console.log(error)
        return Promise.reject(error);
    });
    instanceAPI.interceptors.response.use(response => response, error => {
        const status = error.response ? error.response.status : null
    
    
        if (status === 401) {
            localStorage.removeItem('token')
        }
        return Promise.reject(error);
    });

    
    
/*
   const instanceAPI = axios.create({
    //withCredentials: true,
    baseURL: process.env.API_URL
    });

    instanceAPI.interceptors.request.use(function (config) {

        config.headers.authorization = `Bearer ${sessionStorage.getItem('token')}`
        return config;
    }, function (error) {
        // Do something with request error
        console.log('Ошибка в axios интерсепторе ')
        console.log(error)
        return Promise.reject(error);
    });
    instanceAPI.interceptors.response.use(response => response, error => {
        const status = error.response ? error.response.status : null
    
    
        if (status === 401) {
            sessionStorage.removeItem('token')
        }
        return Promise.reject(error);
    });
    */

   const rolesUser=[
        {code:1, role:'Doctor'}, 
        {code:2, role:'Patient'}, 
        {code:3, role:'Pharmacist'}
    ];


   const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    let navigate = useNavigate();

    const [IsModalOpen, setIsModalOpen] = useState({ warning: false, warningText: ''});

    const saveData = (data) => {
    
            
           // sessionStorage.setItem('login', data.login);
            //sessionStorage.setItem('password', data.password);
            //sessionStorage.setItem('role', data.role);
           // sessionStorage.setItem('token', data.token);
          
         // navigate('/home');

         switch(data.role) {
            case 1 :
                let doctor={id:1, login: 'doctor1', password: 'd1', surname: 'Mina Kuvalis', name: 'Rosemarie Koelpin III'}
                sessionStorage.setItem('id',doctor.id);
                sessionStorage.setItem('login', doctor.login);
                sessionStorage.setItem('password',doctor.password);
                sessionStorage.setItem('surname',doctor.surname);
                sessionStorage.setItem('name',doctor.name);
                navigate('/doctorOffice');
                break;
                
            case 2 :
                let patient={id: 16, login: 'patient1', password: 'p1', surname: 'Mr. Barry Gerhold', name: 'Arnulfo Fahey'};
                sessionStorage.setItem('id',patient.id);
                sessionStorage.setItem('login', patient.login);
                sessionStorage.setItem('password',patient.password);
                sessionStorage.setItem('surname',patient.surname);
                sessionStorage.setItem('name',patient.name);
                navigate('/patientOffice');
                break;
              
            case 3:
               //  <Link to='/pharmacistOffice'></Link>
                let pharmacy={id: 1, login: 'pharmacy1', password: 'p1', caption: 'Pharmacy 1'};
                sessionStorage.setItem('id',pharmacy.id);
                sessionStorage.setItem('login', pharmacy.login);
                sessionStorage.setItem('password',pharmacy.password);
                sessionStorage.setItem('name',pharmacy.caption);
                navigate('/pharmacistOffice');
                break;

         }
           
        
    }
/*
    const loginAPI=(email, password, role) =>{
            return instanceAPI.post('/login', {
                email: email,
                password: password,
                role: role
            })
       }
    */

    
    const onFinish = async (values) => {

    
        if (values.login!=='' && values.password!=='' && values.role!=='') {

            let {email, password, role} = values

            console.log(values)
/*
                    await loginAPI(email, password, role)
                        .then((response) => {
                          //  dispatch(setAuthData(response.data.user))
                          //  dispatch(setToken(response.data.token))
                          //  history.push(HOME_ROUTE)
                          console.log(response);
                          saveData(response); 
                        })
                        .catch((error) => {
                            if (error.response) {
                               return error.response.data.message;
                            }
                        })
            
                };
            let params={login: values.login, password: values.password,
            //    role: values.role};
        */
       /*
            let params={login: values.login, password: values.password,
                    role: values.role};
         //   const res=await fetch(`${API_URL}/api/signIn?login=${params.login}&password=${params.password}&role=${params.role}`);
            const res=await fetch(`${API_URL}/api/signIn?login=${params.login}&password=${params.password}&role${params.role}`,{
            
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8'},
             //   body: JSON.stringify(params)
                        
            })
            const dataAccess= await res.json();
            if (dataAccess.success) {
                saveData(dataAccess.data); 
               
                
            } else {
                setIsModalOpen({...IsModalOpen, warning: true , warningText: "Невозможно найти такого пользователя!"})
            }
        */
           saveData(values);
    
        }
          
    }


    return (
      
        <div className={s.wrapper}>
        <h5 className={s.title}>Login</h5>
        <Form className={s.form} form={form} layout="vertical" name="basic" 
            
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
        
            initialValues={{
                remember: true
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
           
            
            >
            
                        <Form.Item
                        label='Login'
                        name="login"
                        rules={[
                            {
                                required: true,
                                message: 'Enter your login please!'
                            }
                        ]}
                        >
                        <Input/>
                        </Form.Item>
                        <Form.Item
                        label='Password'
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Enter your password please!'
                            }
                        ]}
                        >
                        <Input.Password/>
                        </Form.Item>
                        <Form.Item
                        label='Role'
                        name="role"
                        rules={[
                            {
                                required: true,
                                message: 'Define your role please!'
                            }
                        ]}
                        >
                            <Select
                              showSearch
                              optionFilterProp="children"
                              filterOption={(input, option) => option.children.includes(input)}
                              filterSort={(optionA, optionB) =>
                                  optionA.children.localeCompare(optionB.children)
                              }
                          >
                              {rolesUser.map((element) => {
                                  return <Option key={element.code}  value={element.code} >{element.role}</Option>
                              }
                              )}
                          </Select>
                        </Form.Item>
                        <Form.Item>
                            <div className={s.buttons}>
                                <Button className={s.button} htmlType="submit">Sign in</Button>
                                <Button className={s.button} onClick={()=> {form.resetFields()}}>Reset options</Button> 
                            </div>
                        </Form.Item>
                      

                        
            </Form>
            <ModalWarning open={IsModalOpen.warning}  onCancelModal={() => {setIsModalOpen({...IsModalOpen, warning: false })}} mess={IsModalOpen.warningText}/>
        </div>
        
    )

}