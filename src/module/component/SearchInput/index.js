import React, {useState, useEffect}                                    from 'react'
import './style.scss'
import {Tag, Space, Input, Button, Select, DatePicker} from 'antd';
import {SearchOutlined}                                                from '@ant-design/icons';
import {getStatus}                                                     from '../../../service/StatusService';
import moment from 'moment';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';


export const SearchText = (props) => {
  // useEffect( () => {
  //   props.clearFilters()
  // }, [props.type])

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
      <Button onClick={() => props.handleReset(props.clearFilters, props.dataIndex)} size="small" style={{width: 90}}>
        Reset
      </Button>
    </Space>
  </div>
}

export const SearchPlace = (props) => {
  // useEffect( () => {
  //   props.clearFilters()
  // }, [props.type])

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
      <Button onClick={() => props.handleReset(props.clearFilters, props.dataIndex)} size="small" style={{width: 90}}>
        Reset
      </Button>
    </Space>
  </div>
}

export const SearchDateRange = (props) => {
  // useEffect( () => {
  //   props.clearFilters()
  // }, [props.type])

  return <div style={{padding: 8}}>
    <div>
      <RangePicker
          style={{marginBottom: 8}}
          // defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
          format={dateFormat}
          onPressEnter={() => props.handleSearch(props.selectedKeys, props.confirm, props.dataIndex)}
          value={props.selectedKeys[0]}
          onChange={e => props.setSelectedKeys(e ? [e] : [])}
      />
    </div>
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
      <Button onClick={() => props.handleReset(props.clearFilters, props.dataIndex)} size="small" style={{width: 90}}>
        Reset
      </Button>
    </Space>
  </div>
}

export const SearchStatus = (props) => {
  const [statuses, setStatuses] = useState(null)
  useEffect(() => {
    const getStatusData = async () => {
      let statusData = await getStatus()
      setStatuses(statusData)
    }
    getStatusData()
  }, [])

  useEffect( () => {
    props.clearFilters()
  }, [props.type])

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;

    return (
        <Tag closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
          {label}
        </Tag>
    );
  }

  return <div style={{padding: 8, width: '250px'}}>
    <Select
      mode="multiple"
      showArrow
      tagRender={tagRender}
      className="w-100"
      placeholder="chọn trạng thái"
      value={props.selectedKeys[0]}
      onChange={(e) => props.setSelectedKeys(e ? [e] : [])}
      options={statuses}
      style={{width: '100%'}}
    >
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
      <Button onClick={() => props.handleReset(props.clearFilters, props.dataIndex)} size="small" style={{width: 90}}>
        Reset
      </Button>
    </Space>
  </div>
}