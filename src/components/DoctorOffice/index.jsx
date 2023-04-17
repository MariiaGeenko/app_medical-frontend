import { Input, Typography, Select, Table, Space, Button  } from 'antd';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { BallTriangle } from 'react-loader-spinner';
import s from './DoctorOffice.module.css';
import { ChangeReceiptStatus } from './../ChangeReceiptStatus';
import { clearselectedRowKeys, setSelectedRowKeys} from './../../reducers/selectedRowKeys';
import { ModalWarning } from '../ModalWarning';
import { RegisterPatient } from './RegisterPatient';
const { Title }  = Typography;
const { Paragraph }  = Typography;
const { Option } = Select;

export const DoctorOffice= () => {

  const dispatch = useDispatch();

  const drugs = useSelector(state => state.Search.drugs);
  //const pharmacies = useSelector(state => state.Search.pharmacies);
  const doctors = useSelector(state => state.Search.doctors);
  const selectedRowKeys = useSelector(state => state.selectedRowKeys.selectedRowKeys);

  let doctorSession={id:sessionStorage.getItem('id'), name: sessionStorage.getItem('name'), surname: sessionStorage.getItem('surname')};
  
  const [doctorInfo, setdoctorInfo] = useState({
    id:doctorSession.id,
    name:doctorSession.name,
    surname:doctorSession.surname,
    education:'',
    speciality: ''
  //  patients:[]
  // sicklists: [],
  // receipts: []
  });

  const [patients, setpatients] = useState([]);
  const [receipts, setreceipts] = useState([]);
  const [receiptsOwn, setreceiptsOwn] = useState([]);

  const [choosenPatient, setchoosenPatient]=useState('');


  console.log(selectedRowKeys);

  useEffect(()=> {
    async function fetchData(url) {
      //let pageData=document.getElementsByClassName('ant-pagination-item-active')[0].attributes.title.value;
      const response = await fetch(`http://localhost:5588/api/doctors/${url}`);
      let dataS = await response.json();
      console.log(dataS);
      return dataS
    };

    fetchData(`${doctorInfo.id}/patients`).then((value)=> {
      setpatients(value)
    });

    fetchData(`${doctorInfo.id}/receipts`).then((value)=> {
      setreceipts(value)
    });
   
  },[doctorInfo.id]);

  console.log(receipts);
  console.log(patients);

  useEffect(()=> {
    let receiptsOwn1=[];
    for(let j=0;j<=receipts.length-1;j++) {
      for(let i=0;i<=drugs.length-1;i++) {
        
        if(drugs[i].id===receipts[j].drug_id && receipts[j].patient_id===choosenPatient) {
          receiptsOwn1.push({key: receipts[j].receipt_name, diagnosis:receipts[j].diagnosis_name, receipt_name: receipts[j].receipt_name, drug: drugs[i].name, 
            datein: receipts[j].datein, dateout: receipts[j].dateout, receipt_status: receipts[j].receipt_status})
        }
      }
    }
 
    setreceiptsOwn(receiptsOwn1)
  },[receipts,drugs,choosenPatient])

  const [receipt, setreceipt] = useState({receiptCode: '', status:''});

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
    {title: 'Receipt', className:`${s.receiptCode}`,key:'receipt_name', dataIndex: 'receipt_name', width: '15%' , ...getColumnSearchProps('receipt_name'),  sorter: (a, b) =>  a.receipt_name.toLowerCase().localeCompare(b.receipt_name.toLowerCase()), sortDirections: ['descend', 'ascend']},
    {title: 'Diagnosis', key:'diagnosis',  dataIndex: 'diagnosis', width: '15%',  ...getColumnSearchProps('diagnosis'),  sorter: (a, b) =>  a.diagnosis.toLowerCase().localeCompare(b.diagnosis.toLowerCase()), sortDirections: ['descend', 'ascend']},
    {title: 'Date in', key:'datein', dataIndex: 'datein', width: '0%',  ...getColumnSearchProps('datein'), sorter: (a, b) => new Date(a.datein) - new Date(b.datein), sortDirections: ['descend', 'ascend']},
    {title: 'Date out', key:'dateout', dataIndex: 'dateout', width: '0%',  ...getColumnSearchProps('dateout'), sorter: (a, b) => new Date(a.dateout) - new Date(b.dateout), sortDirections: ['descend', 'ascend']},
    {title: 'Prescription medication', key:'drug', dataIndex: 'drug', width: '0%',  ...getColumnSearchProps('drug'), sorter: (a, b) => a.drug.toLowerCase().localeCompare(b.drug.toLowerCase()), sortDirections: ['descend', 'ascend']},
    {title: "Receipt's status", key:'receipt_status', dataIndex: 'receipt_status', width: '0%',  ...getColumnSearchProps('receipt_status'), sorter: (a, b) => a.receipt_status.toLowerCase().localeCompare(b.receipt_status.toLowerCase()), sortDirections: ['descend', 'ascend']},
  
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
  const [IsModalOpen, setIsModalOpen] = useState({changeStatus: false, warning: false, warningText: '', registerPatient:false});

   const DataLoader = () => {
    if(doctorInfo.id!=='' && receipts.length!==0 && patients.length!==0) {
    return ( 
        <div>
            <Title level={5} style={{marginBottom:'20px', textAlign:'center'}}>Doctor Office</Title>
            <div style={{width:'400px'}}>
                <Input style={{paddingBottom:'20px'}} addonBefore="Doctor" value={`${doctorInfo.surname} ${doctorInfo.name}`}/>
                <Input style={{paddingBottom:'20px'}} addonBefore="Speciality" value={doctors.filter(e => e.id===Number(doctorInfo.id))[0].caption_speciality}/>
                <Input style={{paddingBottom:'20px'}} addonBefore="Education" value={doctors.filter(e => e.id===Number(doctorInfo.id))[0].organization_name}/>
                <Button style={{width:'200px', marginTop:'20px'}} onClick={() => {
                setIsModalOpen({...IsModalOpen, registerPatient: true })
              }}>Register Patient</Button>
                <Title level={5}>Patients</Title>
                <Select allowClear="true"
                              showSearch
                              optionFilterProp="children"
                              filterOption={(input, option) => option.children.includes(input)}
                              filterSort={(optionA, optionB) =>
                                  optionA.children.localeCompare(optionB.children)
                              }
                              style={{width:'400px'}}
                              onChange={(value) => {
                                console.log(value)
                                setchoosenPatient(value);
                                if(value===undefined){
                                  setchoosenPatient('');
                                }
                              }}
                              
                            >
                              {patients.map(e =>{return <Option key={e.patient_id}  value={e.patient_id} >{`${e.patient_surname} ${e.patient_name} (${e.insurance})`}</Option>}) }
                          </Select>
                          <Title style={{display:(choosenPatient!=='')?null:'none'}} level={5}>Sicklists</Title>
                          <Table style={{width:'800px', display:(choosenPatient!=='')?null:'none'}} dataSource={receiptsOwn} columns={columns} 
             rowSelection={rowSelection}
             pagination={{
               pageSize: 5,
             }}
             />
             <Button style={{width:'200px', marginTop:'20px'}} onClick={() => {
               (selectedRowKeys.length===0) ? setIsModalOpen({...IsModalOpen, warning: true, warningText: "Choose receipts to change status" }) : setIsModalOpen({...IsModalOpen, changeStatus: true })
             }}>Change Receipt's status</Button>
             <ModalWarning open={IsModalOpen.warning}  onCancelModal={() => {setIsModalOpen({...IsModalOpen, warning: false })}} mess={IsModalOpen.warningText}/>
             <RegisterPatient open={IsModalOpen.registerPatient}  onCancelModal={() => {setIsModalOpen({...IsModalOpen, registerPatient: false })}}/>
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
