import React, { useState, useEffect }      from 'react'
import './style.scss'
import {Table, Space, Popconfirm, message} from 'antd';
import { SearchOutlined }                  from '@ant-design/icons';
import PlaceService                        from "../../../service/PlaceService";
import { SearchText }                      from '../../component/SearchInput/index';
import {Link , useHistory}                 from "react-router-dom";
import {Button, ButtonLink}                from "../Button";
import UserService                         from "../../../service/UserService";

const ListCaseTable = (props) => {
  const [checkStrictly, setCheckStrictly] = useState(false);

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

  const confirmDelete = async (id) => {
    let response = await PlaceService.deletePlace(id);
    if(response.code === 1) {
      message.success('Xóa thành công');
      getHospitalData()
    } else {
      message.error(response.message ? response.message : 'Xóa thất bại, vui lòng liên hệ kỹ thuật');
    }
  }

  const columns = [
    {
      title: 'Phòng khám',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      render: (text, object) => {
        if(object.parent_id) {
          return <span></span>
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
        if(object.parent_id) {
          return <span>{object.name}</span>
        }
      }
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
    },
    {
      title: 'Hotline',
      dataIndex: 'phone',
      key: 'phone',
      ...getColumnSearchProps('phone'),
    },
    {
      title: 'Người phụ trách',
      dataIndex: 'director_name',
      key: 'director_name',
      ...getColumnSearchProps('director_name'),
    },
    {
      title: 'Số case đang tạm trú',
      dataIndex: 'animals',
      key: 'animals',
      render: (animals) => {
        return <span>{animals.length}</span>
      }
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      ...getColumnSearchProps('note'),
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render   : (text, object) => {
        return <div>
          <ButtonLink className="margin-bottom-5" type="detail" to={"/detail-place/" + object.id}>Chi tiết</ButtonLink><br/>
          <Button className="margin-bottom-5" type="edit" onClick={() => console.log('khanh')}>Sửa</Button><br/>
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
    },
  ];

  return (<div>
    <div className="list-hospital-table">
      <Table
        columns={columns}
        dataSource={listHospitals}
        // rowSelection={{checkStrictly }}
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