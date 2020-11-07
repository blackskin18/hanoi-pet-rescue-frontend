import React, {useState, useEffect}                                             from 'react'
import './style.scss'
import {Row, Col, Divider, Table, Tag, Space, Input, Button, Select, Modal, Upload, DatePicker} from 'antd';

const { Option } = Select;
const { TextArea } = Input;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const ListCase = () => {

  const [previewVisible, setPreviewVisible]=  useState(false)
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  return (<div className="home-page">
    <Divider orientation="left">
      <h4 className="text-primary-green left-align padding-left-xs">Tạo địa điểm </h4>
    </Divider>
    <Row justify="space-between" className="filter-row" >
      <Col offset={5} span={14} className="create-case__input-boxs">
        <Row>
          <Col span={4}>
            Tên địa điểm
          </Col>
          <Col span={20}>
            <Input placeholder="Nhập tên địa điểm"/>
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            Loại địa điểm
          </Col>
          <Col span={20}>
            <Select>
              <Option>Phòng Phám</Option>
              <Option>Nhà chung</Option>
              <Option>Nhà Foster</Option>
              <Option>Nhà Chủ nuôi mới</Option>
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={4}>
          </Col>
          <Col span={20}>
            <Input placeholder="Nhập tên địa điểm"/>
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            Địa chỉ
          </Col>
          <Col span={20}>
            <Input placeholder="Nhập tên địa chỉ"/>
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            Hotline
          </Col>
          <Col span={20}>
            <Input placeholder="Nhập hotline"/>
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            Người phụ trách
          </Col>
          <Col span={20}>
            <Row gutter={30}>
              <Col span={2}>Tên</Col>
              <Col span={8}>
                <Input placeholder="Nhập tên người phụ trách"/>
              </Col>
              <Col span={4} offset={2}>Điện Thoại</Col>
              <Col span={8}>
                <Input placeholder="Nhập số điện thoại người phụ trách"/>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>)
}

export default ListCase