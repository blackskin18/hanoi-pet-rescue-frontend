import React, {useState, useEffect}               from 'react'
import './style.scss'
import {Row, Col, Divider, Input, Button, Select} from 'antd';
import PlaceService                               from "../../../../service/PlaceService";
import {PLACE_TYPE}                               from "../../../../config/index"
import {useParams}                                from "react-router";

const {Option} = Select;

const CreateHospital = (props) => {
  var {branch}                            = useParams()
  const [dataInsert, setDataInsert]       = useState(props.dataInsert ? props.dataInsert : {});
  const [rootHospitals, setRootHospitals] = useState([]);
  const [errors, setErrors]                 = useState(false);
  const [isSubmit, setIsSubmit]             = useState(false);

  const createPlace = async function () {
    setIsSubmit(false)

    let data = {
      ...dataInsert,
      root_hospital: branch,
      type: PLACE_TYPE.HOSPITAL
    }

    let response = await props.submitAction(data)
    if (response && response.code === 1) {

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

  const getRootHospitals = async () => {
    let hospital = await PlaceService.getRootHospitals()
    setRootHospitals(hospital.data)
  }

  useEffect(() => {
    getRootHospitals()
  }, [])

  return (<div className="home-page">
    <Row justify="space-between" className="filter-row">
      <Col offset={5} span={14} className="create-case__input-boxs">
        {
          branch ?
            [
              <Row>
                <Col span={4}>
                  Phòng khám
                </Col>
                <Col span={20}>
                  <Select onChange={(e) => editDataInsert('parent_id', e)} style={{width: "100%"}}>
                    {
                      rootHospitals && rootHospitals.map((hospital, key) => {
                        return <Option value={hospital.id} key={key}>{hospital.name}</Option>
                      })
                    }
                  </Select>
                  {errors.parent_id && <span className="text-red">{errors.parent_id[0]}</span>}

                </Col>
              </Row>,
              <Row>
                <Col span={4}>
                  Chi nhánh
                </Col>
                <Col span={20}>
                  <Input
                    placeholder="Nhập tên chi nhánh"
                    onChange={(e) => editDataInsert('name', e.target.value)}
                  />
                  {errors.name && <span className="text-red">{errors.name[0]}</span>}
                </Col>
              </Row>
            ]
            :
            <Row>
              <Col span={4}>
                Phòng khám
              </Col>
              <Col span={20}>
                <Input
                  placeholder="Nhập tên phòng khám"
                  onChange={(e) => editDataInsert('name', e.target.value)}
                />
                {errors.name && <span className="text-red">{errors.name[0]}</span>}
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
            {errors.address && <span className="text-red">{errors.address[0]}</span>}

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
            {errors.phone && <span className="text-red">{errors.phone[0]}</span>}

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
                <Input
                  placeholder="Nhập tên người phụ trách"
                  onChange={(e) => editDataInsert('directer_name', e.target.value)}
                />
                {errors.directer_name && <span className="text-red">{errors.directer_name[0]}</span>}

              </Col>
              <Col span={4} offset={2}>Điện Thoại</Col>
              <Col span={8}>
                <Input
                  placeholder="Nhập số điện thoại người phụ trách"
                  onChange={(e) => editDataInsert('directer_phone', e.target.value)}
                />
                {errors.directer_phone && <span className="text-red">{errors.directer_phone[0]}</span>}

              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            Ghi chú
          </Col>
          <Col span={20}>
            <Input.TextArea
              autoSize={{minRows: 2, maxRows: 6}}
              placeholder="Nhập ghi chú"
              value={dataInsert.note}
              onChange={(e) => editDataInsert('note', e.target.value)}
            />
            {errors.note && <span className="text-red">{errors.note[0]}</span>}
          </Col>
        </Row>
      </Col>
    </Row>
    <div className="text-center">
      <Button
        type="primary"
        size="large"
        disabled={isSubmit}
        onClick={createPlace}
      >Tạo</Button>
    </div>
  </div>)
}

export default CreateHospital