import React, { useState, useEffect } from 'react'
import './style.scss'
import { Table, Space}                      from 'antd';
import { SearchOutlined }             from '@ant-design/icons';
import PlaceService                   from "../../../service/PlaceService";
import { SearchText }                 from '../../component/SearchInput/index';
import {Link , useHistory} from "react-router-dom";

const ListCaseTable = (props) => {
  const [searchParams, setSearchParam] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(null)
  const [listHospitals, setListHospitals] = useState([])

  useEffect(() => {
    getHospitalData()
  }, [props.type])

  const getHospitalData = async (search = {}, page = null) => {
    if (!page) page = currentPage
    if (!search) search = searchParams
    let response = await PlaceService.getPlaces(search, page, 1)
    setListHospitals(response.data.places)
    setTotal(response.data.total)
    moveToTop()
  }

  const moveToTop = () => {
    let y = document.documentElement.scrollTop
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
    getHospitalData({...searchParams, [dataIndex]: selectedKeys[0]}, 1)
  }

  const handleReset = (clearFilters, dataIndex) => {
    clearFilters()
    delete searchParams[dataIndex]
    setSearchParam({
      ...searchParams
    })
    getHospitalData({...searchParams}, 1)
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
    filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
  });


  const columns = [
    {
      title: 'Phòng khám',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      render: (text, object) => {
        if(object.parent) {
          return <span>{object.parent.name}</span>
        } else {
          return <span>{object.name}</span>
        }
      }
    },
    {
      title: 'Chi nhánh',
      dataIndex: 'branch',
      key: 'branch',
      render: (text, object) => {
        if(object.parent) {
          return <span>{object.name}</span>
        }
      }
    },
    {
      title: 'Tên người quản lý',
      dataIndex: 'director_name',
      key: 'director_name',
      ...getColumnSearchProps('director_name'),
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      ...getColumnSearchProps('phone'),
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: () => {
        return <Space size="middle">
          <Link to="">Chi tiết</Link>
          <Link to="">Sửa</Link>
          <Link to="">Xóa</Link>
        </Space>
      }
    },
  ];

  return (<div>
    <div className="list-case-table">
      <Table
        columns={columns}
        dataSource={listHospitals}
        pagination={{
          total: total, defaultCurrent: 1, defaultPageSize: 20, showQuickJumper: true, showSizeChanger: false,
          onChange: (page, size) => {
            getHospitalData(null, page, size)
            setCurrentPage(page)
          }
        }}
      />
    </div>
  </div>)
}

export default ListCaseTable