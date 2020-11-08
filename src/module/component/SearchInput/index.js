import React, {useState, useEffect}                                    from 'react'
import './style.scss'
import {Row, Col, Divider, Table, Image, Space, Input, Button, Select} from 'antd';
import {SearchOutlined}                                                from '@ant-design/icons';
import {getStatus}                                                     from '../../../service/StatusService';

const {Option} = Select;

export const SearchText = (props) => {
  return <div style={{padding: 8}}>
    <Input
      ref={node => {
        // this.searchInput = node;
      }}
      placeholder={`Search ${props.dataIndex}`}
      value={props.selectedKeys[0]}
      onChange={e => props.setSelectedKeys(e.target.value ? [e.target.value] : [])}
      onPressEnter={() => props.handleSearch(props.selectedKeys, props.confirm, props.dataIndex)}
      style={{width: 188, marginBottom: 8, display: 'block'}}
    />
    <Space>
      <Button
        type="primary"
        onClick={() => props.handleSearch(props.selectedKeys, props.confirm, props.dataIndex)}
        icon={<SearchOutlined/>}
        size="small"
        style={{width: 90}}
      >
        Search
      </Button>
      <Button onClick={() => props.handleReset(props.clearFilters)} size="small" style={{width: 90}}>
        Reset
      </Button>
    </Space>
  </div>
}

export const SearchPlace = (props) => {
  return <div style={{padding: 8}}>
    <Input
      ref={node => {
        // this.searchInput = node;
      }}
      placeholder={`Search ${props.dataIndex}`}
      value={props.selectedKeys[0]}
      onChange={e => props.setSelectedKeys(e.target.value ? [e.target.value] : [])}
      onPressEnter={() => props.handleSearch(props.selectedKeys, props.confirm, props.dataIndex)}
      style={{width: 188, marginBottom: 8, display: 'block'}}
    />
    <Space>
      <Button
        type="primary"
        onClick={() => props.handleSearch(props.selectedKeys, props.confirm, props.dataIndex)}
        icon={<SearchOutlined/>}
        size="small"
        style={{width: 90}}
      >
        Search
      </Button>
      <Button onClick={() => props.handleReset(props.clearFilters)} size="small" style={{width: 90}}>
        Reset
      </Button>
    </Space>
  </div>
}

export const SearchDateRange = (props) => {
  return <div style={{padding: 8}}>
    <Input
      ref={node => {
        // this.searchInput = node;
      }}
      placeholder={`Search ${props.dataIndex}`}
      value={props.selectedKeys[0]}
      onChange={e => props.setSelectedKeys(e.target.value ? [e.target.value] : [])}
      onPressEnter={() => props.handleSearch(props.selectedKeys, props.confirm, props.dataIndex)}
      style={{width: 188, marginBottom: 8, display: 'block'}}
    />
    <Space>
      <Button
        type="primary"
        onClick={() => props.handleSearch(props.selectedKeys, props.confirm, props.dataIndex)}
        icon={<SearchOutlined/>}
        size="small"
        style={{width: 90}}
      >
        Search
      </Button>
      <Button onClick={() => props.handleReset(props.clearFilters)} size="small" style={{width: 90}}>
        Reset
      </Button>
    </Space>
  </div>
}

export const SearchStatus = (props) => {
  const [statuses, setStatuses] = useState(null)
  useEffect(() => {
    const getStatusData = async () => {
      let response = await getStatus()
      setStatuses(response.data)
    }
    getStatusData()
  }, [])

  return <div style={{padding: 8}}>
    <Select
      className="w-100"
      placeholder="chọn trạng thái"
      value={props.selectedKeys[0]}
      onChange={(e) => props.setSelectedKeys(e ? [e] : [])}
    >
      {statuses ? statuses.map((element) => {
        return <Option value={element.id} key={element.id}>{element.name}</Option>
      }) : ''}
    </Select>
    <Space>
      <Button
        type="primary"
        onClick={() => props.handleSearch(props.selectedKeys, props.confirm, props.dataIndex)}
        icon={<SearchOutlined/>}
        size="small"
        style={{width: 90}}
      >
        Search
      </Button>
      <Button onClick={() => props.handleReset(props.clearFilters)} size="small" style={{width: 90}}>
        Reset
      </Button>
    </Space>
  </div>
}