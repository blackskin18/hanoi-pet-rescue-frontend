import React, {useState, useEffect}                                             from 'react'
import './style.scss'
import {Row, Col, Divider, Table, Tag, Space, Input, Button, Select} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const ListCase = () => {
  const data = [
    {
      key: '1',
      code: '20CM4647',
      image: 'John Brown',
      name: 'John Brown',
      date: '20/01/2020',
      save_address: 'Tây Hồ',
      address: 'New York No. 1 Lake Park',
      description: 'Bị chủ bỏ tại phòng khám',
      status: '1'
    },
  ];

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    console.log(selectedKeys, confirm, dataIndex)
  }

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
      return <div style={{padding: 8}}>
        <Input
          ref={node => {
            // this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{width: 188, marginBottom: 8, display: 'block'}}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined/>}
            size="small"
            style={{width: 90}}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>
            Reset
          </Button>
        </Space>
      </div>
    },
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  });


  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      ...getColumnSearchProps('code'),
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Ngày cứu hộ',
      dataIndex: 'date',
      key: 'date',
      ...getColumnSearchProps('date'),
    },
    {
      title: 'Nơi cứu hộ',
      dataIndex: 'save_address',
      key: 'save_address',
      ...getColumnSearchProps('save_address'),
    },
    {
      title: 'Nơi ở hiện tại',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ...getColumnSearchProps('description'),
    },
    {
      title: 'Trạng thai',
      dataIndex: 'status',
      key: 'status',
      ...getColumnSearchProps('status'),
    },
  ];

  return (<div className="home-page">
    <Divider orientation="left">
      <h4 className="text-primary-green left-align padding-left-xs">Danh sách case </h4>
    </Divider>
    <Row justify="space-between" className="filter-row" >
      <Col className="count-case">
        Tổng số case: 550
      </Col>
      <Col>
        <Row gutter={10}>
          <Col>
            <Select defaultValue="Năm" style={{ width: 120 }}>
              <Option value="jack">2020</Option>
            </Select>
          </Col>
          <Col>
            <Select defaultValue="Tháng" style={{ width: 120 }}>
              <Option value="jack">12</Option>
            </Select>
          </Col>
          <Col>
            <Select defaultValue="Ngày" style={{ width: 120 }}>
              <Option value="jack">08</Option>
            </Select>
          </Col>
        </Row>
      </Col>

    </Row>
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  </div>)
}

export default ListCase