import React, {useState, useEffect}             from 'react'
import './style.scss'
import {Table, message, Tag, Popconfirm, Modal} from 'antd';
import {SearchOutlined}                         from '@ant-design/icons';
import UserService                              from "../../../../service/UserService";
import {SearchText}                             from '../../../component/SearchInput/index';
import {ROLE_TAG}                               from '../../../../config'
import {Button, ButtonLink}                     from "../../Button";
import CreateUser                               from "../../Form/CreateUser";

const ListCaseTable = (props) => {
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [dataToEdit, setDataToEdit] = useState({});

  const [searchParams, setSearchParam] = useState({})
  const [currentPage, setCurrentPage]  = useState(1)
  const [total, setTotal]              = useState(null)
  const [listUsers, setListUsers]      = useState([])

  useEffect(() => {
    getUserData()
  }, [props.type])

  const getUserData = async (search = {}, page = null) => {
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
    getUserData({...searchParams, [dataIndex]: selectedKeys[0]}, 1)
  }

  const handleReset = (clearFilters, dataIndex) => {
    clearFilters()
    delete searchParams[dataIndex]
    setSearchParam({
      ...searchParams
    })
    getUserData({...searchParams}, 1)
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

  const confirmDelete = async (id) => {
    let response = await UserService.deleteUser(id);
    if(response.code === 1) {
      message.success('Xóa thành công');
      getUserData()
    } else {
      message.error(response.message);
    }
  }

  const editUser = async (data) => {
    return await UserService.editUser(data, dataToEdit.id);
  }

  const afterEdit = () => {
    getUserData();
    setVisibleModalEdit(false);
    message.success('Sửa thành công');
  }

  const handleEdit = (user) => {
    let userRoles = user.roles.map(function (role) {
      return role.id
    })
    setDataToEdit({
      ...user,
      roles: userRoles
    })

    setVisibleModalEdit(true)
  }

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
      render   : (text, object) => {
        return <div>
          <ButtonLink className="margin-bottom-5" type="detail" to={"/detail-user/" + object.id}>Chi tiết</ButtonLink><br/>
          <Button className="margin-bottom-5" type="edit" onClick={() => handleEdit(object)}>Sửa</Button><br/>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => confirmDelete(object.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="delete">Xóa</Button>
          </Popconfirm>
        </div>
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
            getUserData(null, page, size)
            setCurrentPage(page)
          }
        }}
      />
    </div>
    <Modal
      title="Sửa thông tin người dùng"
      visible={visibleModalEdit}
      width="90vw"
      okButtonProps={{style: {display: 'none'}}}
      cancelButtonProps={{style: {display: 'none'}}}
      onCancel={() => setVisibleModalEdit(false)}
    >
      <CreateUser
        dataInsert={dataToEdit}
        submitAction={editUser}
        afterSubmit={afterEdit}
        buttonText="Sửa người dùng"
      />
    </Modal>
  </div>)
}

export default ListCaseTable