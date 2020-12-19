import React       from 'react'
import {Divider}   from 'antd';
import UserTable   from '../../component/Table/UserTable';
import {useParams} from "react-router";
import './style.scss'

const ListUser = () => {
  var {type} = useParams()
  return (<div className="home-page">
    <Divider orientation="left">
      <h4 className="text-primary-green left-align padding-left-xs">
        Danh sách
        {type === '' && ' Toàn bộ thành viên'}
        {type === '1' && ' Điều phối, cứu hộ, y tế, admin'}
        {type === '2' && ' Tình nguyện viên'}
        {type === '3' && ' Foster'}
      </h4>
    </Divider>
    <UserTable type={type}/>
  </div>)
}

export default ListUser