import { Form, Input, Modal, Button, Table, Select, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useState  } from 'react';
import { clearselectedRowKeys } from '../../reducers/selectedRowKeys';

export const ChangeReceiptStatus = ({open, onCancel, receipts}) => {
    
    const dispatch = useDispatch();
    const [ReceiptChange, setReceiptChange]=useState({id:'', status_id:'', status:''});
    const selectedRowKeys = useSelector(state => state.selectedRowKeys.selectedRowKeys);
    const { Option } = Select;
    //console.log(receipts.filter(e => selectedRowKeys.includes(e.id)).map(e =>{return <Option key={e.key}  value={e.key} >{e.name}</Option>}));

    
    /*
    useEffect(()=> {
        let data=[];
        for(let i=0;i<=receipts.length-1;i++) {
            for (let j=0;j<=selectedRowKeys.length-1;j++) {
                if(receipts[i].id===selectedRowKeys[j]) {
                    data.push();
                }
            }
        }
    },[]);
    */
    return (
        <Modal open={open} onCancel={onCancel} title={"Change Receipt Status: "}
        footer ={[
                <Button key="back" onClick={onCancel}>
                ОК
                </Button>
            ]}
            > 
                <div style={{display:'flex', gap:'20px'}}>
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