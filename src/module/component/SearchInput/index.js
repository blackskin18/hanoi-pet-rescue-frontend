import React, {useState, useEffect}                    from 'react'
import './style.scss'
import {Col, Row, Tag, Space, Input, Button, Select, DatePicker} from 'antd';
import {SearchOutlined}                                from '@ant-design/icons';
import {getStatus}                                     from '../../../service/StatusService';
import PlaceService                                    from "../../../service/PlaceService";
import {PLACE_TYPE_TEXT}                               from "../../../config";

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const {Option}   = Select;


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
        Tìm kiếm
      </Button>
      <Button onClick={() => props.handleReset(props.clearFilters, props.dataIndex)} size="small" style={{width: 90}}>
        Reset
      </Button>
    </Space>
  </div>
}

export const SearchPlace = (props) => {
  const [placeType, setPlaceType] = useState('')
  const [places, setPlaces] = useState('')
  const [placeId, setPlaceId] = useState('')
  const [children, setChildren] = useState('')
  useEffect( () => {
    getPlaces()
  }, [placeType])

  useEffect(() => {
    getPlaceDetail()
  }, [placeId])

  const getPlaceDetail = async () => {
    let response = await PlaceService.getPlaceDetail(placeId)
    console.log(response)
    if(response.data && response.data.children) {
      setChildren(response.data.children)
    }
  }

  const getPlaces = async () => {
    let response = await PlaceService.getPlaces({}, '', placeType, true)
    setPlaces(response.data.places)
  }

  return <div style={{padding: 8, width: '500px'}}>
    <Row>
      <Col span={8}>
        Chọn nơi ở hiện tại
      </Col>
      <Col span={16}>
        <Select className="w-100"
                showSearch
                placeholder="Chọn nơi ở hiện tại"
                value={placeType}
                onChange={(e) => setPlaceType(e)} style={{width: "100%"}}>
          <Option value="" key="0" disabled>Chọn nơi ở hiện tại</Option>
          <Option value={1} key="1">Phòng Phám</Option>
          <Option value={2} key="2">Nhà chung</Option>
          <Option value={3} key="3">Nhà Foster</Option>
          <Option value={4} key="4">Nhà Chủ nuôi mới</Option>
        </Select>
      </Col>
    </Row>
    {
      placeType &&
      <Row>
        <Col span={8}>
          Chọn {placeType && PLACE_TYPE_TEXT[placeType]}
        </Col>
        <Col span={16}>
          <Select className="w-100"
                  showSearch
                  placeholder={'Chọn ' + PLACE_TYPE_TEXT[placeType]}
                  filterOption={(input, option) =>
                    option.children && option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={(e) => {
                    setPlaceId(e)
                    props.setSelectedKeys(e ? [e] : '')
                  }}
                  style={{width: "100%"}}>
            {
              places && places.map(function (place, key) {
                return <Option value={place.id} key={key}>{place.name}</Option>
              })
            }
          </Select>
        </Col>
      </Row>
    }

    {
      children && children.length > 0 &&
      <Row>
        <Col span={8}>
          Chọn {placeType && PLACE_TYPE_TEXT[placeType]}
        </Col>
        <Col span={16}>
          <Select className="w-100"
                  showSearch
                  placeholder={'Chọn chi nhánh'}
                  filterOption={(input, option) =>
                    option.children && option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={(e) => {
                    console.log(e)
                    props.setSelectedKeys(e ? [e] : '')
                  }}
                  style={{width: "100%"}}>
            {
              children && children.map(function (place, key) {
                return <Option value={place.id} key={key}>{place.name}</Option>
              })
            }
          </Select>
        </Col>
      </Row>
    }

    {/*<Input*/}
    {/*  ref={node => {*/}
    {/*    // this.searchInput = node;*/}
    {/*  }}*/}
    {/*  placeholder={`Search ${props.dataIndex}`}*/}
    {/*  value={props.selectedKeys[0]}*/}
    {/*  onChange={e => props.setSelectedKeys(e.target.value ? [e.target.value] : [])}*/}
    {/*  onPressEnter={() => props.handleSearch(props.selectedKeys, props.confirm, props.dataIndex)}*/}
    {/*  style={{width: 188, marginBottom: 8, display: 'block'}}*/}
    {/*/>*/}
    <Space>
      <Button
        type="primary"
        onClick={() => props.handleSearch(props.selectedKeys, props.confirm, props.dataIndex)}
        icon={<SearchOutlined/>}
        size="small"
        style={{width: 90}}
      >
        Tìm kiếm
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
        Tìm kiếm
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
        Tìm kiếm
      </Button>
      <Button onClick={() => props.handleReset(props.clearFilters, props.dataIndex)} size="small" style={{width: 90}}>
        Reset
      </Button>
    </Space>
  </div>
}