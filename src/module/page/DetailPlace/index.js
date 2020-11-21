import React, {useState, useEffect}                   from 'react'
import './style.scss'
import {Row, Col, Divider, Descriptions}              from 'antd';
import PlaceService                                   from '../../../service/PlaceService';
import {PLACE_TYPE_TEXT, CASE_TYPE_TEXT, GENDER_TEXT} from "../../../config";
import {Link, useHistory}                             from "react-router-dom";

import {format_date, detect_age} from '../../../utils/helper'


import {useParams} from "react-router";


const DetailCase = () => {
  const [info, setInfo] = useState({});
  var {id}              = useParams()

  useEffect(() => {
    getDetailInfo()
  }, [])

  const getDetailInfo = async () => {
    let response = await PlaceService.getPlaceDetail(id);
    setInfo(response.data)
  }

  return (<div className="home-page">
    <Divider orientation="left">
      <h4 className="text-primary-green left-align padding-left-xs">Thông tin {info.type && PLACE_TYPE_TEXT[info.type]}</h4>
    </Divider>
    <Row justify="space-between" className="detail-case-page">
      <Col span={14} className="padding-left-sm">
        <Descriptions
          bordered
          column={2}
        >
          <Descriptions.Item span={2} label={"Tên " + (PLACE_TYPE_TEXT[info.type] ? PLACE_TYPE_TEXT[info.type] : '')}>{info.name}</Descriptions.Item>
          {
            info.children && info.children.length > 0 &&
            <Descriptions.Item span={2} label={"Danh sách chi nhánh"}>
              {
                info.children.map(function (child, key) {
                  return <p><Link to={"detail-place/" + child.id} key={key}>{child.name}</Link></p>
                })
              }
            </Descriptions.Item>
          }
          {
            info.parent &&
            <Descriptions.Item span={2} label={"Là chi nhánh của"}>
              <Link to={"detail-place/" + info.parent.id}>{info.parent.name}</Link>
            </Descriptions.Item>
          }
          <Descriptions.Item span={2} label="Địa chỉ">{info.address}</Descriptions.Item>
          <Descriptions.Item span={2} label="Hotline">{info.phone}</Descriptions.Item>
          <Descriptions.Item label="Người phụ trách">
            {info.director_name && <p>Tên: {info.director_name}</p>}
            {info.director_phone && <p>Số điện thoại: {info.director_phone}</p>}
          </Descriptions.Item>
        </Descriptions>
      </Col>
    </Row>

  </div>)
}

export default DetailCase