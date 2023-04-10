import { Input, Button, Form, Typography, Select} from 'antd';
import {  useNavigate } from "react-router-dom";
import {  useState } from 'react';
import React from 'react';
import s from './Register.module.css';

const { Option } = Select;
const { Title }  = Typography;
const { Paragraph }  = Typography;

export const Register = () => {

   // const API_URL = "http://localhost:3001";

    const [form] = Form.useForm();

    const rolesUser=[
        {code:1, role:'Doctor'}, 
    //    {code:2, role:'Patient'}, 
        {code:3, role:'Pharmacist'}
    ];

    
   const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    }
    let navigate = useNavigate();

    const [role, setrole] = useState('');
    const [doctor, setdoctor] = useState({is_online: false, name:'', surname:'', speciality:'', education_organization: '', working_mode:''});
   // const [patient, setpatient] = useState({is_online:false, name:'', surname:'', insurance_number:'', diagnosis:'', medical_card_stored_in_clinic: '', receipt: '', medicines:[] });
    const [pharmacy, setpharmacy] = useState({caption:'', address:'', phone:'', email:'', gps_coordinates:'' });
    
    let working_mode=[
        {codeMode:1, mode: 'morning from 9 AM to 12 AM even days '}, // четные дни
        {codeMode:2, mode: 'evening from 2 PM to 6 PM odd days '}, // нечетные дни
        {codeMode:3, mode: 'morning from 9 AM to 12 AM odd days '},
        {codeMode:4, mode: 'evening from 2 PM to 6 PM even days '}
    ];


    const onFinish = async (values) => {

        console.log(values);
        if (values.login!=='' && values.password!=='' && values.role!=='') {

            let params={login: values.login, password: values.password,
                role: values.role, };
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


        }   
    }


    const SetRoleParams = () => {
        switch(role) {
            case 1: 
                return (
                    <div>
                        <Form.Item
                        name="surname"
                        rules={[
                            {
                                required: true,
                                message: 'Enter your Surname please!'
                            }
                        ]}
                        style={{width:'500px'}}
                        >
                            <Input style={{display:(role!=='')?null:'none'}} addonBefore="Surname" onChange={(e)=> setdoctor({...doctor,surname: e.target.value})}/>
                        </Form.Item>
                        <Form.Item
                        name="Name"
                        rules={[
                            {
                                required: true,
                                message: 'Enter your Name please!'
                            }
                        ]}
                        style={{width:'500px'}}
                        >
                            <Input addonBefore="Name" onChange={(e)=> setdoctor({...doctor,name: e.target.value})}/>
                        </Form.Item>
                        <Form.Item
                        name="Speciality"
                        rules={[
                            {
                                required: true,
                                message: 'Enter your Speciality please!'
                            }
                        ]}
                        style={{width:'500px'}}
                        >
                            <Input addonBefore="Speciality"  onChange={(e)=> setdoctor({...doctor,speciality: e.target.value})}/>
                        </Form.Item>
                        <Form.Item
                        name="Education_organization"
                        rules={[
                            {
                                required: true,
                                message: 'Enter your Education please!'
                            }
                        ]}
                        style={{width:'500px'}}
                        >
                            <Input addonBefore="Education" onChange={(e)=> setdoctor({...doctor,education_organization: e.target.value})}/>
                        </Form.Item>
                        
        
                        <Paragraph>Working Mode</Paragraph>
                        <Form.Item
                        name="Working_Mode"
                        rules={[
                            {
                                required: true,
                                message: 'Enter your Working Mode please!'
                            }
                        ]}
                        style={{width:'500px'}}
                        >
                        <Select allowClear="true"
                            style={{width:'400px'}}
                              showSearch
                              optionFilterProp="children"
                              filterOption={(input, option) => option.children.includes(input)}
                              filterSort={(optionA, optionB) =>
                                  optionA.children.localeCompare(optionB.children)
                              }
                              onChange={(value) => {
                                for (let i=0;i<=working_mode.length-1;i++) {
                                  if (working_mode[i].codeMode===value) {
                                    setdoctor({...doctor, working_mode: value});
                                  }
                                }
                                if (value===undefined || value==='' ){
                                    setdoctor({...doctor, working_mode: ''});
                                }
                              }}
                          >
                              {working_mode.map((element) => {
                                  return <Option key={element.codeMode}  value={element.codeMode} >{element.mode}</Option>
                              }
                              )}
                          </Select>
                          </Form.Item>
                    </div>
                )
          
            case 3: 
                return (
                    <div>
                        <Form.Item
                        name="Caption"
                        rules={[
                            {
                                required: true,
                                message: 'Enter Caption please!'
                            }
                        ]}
                        style={{width:'500px'}}
                        >
                            <Input addonBefore="Caption Pharmacy" onChange={(e)=> setpharmacy({...pharmacy,caption: e.target.value})}/>
                        </Form.Item>
                        <Form.Item
                        name="Address"
                        rules={[
                            {
                                required: true,
                                message: 'Enter Address please!'
                            }
                        ]}
                        style={{width:'500px'}}
                        >
                            <Input addonBefore="Address Pharmacy" onChange={(e)=> setpharmacy({...pharmacy,address: e.target.value})}/>
                        </Form.Item>
                        <Form.Item
                        name="Phone"
                        rules={[
                            {
                                required: true,
                                message: 'Enter Phone please!'
                            }
                        ]}
                        style={{width:'500px'}}
                        >
                            <Input addonBefore="Phone Pharmacy" onChange={(e)=> setpharmacy({...pharmacy,phone: e.target.value})}/>
                        </Form.Item>
                        <Form.Item
                        name="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Enter Email please!'
                            }
                        ]}
                        style={{width:'500px'}}
                        >
                            <Input addonBefore="Email Pharmacy" onChange={(e)=> setpharmacy({...pharmacy,email: e.target.value})}/>
                        </Form.Item>
                        <Paragraph>Working Mode</Paragraph>
                        <Form.Item
                        name="Working_Mode"
                        rules={[
                            {
                                required: true,
                                message: 'Enter your Working Mode please!'
                            }
                        ]}
                        style={{width:'500px'}}
                        >
                        <Select allowClear="true"
                            style={{width:'400px'}}
                              showSearch
                              optionFilterProp="children"
                              filterOption={(input, option) => option.children.includes(input)}
                              filterSort={(optionA, optionB) =>
                                  optionA.children.localeCompare(optionB.children)
                              }
                              onChange={(value) => {
                                for (let i=0;i<=working_mode.length-1;i++) {
                                  if (working_mode[i].codeMode===value) {
                                    setdoctor({...doctor, working_mode: value});
                                  }
                                }
                                if (value===undefined || value==='' ){
                                    setdoctor({...doctor, working_mode: ''});
                                }
                              }}
                          >
                              {working_mode.map((element) => {
                                  return <Option key={element.codeMode}  value={element.codeMode} >{element.mode}</Option>
                              }
                              )}
                          </Select>
                          </Form.Item>
                    </div>
                )
            
        }
      };
  


    return (
      
        <div className={s.wrapper}>
        <Form className={s.form}  form={form} layout="vertical" name="basic" 
            
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
                        <h5 className={s.title}>Registration</h5> 
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
                            <Select allowClear="true"
                              showSearch
                              optionFilterProp="children"
                              filterOption={(input, option) => option.children.includes(input)}
                              filterSort={(optionA, optionB) =>
                                  optionA.children.localeCompare(optionB.children)
                              }
                              onChange={(value) => {
                                for (let i=0;i<=rolesUser.length-1;i++) {
                                  if (rolesUser[i].code===value) {
                                    setrole(value);
                                  }
                                }
                                if (value===undefined || value==='' ){
                                    setrole('');
                                }
                              }}
                          >
                              {rolesUser.map((element) => {
                                  return <Option key={element.code}  value={element.code} >{element.role}</Option>
                              }
                              )}
                          </Select>
                        </Form.Item>
                        {SetRoleParams()}
                        <Form.Item
                        >
                               <div className={s.buttons}>
                                <Button className={s.button} htmlType="submit">Save</Button>
                                <Button className={s.button} onClick={()=> {
                                    form.resetFields();
                                    setrole('');
                                    setdoctor({is_online: false, name:'', surname:'', speciality:'', education_organization: '', working_mode:'' })
                                   // setpatient({is_online:false, name:'', surname:'', insurance_number:'', diagnosis:'', medical_card_stored_in_clinic: '', receipt: '', medicines:[] });
                                    setpharmacy({caption:'', address:'', phone:'', email:'', gps_coordinates:'' });
                                }} >
                                    Reset options
                                </Button> 
                            </div>
                        </Form.Item>
                      

                        
            </Form>
            </div>

            )
}
