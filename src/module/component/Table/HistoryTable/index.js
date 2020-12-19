import React, {useState, useEffect} from 'react'
import './style.scss'
import {Image, Table}               from 'antd';
import {Link}                       from "react-router-dom";


const HistoryTable = (props) => {
  const columns = [
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
        return <Link to={"/detail-user/" + value.id}>{value.name}</Link>
      }
    },
    {
      title    : 'Ghi chú',
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
           return <Link to={"/detail-place/" + value.id}> {value.name}</Link>
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
          return <Link to={"/detail-place/" + value.id}> {value.name}</Link>
        }
      }
    },
  ];


  return (<div>
      <Table
        columns={columns}
        dataSource={props.histories}
        pagination={false}
        bordered
      />
    </div>
   )
}

export default HistoryTable