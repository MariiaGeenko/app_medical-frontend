import { Input, Typography, Select, Table, Space, Button,  } from 'antd';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { BallTriangle } from 'react-loader-spinner';
import s from './PatientOffice.module.css';
const { Title }  = Typography;
const { Paragraph }  = Typography;
const { Option } = Select;

export const PatientOffice = () => {

  const dispatch = useDispatch();

  const drugs = useSelector(state => state.Search.drugs);
  //const pharmacies = useSelector(state => state.Search.pharmacies);
  const doctors = useSelector(state => state.Search.doctors);

  let patientSession={id:sessionStorage.getItem('id'), name: sessionStorage.getItem('name'), surname: sessionStorage.getItem('surname')};

  const [patientInfo, setpatientInfo] = useState({
    id:patientSession.id,
    name:patientSession.name,
    surname:patientSession.surname,
    insurance_number: '',
    sicklists: [],
  // receipts: []
  });

  const [sicklists, setsicklists] = useState([]);
  const [receipts, setreceipts] = useState([]);

  useEffect(()=> {
    async function fetchData(url) {
      //let pageData=document.getElementsByClassName('ant-pagination-item-active')[0].attributes.title.value;
      const response = await fetch(`http://localhost:5588/api/patients/${url}`);
      let dataS = await response.json();


      return dataS
    };

    fetchData(patientInfo.id).then((value)=> {
      setsicklists(value)
    });

  //  fetchData(`${patientInfo.id}/receipts`).then((value)=> {
    //  setreceipts(value)
   // });

   
  },[patientInfo.id]);


 useEffect(()=> {
  let sicklistsOwn=[];
    for(let i=0; i<=sicklists.length-1;i++) {
      for(let j=0;j<=doctors.length-1;j++) {
        for(let k=0;k<=drugs.length-1;k++) {
          if(sicklists[i].doctor_id===doctors[j].id && sicklists[i].drug_id===drugs[k].id){
            sicklistsOwn.push({key: sicklists[i].diagnosis_name, doctor: `${doctors[j].surname} ${doctors[j].name} (${doctors[j].caption_speciality})`,
              diagnosis: sicklists[i].diagnosis_name, datein: sicklists[i].datein, dateout: sicklists[i].dateout, receipt_name: sicklists[i].receipt_name,
              drug: drugs[k].name, receipt_status: sicklists[i].receipt_status
            });
          }
        }
      }
    }

    setreceipts(sicklistsOwn);
  },[doctors, sicklists]);// eslint-disable-line react-hooks/exhaustive-deps
console.log(receipts);


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
      {title: 'Doctor', key:'doctor',  dataIndex: 'doctor', width: '15%',  ...getColumnSearchProps('doctor'),  sorter: (a, b) =>  a.doctor.toLowerCase().localeCompare(b.doctor.toLowerCase()), sortDirections: ['descend', 'ascend']},
      {title: 'Diagnosis', key:'diagnosis',  dataIndex: 'diagnosis', width: '15%',  ...getColumnSearchProps('diagnosis'),  sorter: (a, b) =>  a.diagnosis.toLowerCase().localeCompare(b.diagnosis.toLowerCase()), sortDirections: ['descend', 'ascend']},
      {title: 'Date in', key:'datein', dataIndex: 'datein', width: '0%',  ...getColumnSearchProps('datein'), sorter: (a, b) => new Date(a.datein) - new Date(b.datein), sortDirections: ['descend', 'ascend']},
      {title: 'Date out', key:'dateout', dataIndex: 'dateout', width: '0%',  ...getColumnSearchProps('dateout'), sorter: (a, b) => new Date(a.dateout) - new Date(b.dateout), sortDirections: ['descend', 'ascend']},
      {title: 'Receipt', className:`${s.receiptCode}`,key:'receipt_name', dataIndex: 'receipt_name', width: '15%' , ...getColumnSearchProps('receipt_name'),  sorter: (a, b) =>  a.receipt_name.toLowerCase().localeCompare(b.receipt_name.toLowerCase()), sortDirections: ['descend', 'ascend']},
      {title: 'Prescription medication', key:'drug', dataIndex: 'drug', width: '0%',  ...getColumnSearchProps('drug'), sorter: (a, b) => a.drug.toLowerCase().localeCompare(b.drug.toLowerCase()), sortDirections: ['descend', 'ascend']},
      {title: "Receipt's status", key:'receipt_status', dataIndex: 'receipt_status', width: '0%',  ...getColumnSearchProps('receipt_status'), sorter: (a, b) => a.receipt_status.toLowerCase().localeCompare(b.receipt_status.toLowerCase()), sortDirections: ['descend', 'ascend']},
    
    ];
   const DataLoader = () => {
    if(sicklists.length!==0 && receipts.length!==0) {
     
    return (
      <div>
          <Title level={5} style={{marginBottom:'20px', textAlign:'center'}}>Patient Office</Title>
          <div style={{width:'400px'}}>
              <Input style={{paddingBottom:'20px'}} addonBefore="Patient" value={`${patientInfo.surname} ${patientInfo.name}`}/>
              <Input style={{paddingBottom:'20px'}} addonBefore="Insurance number" value={sicklists[0].insurance}/>
          </div>
                <Title level={5}>Sicklists</Title>
                <Table style={{width:'800px'}} dataSource={receipts} columns={columns} 
                          pagination={{
                            pageSize: 5,
                          }}
                          />
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

/*
<Paragraph>Receipts</Paragraph>
                            <Select allowClear="true"
                              showSearch
                              optionFilterProp="children"
                              filterOption={(input, option) => option.children.includes(input)}
                              filterSort={(optionA, optionB) =>
                                  optionA.children.localeCompare(optionB.children)
                              }
                              style={{width:'400px'}}
                              onChange={(value) => {
                                for (let i=0;i<=patientInfo1.receipt.length-1;i++) {
                                  if (patientInfo1.receipt[i].codeReceipt===value) {
                                    setreceipt({...receipt, receiptCode:value, status: patientInfo1.receipt[i].status});
                                  }
                                }
                                if (value===undefined){
                                  setreceipt({...receipt, receiptCode:''});
                                }
                              }}
                            >
                              {patientInfo1.receipt.map((element) => {
                                  return <Option style={{fontFamily:'c39', fontSize:'56px'}} key={element.codeReceipt}  value={element.codeReceipt} >{element.codeReceipt}</Option>
                              }
                              )}
                          </Select>
                          <Input style={{display:(receipt.receiptCode!=='')?null:'none'}} addonBefore="Receipt's status" value={`${receipt.status}`}/>
                <br/>
                <Paragraph>Medicines</Paragraph>
                            <Select allowClear="true"
                              showSearch
                              optionFilterProp="children"
                              filterOption={(input, option) => option.children.includes(input)}
                              filterSort={(optionA, optionB) =>
                                  optionA.children.localeCompare(optionB.children)
                              }
                              style={{width:'400px'}}
                              onChange={(value) => {
                                for (let i=0;i<=patientInfo1.drugs.length-1;i++) {
                                  if (patientInfo1.drugs[i].codeDrug===value) {
                                    setdrug({...drug, drugCode:value, info: patientInfo1.drugs[i].pharmacies});
                                  }
                                }
                                if (value===undefined){
                                  setdrug({...drug, drugCode:''});
                                }
                              }}
                            >
                              {patientInfo1.drugs.map((element) => {
                                  return <Option className="Drugs" key={element.codeDrug}  value={element.codeDrug} >{element.codeDrug}</Option>
                              }
                              )}
                          </Select>
                          <br/>
                          <Table style={{display:(drug.drugCode!=='')?null:'none'}} dataSource={drug.info} columns={columns} />
                          */