import React, {useState, useEffect}                   from 'react'
import './style.scss'
import {Row, Col, Divider, Descriptions, Popconfirm}  from 'antd';
import CaseService                                    from '../../../service/CaseService';
import {PLACE_TYPE_TEXT, CASE_TYPE_TEXT, GENDER_TEXT} from "../../../config";
import {Link, useHistory}                             from "react-router-dom";
import {format_date, detect_age}                      from '../../../utils/helper'
import "react-image-gallery/styles/scss/image-gallery.scss";
import ImageGallery                                   from 'react-image-gallery';
import {useParams}                                    from "react-router";

const DetailCase = () => {
  const [info, setInfo]     = useState({});
  const [images, setImages] = useState([]);
  const history             = useHistory()
  var {id}                  = useParams()

  useEffect(() => {
    getDetailInfo()
  }, [])

  const getDetailInfo = async () => {
    let response   = await CaseService.getCaseDetail(id);
    let imagesData = response.data.animal_image.map(function (image) {
      return {original: image.path, thumbnail: image.path}
    })
    setImages(imagesData)
    setInfo(response.data)
  }

  const confirmDelete = async () => {
    let response = await CaseService.deleteCase(id);
    if (response.code === 1) {
      history.push('/list-case')
    }
  }


  return (<div className="detail-case-page">
    <Divider orientation="left" className="">
      <h4 className="text-primary-green left-align padding-left-xs margin-bottom-none">Thông tin
        case {info.code_full}</h4>
    </Divider>
    <Row className="margin-bottom-5">
      <a className="button-link button-link-edit">Sửa</a>
      <Popconfirm
        title="Are you sure to delete this task?"
        onConfirm={confirmDelete}
        okText="Yes"
        cancelText="No"
      >
        <a className="button-link button-link-delete">Xóa</a>
      </Popconfirm>
    </Row>
    <Row justify="space-between">
      {images.length > 0 &&
      <Col span={10}>
        <ImageGallery items={images} autoPlay={false} showPlayButton={false}/>
      </Col>
      }
      <Col span={14} className={images.length > 0 && "padding-left-sm"}>
        <Descriptions
          bordered
          column={{xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1}}
        >
          <Descriptions.Item label="Ngày nhận">{format_date(info.receive_date)}</Descriptions.Item>
          <Descriptions.Item label="Nơi nhận">{info.receive_place}</Descriptions.Item>
          <Descriptions.Item label="Tên">{info.name}</Descriptions.Item>
          <Descriptions.Item label="Loài">{CASE_TYPE_TEXT[info.type]}</Descriptions.Item>
          <Descriptions.Item label="Giới tính">{GENDER_TEXT[info.gender]} </Descriptions.Item>
          <Descriptions.Item label="Tuổi">{detect_age(info.date_of_birth)} </Descriptions.Item>
          <Descriptions.Item label="Nơi ở hiện tại" span={2}>
            {info.foster && <span>Nhà Foster <Link to="">{info.foster.name}</Link></span>}
            {info.place && <span>{PLACE_TYPE_TEXT[info.place.type]} <Link to="">{info.place.name}</Link></span>}
          </Descriptions.Item>
          <Descriptions.Item label="Mô tả" span={2}>{info.description} </Descriptions.Item>
          <Descriptions.Item label="Trạng thái" span={2}>{info.status && info.status.name} </Descriptions.Item>
          <Descriptions.Item label="Thông tin chủ nuôi" span={2}>
            <p>Tên: {info.owner_name}</p>
            <p>Điện thoại: {info.owner_phone}</p>
            <p>Địa chỉ: {info.owner_address}</p>
          </Descriptions.Item>
          <Descriptions.Item label="Ghi chú" span={2}>{info.note} </Descriptions.Item>

        </Descriptions>
      </Col>
    </Row>
  </div>)
}

export default DetailCase