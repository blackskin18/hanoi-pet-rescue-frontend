import React, {useState, useEffect}                                    from 'react'
import './style.scss'
import {Row, Col, Divider, Table, Image, Space, Input, Button, Select} from 'antd';
import {SearchOutlined}                                                from '@ant-design/icons';
import CaseService                                                     from "../../../service/CaseService";
import {SearchStatus, SearchText, SearchDateRange, SearchPlace}        from '../../component/SearchInput/index';

const {Option} = Select;

const ListCase = () => {
  const [searchName, setSearchName]                = useState('')
  const [searchCode, setSearchCode]                = useState('')
  const [searchAddress, setSearchAddress]          = useState('')
  const [searchDescription, setSearchDescriptions] = useState('')
  const [searchStatus, setSearchStatus]            = useState('')

  const [listCase, setListCase] = useState([])

  useEffect( () => {
    getCaseData()
  }, [])

  const getCaseData = async () => {
    let response = await CaseService.getCases()
    setListCase(response.data)
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    console.log(selectedKeys, confirm, dataIndex)
  }

  const handleReset = (selectedKeys, confirm, dataIndex) => {
    console.log(selectedKeys, confirm, dataIndex)
  }

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => {
      let searchComponent = null;
      switch (dataIndex) {
        case 'status':
          return <SearchStatus
            setSelectedKeys={setSelectedKeys}
            selectedKeys={selectedKeys}
            confirm={confirm}
            clearFilters={clearFilters}
            dataIndex={dataIndex}
            handleSearch={handleSearch}
            handleReset={handleReset}/>
        case 'place':
          return <SearchPlace
            setSelectedKeys={setSelectedKeys}
            selectedKeys={selectedKeys}
            confirm={confirm}
            clearFilters={clearFilters}
            dataIndex={dataIndex}
            handleSearch={handleSearch}
            handleReset={handleReset}
          />;
        case 'receive_date':
          return <SearchDateRange
            setSelectedKeys={setSelectedKeys}
            selectedKeys={selectedKeys}
            confirm={confirm}
            clearFilters={clearFilters}
            dataIndex={dataIndex}
            handleSearch={handleSearch}
            handleReset={handleReset}/>;
        default:
          return <SearchText
            setSelectedKeys={setSelectedKeys}
            selectedKeys={selectedKeys}
            confirm={confirm}
            clearFilters={clearFilters}
            dataIndex={dataIndex}
            handleSearch={handleSearch}
            handleReset={handleReset}/>;
      }
    },
    filterIcon    : filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
  });


  const columns = [
    {
      title    : 'Code',
      dataIndex: 'code',
      key      : 'code',
      ...getColumnSearchProps('code'),
    },
    {
      title    : 'Ảnh',
      dataIndex: 'animalImage',
      key      : 'animalImage',
      render   : (images) => {
        if (images[0]) {
          return <Image src={images[0].path} width={100} height={100} className="animal-image"/>
        } else {
          return ""
        }
      }
    },
    {
      title    : 'Tên',
      dataIndex: 'name',
      key      : 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title    : 'Ngày cứu hộ',
      dataIndex: 'receive_date',
      key      : 'receive_date',
      ...getColumnSearchProps('receive_date'),
    },
    {
      title    : 'Nơi cứu hộ',
      dataIndex: 'receive_place',
      key      : 'receive_place',
      ...getColumnSearchProps('receive_place'),
    },
    {
      title    : 'Nơi ở hiện tại',
      dataIndex: 'place',
      key      : 'place',
      ...getColumnSearchProps('place'),
    },
    {
      title    : 'Mô tả',
      dataIndex: 'description',
      key      : 'description',
      render   : (description) => {
        return <span>{description && description.length > 50 ? description.slice(0, 50) + '...' : description}</span>
      },
      ...getColumnSearchProps('description'),
    },
    {
      title    : 'Trạng thai',
      dataIndex: 'status',
      key      : 'status',
      render   : (statusObj) => {
        return <span>{statusObj.name}</span>
      },
      ...getColumnSearchProps('status'),
    },
  ];

  return (<div className="home-page">
    <Divider orientation="left">
      <h4 className="text-primary-green left-align padding-left-xs">Danh sách case </h4>
    </Divider>
    <Row justify="space-between" className="filter-row">
      <Col className="count-case">
        Tổng số case: 550
      </Col>
      <Col>
        <Row gutter={10}>
          <Col>
            <Select defaultValue="Năm" style={{width: 120}}>
              <Option value="jack">2020</Option>
            </Select>
          </Col>
          <Col>
            <Select defaultValue="Tháng" style={{width: 120}}>
              <Option value="jack">12</Option>
            </Select>
          </Col>
          <Col>
            <Select defaultValue="Ngày" style={{width: 120}}>
              <Option value="jack">08</Option>
            </Select>
          </Col>
        </Row>
      </Col>

    </Row>
    <div className="list-case-table">
      <Table columns={columns} dataSource={listCase}/>
    </div>
  </div>)
}

export default ListCase