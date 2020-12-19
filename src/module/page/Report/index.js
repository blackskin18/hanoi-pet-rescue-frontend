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
  return <DatePicker allowClear={false} picker={type} onChange={onChange} disabledDate={disabledDate} defaultValue={defaultValue}/>;
}

function disabledDate(current) {
  return current && current > moment().endOf('day');
}

const Report = () => {
  const [type, setType]                         = useState('year');
  const [time, setTime]                         = useState(moment(new Date(), 'YYYY-MM-DD'));
  const [timeProgressive, setTimeProgressive]                         = useState(moment(new Date(), 'YYYY-MM-DD'));
  const [dataReportStatus, setDataReportStatus] = useState([]);
  const [dataReportPlace, setDataReportPlace]   = useState([]);
  const [dataReportType, setDataReportType]     = useState([]);
  const [countCase, setCountCase]               = useState(0);

  const [dataReportStatus1, setDataReportStatus1] = useState([]);
  const [dataReportPlace1, setDataReportPlace1]   = useState([]);
  const [dataReportType1, setDataReportType1]     = useState([]);
  const [countCase1, setCountCase1]               = useState(0);

  useEffect(() => {
    getReport()
    getReportProgressive()
  }, [])

  const getReport = async (timeData = false) => {
    if (!timeData) {
      timeData = time
    }
    var response = await CaseService.getReport(type, timeData)
    setDataReportStatus(response.data.report_by_status)
    setDataReportPlace(response.data.report_by_place)
    setDataReportType(response.data.report_by_type)
    setCountCase(response.data.count)
  }

  const getReportProgressive = async (timeData = false) => {
    if (!timeData) {
      timeData = timeProgressive
    }
    var response = await CaseService.getReportProgressive(timeData)
    setDataReportStatus1(response.data.report_by_status)
    setDataReportPlace1(response.data.report_by_place)
    setDataReportType1(response.data.report_by_type)
    setCountCase1(response.data.count)
  }

  const downloadReport = async (reportType = 0) => {
    if(reportType == 1) {
      await CaseService.downloadReportProgressive(timeProgressive)
    } else {
      await CaseService.downloadReport(type, time)
    }
  }

  const findReportStatus = (type, status, report = 0) => {
    let data = [];
    if(report == 1) {
      data = dataReportStatus1;
    } else {
      data = dataReportStatus;
    }


    if (data.length > 0) {
      let result = data.filter(function (object) {
        return object.type == type && object.status == status
      })
      return result[0] ? result[0].count : 0
    }
    return 0
  }

  const findReportPlace = (type, place, report = 0) => {
    let data = [];
    if(report == 1) {
      data = dataReportPlace1;
    } else {
      data = dataReportPlace;
    }

    if (data.length > 0) {
      let result = data.filter(function (object) {
        return object.type == type && object.place_type == place
      })
      return result[0] ? result[0].count : 0
    }
    return 0
  }

  const countByType = (type = 'all', report = 0) => {
    let data = 0;
    if(report == 1) {
      data = dataReportType1;
    } else {
      data = dataReportType;
    }

    if (type == 'all') return report == 1 ? countCase1 : countCase;
    for (let i in data) {
      if (data[i].type == type) return data[i].count
    }

    return 0;
  }

  const getCountByStatus = (status, report = 0) => {
    let data = 0;
    if(report == 1) {
      data = dataReportStatus1;
    } else {
      data = dataReportStatus;
    }

    let result = 0;
    for (let i in data) {
      if (data[i].status == status) result += data[i].count
    }
    return result;
  }

  const getCountByPlace = (placeType, report = 0) => {
    let data = 0;
    if(report == 1) {
      data = dataReportPlace1;
    } else {
      data = dataReportPlace;
    }

    let result = 0;
    for (let i in data) {
      if (data[i].place_type == placeType) result += data[i].count
    }
    return result;
  }

  return (<div className="report-page">
    <div className="margin-bottom-lg">
      <Row className="report-header">
        <Col span={24}>
          <h2 className="report-header__title">
            Báo cáo cứu hộ
          </h2>
        </Col>
        <Col className="margin-bottom-5 " span={24}>
          <div className="report-header__filter">
            <Select value={type} onChange={setType}>
              <Option value="month">Tháng</Option>
              <Option value="quarter">Quý</Option>
              <Option value="year">Năm</Option>
            </Select>
            <PickerWithType
              type={type}
              onChange={value => {
                setTime(value)
                getReport(value)
              }}
              defaultValue={moment(new Date(), 'YYYY-MM-DD')}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24} className="text-right">
          <button className="button-export" onClick={() => downloadReport(0)}>Tải báo cáo</button>
        </Col>
      </Row>
      <div className="report-table">
        <table>
          <thead>
          <tr>
            <th rowSpan={2} colSpan={1}>Loài</th>
            <th rowSpan={2}>Tổng số case cứu hộ mới</th>
            <th colSpan={3}>Nơi ở hiện tại</th>
            <th rowSpan={2}>Case về chủ mới</th>
            <th rowSpan={2}>Case mất</th>
          </tr>
          <tr>
            <th>Nhà chung</th>
            <th>Phòng khám</th>
            <th>Nhà foster</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Chó</td>
            <td>{countByType(CASE_TYPE.DOG)}</td>
            <td>{findReportPlace(CASE_TYPE.DOG, PLACE_TYPE.COMMON_HOME)}</td>
            <td>{findReportPlace(CASE_TYPE.DOG, PLACE_TYPE.HOSPITAL)}</td>
            <td>{findReportPlace(CASE_TYPE.DOG, PLACE_TYPE.FOSTER)}</td>
            <td>{findReportStatus(CASE_TYPE.DOG, CASE_STATUS.FOUND_OWNER)}</td>
            <td>{findReportStatus(CASE_TYPE.DOG, CASE_STATUS.DIED)}</td>
          </tr>
          <tr>
            <td>Mèo</td>
            <td>{countByType(CASE_TYPE.CAT)}</td>
            <td>{findReportPlace(CASE_TYPE.CAT, PLACE_TYPE.COMMON_HOME)}</td>
            <td>{findReportPlace(CASE_TYPE.CAT, PLACE_TYPE.HOSPITAL)}</td>
            <td>{findReportPlace(CASE_TYPE.CAT, PLACE_TYPE.FOSTER)}</td>
            <td>{findReportStatus(CASE_TYPE.CAT, CASE_STATUS.FOUND_OWNER)}</td>
            <td>{findReportStatus(CASE_TYPE.CAT, CASE_STATUS.DIED)}</td>
          </tr>
          <tr>
            <td>Loài Khác</td>
            <td>{countByType(CASE_TYPE.OTHER)}</td>
            <td>{findReportPlace(CASE_TYPE.OTHER, PLACE_TYPE.COMMON_HOME)}</td>
            <td>{findReportPlace(CASE_TYPE.OTHER, PLACE_TYPE.HOSPITAL)}</td>
            <td>{findReportPlace(CASE_TYPE.OTHER, PLACE_TYPE.FOSTER)}</td>
            <td>{findReportStatus(CASE_TYPE.OTHER, CASE_STATUS.FOUND_OWNER)}</td>
            <td>{findReportStatus(CASE_TYPE.OTHER, CASE_STATUS.DIED)}</td>
          </tr>
          <tr>
            <td>Tổng cộng</td>
            <td>{countByType('all')}</td>
            <td>{getCountByPlace(PLACE_TYPE.COMMON_HOME)}</td>
            <td>{getCountByPlace(PLACE_TYPE.HOSPITAL)}</td>
            <td>{getCountByPlace(PLACE_TYPE.FOSTER)}</td>
            <td>{getCountByStatus(CASE_STATUS.FOUND_OWNER)}</td>
            <td>{getCountByStatus(CASE_STATUS.DIED)}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>


    <div>
      <Row className="report-header">
        <Col span={24}>
          <h2 className="report-header__title">
            Báo cáo cứu hộ Lũy kế
          </h2>
        </Col>
        <Col className="margin-bottom-5 " span={24}>
          <div className="report-header__filter">
            Đến
            <DatePicker
              allowClear={false}
              onChange={value => {
                setTimeProgressive(value)
                getReportProgressive(value)
              }}
              defaultValue={moment(new Date(), 'YYYY-MM-DD')}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24} className="text-right">
          <button className="button-export" onClick={() => downloadReport(1)}>Tải báo cáo</button>
        </Col>
      </Row>
      <div className="report-table">
        <table>
          <thead>
            <tr>
              <th rowSpan={2} colSpan={1}>Loài</th>
              <th colSpan={4}>Nơi ở hiện tại</th>
              <th rowSpan={2}>Đã mất</th>
              <th rowSpan={2}>Tổng case đang cứu hộ</th>
              <th rowSpan={2}>Tổng case đã cứu hộ đến {timeProgressive.format('DD/MM/YYYY')}</th>
            </tr>
            <tr>
              <th>Nhà chung</th>
              <th>Phòng khám</th>
              <th>Nhà foster</th>
              <th>Nhà chủ nuôi mới</th>
            </tr>
          </thead>
          <tbody>
          <tr>
            <td>Chó</td>
            <td>{findReportPlace(CASE_TYPE.DOG, PLACE_TYPE.COMMON_HOME, 1)}</td>
            <td>{findReportPlace(CASE_TYPE.DOG, PLACE_TYPE.HOSPITAL, 1)}</td>
            <td>{findReportPlace(CASE_TYPE.DOG, PLACE_TYPE.FOSTER, 1)}</td>
            <td>{findReportPlace(CASE_TYPE.DOG, PLACE_TYPE.OWNER, 1)}</td>

            <td>{findReportStatus(CASE_TYPE.DOG, CASE_STATUS.DIED, 1)}</td>
            <td>{findReportStatus(CASE_TYPE.DOG, CASE_STATUS.SAVING, 1)}</td>
            <td>{countByType(CASE_TYPE.DOG, 1)}</td>
          </tr>
          <tr>
            <td>Mèo</td>
            <td>{findReportPlace(CASE_TYPE.CAT, PLACE_TYPE.COMMON_HOME, 1)}</td>
            <td>{findReportPlace(CASE_TYPE.CAT, PLACE_TYPE.HOSPITAL, 1)}</td>
            <td>{findReportPlace(CASE_TYPE.CAT, PLACE_TYPE.FOSTER, 1)}</td>
            <td>{findReportPlace(CASE_TYPE.CAT, PLACE_TYPE.OWNER, 1)}</td>

            <td>{findReportStatus(CASE_TYPE.CAT, CASE_STATUS.DIED, 1)}</td>
            <td>{findReportStatus(CASE_TYPE.CAT, CASE_STATUS.SAVING, 1)}</td>
            <td>{countByType(CASE_TYPE.CAT, 1)}</td>
          </tr>
          <tr>
            <td>Loài Khác</td>
            <td>{findReportPlace(CASE_TYPE.OTHER, PLACE_TYPE.COMMON_HOME, 1)}</td>
            <td>{findReportPlace(CASE_TYPE.OTHER, PLACE_TYPE.HOSPITAL, 1)}</td>
            <td>{findReportPlace(CASE_TYPE.OTHER, PLACE_TYPE.FOSTER, 1)}</td>
            <td>{findReportPlace(CASE_TYPE.OTHER, PLACE_TYPE.OWNER, 1)}</td>

            <td>{findReportStatus(CASE_TYPE.OTHER, CASE_STATUS.DIED, 1)}</td>
            <td>{findReportStatus(CASE_TYPE.OTHER, CASE_STATUS.SAVING, 1)}</td>
            <td>{countByType(CASE_TYPE.OTHER, 1)}</td>
          </tr>
          <tr>
            <td>Tổng cộng</td>
            <td>{getCountByPlace(PLACE_TYPE.COMMON_HOME, 1)}</td>
            <td>{getCountByPlace(PLACE_TYPE.HOSPITAL, 1)}</td>
            <td>{getCountByPlace(PLACE_TYPE.FOSTER, 1)}</td>
            <td>{getCountByPlace(PLACE_TYPE.OWNER, 1)}</td>
            <td>{getCountByStatus(CASE_STATUS.DIED, 1)}</td>
            <td>{getCountByStatus(CASE_STATUS.SAVING, 1)}</td>
            <td>{countByType('all', 1)}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>)
}

export default Report