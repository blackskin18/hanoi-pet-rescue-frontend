import React, {useState, useEffect}                                 from 'react'
import './style.scss'
import {Row, Col, Table, Image, Select, Space, Popconfirm, message} from 'antd';
import {SearchOutlined}                                             from '@ant-design/icons';
import CaseService                                                  from "../../../service/CaseService";
import {SearchStatus, SearchText, SearchDateRange, SearchPlace}     from '../../component/SearchInput/index';
import {Link, useHistory}                                           from "react-router-dom";
import {Button, ButtonLink}                                         from '../../component/Button'

const {Option} = Select;

const ListCaseTable = (props) => {
  const [searchParams, setSearchParam] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(20)
  const [total, setTotal] = useState(null)
  const [listCase, setListCase] = useState([])
  const history = useHistory()


  useEffect( () => {
    getCaseData()
  }, [props.type])

  const getCaseData = async (search = {}, page = null, size = null) => {
    if(!page) page = currentPage
    if(!search) search = searchParams
    if(!size) size = limit
    let response = await CaseService.getCases(search, page, size, props.type)
    if(response && response.data) {
      setListCase(response.data.cases)
      setTotal(response.data.total)
    }

    moveToTop()
  }

  const moveToTop = () => {
      let y = document.documentElement.scrollTop
      var int = setInterval(function() {
        window.scrollTo(0, y);
        y -= 50;
        if (y <= 0){
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
    getCaseData({...searchParams,[dataIndex]: selectedKeys[0]}, 1)
  }

  const handleReset = (clearFilters, dataIndex) => {
    clearFilters()
    delete searchParams[dataIndex]
    setSearchParam({
      ...searchParams
    })
    getCaseData({...searchParams}, 1)
  }

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => {
      let searchComponent = null;
      switch (dataIndex) {
        case 'status':
          return <SearchStatus
            setSelectedKeys={setSelectedKeys}
            selectedKeys={selectedKeys}
            confirm={confirm}
            clearFilters={clearFilters}
            type={props.type}
            dataIndex={dataIndex}
            handleSearch={handleSearch}
            handleReset={handleReset}/>
        case 'place':
          return <SearchPlace
            setSelectedKeys={setSelectedKeys}
            selectedKeys={selectedKeys}
            confirm={confirm}
            clearFilters={clearFilters}
            dataIndex={dataIndex}
            handleSearch={handleSearch}
            handleReset={handleReset}
          />;
        case 'receive_date':
          return <SearchDateRange
            setSelectedKeys={setSelectedKeys}
            selectedKeys={selectedKeys}
            confirm={confirm}
            clearFilters={clearFilters}
            dataIndex={dataIndex}
            handleSearch={handleSearch}
            handleReset={handleReset}/>;
        default:
          return <SearchText
            setSelectedKeys={setSelectedKeys}
            selectedKeys={selectedKeys}
            confirm={confirm}
            clearFilters={clearFilters}
            dataIndex={dataIndex}
            handleSearch={handleSearch}
            handleReset={handleReset}/>;
      }
    },
    filterIcon    : filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
  });


  const columns = [
    {
      title    : 'Code',
      dataIndex: 'code',
      key      : 'code',
      ...getColumnSearchProps('code'),
    },
    {
      title    : 'Ảnh',
      dataIndex: 'animalImage',
      key      : 'animalImage',
      render   : (images) => {
        if (images[0]) {
          return <Image src={images[0].path} width={100} height={100} className="animal-image"/>
        } else {
          return ""
        }
      }
    },
    {
      title    : 'Tên',
      dataIndex: 'name',
      key      : 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title    : 'Ngày cứu hộ',
      dataIndex: 'receive_date',
      key      : 'receive_date',
      ...getColumnSearchProps('receive_date'),
    },
    {
      title    : 'Nơi cứu hộ',
      dataIndex: 'receive_place',
      key      : 'receive_place',
      ...getColumnSearchProps('receive_place'),
    },
    {
      title    : 'Nơi ở hiện tại',
      dataIndex: 'place',
      key      : 'place',
      ...getColumnSearchProps('place'),
    },
    {
      title    : 'Mô tả',
      dataIndex: 'description',
      key      : 'description',
      render   : (description) => {
        return <span>{description && description.length > 50 ? description.slice(0, 50) + '...' : description}</span>
      },
      ...getColumnSearchProps('description'),
    },
    {
      title    : 'Trạng thai',
      dataIndex: 'status',
      key      : 'status',
      render   : (statusObj) => {
        return <span>{statusObj.name}</span>
      },
      ...getColumnSearchProps('status'),
    },
    {
      title    : 'Hành động',
      dataIndex: 'action',
      key      : 'action',
      render   : (text, object) => {
        return <div>
          <ButtonLink className="margin-bottom-5" type="detail" to={"/detail-case/" + object.id}>Chi tiết</ButtonLink><br/>
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
    }
  ];

  const confirmDelete = async (id) => {
    let response = await CaseService.deleteCase(id);
    if(response.code === 1) {
      message.success('Xóa thành công');
      getCaseData()
    } else {
      message.error(response.message);
    }
  }

  return (<div>
    <Row justify="space-between" className="filter-row">
      <Col className="count-case">
        Tổng số case: { total }
      </Col>
    </Row>
    <div className="list-case-table">
      <Table
        columns={columns}
        dataSource={listCase}
        pagination={{
          total: total, defaultCurrent: 1,defaultPageSize:20, showSizeChanger: true, showQuickJumper: true, pageSize: limit,
          onShowSizeChange: (e, pageSize) => setLimit(pageSize),
          onChange: (page, size) => {
            getCaseData(null, page, size)
            setCurrentPage(page)
          }
        }}
      />
    </div>
  </div>)
}

export default ListCaseTable