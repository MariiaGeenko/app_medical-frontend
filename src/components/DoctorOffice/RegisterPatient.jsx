import { Input, Button, Form, Typography, Select, Modal, DatePicker} from 'antd';
import {  useNavigate } from "react-router-dom";
import {  useState } from 'react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const { Option } = Select;
const { Paragraph }  = Typography;
const { Title } = Typography;
   
export const RegisterPatient = ({open, onCancelModal}) => {


    const drugs = useSelector(state => state.Search.drugs);
    const [patient, setpatient] = useState({is_online:false, name:'', surname:'', insurance_number:'', diagnosis:'', medical_card_stored_in_clinic: '', receipt: '', drug:'', datein:'', dateout:'' });
    const [form] = Form.useForm();


    return (
        <Modal open={open} onCancel={onCancelModal} title={"Patient's registration"}
        footer= {null}
            >
                    
                    <Form form={form} layout="vertical" method={'post'} action={'/reports'}
                        initialValues={{
                            dateReportType: '',
                            dateBegin: '',
                            dateEnd: '',
                            expertiseType: '',
                            report: ''
                          }}
                        
                        onFinish={ async (values) => {
                               
                                let params={doctor:sessionStorage.getItem('id'), surname: values.Surname, name:values.Name,
                                    insurance: values.Insurance_number, diagnosis: values.Diagnosis,
                                    drug: values.Drug, dateIn:values.dateIn, dateOut:values.dateOut,
                                    receipt: patient.receipt };
                                    console.log(params)
                                  //  let params={dateBegin: reportParams.dateBegin, dateEnd: reportParams.dateEnd,
                                  //  expertiseType: (values.expertiseType===undefined)?'':values.expertiseType, dateReportType: reportParams.dataField, login: sessionStorage.getItem('Expert_login')};

                    
                              //  const res=await fetch(`http://localhost:5588/api/doctors/register/patient`, {
                              ///      method: 'POST',
                               //     headers: { 'Content-Type': 'application/json;charset=utf-8'},
                               //     body: JSON.stringify(params)

                               // })


                              //  console.log(res);
                              // const dataAccess= await res.json();
                              //  console.log(dataAccess)
                               // if (dataAccess.success) {
                               //     setdataChange({success:true, url: dataAccess.data});
                               // } else {
                               //     setIsModalOpen({...isModalOpen, error: true , errorText: "Не удалось выгрузить отчет", attention:true})
                                //}                    
                            }
                        }
                        
                        name="userForm"
                        >
                        <Form.Item
                        name="Surname"
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
                        name="Insurance_number"
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
                        <div style={{ display:'flex', gap:'20px'}}>
                                 <Form.Item
                                    name="dateIn"
                                    rules = {[
                                        {
                                            required: true,
                                            message: "Enter dateIn sicklist"
                                        }
                                    ]}>    
                                        <Input type="date"/>
                                </Form.Item>
                                    <Paragraph>-</Paragraph>  
                                <Form.Item
                                    name="dateOut"
                                    rules = {[
                                        {
                                            required: true,
                                            message: "Enter dateOout sicklist"
                                        }
                                    ]}>    
                                        <Input type="date"
                                />
                                </Form.Item>
                            </div>
                       
            
                        <Form.Item
                         name="Receipt">
                        <Button onClick={()=>{
                            setpatient({...patient, receipt: `${Math.round(Math.random()*3)+''+Math.round(Math.random()*4)+''+Math.round(Math.random()*5)+''+Math.round(Math.random()*6)+''+Math.round(Math.random()*7)}`})
                           
                        }}>Add receipt</Button>
                        <br/>
                        <br/>
                            <Input style={{ width:'200px',display:(patient.receipt!=='')?null:'none', fontFamily:'c39', fontSize:'56px'}} addonBefore="Receipt" value={patient.receipt}/>    
                        </Form.Item>
                        <Form.Item
                         name="Drug">
                        <Select allowClear="true" style={{ width:'200px', marginBottom:'20px', display:(patient.receipt!=='')?null:'none', fontFamily:'c39', fontSize:'56px'}}
                              showSearch
                              optionFilterProp="children"
                              filterOption={(input, option) => option.children.includes(input)}
                              filterSort={(optionA, optionB) =>
                                  optionA.children.localeCompare(optionB.children)
                              }
                        
                              onChange={(value) => {
                                setpatient({...patient, drug:''});
                                if(value===undefined){
                                    setpatient({...patient, drug:''});
                                }
                              }}
                              
                            >
                              {drugs.map(e =>{return <Option key={e.id}  value={e.name} >{e.name}</Option>}) }
                          </Select>
                        </Form.Item>
                        
                           
                        <div style={{display:'flex', gap:'20px'}}>
                        <Form.Item>
                        <Button type="primary" htmlType="submit" >
                                            Submit
                        </Button> 
                        </Form.Item>
                        <Form.Item>
                        <Button onClick={()=> {
                                                form.resetFields();
                                              
                                            }} >
                                            Reset
                                        </Button> 
                        </Form.Item>
                        </div>
                        
                   </Form>
                   
             
            
        </Modal>
    )
}