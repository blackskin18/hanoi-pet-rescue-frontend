import React, {useState, useEffect}                             from 'react'
import './style.scss'
import {Row, Col, Divider, Input, Button, Select, Tag, message} from 'antd';
import UserService                                              from "../../../service/UserService";
import CreateUser                                               from "../../component/Form/CreateUser";
import CreateHospital                                           from "../../component/Form/CreateHospital";


const ListCase = () => {
  const [dataInsert, setDataInsert] = useState({})
  const createUser = async function (data) {
    return await UserService.createUser(data)
  }

  const afterEdit = () => {
    setDataInsert({})
    message.success('Sửa thành công');
  }

  return (<div className="home-page">
    <Divider orientation="left">
      <h4 className="text-primary-green left-align padding-left-xs">Thêm người dùng</h4>
    </Divider>
    <CreateUser
      dataInsert={dataInsert}
      submitAction={createUser}
      afterSubmit={afterEdit}
      buttonText="Tạo người dùng"
    />
  </div>)
}

export default ListCase