import s from './PharmacistOffice.module.css';
import { Input, Typography, Select, Table, Button, Space } from 'antd';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { BallTriangle } from 'react-loader-spinner';
import { ModalWarning } from '../ModalWarning';
import { ChangeReceiptStatus } from './../ChangeReceiptStatus';
import { clearselectedRowKeys, setSelectedRowKeys} from './../../reducers/selectedRowKeys';

const { Title }  = Typography;
const { Paragraph }  = Typography;
const { Option } = Select;

export const PharmacistOffice= () => {

  const dispatch = useDispatch();

  const drugs = useSelector(state => state.Search.drugs);
  const pharmacies = useSelector(state => state.Search.pharmacies);
  const doctors = useSelector(state => state.Search.doctors);
  const selectedRowKeys = useSelector(state => state.selectedRowKeys.selectedRowKeys);


  let pharmacySession={id:sessionStorage.getItem('id'), name: sessionStorage.getItem('name')};
 
  const [pharmacyInfo, setpharmacyInfo] = useState({
    id:'',
    caption:'',
    address:'',
    phone: '',
    email: '',
    gps_coordinates: '',
    receipt: []
  });

  const [receipts, setreceipts]=useState([]);
  const [receiptsOwn, setreceiptsOwn]=useState([]);

  useEffect(()=> {
    async function fetchData() {
      //let pageData=document.getElementsByClassName('ant-pagination-item-active')[0].attributes.title.value;
      const response = await fetch(`http://localhost:5588/api/pharmacies/receipts`);
      let dataS = await response.json();
      console.log(dataS);

      return dataS
    };

    fetchData().then((value)=> {
      setreceipts(value)
    });
   
  },[]);

  useEffect(()=> {
    for(let i=0; i<=pharmacies.length-1;i++) {
      if(String(pharmacies[i].id)===pharmacySession.id) {
        setpharmacyInfo({...pharmacyInfo,
          id:pharmacies[i].id,
          caption: pharmacies[i].name,
          address: pharmacies[i].address,
          phone: pharmacies[i].phone,
          email: pharmacies[i].email,
          gps_coordinates: pharmacies[i].gps_coordinates })
      }
    }

  },[pharmacySession.id]);// eslint-disable-line react-hooks/exhaustive-deps

  console.log(pharmacyInfo);
  console.log(receipts);

  useEffect(()=> {
    let receiptInfo=[];
    for(let i=0; i<=receipts.length-1;i++) {
      for(let j=0; j<=doctors.length-1;j++) {
        for(let k=0; k<=drugs.length-1;k++) {
          if(receipts[i].doctor_id===doctors[j].id && receipts[i].drug_id===drugs[k].id) {
            receiptInfo.push({id: receipts[i].id, key: receipts[i].id, name:receipts[i].name,
              doctor:`${doctors[j]['surname']} ${doctors[j]['name']} (${doctors[j]['caption_speciality']})`, drug:drugs[k].name, status_id:receipts[i].receipt_status_id, status:receipts[i].receipt_status})
          }
        }
      }
    }
    setreceiptsOwn(receiptInfo);
  }, [doctors, receipts, drugs]);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };


    const getColumnSearchProps = (dataIndex) => ({

      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div
          style={{
            padding: 8,
          }}
        >
          <Input
            ref={searchInput}
            placeholder={'Search'}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: 'block',
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => {
                  clearFilters();
                  setSearchText('');
                  confirm();
                  setSearchText('');
                  setSearchedColumn('');
  
              }}
              size="small"
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? '#1890ff' : undefined,
          }}
        />
      ),
      onFilter: (value, record) => {
        if(record[dataIndex]!==null) {
          return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        }
      },
      onFilterDropdownOpenChange: (open) => {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render:  (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape={true}
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
    });


    let columns= [
      {title: 'Receipt', className:`${s.receiptCode}`,key:'name', dataIndex: 'name', width: '15%' , ...getColumnSearchProps('name'),  sorter: (a, b) =>  a.name.toLowerCase().localeCompare(b.name.toLowerCase()), sortDirections: ['descend', 'ascend']},
      {title: 'Prescription medication', key:'drug', dataIndex: 'drug', width: '0%',  ...getColumnSearchProps('drug'), sorter: (a, b) => a.drug.toLowerCase().localeCompare(b.drug.toLowerCase()), sortDirections: ['descend', 'ascend']},
      {title: 'Prescription doctor', key:'doctor', dataIndex: 'doctor', width: '0%',  ...getColumnSearchProps('doctor'), sorter: (a, b) => a.doctor.toLowerCase().localeCompare(b.doctor.toLowerCase()), sortDirections: ['descend', 'ascend']},
      {title: "Receipt's status", key:'status', dataIndex: 'status', width: '0%',  ...getColumnSearchProps('status'), sorter: (a, b) => a.status.toLowerCase().localeCompare(b.status.toLowerCase()), sortDirections: ['descend', 'ascend']},
    
    ];

    
    const onSelectChange = (newSelectedRowKeys) => {
      console.log('selectedRowKeys changed: ', newSelectedRowKeys);
      dispatch(setSelectedRowKeys(newSelectedRowKeys));
    };
   
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };

    //определяем состояние окна для изменения статуса рецепта
    const [IsModalOpen, setIsModalOpen] = useState({changeStatus: false, warning: false, warningText: ''});
   
    console.log(pharmacies);
    const DataLoader = () => {
      if(pharmacyInfo.id!=='' && receiptsOwn.length!==0) {
      return ( 
        <div style={{padding:'25px'}}>
            <Title level={5} style={{marginBottom:'20px', textAlign:'center'}}>Pharmacist Office</Title>
            <div style={{width:'800px'}}>
              <div style={{display:'flex', flexDirection:'column'}}>
                <Input style={{paddingBottom:'20px', width:'500px'}} addonBefore="Pharmacy" value={pharmacyInfo.caption}/>
                <Input style={{paddingBottom:'20px', width:'500px'}} addonBefore="Address" value={pharmacyInfo.address}/>
                <Input style={{paddingBottom:'20px', width:'500px'}} addonBefore="Phone" value={pharmacyInfo.phone}/>
                <Input style={{paddingBottom:'20px', width:'500px'}} addonBefore="Email" value={pharmacyInfo.email}/>
                <Input style={{paddingBottom:'20px', width:'500px'}} addonBefore="GPS coordinates" value={pharmacyInfo.gps_coordinates}/>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31988.796415699508!2d30.275369882583604!3d59.9271677328011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4696310817bb2179%3A0xe54a5091947303ab!2z0KHRgtC-0LvQuNGH0LrQuA!5e0!3m2!1sru!2sru!4v1681195294528!5m2!1sru!2sru" style={{border:0,height:'450px', width:'600px' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                <br/>
              </div>
              
                <Title level={5}>Medicines in "{pharmacyInfo.caption}"</Title>
                            <Select allowClear="true"
                              showSearch
                              optionFilterProp="children"
                              filterOption={(input, option) => option.children.includes(input)}
                              filterSort={(optionA, optionB) =>
                                  optionA.children.localeCompare(optionB.children)
                              }
                              style={{width:'400px'}}
                              
                            >
                              {pharmacies.filter(e => pharmacySession.id.includes(e.id))[0].drugsPharmacy.map(e =>{return <Option key={e}  value={e} >{e}</Option>}) }
                          </Select>
                          <br/>
                          <Title level={5}>Receipts</Title>
                          <Table dataSource={receiptsOwn} columns={columns} 
                          rowSelection={rowSelection}
                          pagination={{
                            pageSize: 5,
                          }}
                          />
                          <Button style={{width:'200px'}} onClick={() => {
                            (selectedRowKeys.length===0) ? setIsModalOpen({...IsModalOpen, warning: true, warningText: "Choose receipts to change status" }) : setIsModalOpen({...IsModalOpen, changeStatus: true })
                          }}>Change Receipt's status</Button>
                          <ModalWarning open={IsModalOpen.warning}  onCancelModal={() => {setIsModalOpen({...IsModalOpen, warning: false })}} mess={IsModalOpen.warningText}/>
                          <ChangeReceiptStatus open={IsModalOpen.changeStatus}  onCancel={() => {
                            setIsModalOpen({...IsModalOpen, changeStatus: false })
                            dispatch(clearselectedRowKeys())
                            }} receipts={receiptsOwn}/>            
            </div>
        </div>
      )
      } else {
        return (
          <div style={{display:'flex', justifyContent: 'center', alignItems:'center',  paddingTop:'30px', paddingBottom:'30px', height:'600px' }}>
            <BallTriangle color="#313252" height={100} width={100} />
          </div>
                  
        )
      }
    }

    return (
      <div >
         {DataLoader()}   
        
      </div>
    
      )  

}
/*<ChangeReceiptStatus open={IsModalOpen.changeStatus}  onCancel={() => {setIsModalOpen({...IsModalOpen, changeStatus: false })}} receipts={receiptsOwn}/>            
  <Input style={{display:(receipt.receiptCode!=='')?null:'none'}} addonBefore="Receipt's status" value={`${receipt.status}`}/>
                          <br/>
                          <br/>
                          <Checkbox style={{display:(receipt.status!=='')?null:'none'}} disabled={(receipt.status!=='archive')?null:'none'} onChange={()=>{
                            setreceipt({...receipt, status:'archive' })
                          }}>Close receipt</Checkbox>
                          <Table style={{display:(receipt.receiptCode!=='')?null:'none'}} dataSource={receipt.medicines} columns={columns} />



<div style={{display:'flex', gap:'20px', width:'1400px'}}>
                            <Select allowClear="true"
                              showSearch
                              optionFilterProp="children"
                              filterOption={(input, option) => option.children.includes(input)}
                              filterSort={(optionA, optionB) =>
                                  optionA.children.localeCompare(optionB.children)
                              }
                             style={{width:'150px'}}
                             
                              onChange={(value) => {
                                for (let i=0;i<=receiptsOwn.length-1;i++) {
                                  if (receiptsOwn[i].name===value) {
                                    setdrugDoctorReceipt({ drug:receiptsOwn[i].drug, doctor:receiptsOwn[i].doctor, status:receiptsOwn[i].status });
                                  }
                                }
                                if (value===undefined){
                                  setdrugDoctorReceipt({drug:'', doctor:'', status:''});
                                }
                              }}
                              
                            >
                              {
                                
                                receiptsOwn.map((element) => {
                                    return <Option style={{fontFamily:'c39', fontSize:'56px'}} key={element.name} >{element.name}</Option>
                                })
                              }
                            
                              
                          </Select>
                          <Input style={{display:(drugDoctorReceipt.doctor!=='')?null:'none', width:'350px'}} addonBefore="Prescription doctor" value={`${drugDoctorReceipt.doctor}`}/>
                          <Input style={{display:(drugDoctorReceipt.drug!=='')?null:'none', width:'350px'}} addonBefore="Prescription medication" value={`${drugDoctorReceipt.drug}`}/>
                          <Input style={{display:(drugDoctorReceipt.status!=='')?null:'none', width:'350px'}} addonBefore="Receipt's status" value={`${drugDoctorReceipt.status}`}/>
                          </div>
                          */