import { Input, Typography, Select, Table, Space, Button,  } from 'antd';
import { useState, useRef } from 'react';
import { SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
const { Title }  = Typography;
const { Paragraph }  = Typography;
const { Option } = Select;

export const PatientOffice = () => {

    const patientInfo={
        fio:'Ivanov Ivan',
        medCard: 111111,
        diagnosis: 'COVID-19 идентифицирован (U07.1)',
        doctor: 'Petrov Petr',
        receipt: ['123456789', '987654321'] ,
        drugs: [
            {codeDrug: 'Ингарон', pharmacies: [{key: 1, codePharmacy: 'pharmacy 1', countDrug: 10}, {key: 2, codePharmacy: 'pharmacy 2' , countDrug: 6}]},
            {codeDrug: 'Арбидол', pharmacies: [{key: 3, codePharmacy: 'pharmacy 3', countDrug: 13}, {key: 4,codePharmacy: 'pharmacy 4',  countDrug: 6}]}
        ]
    }

    const [drug, setdrug] = useState({drugCode: '', info:[]});

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
            placeholder={'Поиск'}
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
              Поиск
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
              Сброс
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
      {title: 'Аптека', key:'codePharmacy',  dataIndex: 'codePharmacy', width: '15%',  ...getColumnSearchProps('codePharmacy'),  sorter: (a, b) =>  a.codePharmacy.toLowerCase().localeCompare(b.codePharmacy.toLowerCase()), sortDirections: ['descend', 'ascend']},
      {title: 'Количество лекарств', key:'countDrug', dataIndex: 'countDrug', width: '0%',  ...getColumnSearchProps('countDrug'), sorter: (a, b) => a.countDrug - b.countDrug, sortDirections: ['descend', 'ascend']}
    ];




    return (
        <div>
            <Title level={5} style={{marginBottom:'20px', textAlign:'center'}}>Личный кабинет пациента</Title>
            <div style={{width:'400px'}}>
                <Input style={{paddingBottom:'20px'}} addonBefore="ФИО пациента" value={patientInfo.fio}/>
                <Input style={{paddingBottom:'20px'}} addonBefore="Номер мед. карты" value={patientInfo.medCard}/>
                <Input style={{paddingBottom:'20px'}} addonBefore="Диагноз" value={patientInfo.diagnosis}/>
                <Input style={{paddingBottom:'20px'}} addonBefore="ФИО доктора" value={patientInfo.doctor}/>
                <Paragraph>Рецепты</Paragraph>
                            <Select allowClear="true"
                              showSearch
                              optionFilterProp="children"
                              filterOption={(input, option) => option.children.includes(input)}
                              filterSort={(optionA, optionB) =>
                                  optionA.children.localeCompare(optionB.children)
                              }
                              style={{width:'400px'}}
                            >
                              {patientInfo.receipt.map((element) => {
                                  return <Option style={{fontFamily:'c39', fontSize:'56px'}} key={element}  value={element} >{element}</Option>
                              }
                              )}
                          </Select>
                <br/>
                <Paragraph>Лекарства</Paragraph>
                            <Select allowClear="true"
                              showSearch
                              optionFilterProp="children"
                              filterOption={(input, option) => option.children.includes(input)}
                              filterSort={(optionA, optionB) =>
                                  optionA.children.localeCompare(optionB.children)
                              }
                              style={{width:'400px'}}
                              onChange={(value) => {
                                for (let i=0;i<=patientInfo.drugs.length-1;i++) {
                                  if (patientInfo.drugs[i].codeDrug===value) {
                                    setdrug({...drug, drugCode:value, info: patientInfo.drugs[i].pharmacies});
                                  }
                                }
                                if (value===undefined){
                                  setdrug({...drug, drugCode:''});
                                }
                              }}
                            >
                              {patientInfo.drugs.map((element) => {
                                  return <Option className="Drugs" key={element.codeDrug}  value={element.codeDrug} >{element.codeDrug}</Option>
                              }
                              )}
                          </Select>
                          <br/>
                          <Table style={{display:(drug.drugCode!=='')?null:'none'}} dataSource={drug.info} columns={columns} />
                          
            </div>
        </div>
       


        
    )


}

