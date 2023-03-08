import { Input, Button, Form } from 'antd';
import {  useNavigate } from "react-router-dom";
import {  useState } from 'react';
import React from 'react';
import { ModalWarning } from '../ModalWarning';


export const Login= () => {

   const API_URL = "http://localhost:3001";

   const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    let navigate = useNavigate();

    const [IsModalOpen, setIsModalOpen] = useState({ warning: false, warningText: ''});

    const saveData = (data) => {
    
            
            sessionStorage.setItem('login', data.login);
            sessionStorage.setItem('password', data.password);
        
          navigate('/home');
    }


    
    const onFinish = async (values) => {
        
        console.log(values);
        if (values.login!=='' && values.password!=='') {
            let {login, password}=values
            const res=await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify({
                    login,
                    password
                })
                          

            })
            const dataAccess= await res.json();
            if (dataAccess.success) {
                saveData(dataAccess.data); 
               
                
            } else {
                setIsModalOpen({...IsModalOpen, warning: true , warningText: "Невозможно найти такого пользователя!"})
            }

        }   
    }


    return (
      
        <div style={{width:'370px'}}>
        <Form  layout="vertical" name="basic" 
            
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
                        style={{marginRight:'150px'}}
                            wrapperCol={{
                            offset: 8,
                            span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                            Авторизация
                            </Button>
                        </Form.Item>
                        
            </Form>
            <ModalWarning open={IsModalOpen.warning}  onCancelModal={() => {setIsModalOpen({...IsModalOpen, warning: false })}} mess={IsModalOpen.warningText}/>
        </div>
        
    )

}