import React, {useState, useEffect}         from 'react'
import ReactExport                          from "react-data-export";
import {CASE_STATUS, CASE_TYPE, PLACE_TYPE} from "../../../config";
import {
  VerticalAlignBottomOutlined
}                                           from '@ant-design/icons';
import './style.scss'

const ExcelFile   = ReactExport.ExcelFile;
const ExcelSheet  = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const ExcelColumn2 = ReactExport.ExcelFile.ExcelColumn2;


const ListCaseTable = (props) => {
  const dataSet1 = [
    {
      label: 'Chó',
      saving          : props.findReportStatus(CASE_TYPE.DOG, CASE_STATUS.SAVING),
      ready_find_owner: props.findReportStatus(CASE_TYPE.DOG, CASE_STATUS.READY_FIND_OWNER),
      post_find_owner : props.findReportStatus(CASE_TYPE.DOG, CASE_STATUS.POST_FIND_OWNER),
      found_owner     : props.findReportStatus(CASE_TYPE.DOG, CASE_STATUS.FOUND_OWNER),
      died            : props.findReportStatus(CASE_TYPE.DOG, CASE_STATUS.DIED),
      common_home     : props.findReportPlace(CASE_TYPE.DOG, PLACE_TYPE.COMMON_HOME),
      hospital        : props.findReportPlace(CASE_TYPE.DOG, PLACE_TYPE.HOSPITAL),
      foster          : props.findReportPlace(CASE_TYPE.DOG, PLACE_TYPE.FOSTER),
      owner           : props.findReportPlace(CASE_TYPE.DOG, PLACE_TYPE.OWNER),
      total           : props.countByType(CASE_TYPE.DOG)
    },
    {
      label: 'Mèo',
      saving          : props.findReportStatus(CASE_TYPE.CAT, CASE_STATUS.SAVING),
      ready_find_owner: props.findReportStatus(CASE_TYPE.CAT, CASE_STATUS.READY_FIND_OWNER),
      post_find_owner : props.findReportStatus(CASE_TYPE.CAT, CASE_STATUS.POST_FIND_OWNER),
      found_owner     : props.findReportStatus(CASE_TYPE.CAT, CASE_STATUS.FOUND_OWNER),
      died            : props.findReportStatus(CASE_TYPE.CAT, CASE_STATUS.DIED),
      common_home     : props.findReportPlace(CASE_TYPE.CAT, PLACE_TYPE.COMMON_HOME),
      hospital        : props.findReportPlace(CASE_TYPE.CAT, PLACE_TYPE.HOSPITAL),
      foster          : props.findReportPlace(CASE_TYPE.CAT, PLACE_TYPE.FOSTER),
      owner           : props.findReportPlace(CASE_TYPE.CAT, PLACE_TYPE.OWNER),
      total           : props.countByType(CASE_TYPE.CAT)
    },
    {
      label: 'Loài khác',
      saving          : props.findReportStatus(CASE_TYPE.OTHER, CASE_STATUS.SAVING),
      ready_find_owner: props.findReportStatus(CASE_TYPE.OTHER, CASE_STATUS.READY_FIND_OWNER),
      post_find_owner : props.findReportStatus(CASE_TYPE.OTHER, CASE_STATUS.POST_FIND_OWNER),
      found_owner     : props.findReportStatus(CASE_TYPE.OTHER, CASE_STATUS.FOUND_OWNER),
      died            : props.findReportStatus(CASE_TYPE.OTHER, CASE_STATUS.DIED),
      common_home     : props.findReportPlace(CASE_TYPE.OTHER, PLACE_TYPE.COMMON_HOME),
      hospital        : props.findReportPlace(CASE_TYPE.OTHER, PLACE_TYPE.HOSPITAL),
      foster          : props.findReportPlace(CASE_TYPE.OTHER, PLACE_TYPE.FOSTER),
      owner           : props.findReportPlace(CASE_TYPE.OTHER, PLACE_TYPE.OWNER),
      total           : props.countByType(CASE_TYPE.OTHER)
    },
    {
      label: 'Tổng cộng',
      saving          : props.getCountByStatus(CASE_STATUS.SAVING),
      ready_find_owner: props.getCountByStatus(CASE_STATUS.READY_FIND_OWNER),
      post_find_owner : props.getCountByStatus(CASE_STATUS.POST_FIND_OWNER),
      found_owner     : props.getCountByStatus(CASE_STATUS.FOUND_OWNER),
      died            : props.getCountByStatus(CASE_STATUS.DIED),
      common_home     : props.getCountByPlace(PLACE_TYPE.COMMON_HOME),
      hospital        : props.getCountByPlace(PLACE_TYPE.HOSPITAL),
      foster          : props.getCountByPlace(PLACE_TYPE.FOSTER),
      owner           : props.getCountByPlace(PLACE_TYPE.OWNER),
      total           : props.countByType()
    }
  ];

  return (
    <ExcelFile element={<button className="button-export">Tải báo cáo <VerticalAlignBottomOutlined/></button>}>
      <ExcelSheet data={dataSet1} name="Báo cáo cứu hộ">
        <ExcelColumn2 label="" value="label"/>
        <ExcelColumn label="Đang cứu hộ" value="saving"/>
        <ExcelColumn label="Sẵn sàng tìm chủ" value="ready_find_owner"/>
        <ExcelColumn label="Đã đăng chuyển chủ" value="post_find_owner"/>
        <ExcelColumn label="Đã về chủ mới" value="found_owner"/>
        <ExcelColumn label="Đã mất" value="died"/>
        <ExcelColumn label="Đang ở nhà chung" value="common_home"/>
        <ExcelColumn label="Đang ở phòng khám" value="hospital"/>
        <ExcelColumn label="Đang ở nhà foster" value="foster"/>
        <ExcelColumn label="Đang ở nhà chủ nuôi mới" value="owner"/>
        <ExcelColumn label="Tổng" value="total"/>
      </ExcelSheet>
    </ExcelFile>
  )
}


export default ListCaseTable