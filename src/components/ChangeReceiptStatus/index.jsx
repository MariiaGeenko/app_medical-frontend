import { Form, Input, Modal, Button, Table, Select, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef  } from 'react';
import { clearselectedRowKeys } from '../../reducers/selectedRowKeys';

export const ChangeReceiptStatus = ({open, onCancel, receipts}) => {
    
    const [ReceiptChange, setReceiptChange]=useState({id:'', status_id:'', status:''});
    const selectedRowKeys = useSelector(state => state.selectedRowKeys.selectedRowKeys);
    const { Option } = Select;

    const [form] = Form.useForm();
 
    const useResetFormOnCloseModal = ({form, open}) => {
      const prevOpenRef = useRef();
      useEffect(() => {
        prevOpenRef.current = open;
      }, [open]);
      const prevOpen = prevOpenRef.current;

     
      useEffect(() => {
     
        if (!open && prevOpen) {
          
            setReceiptChange({id:'', status_id:'', status:''})
        }
        if (open) {
         form.resetFields(); 

        }
               
      });
   
    };
   
    useResetFormOnCloseModal({
      form,
      open
    });


    return (
        <Modal open={open} onCancel={onCancel} title={"Change Receipt Status: "}
        footer ={[
                <Button key="submit" onClick={onCancel}>
                ОК
                </Button>
            ]}
            > 
        
                <div style={{display:'flex', gap:'20px'}}>
                <Form form={form} layout="vertical" method={'post'} action={'/change'} name="userForm" 
                >  
                    <Form.Item>
                    <Select allowClear="true"
                              showSearch
                              optionFilterProp="children"
                              filterOption={(input, option) => option.children.includes(input)}
                              filterSort={(optionA, optionB) =>
                                  optionA.children.localeCompare(optionB.children)
                              }
                              style={{width:'200px'}}
                              onChange={(value)=> {
                                for(let i=0;i<=receipts.length-1;i++) {
                                    if(receipts[i].key===value) {
                                        setReceiptChange({...ReceiptChange, id:value, status:receipts[i].status })
                                    }
                                }

                              }}
                            >
                              {receipts.filter(e => selectedRowKeys.includes(e.id)).map(e =>{return <Option key={e.key} style={{fontFamily:'c39',fontSize:'56px'}} value={e.key} >{e.name}</Option>}) }
                          </Select>
                    </Form.Item>
                    <Form.Item>
                    <Select allowClear="true"
                              placeholder={(ReceiptChange.status!=='')?ReceiptChange.status:''}
                              showSearch
                              optionFilterProp="children"
                              filterOption={(input, option) => option.children.includes(input)}
                              filterSort={(optionA, optionB) =>
                                  optionA.children.localeCompare(optionB.children)
                              }
                              style={{width:'200px'}}

                              onChange={(value) => {

                              }}
                            >
                              {[
                                {code:1, status:'issued'},
                                {code:2, status:'not received'},
                                {code:3, status:'archive'},
                                ].map(e =>{return <Option key={e.code} value={e.code} >{e.status}</Option>}) }
                          </Select>
                    </Form.Item>
                    </Form>
                </div>          
        </Modal>
    )
    

    /*
      <Select allowClear="true"
                              showSearch
                              optionFilterProp="children"
                              filterOption={(input, option) => option.children.includes(input)}
                              filterSort={(optionA, optionB) =>
                                  optionA.children.localeCompare(optionB.children)
                              }
                              style={{width:'400px'}}
                              
                            >
                              {receipts.filter(e => selectedRowKeys.includes(e.id)).map(e =>{return <Option key={e}  value={e} >{e}</Option>}) }
                          </Select>
                          */
}