import React, {useState, useEffect} from 'react'
import './style.scss'
import {Row, Col, Divider, Input, Button, Select} from 'antd';
import PlaceService from "../../../service/PlaceService";


const {Option} = Select;
const PLACE_TYPE = {
  COMMON_HOME: 1,
  HOSPITAL: 1,
  FOSTER: 1,
  OWNER: 1,
};


const ListCase = () => {
  const [dataInsert, setDataInsert] = useState({});
  const [rootHospitals, setRootHospitals] = useState([]);

  const createPlace = function () {
    PlaceService.createPlace(dataInsert)
  }

  const editDataInsert = function (key, value) {
    let data = {
      ...dataInsert,
      [key]: value
    }
    setDataInsert(data)
  }

  const getRootHospitals = async () => {
    let hospital = await PlaceService.getRootHospitals()
    setRootHospitals(hospital.data)
  }

  useEffect(() => {
    getRootHospitals()
  }, [])

  return (<div className="home-page">
    <Divider orientation="left">
      <h4 className="text-primary-green left-align padding-left-xs">Tạo địa điểm </h4>
    </Divider>
    <Row justify="space-between" className="filter-row">
      <Col offset={5} span={14} className="create-case__input-boxs">
        <Row>
          <Col span={4}>
            Loại địa điểm
          </Col>
          <Col span={20}>
            <Select onChange={(e) => editDataInsert('type', e)} style={{width: "100%"}}>
              <Option value={1} key="1">Phòng Phám</Option>
              <Option value={2} key="2">Nhà chung</Option>
              <Option value={3} key="3">Nhà Foster</Option>
              <Option value={4} key="4">Nhà Chủ nuôi mới</Option>
            </Select>
          </Col>
        </Row>
        {dataInsert.type === PLACE_TYPE.HOSPITAL ?
          [
            <Row>
              <Col span={4}>
                Thuộc bệnh viện
              </Col>
              <Col span={20}>
                <Select onChange={(e) => editDataInsert('parent_id', e)} style={{width: "100%"}}>
                  {
                    rootHospitals.map((hospital, key) => {
                      return <Option value={hospital.id} key={key}>{hospital.name}</Option>
                    })
                  }
                </Select>
                <p className="text-red">nếu bạn đang tạo chi nhánh của một phòng khám thì hãy chọn phòng khám mà chi
                  nhánh này thuộc về</p>
              </Col>
            </Row>,
            <Row>
              <Col span={4}>
                Tên chi nhánh
              </Col>
              <Col span={20}>
                <Input
                  placeholder="Nhập tên chi nhánh"
                  onChange={(e) => editDataInsert('name', e.target.value)}
                />
              </Col>
            </Row>
          ]
          :
          <Row>
            <Col span={4}>
              Tên địa điểm
            </Col>
            <Col span={20}>
              <Input
                placeholder="Nhập tên địa điểm"
                onChange={(e) => editDataInsert('name', e.target.value)}
              />
            </Col>
          </Row>
        }
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
        {dataInsert.type === PLACE_TYPE.HOSPITAL &&
        <Row>
          <Col span={4}>
            Người phụ trách
          </Col>
          <Col span={20}>
            <Row gutter={30}>
              <Col span={2}>Tên</Col>
              <Col span={8}>
                <Input
                  placeholder="Nhập tên người phụ trách"
                  onChange={(e) => editDataInsert('directer_name', e.target.value)}
                />
              </Col>
              <Col span={4} offset={2}>Điện Thoại</Col>
              <Col span={8}>
                <Input
                  placeholder="Nhập số điện thoại người phụ trách"
                  onChange={(e) => editDataInsert('directer_phone', e.target.value)}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        }
      </Col>
    </Row>
    <div className="text-center">
      <Button
        type="primary"
        size="large"
        onClick={createPlace}
      >Tạo</Button>
    </div>
  </div>)
}

export default ListCase