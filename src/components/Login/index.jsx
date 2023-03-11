import { Input, Button, Form, Typography, Select} from 'antd';
import {  useNavigate } from "react-router-dom";
import {  useState } from 'react';
import React from 'react';
import { ModalWarning } from '../ModalWarning';
import axios from 'axios';

const { Option } = Select;
const { Title }  = Typography;
const { Paragraph }  = Typography;



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
        {code:1, role:'Доктор'}, 
        {code:2, role:'Пациент'}, 
        {code:3, role:'Фармацевт'}
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
             //   saveData(dataAccess.data); 
               
                
            } else {
                setIsModalOpen({...IsModalOpen, warning: true , warningText: "Невозможно найти такого пользователя!"})
            }
            */
            saveData(values);


        }   
    }


    return (
      
        <div style={{width:'370px'}}>
        <Form form={form} layout="vertical" name="basic" 
            
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
                        label='Логин'
                        name="login"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите логин!'
                            }
                        ]}
                        >
                        <Input/>
                        </Form.Item>
                        <Form.Item
                        label='Пароль'
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите пароль!'
                            }
                        ]}
                        >
                        <Input.Password/>
                        </Form.Item>
                        <Form.Item
                        label='Войти как'
                        name="role"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, определите роль!'
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
                        <Form.Item
                           // wrapperCol={{
                           // offset: 8,
                           // span: 16,
                           // }}
                        >
                            <div style={{display:'flex', gap:'10px', width:'200px', flexDirection:'row'}}>
                                <Button type="primary" htmlType="submit">
                                Авторизация
                                </Button>
                                <Button onClick={()=> {
                                                    form.resetFields();
                                                    
                                                }} >
                                                Сбросить параметры
                                            </Button> 
                            </div>
                        </Form.Item>
                      

                        
            </Form>
            <ModalWarning open={IsModalOpen.warning}  onCancelModal={() => {setIsModalOpen({...IsModalOpen, warning: false })}} mess={IsModalOpen.warningText}/>
        </div>
        
    )

}