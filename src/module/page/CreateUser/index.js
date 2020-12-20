import React, {useState}  from 'react'
import {Divider, message} from 'antd';
import UserService        from "../../../service/UserService";
import CreateUser         from "../../component/Form/CreateUser";
import './style.scss'


const ListCase = () => {
  const [dataInsert, setDataInsert] = useState({})
  const createUser                  = async function (data) {
    return await UserService.createUser(data)
  }

  const afterEdit = () => {
    setDataInsert({})
    message.success('Tạo thành công');
  }

  return (<div className="home-page">
    <Divider>
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