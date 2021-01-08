import React, { useEffect, useState }                         from 'react'
import { Divider, Image, message, Table, DatePicker, Button } from 'antd';
import UserTable                                              from '../../component/Table/UserTable';
import {useParams}        from "react-router";
import './style.scss'
import { Link }           from "react-router-dom";
import HistoryService                  from "../../../service/HistoryService";
import moment from 'moment';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

const AllHistoryTable = () => {
  const [histories, setHistories] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(null)

  useEffect(() => {
    getHistories()
  }, [])

  const getHistories = async (page = 1) => {
    let response = await HistoryService.getHistories(startDate, endDate, page)
    if(response.code == 1) {
      setHistories(response.data.histories)
      setTotal(response.data.total)
    } else {
      message.error('Có lỗi không lấy được lịch sử cập nhập (vui lòng liên hệ kỹ thuật)');
    }
  }

  const onChangeDateHandle = (value, string) => {
    if(!value) {
      setStartDate('')
      setEndDate('')
    } else if(value[0] && value[0] && value[1]) {
      setStartDate(value[0].format(dateFormat))
      setEndDate(value[1].format(dateFormat))
    }
  }

  const searchHandle = () => {
      getHistories()
  }

  const columns = [
    {
      title    : 'Case',
      dataIndex: 'animal',
      key      : 'animal',
      render: (animal) => {
        if(animal) {
          return <Link className="link-orange" to={"/detail-case/" + animal.code}>{animal.code_full}</Link>
        } else {
          return <span className="text-danger">Case này đã bị xóa</span>
        }
      }
    },
    {
      title    : 'Ngày thay đổi',
      dataIndex: 'created_at',
      key      : 'created_at',
      render: (value) => {
        let date = new Date(value);
        return <span>{date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()}</span>
      }
    },
    {
      title    : 'Người thay đổi',
      dataIndex: 'user',
      key      : 'user',
      render: (value, history) => {
        return <Link className="link-orange" to={"/detail-user/" + value.id}>{value.name}</Link>
      }
    },
    {
      title    : 'Đề mục thay đổi',
      dataIndex: 'note',
      key      : 'note',
    },
    {
      title    : 'Trước khi thay Đổi',
      dataIndex: 'old_value',
      key      : 'old_value',
      render: (value, history) => {
        if(history.attribute === 'image' && value) {
          return <Image src={value} width={100} height={100} className="animal-image"/>
        }
        if(typeof value !== "object" || !value) {
          return <span>{value}</span>
        }
        if(history.attribute === 'place_id' || history.attribute === 'foster_id' || history.attribute === 'owner_id') {
          return <Link className="link-orange" to={"/detail-place/" + value.id}> {value.name}</Link>
        }
      }
    },
    {
      title    : 'Sau khi thay đổi',
      dataIndex: 'new_value',
      key      : 'new_value',
      render: (value, history) => {
        if(history.attribute === 'image' && value) {
          return <Image src={value} width={100} height={100} className="animal-image"/>
        }
        if(typeof value !== "object" || !value) {
          return <span>{value}</span>
        }
        if(history.attribute === 'place_id' || history.attribute === 'foster_id' || history.attribute === 'owner_id') {
          return <Link className="link-orange" to={"/detail-place/" + value.id}> {value.name}</Link>
        }
      }
    },
  ];


  return (<div className="home-page">
    <Divider>
      <h4 className="text-primary-green left-align padding-left-xs">
        Lịch sử cập nhật case
      </h4>
    </Divider>
    <div className="margin-bottom-sm padding-left-sm">
      <span className="margin-right-xs"> Tìm kiếm theo ngày </span>
      <RangePicker
        // defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
        format="DD/MM/YYYY"
        onChange={onChangeDateHandle}
      />
      <Button onClick={searchHandle} className="margin-left-xs">Tìm kiếm</Button>
    </div>
    <Table
      columns={columns}
      dataSource={histories}
      bordered
      pagination={{
        total: total, defaultCurrent: 1, showQuickJumper: true, pageSize: 20,
        onChange: (page, size) => {
          getHistories(page)
          setCurrentPage(page)
        }
      }}
    />
  </div>)
}

export default AllHistoryTable