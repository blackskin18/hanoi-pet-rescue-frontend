import React, {useState, useEffect}   from 'react'
import {Row, Col, Input, Select, Tag} from 'antd';
import {getRoles}                     from "../../../../service/RoleService";
import {Button}                       from "../../Button";
import './style.scss'

const {TextArea} = Input;

const ListCase = (props) => {
  const [dataInsert, setDataInsert] = useState(props.dataInsert ? props.dataInsert : {});
  const [isSubmit, setIsSubmit]     = useState(false);
  const [errors, setErrors]         = useState(false);
  const [roles, setRoles]           = useState(null);

  useEffect(() => {
    setDataInsert(props.dataInsert)
  }, [props.dataInsert])

  useEffect(() => {
    getAllRole()
  }, [])

  const createUser = async function () {
    setIsSubmit(false)
    let response = await props.submitAction(dataInsert)
    console.log(response)
    if (response && response.code === 1) {
      props.afterSubmit()
    } else {
      setErrors(response.errors)
    }
    setIsSubmit(false)
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
    const {label, value, closable, onClose} = props;

    return (
      <Tag closable={closable} onClose={onClose} style={{marginRight: 3}}>
        {label}
      </Tag>
    );
  }

  return (<div className="home-page">
    <Row justify="space-between" className="filter-row">
      <Col offset={5} span={14} className="create-case__input-boxs">
        <Row>
          <Col span={4}>
            Họ tên
          </Col>
          <Col span={20}>
            <Input
              value={dataInsert.name}
              placeholder="Nhập tên người dùng"
              onChange={(e) => editDataInsert('name', e.target.value)}
            />
            {errors.name && <span className="text-red">{errors.name[0]}</span>}

          </Col>
        </Row>
        <Row>
          <Col span={4}>
            Điện thoại
          </Col>
          <Col span={20}>
            <Input
              value={dataInsert.phone}
              placeholder="Nhập số điện thoại"
              onChange={(e) => editDataInsert('phone', e.target.value)}
            />
            {errors.phone && <span className="text-red">{errors.phone[0]}</span>}

          </Col>
        </Row>

        <Row>
          <Col span={4}>
            Địa chỉ
          </Col>
          <Col span={20}>
            <Input
              value={dataInsert.address}
              placeholder="Nhập địa chỉ"
              onChange={(e) => editDataInsert('address', e.target.value)}
            />
            {errors.address && <span className="text-red">{errors.address[0]}</span>}

          </Col>
        </Row>
        <Row>
          <Col span={4}>
            Email
          </Col>
          <Col span={20}>
            <Input
              value={dataInsert.email}
              placeholder="Nhập Email"
              onChange={(e) => editDataInsert('email', e.target.value)}
            />
            {errors.email && <span className="text-red">{errors.email[0]}</span>}

          </Col>
        </Row>

        <Row>
          <Col span={4}>
            Nhóm chuyên môn
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
            {errors.roles && <span className="text-red">{errors.roles[0]}</span>}

          </Col>
        </Row>
        <Row>
          <Col span={4}>
            Ghi chú
          </Col>
          <Col span={20}>
            <TextArea
              value={dataInsert.note}
              placeholder="Nhập ghi chú"
              onChange={(e) => editDataInsert('note', e.target.value)}
            />
            {errors.note && <span className="text-red">{errors.note[0]}</span>}

          </Col>
        </Row>
      </Col>
    </Row>
    <div className="text-center">
      <Button type="submit"
              size="large"
              disabled={isSubmit}
              onClick={createUser}>
        {props.buttonText}
      </Button>
    </div>
  </div>)
}

export default ListCase