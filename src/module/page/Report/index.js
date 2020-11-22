import React, {useState, useEffect}                                           from 'react'
import './style.scss'
import {Row, Col, Divider, Descriptions, Tag, Popconfirm, DatePicker, Select} from 'antd';
import CaseService                                                            from "../../../service/CaseService";
import moment                                                                 from 'moment';
import {CASE_STATUS, CASE_TYPE, PLACE_TYPE}                                   from "../../../config";
import ExportReport                                                           from '../../component/ExportReport'

const {Option} = Select;

function PickerWithType({type, onChange, defaultValue}) {
  if (type === 'date') return <DatePicker onChange={onChange}/>;
  return <DatePicker picker={type} onChange={onChange} disabledDate={disabledDate} defaultValue={defaultValue}/>;
}

function disabledDate(current) {
  return current && current > moment().endOf('day');
}

const Report = () => {
  const [type, setType]                         = useState('year');
  const [time, getTime]                         = useState(moment(new Date(), 'YYYY-MM-DD'));
  const [dataReportStatus, setDataReportStatus] = useState([]);
  const [dataReportPlace, setDataReportPlace]   = useState([]);

  useEffect(() => {
    getReport()
  }, [])

  const getReport = async (timeData = false) => {
    if (!timeData) {
      timeData = time
    }
    var response = await CaseService.getReport(type, timeData)
    setDataReportStatus(response.data.report_by_status)
    setDataReportPlace(response.data.report_by_place)
  }

  const findReportStatus = (type, status) => {
    if (dataReportStatus.length > 0) {
      let result = dataReportStatus.filter(function (object) {
        return object.type == type && object.status == status
      })
      return result[0] ? result[0].count : 0
    }
    return 0
  }

  const findReportPlace = (type, place) => {
    if (dataReportPlace.length > 0) {
      let result = dataReportPlace.filter(function (object) {
        return object.type == type && object.place_type == place
      })
      return result[0] ? result[0].count : 0
    }
    return 0
  }

  const countByType = (type = 'all') => {
    let result = 0;
    for (let i in dataReportStatus) {
      if (dataReportStatus[i].type == type || type === 'all') result += dataReportStatus[i].count
    }

    for (let i in dataReportPlace) {
      if (dataReportPlace[i].type == type || type === 'all') result += dataReportPlace[i].count
    }
    return result;
  }

  const getCountByStatus = (status) => {
    let result = 0;
    for (let i in dataReportStatus) {
      if (dataReportStatus[i].status == status) result += dataReportStatus[i].count
    }
    return result;
  }

  const getCountByPlace = (placeType) => {
    let result = 0;
    for (let i in dataReportPlace) {
      if (dataReportPlace[i].place_type == placeType) result += dataReportPlace[i].count
    }
    return result;
  }

  return (<div className="detail-user-page">
    <Divider orientation="left">
      <h4 className="text-primary-green left-align padding-left-xs margin-bottom-none">Báo cáo cứu hộ</h4>
    </Divider>
    <Row>
      <Col className="margin-bottom-5" span={10} offset={1}>
        <span className="margin-right-xs">Báo cáo theo</span>
        <span>
          <Select value={type} onChange={setType}>
            <Option value="month">Tháng</Option>
            <Option value="quarter">Quý</Option>
            <Option value="year">Năm</Option>
          </Select>
          <PickerWithType
            type={type}
            onChange={value => {
              getTime(value)
              getReport(value)
            }}
            defaultValue={moment(new Date(), 'YYYY-MM-DD')}
          />
        </span>
      </Col>
      <Col span={12} className="text-right">
        <ExportReport
          findReportStatus={findReportStatus}
          findReportPlace={findReportPlace}
          countByType={countByType}
          getCountByStatus={getCountByStatus}
          getCountByPlace={getCountByPlace}
        />
      </Col>
    </Row>
    <div className="report-table">
      <Row>
        <Col className="report-table__header" span={2} offset={1}></Col>
        <Col className="report-table__header" span={10}><b>Tình trạng cứu hộ</b></Col>
        <Col className="report-table__header" span={8}><b>Nơi ở hiện tại</b></Col>
        <Col className="report-table__header" span={2}></Col>
      </Row>
      <Row>
        <Col className="report-table__header" span={2} offset={1}><b>Loài</b></Col>
        <Col className="report-table__header" span={2}><b>Đang cứu hộ</b></Col>
        <Col className="report-table__header" span={2}><b>Sẵn sàng tìm chủ</b></Col>
        <Col className="report-table__header" span={2}><b>Đã đăng chuyển chủ</b></Col>
        <Col className="report-table__header" span={2}><b>Đã về chủ mới</b></Col>
        <Col className="report-table__header" span={2}><b>Đã mất</b></Col>
        <Col className="report-table__header" span={2}><b>Nhà chung</b></Col>
        <Col className="report-table__header" span={2}><b>Phòng khám</b></Col>
        <Col className="report-table__header" span={2}><b>Nhà foster</b></Col>
        <Col className="report-table__header" span={2}><b>Nhà chủ nuôi mới</b></Col>
        <Col className="report-table__header" span={2}><b>Tổng</b></Col>
      </Row>
      <Row>
        <Col className="report-table__header" span={2} offset={1}><b>Chó</b></Col>
        <Col span={2}>{findReportStatus(CASE_TYPE.DOG, CASE_STATUS.SAVING)}</Col>
        <Col span={2}>{findReportStatus(CASE_TYPE.DOG, CASE_STATUS.READY_FIND_OWNER)}</Col>
        <Col span={2}>{findReportStatus(CASE_TYPE.DOG, CASE_STATUS.POST_FIND_OWNER)}</Col>
        <Col span={2}>{findReportStatus(CASE_TYPE.DOG, CASE_STATUS.FOUND_OWNER)}</Col>
        <Col span={2}>{findReportStatus(CASE_TYPE.DOG, CASE_STATUS.DIED)}</Col>

        <Col span={2}>{findReportPlace(CASE_TYPE.DOG, PLACE_TYPE.COMMON_HOME)}</Col>
        <Col span={2}>{findReportPlace(CASE_TYPE.DOG, PLACE_TYPE.HOSPITAL)}</Col>
        <Col span={2}>{findReportPlace(CASE_TYPE.DOG, PLACE_TYPE.FOSTER)}</Col>
        <Col span={2}>{findReportPlace(CASE_TYPE.DOG, PLACE_TYPE.OWNER)}</Col>
        <Col span={2}>{countByType(CASE_TYPE.DOG)}</Col>
      </Row>
      <Row>
        <Col className="report-table__header" span={2} offset={1}><b>Mèo</b></Col>
        <Col span={2}>{findReportStatus(CASE_TYPE.CAT, CASE_STATUS.SAVING)}</Col>
        <Col span={2}>{findReportStatus(CASE_TYPE.CAT, CASE_STATUS.READY_FIND_OWNER)}</Col>
        <Col span={2}>{findReportStatus(CASE_TYPE.CAT, CASE_STATUS.POST_FIND_OWNER)}</Col>
        <Col span={2}>{findReportStatus(CASE_TYPE.CAT, CASE_STATUS.FOUND_OWNER)}</Col>
        <Col span={2}>{findReportStatus(CASE_TYPE.CAT, CASE_STATUS.DIED)}</Col>

        <Col span={2}>{findReportPlace(CASE_TYPE.CAT, PLACE_TYPE.COMMON_HOME)}</Col>
        <Col span={2}>{findReportPlace(CASE_TYPE.CAT, PLACE_TYPE.HOSPITAL)}</Col>
        <Col span={2}>{findReportPlace(CASE_TYPE.CAT, PLACE_TYPE.FOSTER)}</Col>
        <Col span={2}>{findReportPlace(CASE_TYPE.CAT, PLACE_TYPE.OWNER)}</Col>
        <Col span={2}>{countByType(CASE_TYPE.CAT)}</Col>
      </Row>
      <Row>
        <Col className="report-table__header" span={2} offset={1}><b>Loài khác</b></Col>
        <Col span={2}>{findReportStatus(CASE_TYPE.OTHER, CASE_STATUS.SAVING)}</Col>
        <Col span={2}>{findReportStatus(CASE_TYPE.OTHER, CASE_STATUS.READY_FIND_OWNER)}</Col>
        <Col span={2}>{findReportStatus(CASE_TYPE.OTHER, CASE_STATUS.POST_FIND_OWNER)}</Col>
        <Col span={2}>{findReportStatus(CASE_TYPE.OTHER, CASE_STATUS.FOUND_OWNER)}</Col>
        <Col span={2}>{findReportStatus(CASE_TYPE.OTHER, CASE_STATUS.DIED)}</Col>

        <Col span={2}>{findReportPlace(CASE_TYPE.OTHER, PLACE_TYPE.COMMON_HOME)}</Col>
        <Col span={2}>{findReportPlace(CASE_TYPE.OTHER, PLACE_TYPE.HOSPITAL)}</Col>
        <Col span={2}>{findReportPlace(CASE_TYPE.OTHER, PLACE_TYPE.FOSTER)}</Col>
        <Col span={2}>{findReportPlace(CASE_TYPE.OTHER, PLACE_TYPE.OWNER)}</Col>
        <Col span={2}>{countByType(CASE_TYPE.OTHER)}</Col>
      </Row>
      <Row>
        <Col className="report-table__header" span={2} offset={1}><b>Tổng cộng</b></Col>
        <Col span={2}>{getCountByStatus(CASE_STATUS.SAVING)}</Col>
        <Col span={2}>{getCountByStatus(CASE_STATUS.READY_FIND_OWNER)}</Col>
        <Col span={2}>{getCountByStatus(CASE_STATUS.POST_FIND_OWNER)}</Col>
        <Col span={2}>{getCountByStatus(CASE_STATUS.FOUND_OWNER)}</Col>
        <Col span={2}>{getCountByStatus(CASE_STATUS.DIED)}</Col>

        <Col span={2}>{getCountByPlace(PLACE_TYPE.COMMON_HOME)}</Col>
        <Col span={2}>{getCountByPlace(PLACE_TYPE.HOSPITAL)}</Col>
        <Col span={2}>{getCountByPlace(PLACE_TYPE.FOSTER)}</Col>
        <Col span={2}>{getCountByPlace(PLACE_TYPE.OWNER)}</Col>
        <Col span={2}>{countByType()}</Col>
      </Row>
    </div>
  </div>)
}

export default Report