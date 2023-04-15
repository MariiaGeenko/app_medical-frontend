import { Input, Button, Form, Select} from 'antd';
import {  useNavigate } from "react-router-dom";
import {  useState } from 'react';
import React from 'react';
import { ModalWarning } from '../ModalWarning';
import axios from 'axios';
import s from './Login.module.css';

const { Option } = Select;



export const Login= () => {

   const API_URL = "http://localhost:3001";

   const [form] = Form.useForm();

   const instanceAPI = axios.create({
    //withCredentials: true,
    baseURL: process.env.API_URL
    //headers: {}
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
                navigate('/doctorOffice');
                break;
            case 2 :
                navigate('/patientOffice');
                break;
            default:
                navigate('/pharmacistOffice');
                break;
        }                   
    }
    
    const onFinish = async (values) => {

    
        if (values.login!=='' && values.password!=='' && values.role!=='') {

            let params={login: values.login, password: values.password,
                role: values.role};
            /*
            const res=await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify(params)
                          

            })
            const dataAccess= await res.json();
            if (dataAccess.success) {              
                
            } else {
                setIsModalOpen({...IsModalOpen, warning: true , warningText: "Невозможно найти такого пользователя!"})
            }
            */
            saveData(values);
        }   
    }

    return (
      
        <div className={s.wrapper}>
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
            
                        <Form.Item className={s.form_item}
                        label={ <p className={s.label}>Login</p>}
                            name="login"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter your login please!',
                                }
                            ]}
                        >
                        <Input style={{color:"#006c84"}}/>
                        </Form.Item>
                        <Form.Item className={s.form_item}
                        label={ <p className={s.label}>Password</p>}
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter your password please!'
                                }
                            ]}
                        >
                        <Input.Password style={{color:"#006c84"}}/>
                        </Form.Item>
                        <Form.Item className={s.form_item}
                        label={ <p className={s.label}>Role</p>}
                            name="role"
                            rules={[
                                {
                                    required: true,
                                    message: 'Define your role please!'
                                }
                            ]}
                        >
                            <Select
                            style={{color:"#006c84"}}
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
                                <button className={s.buttonSign} htmlType="submit">Sign in</button>
                                <buttom className={s.buttonReset} onClick={()=> {form.resetFields()}}>Reset options</buttom> 
                            </div>
                        </Form.Item>      
            </Form>
            <ModalWarning open={IsModalOpen.warning}  onCancelModal={() => {setIsModalOpen({...IsModalOpen, warning: false })}} mess={IsModalOpen.warningText}/>

            <div>
                <img src="log.png" alt="registration" width="350px" height="350px" className={s.image}/>
            </div>
        </div>
        
    )

}