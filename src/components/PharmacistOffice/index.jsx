import { Input, Typography, Select,  Checkbox, Table, Button, Space } from 'antd';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
const { Title }  = Typography;
const { Paragraph }  = Typography;
const { Option } = Select;

export const PharmacistOffice= () => {

  const drugs = useSelector(state => state.Search.drugs);
    const pharmacyInfo={
        caption:'Pharmacy 1',
        address:'some street, 1,2,3',
        phone: '7 222 333 4455',
        email: 'example@test.ru',
        gps_coordinates: '41.40338, 2.17403',
        receipt: [
            {codeReceipt: '123456789', medicines: [
              {key:1, codeDrug: drugs[0].description_url.substr(0, 5), countDrug: 5},
              {key:2, codeDrug: drugs[1].description_url.substr(0, 5), countDrug: 19},
              {key:3, codeDrug: drugs[2].description_url.substr(0, 5), countDrug: 7}
            ],
             status: 'issued'},//выдан
            {codeReceipt: '987654321', medicines: [
              {key:4, codeDrug: drugs[2].description_url.substr(0, 5), countDrug: 10},
              {key:5, codeDrug: drugs[4].description_url.substr(0, 5), countDrug: 15},
              {key:6, codeDrug: drugs[3].description_url.substr(0, 5), countDrug: 4}
            ], status: 'archive'},
            {codeReceipt: '321654987', medicines: [
              {key:7, codeDrug: drugs[7].description_url.substr(0, 5), countDrug: 9},
              {key:8, codeDrug: drugs[4].description_url.substr(0, 5), countDrug: 11},
              {key:9, codeDrug: drugs[1].description_url.substr(0, 5), countDrug: 13}
            ], status: 'not received'}
          ] 
    }

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


    const [receipt, setreceipt] = useState({receiptCode: '', status:'', medicines:[]});


    let columns= [
      {title: 'Medicine caption', key:'codeDrug',  dataIndex: 'codeDrug', width: '15%',  ...getColumnSearchProps('codeDrug'),  sorter: (a, b) =>  a.codeDrug.toLowerCase().localeCompare(b.codeDrug.toLowerCase()), sortDirections: ['descend', 'ascend']},
      {title: 'Medicines count', key:'countDrug', dataIndex: 'countDrug', width: '0%',  ...getColumnSearchProps('countDrug'), sorter: (a, b) => a.countDrug - b.countDrug, sortDirections: ['descend', 'ascend']}
    ];

    return (
        <div>
            <Title level={5} style={{marginBottom:'20px', textAlign:'center'}}>Pharmacist Office</Title>
            <div style={{width:'400px'}}>
                <Input style={{paddingBottom:'20px'}} addonBefore="Pharmacy" value={pharmacyInfo.caption}/>
                <Input style={{paddingBottom:'20px'}} addonBefore="Address" value={pharmacyInfo.address}/>
                <Input style={{paddingBottom:'20px'}} addonBefore="Phone" value={pharmacyInfo.phone}/>
                <Input style={{paddingBottom:'20px'}} addonBefore="Email" value={pharmacyInfo.email}/>
                <Input style={{paddingBottom:'20px'}} addonBefore="GPS coordinates" value={pharmacyInfo.gps_coordinates}/>
                <br/>
                <br/>
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
                                for (let i=0;i<=pharmacyInfo.receipt.length-1;i++) {
                                  if (pharmacyInfo.receipt[i].codeReceipt===value) {
                                    setreceipt({...receipt, receiptCode:value, status: pharmacyInfo.receipt[i].status, medicines: pharmacyInfo.receipt[i].medicines});
                                  }
                                }
                                if (value===undefined){
                                  setreceipt({...receipt, receiptCode:'', status:'', medicines:[]});
                                }
                              }}
                            >
                              {pharmacyInfo.receipt.map((element) => {
                                  return <Option style={{fontFamily:'c39', fontSize:'56px'}} key={element.codeReceipt}  value={element.codeReceipt} >{element.codeReceipt}</Option>
                              }
                              )}
                          </Select>
                          <Input style={{display:(receipt.receiptCode!=='')?null:'none'}} addonBefore="Receipt's status" value={`${receipt.status}`}/>
                          <br/>
                          <br/>
                          <Checkbox style={{display:(receipt.status!=='')?null:'none'}} disabled={(receipt.status!=='archive')?null:'none'} onChange={()=>{
                            setreceipt({...receipt, status:'archive' })
                          }}>Close receipt</Checkbox>
                          <Table style={{display:(receipt.receiptCode!=='')?null:'none'}} dataSource={receipt.medicines} columns={columns} />

            </div>
        </div>
    )

}
