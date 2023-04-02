
import { Input, Typography, Select, Table, Space, Button } from 'antd';
import { useState, useRef } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
const { Title } = Typography;
const { Paragraph } = Typography;
const { Option } = Select;


export const DoctorOffice = () => {

  const doctorInfo = {
    surname: 'Petrov',
    name: 'Petr',
    education: 'some education',
    speciality: 'some speciality',
    working_mode: [
      { codeMode: 1, mode: 'morning from 9 AM to 12 AM even days ' }, // четные дни
      { codeMode: 2, mode: 'evening from 2 PM to 6 PM odd days ' }, // нечетные дни
      { codeMode: 3, mode: 'morning from 9 AM to 12 AM odd days ' },
      { codeMode: 4, mode: 'evening from 2 PM to 6 PM even days ' }
    ],
    clinics: [
      { code: 1, caption: 'some clinic 1 ' },
      { code: 2, caption: 'some clinic 2 ' },
      { code: 3, caption: 'some clinic 3 ' },
      { code: 4, caption: 'some clinic 4 ' }
    ],
    statuses: [
      { code: 1, caption: 'some status 1 ' },
      { code: 2, caption: 'some status 2 ' },
      { code: 3, caption: 'some status 3 ' },
      { code: 4, caption: 'some status 4 ' }
    ],
    patients: [
      {
        id: 1, surname: 'Ivanov', name: 'Ivan', insurance_number: 567432, diagnosis: 'COVID-19 identified (U07.1)',
        receipt: [
          { codeReceipt: '123456789', status: 'issued' },//выдан
          { codeReceipt: '987654321', status: 'archive' }
        ], drugs: [
          { codeDrug: 'Ingaron', pharmacies: [{ key: 1, codePharmacy: 'pharmacy 1', countDrug: 10 }, { key: 2, codePharmacy: 'pharmacy 2', countDrug: 6 }] },
          { codeDrug: 'Arbidol', pharmacies: [{ key: 3, codePharmacy: 'pharmacy 3', countDrug: 13 }, { key: 4, codePharmacy: 'pharmacy 4', countDrug: 6 }] }
        ]
      },
      {
        id: 2, surname: 'Isaev', name: 'Mihail', insurance_number: 267432, diagnosis: 'COVID-19 identified (U07.2)',
        receipt: [
          { codeReceipt: '223456789', status: 'issued' },//выдан
          { codeReceipt: '997654321', status: 'issued' }
        ], drugs: [
          { codeDrug: 'Ingaron', pharmacies: [{ key: 1, codePharmacy: 'pharmacy 1', countDrug: 10 }, { key: 2, codePharmacy: 'pharmacy 2', countDrug: 6 }] },
          { codeDrug: 'Arbidol', pharmacies: [{ key: 3, codePharmacy: 'pharmacy 3', countDrug: 13 }, { key: 4, codePharmacy: 'pharmacy 4', countDrug: 6 }] }
        ]
      },
      {
        id: 2, surname: 'Isaev', name: 'Mihail', insurance_number: 267432, diagnosis: 'COVID-19 identified (U07.2)',
        receipt: [
          { codeReceipt: '223456789', status: 'issued' },//выдан
          { codeReceipt: '997654321', status: 'issued' }
        ], drugs: [
          { codeDrug: 'Ingaron', pharmacies: [{ key: 1, codePharmacy: 'pharmacy 1', countDrug: 10 }, { key: 2, codePharmacy: 'pharmacy 2', countDrug: 6 }] },
          { codeDrug: 'Arbidol', pharmacies: [{ key: 3, codePharmacy: 'pharmacy 3', countDrug: 13 }, { key: 4, codePharmacy: 'pharmacy 4', countDrug: 6 }] }
        ]
      }
    ],


  }

  const [drug, setdrug] = useState({ drugCode: '', info: [] });
  const [receipt, setreceipt] = useState({ receiptCode: '', status: '' });

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
      if (record[dataIndex] !== null) {
        return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
      }
    },
    onFilterDropdownOpenChange: (open) => {
      if (open) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
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

  let columns = [
    { title: 'Pharmacy', key: 'codePharmacy', dataIndex: 'codePharmacy', width: '15%', ...getColumnSearchProps('codePharmacy'), sorter: (a, b) => a.codePharmacy.toLowerCase().localeCompare(b.codePharmacy.toLowerCase()), sortDirections: ['descend', 'ascend'] },
    { title: 'Medicines count', key: 'countDrug', dataIndex: 'countDrug', width: '0%', ...getColumnSearchProps('countDrug'), sorter: (a, b) => a.countDrug - b.countDrug, sortDirections: ['descend', 'ascend'] }
  ];




  return (
    <div>
      <Title level={5} style={{ marginBottom: '20px', textAlign: 'center' }}>Patient Office</Title>
      <div style={{ width: '400px' }}>
        <Input style={{ paddingBottom: '20px' }} addonBefore="Doctor" value={`${doctorInfo.surname} ${doctorInfo.name}`} />
        <Paragraph>Receipts</Paragraph>
        <Select allowClear="true"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) => option.children.includes(input)}
          filterSort={(optionA, optionB) =>
            optionA.children.localeCompare(optionB.children)
          }
          style={{ width: '400px' }}
          onChange={(value) => {
            for (let i = 0; i <= doctorInfo.receipt.length - 1; i++) {
              if (doctorInfo.receipt[i].codeReceipt === value) {
                setreceipt({ ...receipt, receiptCode: value, status: doctorInfo.receipt[i].status });
              }
            }
            if (value === undefined) {
              setreceipt({ ...receipt, receiptCode: '' });
            }
          }}
        >
          {doctorInfo.receipt.map((element) => {
            return <Option style={{ fontFamily: 'c39', fontSize: '56px' }} key={element.codeReceipt} value={element.codeReceipt} >{element.codeReceipt}</Option>
          }
          )}
        </Select>
        <Input style={{ display: (receipt.receiptCode !== '') ? null : 'none' }} addonBefore="Receipt's status" value={`${receipt.status}`} />
        <br />
        <Title>Medicines</Title>
        <Select allowClear="true"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) => option.children.includes(input)}
          filterSort={(optionA, optionB) =>
            optionA.children.localeCompare(optionB.children)
          }
          style={{ width: '400px' }}
          onChange={(value) => {
            for (let i = 0; i <= doctorInfo.drugs.length - 1; i++) {
              if (doctorInfo.drugs[i].codeDrug === value) {
                setdrug({ ...drug, drugCode: value, info: doctorInfo.drugs[i].pharmacies });
              }
            }
            if (value === undefined) {
              setdrug({ ...drug, drugCode: '' });
            }
          }}
        >
          {doctorInfo.drugs.map((element) => {
            return <Option className="Drugs" key={element.codeDrug} value={element.codeDrug} >{element.codeDrug}</Option>
          }
          )}
        </Select>
        <br />
        <Table style={{ display: (drug.drugCode !== '') ? null : 'none' }} dataSource={drug.info} columns={columns} />

      </div>
    </div>

  )
}
