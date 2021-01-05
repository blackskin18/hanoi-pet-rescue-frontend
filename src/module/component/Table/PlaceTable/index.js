import React, {useState, useEffect}               from 'react'
import './style.scss'
import {Table, Space, Popconfirm, message, Modal} from 'antd';
import {SearchOutlined}                           from '@ant-design/icons';
import PlaceService                               from "../../../../service/PlaceService";
import {SearchText}                               from '../../../component/SearchInput/index';
import {PLACE_TYPE}                               from "../../../../config";
import {Button, ButtonLink}                       from "../../Button";
import CreateHospital                             from "../../Form/CreateHospital";
import PlaceHistoryTable                          from "../../Table/PlaceHistoryTable";

const ListCaseTable = (props) => {
  const [searchParams, setSearchParam]                = useState({})
  const [currentPage, setCurrentPage]                 = useState(1)
  const [total, setTotal]                             = useState(null)
  const [listPlaces, setListPlaces]                   = useState([])
  const [dataToEdit, setDataToEdit]                   = useState({})
  const [visibleModalEdit, setVisibleModalEdit]       = useState(false);
  const [visibleModalHistory, setVisibleModalHistory] = useState(false);
  const [historyData, setHistoryData] = useState({});

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

  const confirmDelete = async (id) => {
    let response = await PlaceService.deletePlace(id);
    if (response.code === 1) {
      message.success('Xóa thành công');
      getPlaceData()
    } else {
      message.error(response.message ? response.message : 'Xóa thất bại, vui lòng liên hệ kỹ thuật');
    }
  }

  const handleEdit = (hospital) => {
    setDataToEdit(hospital);
    setVisibleModalEdit(true)
  }

  const editPlace = async (data) => {
    return await PlaceService.editPlace(data, dataToEdit.id);
  }

  const afterEdit = () => {
    getPlaceData();
    setVisibleModalEdit(false);
  }

  const columns = [
    {
      title    : 'Tên',
      dataIndex: 'name',
      width: 150,
      key      : 'name',
      ...getColumnSearchProps('director_name'),
    },
    {
      title    : 'Địa chỉ',
      dataIndex: 'address',
      width: 200,
      ellipsis: true,
      key      : 'address',
      textWrap: 'word-break',
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
      title    : 'Tổng case',
      dataIndex: 'animals',
      key      : 'animals',
      render   : (animals) => {
        return <span>{animals.length}</span>
      }
    }
  )
  columns.push(
    {
      title    : 'Ghi chú',
      dataIndex: 'note',
      key      : 'note',
      width: 200,
      render   : (note) => {
        return <span>{note && note.length > 50 ? note.slice(0, 50) + '...' : note}</span>
      },
      ...getColumnSearchProps('note'),
    }
  )
  columns.push(
    {
      title    : 'Hành động',
      dataIndex: 'action',
      key      : 'action',
      className: 'action',
      render   : (value, place) => {
        return <div>
          <ButtonLink className="margin-bottom-5" type="detail" to={"/detail-place/" + place.id}>Chi
            tiết</ButtonLink><br/>
          <Button className="margin-bottom-5" type="edit" onClick={() => handleEdit(place)}>Sửa</Button><br/>
          <Popconfirm
            title="Bạn có muốn chắc xóa địa điểm này không?"
            onConfirm={() => confirmDelete(place.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="delete">Xóa</Button>
          </Popconfirm>
        </div>
      }
    }
  )

  const handleShowPlaceHistory = async (placeRecord) => {
    let response = await PlaceService.getPlaceHistory(placeRecord.id)
    if(response.code == 1) {
      setHistoryData(response.data);
      setVisibleModalHistory(true);
    }

  }

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
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              if(event.target.className =='ant-table-cell') {
                handleShowPlaceHistory(record)
              }
            }, // click row
          };
        }}
      />
    </div>

    <Modal
      title="Sửa địa điểm"
      visible={visibleModalEdit}
      width="90vw"
      okButtonProps={{style: {display: 'none'}}}
      cancelButtonProps={{style: {display: 'none'}}}
      onCancel={() => setVisibleModalEdit(false)}
    >
      <CreateHospital
        dataInsert={dataToEdit}
        submitAction={editPlace}
        afterSubmit={afterEdit}
        type={dataToEdit.type}
        branch={!!dataToEdit.parent_id}
        buttonText="Sửa địa điểm"
      />
    </Modal>

    <Modal
      title="Lịch sử case lưu trú"
      visible={visibleModalHistory}
      width="90vw"
      style={{ top: 20}}
      okButtonProps={{style: {display: 'none'}}}
      cancelButtonProps={{style: {display: 'none'}}}
      onCancel={() => setVisibleModalHistory(false)}
    >
      <PlaceHistoryTable historyData={historyData}/>
    </Modal>

  </div>)
}

export default ListCaseTable