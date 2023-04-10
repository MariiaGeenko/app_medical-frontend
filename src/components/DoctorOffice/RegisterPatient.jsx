import { Input, Button, Form, Typography, Select, Modal} from 'antd';
import {  useNavigate } from "react-router-dom";
import {  useState } from 'react';
import React from 'react';

const { Option } = Select;
const { Paragraph }  = Typography;
const { Title } = Typography;
   
export const RegisterPatient = ({open, onCancelModal}) => {
    // const API_URL = "http://localhost:3001";

    const [patient, setpatient] = useState({is_online:false, name:'', surname:'', insurance_number:'', diagnosis:'', medical_card_stored_in_clinic: '', receipt: '', medicines:[] });

    const [form] = Form.useForm();
    return (
        <Modal open={open} onCancel={onCancelModal} title={"Patient's registration"}
            footer ={[
                <Button key="back" onClick={onCancelModal}>
                ОК
                </Button>
            ]}
            >
                    <div>
                        <Form.Item
                        name="surname"
                        rules={[
                            {
                                required: true,
                                message: 'Enter your Surname please!'
                            }
                        ]}
                        style={{width:'400px'}}
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
                        style={{width:'400px'}}
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
                        style={{width:'400px'}}
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
                        style={{width:'400px'}}
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
                        style={{width:'400px'}}
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
            
        </Modal>
    )
}