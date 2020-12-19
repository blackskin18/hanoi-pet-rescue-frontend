import React, {useState}             from 'react'
import './style.scss'
import {Row, Col, Input, Button}     from 'antd';
import {PLACE_TYPE, PLACE_TYPE_TEXT} from "../../../../config/index"
import {useParams}                   from "react-router";

const CratePlace = (props) => {
  var {type}                        = useParams()
  const [dataInsert, setDataInsert] = useState(props.dataInsert ? props.dataInsert : {});
  const [isSubmit, setIsSubmit]     = useState(false);
  const [errors, setErrors]         = useState(false);

  const createPlace = async function () {
    setIsSubmit(false)

    let data = {
      type,
      ...dataInsert
    }

    let response = await props.submitAction(data)
    if (response && response.code === 1) {

    } else {
      setErrors(response.errors)
    }
    setIsSubmit(false)
    props.afterSubmit()
  }

  const editDataInsert = function (key, value) {
    let data = {
      ...dataInsert,
      [key]: value
    }
    setDataInsert(data)
  }


  return (<div className="home-page">
    <Row justify="space-between" className="filter-row">
      <Col offset={5} span={14} className="create-case__input-boxs">
        <Row>
          <Col span={4}>
            Tên {PLACE_TYPE_TEXT[props.type]}
          </Col>
          <Col span={20}>
            <Input
              value={dataInsert.name}
              placeholder={"Nhập tên " + PLACE_TYPE_TEXT[props.type]}
              onChange={(e) => editDataInsert('name', e.target.value)}
            />
            {errors.name && <span className="text-red">{errors.name[0]}</span>}
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
            {props.type == PLACE_TYPE.COMMON_HOME ? 'Hotline' : 'Điện thoại'}
          </Col>
          <Col span={20}>
            <Input
              value={dataInsert.phone}
              placeholder={"Nhập " + ( props.type == PLACE_TYPE.COMMON_HOME ? 'Hotline' : 'Điện thoại')}
              onChange={(e) => editDataInsert('phone', e.target.value)}
            />
            {errors.phone && <span className="text-red">{errors.phone[0]}</span>}

          </Col>
        </Row>
        {
          props.type == PLACE_TYPE.COMMON_HOME &&
          <Row>
            <Col span={4}>
              Người phụ trách
            </Col>
            <Col span={20}>
              <Row gutter={30}>
                <Col span={4}>Tên</Col>
                <Col span={8}>
                  <Input
                    value={dataInsert.directer_name}
                    placeholder="Nhập tên người phụ trách"
                    onChange={(e) => editDataInsert('directer_name', e.target.value)}
                  />
                  {errors.directer_name && <span className="text-red">{errors.directer_name[0]}</span>}
                </Col>
                <Col span={4}>Điện Thoại</Col>
                <Col span={8}>
                  <Input
                    value={dataInsert.directer_phone}
                    placeholder="Nhập số điện thoại người phụ trách"
                    onChange={(e) => editDataInsert('directer_phone', e.target.value)}
                  />
                  {errors.directer_phone && <span className="text-red">{errors.directer_phone[0]}</span>}
                </Col>
              </Row>
            </Col>
          </Row>
        }
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

export default CratePlace