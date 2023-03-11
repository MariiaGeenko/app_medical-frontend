import { Input, Button, Typography, Select } from 'antd';

const { Title }  = Typography;
const { Paragraph }  = Typography;
const { Option } = Select;

export const PatientOffice = () => {

    const patientInfo={
        fio:'Ivanov Ivan Ivanovich',
        medCard: 111111,
        diagnosis: 'COVID-19 идентифицирован (U07.1)',
        doctor: 'Petrov Petr Petrovich',
        receipt: '123456789',
        drugs: ['Ингарон', 'Арбидол']
    }
    
    return (
        <div>
            <Title level={5} style={{marginBottom:'20px', textAlign:'center'}}>Личный кабинет пациента</Title>
            <div style={{width:'400px'}}>
                <Input style={{paddingBottom:'20px'}} addonBefore="ФИО пациента" value={patientInfo.fio}/>
                <Input style={{paddingBottom:'20px'}} addonBefore="Номер мед. карты" value={patientInfo.medCard}/>
                <Input style={{paddingBottom:'20px'}} addonBefore="Диагноз" value={patientInfo.diagnosis}/>
                <Input style={{paddingBottom:'20px'}} addonBefore="ФИО доктора" value={patientInfo.doctor}/>
                <Paragraph>№ рецепта</Paragraph>
                <Paragraph style={{fontFamily:'c39', fontSize:'56px'}}>{patientInfo.receipt}</Paragraph>
                <Paragraph>Лекарства</Paragraph>
                            <Select
                              showSearch
                              optionFilterProp="children"
                              filterOption={(input, option) => option.children.includes(input)}
                              filterSort={(optionA, optionB) =>
                                  optionA.children.localeCompare(optionB.children)
                              }
                              style={{width:'400px'}}
                            >
                              {patientInfo.drugs.map((element) => {
                                  return <Option key={element}  value={element} >{element}</Option>
                              }
                              )}
                          </Select>
            </div>
        </div>
       


        
    )


}

/*
<Input style={{paddingBottom:'20px', fontFamily: "Code-128"}} addonBefore="№ рецепта" value={patientInfo.receipt}/>
                <Select
 <Form form={form} layout="vertical" 
                        initialValues={{
                            fio: '',
                            medCard: '',
                            diagnosis:'',
                            doctor: '',
                            receipt: '',
                            drugs: ''
                          }}
                        
                        onFinish={ (values) => {

                                console.log(values);
                            
                            }
                            
                        }
                        
                        name="userForm"
                        >
                        <Paragraph>Определите отчет</Paragraph>
                        <Form.Item
                                name="report"
                                rules = {[
                                    {
                                        required: true,
                                        message: "Необходимо определить отчет"
                                    }
                                ]}>
                                <Select placeholder="Определите отчет"  allowClear="true"
                                style={{width: '70%'}}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) => option.children.includes(input)}
                                filterSort={(optionA, optionB) =>
                                        optionA.children.localeCompare(optionB.children)
                                }
                                onChange={(value)=> {
                                    for(let i=0;i<=reports.length-1;i++) {
                                        setReportParams({...reportParams, report: value, dataField:reports[i].dataField })
                                    }
                                }}
                                        
                                >{children[2].optReport}</Select>

                        </Form.Item>
                        </Form>
                        */
