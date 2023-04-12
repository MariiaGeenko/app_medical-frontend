/* eslint-disable default-case */
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
        {code:2, role:'Patient'}, 
        {code:3, role:'Pharmacist'}
    ];

    
   const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    }
    let navigate = useNavigate();

    const [role, setrole] = useState('');
    const [doctor, setdoctor] = useState({is_online: false, name:'', surname:'', speciality:'', education_organization: '', working_mode:''});
    const [patient, setpatient] = useState({is_online:false, name:'', surname:'', insurance_number:'', diagnosis:'', medical_card_stored_in_clinic: '', receipt: '', medicines:[] });
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

    console.log(patient);
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
                        style={{width:'500px', color:"#006c84"}}
                        >
                            <Input style={{display:(role!=='')?null:'none', color:"#006c84"}} addonBefore="Surname" onChange={(e)=> setdoctor({...doctor,surname: e.target.value})}/>
                        </Form.Item>
                        <Form.Item
                        name="Name"
                        rules={[
                            {
                                required: true,
                                message: 'Enter your Name please!'
                            }
                        ]}
                        style={{width:'500px', color:"#006c84"}}
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
                                message: 'Enter your Education organization please!'
                            }
                        ]}
                        style={{width:'500px'}}
                        >
                            <Input addonBefore="Education organization" onChange={(e)=> setdoctor({...doctor,education_organization: e.target.value})}/>
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
            case 2:
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
                            <Input addonBefore="Surname" onChange={(e)=> setpatient({...patient,surname: e.target.value})}/>
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
                            <Input addonBefore="Name"  onChange={(e)=> setpatient({...patient,name: e.target.value})}/>
                        </Form.Item>
                        <Form.Item
                        name="Insurance number"
                        rules={[
                            {
                                required: true,
                                message: 'Enter your Insurance number please!'
                            }
                        ]}
                        style={{width:'500px'}}
                        >
                            <Input addonBefore="Insurance number" onChange={(e)=> setpatient({...patient, insurance_number: e.target.value})}/>
                        </Form.Item>
                        <Form.Item
                        name="Diagnosis"
                        rules={[
                            {
                                required: true,
                                message: 'Enter your diagnosis please!'
                            }
                        ]}
                        style={{width:'500px'}}
                        >
                            <Input addonBefore="Diagnosis" onChange={(e)=> setpatient({...patient,diagnosis: e.target.value})}/>
                        </Form.Item>
                        <Form.Item
                        name="Med_card"
                        rules={[
                            {
                                required: true,
                                message: 'Enter your Med_card please!'
                            }
                        ]}
                        style={{width:'500px'}}
                        >
                            <Input addonBefore="Med card" onChange={(e)=> setpatient({...patient,speciality: e.target.value})}/>
                        </Form.Item>
                        <Button onClick={()=>{
                            setpatient({...patient, receipt: `${Math.round(Math.random()*3)+''+Math.round(Math.random()*4)+''+Math.round(Math.random()*5)+''+Math.round(Math.random()*6)+''+Math.round(Math.random()*7)}`})
                           
                        }}>Add receipt</Button>
                        <br/>
                        <br/>
                        <div style={{display:'flex', gap:'20px'}}>
                            <Input style={{ paddingBottom:'20px', display:(patient.receipt!=='')?null:'none', fontFamily:'c39', fontSize:'56px'}} addonBefore="Receipt" value={patient.receipt}/>
                            <Button style={{ display:(patient.receipt!=='')?null:'none' }}>Add medicines</Button>
                        </div>
                   
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
                            <Form.Item  
                            label={ <p style={{fontSize:"18px", marginBottom:"3px", color:"#006c84", fontWeight:"500"}}>Login</p>}
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
                            <Form.Item
                            label={ <p style={{fontSize:"18px", marginBottom:"3px", color:"#006c84", fontWeight:"500"}}>Password</p>}
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
                            <Form.Item
                            label={ <p style={{fontSize:"18px", marginBottom:"3px", color:"#006c84", fontWeight:"500"}}>Role</p>}
                            name="role"
                            rules={[
                                {
                                    required: true,
                                    message: 'Define your role please!'
                                }
                            ]}
                            >
                                <Select allowClear="true"
                                style={{color:"#006c84"}}
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
                                    return <Option style={{color:"#006c84"}} key={element.code}  value={element.code} >{element.role}</Option>
                                }
                                )}
                            </Select>
                            </Form.Item>
                            {SetRoleParams()}
                            <Form.Item
                            >
                            <div className={s.buttons}>
                                    <button className={s.buttonSave} htmlType="submit">Save</button>
                                    <buttom className={s.buttonReset} onClick={()=> {
                                        form.resetFields();
                                        setrole('');
                                        setdoctor({is_online: false, name:'', surname:'', speciality:'', education_organization: '', working_mode:'' })
                                        setpatient({is_online:false, name:'', surname:'', insurance_number:'', diagnosis:'', medical_card_stored_in_clinic: '', receipt: '', medicines:[] });
                                        setpharmacy({caption:'', address:'', phone:'', email:'', gps_coordinates:'' });
                                    }} >
                                        Reset options
                                    </buttom> 
                                </div>
                            </Form.Item>                
                </Form>
            <div className="image">
                <img src="sign.png" alt="registration" width="350px" height="350px"/>
            </div>
        </div>

    )
}
