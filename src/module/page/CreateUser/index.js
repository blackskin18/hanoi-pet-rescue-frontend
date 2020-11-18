import React, {useState, useEffect}                    from 'react'
import './style.scss'
import {Row, Col, Divider, Input, Button, Select, Tag} from 'antd';
import UserService                                    from "../../../service/UserService";
import {getRoles}                                      from "../../../service/RoleService";

const {TextArea} = Input;
const {Option}   = Select;

const ListCase = () => {
  const [dataInsert, setDataInsert] = useState({});
  const [roles, setRoles] = useState(null);

  useEffect(() => {
    getAllRole()
  }, [])

  const createUser = async function () {
    await UserService.createUser(dataInsert)
  }

  const editDataInsert = function (key, value) {
    let data = {
      ...dataInsert,
      [key]: value
    }
    setDataInsert(data)
  }

  const getAllRole = async () => {
    let data = await getRoles()
    setRoles(data)
  }

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;

    return (
      <Tag closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
        {label}
      </Tag>
    );
  }

  return (<div className="home-page">
    <Divider orientation="left">
      <h4 className="text-primary-green left-align padding-left-xs">Thêm người dùng</h4>
    </Divider>
    <Row justify="space-between" className="filter-row">
      <Col offset={5} span={14} className="create-case__input-boxs">
        <Row>
          <Col span={4}>
            Tên
          </Col>
          <Col span={20}>
            <Input
              placeholder="Nhập tên người dùng"
              onChange={(e) => editDataInsert('name', e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            Email
          </Col>
          <Col span={20}>
            <Input
              placeholder="Nhập Email"
              onChange={(e) => editDataInsert('email', e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            Địa chỉ
          </Col>
          <Col span={20}>
            <Input
              placeholder="Nhập địa chỉ"
              onChange={(e) => editDataInsert('address', e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            Hotline
          </Col>
          <Col span={20}>
            <Input
              placeholder="Nhập hotline"
              onChange={(e) => editDataInsert('phone', e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            Ghi chú
          </Col>
          <Col span={20}>
            <Input
              placeholder="Nhập ghi chú"
              onChange={(e) => editDataInsert('note', e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            Chuyên môn
          </Col>
          <Col span={20}>
            <Select
              mode="multiple"
              showArrow
              className="w-100"
              tagRender={tagRender}
              placeholder="Chọn chuyên môn của người dùng"
              value={dataInsert.roles}
              onChange={(e) => editDataInsert('roles', e)}
              options={roles}
              style={{width: '100%'}}
            >
            </Select>
          </Col>
        </Row>
      </Col>
    </Row>


    <div className="text-center">
      <Button
        type="primary"
        size="large"
        onClick={createUser}
      >Tạo</Button>
    </div>
  </div>)
}

export default ListCase