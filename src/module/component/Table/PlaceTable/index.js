import React, {useState, useEffect} from 'react'
import './style.scss'
import {Table, Space}               from 'antd';
import {SearchOutlined}             from '@ant-design/icons';
import PlaceService                 from "../../../../service/PlaceService";
import {SearchText}                 from '../../../component/SearchInput/index';
import {Link, useHistory}           from "react-router-dom";
import {PLACE_TYPE}                 from "../../../../config";

const ListCaseTable = (props) => {
  const [searchParams, setSearchParam] = useState({})
  const [currentPage, setCurrentPage]  = useState(1)
  const [total, setTotal]              = useState(null)
  const [listPlaces, setListPlaces]    = useState([])

  useEffect(() => {
    getPlaceData()
  }, [props.type])

  const getPlaceData = async (search = {}, page = null) => {
    if (!page) page = currentPage
    if (!search) search = searchParams
    let response = await PlaceService.getPlaces(search, page, props.type)
    setListPlaces(response.data.places)
    setTotal(response.data.total)
    moveToTop()
  }

  const moveToTop = () => {
    let y   = document.documentElement.scrollTop
    var int = setInterval(function () {
      window.scrollTo(0, y);
      y -= 50;
      if (y <= 0) {
        window.scrollTo(0, 0);
        clearInterval(int);
      }
    }, 10);
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchParam({
      ...searchParams,
      [dataIndex]: selectedKeys[0]
    })
    getPlaceData({...searchParams, [dataIndex]: selectedKeys[0]}, 1)
  }

  const handleReset = (clearFilters, dataIndex) => {
    clearFilters()
    delete searchParams[dataIndex]
    setSearchParam({
      ...searchParams
    })
    getPlaceData({...searchParams}, 1)
  }

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => <SearchText
      setSelectedKeys={setSelectedKeys}
      selectedKeys={selectedKeys}
      confirm={confirm}
      clearFilters={clearFilters}
      dataIndex={dataIndex}
      handleSearch={handleSearch}
      handleReset={handleReset}/>,
    filterIcon    : filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
  });

  const columns = [
    {
      title    : 'Tên',
      dataIndex: 'name',
      key      : 'name',
      ...getColumnSearchProps('director_name'),
    },
    {
      title    : 'Địa chỉ',
      dataIndex: 'address',
      key      : 'address',
      ...getColumnSearchProps('address'),
    },
    {
      title    : 'Hotline',
      dataIndex: 'phone',
      key      : 'phone',
      ...getColumnSearchProps('phone'),
    },
  ];


  if (PLACE_TYPE.COMMON_HOME == props.type) {
    columns.push(
      {
        title    : 'Người phụ trách',
        dataIndex: 'director_name',
        key      : 'director_name',
        ...getColumnSearchProps('director_name'),
      }
    )
  }



  columns.push(
    {
      title: 'Số case đang tạm trú',
      dataIndex: 'animals',
      key: 'animals',
      render: (animals) => {
        return <span>{animals.length}</span>
      }
    }
  )
  columns.push(
    {
      title    : 'Ghi chú',
      dataIndex: 'note',
      key      : 'note',
      ...getColumnSearchProps('note'),
    }
  )
  columns.push(
    {
      title    : 'Hành động',
      dataIndex: 'action',
      key      : 'action',
      render   : () => {
        return <Space size="middle">
          <Link to="">Sửa</Link>
          <Link to="">Xóa</Link>
        </Space>
      }
    }
  )


  return (<div>
    <div className="list-case-table">
      <Table
        columns={columns}
        dataSource={listPlaces}
        pagination={{
          total   : total, defaultCurrent: 1, defaultPageSize: 20, showQuickJumper: true, showSizeChanger: false,
          onChange: (page, size) => {
            getPlaceData(null, page, size)
            setCurrentPage(page)
          }
        }}
      />
    </div>
  </div>)
}

export default ListCaseTable