import React, {useState, useEffect} from 'react'
import './style.scss'
import {Table, Space, Tag}          from 'antd';
import {SearchOutlined}             from '@ant-design/icons';
import UserService                  from "../../../service/UserService";
import {SearchText}                 from '../../component/SearchInput/index';
import {Link}                       from "react-router-dom";

const ROLE_TAG = ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"]

const ListCaseTable = (props) => {
  const [searchParams, setSearchParam] = useState({})
  const [currentPage, setCurrentPage]  = useState(1)
  const [total, setTotal]              = useState(null)
  const [listUsers, setListUsers]      = useState([])

  useEffect(() => {
    getPlaceData()
    console.log(props.type)
  }, [props.type])

  const getPlaceData = async (search = {}, page = null) => {
    if (!page) page = currentPage
    if (!search) search = searchParams
    let response = await UserService.getUsers(search, page, props.type)
    setListUsers(response.data.users)
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
      title    : 'Điện thoại',
      dataIndex: 'phone',
      key      : 'phone',
      ...getColumnSearchProps('phone'),
    },
    {
      title    : 'Địa chỉ',
      dataIndex: 'address',
      key      : 'address',
      ...getColumnSearchProps('address'),
    },
    {
      title    : 'Chuyên môn',
      dataIndex: 'role',
      key      : 'role',
      render   : (text, object) => {
        let roles = object.roles
        return roles.map(function (role, key) {
          return <Tag key={key} color={ROLE_TAG[role.id]}>{role.role_description}</Tag>
        })
      }
    },
    {
      title    : 'Hành động',
      dataIndex: 'action',
      key      : 'action',
      render   : () => {
        return <Space size="middle">
          <Link to="">Chi tiết</Link>
          <Link to="">Sửa</Link>
          <Link to="">Xóa</Link>
        </Space>
      }
    }
  ];


  return (<div>
    <div className="list-case-table">
      <Table
        columns={columns}
        dataSource={listUsers}
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