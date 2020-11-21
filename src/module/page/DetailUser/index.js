import React, {useState, useEffect}                                         from 'react'
import './style.scss'
import {Row, Col, Divider, Descriptions, Tag} from 'antd';
import {ROLE_TAG}                from '../../../config'
import "react-image-gallery/styles/scss/image-gallery.scss";

import {useParams} from "react-router";
import UserService from "../../../service/UserService";

const DetailCase = () => {
  const [info, setInfo] = useState({});
  var {id}              = useParams()

  useEffect(() => {
    getDetailInfo()
  }, [])

  const getDetailInfo = async () => {
    let response = await UserService.getUserDetail(id);
    console.log(response)
    setInfo(response.data)
  }

  return (<div className="home-page">
    <Divider orientation="left">
      <h4 className="text-primary-green left-align padding-left-xs">Thông tin thành viên {info.code_full}</h4>
    </Divider>
    <Row justify="space-between" className="detail-case-page">
      <Col offset={5} span={14} className="padding-left-sm">
        <Descriptions
          bordered
          column={1}
        >
          <Descriptions.Item label="Tên">{info.name}</Descriptions.Item>
          <Descriptions.Item label="Email" span={2}>{info.email} </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ" span={2}>{info.address} </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại" span={2}>{info.phone} </Descriptions.Item>
          <Descriptions.Item label="Ghi chú" span={2}>{info.note} </Descriptions.Item>
          <Descriptions.Item label="Chuyên môn" span={2}>
            {
              info.roles && info.roles.map(function (role, key) {
                return <Tag key={key} color={ROLE_TAG[role.id]}>{role.role_description}</Tag>
              })
            }
          </Descriptions.Item>
        </Descriptions>
      </Col>
    </Row>
  </div>)
}

export default DetailCase