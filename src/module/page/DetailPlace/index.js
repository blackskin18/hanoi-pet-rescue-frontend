import React, { useState, useEffect }                                  from 'react'
import './style.scss'
import { Row, Col, Divider, Descriptions, Popconfirm, message, Modal } from 'antd';
import PlaceService                                                 from '../../../service/PlaceService';
import { PLACE_TYPE_TEXT, CASE_TYPE_TEXT, GENDER_TEXT, PLACE_TYPE } from "../../../config";
import { Link, useHistory }                                         from "react-router-dom";


import { useParams }      from "react-router";
import CreatePlaceForm    from "../../component/Form/CreatePlace";
import CreateHospital    from "../../component/Form/CreateHospital";

const DetailCase = () => {
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [info, setInfo]                         = useState({});
  const history                                 = useHistory()
  var {id}                                      = useParams()

  useEffect(() => {
    getDetailInfo()
  }, [id])

  const getDetailInfo = async () => {
    let response = await PlaceService.getPlaceDetail(id);
    setInfo(response.data)
  }

  const confirmDelete = async () => {
    let response = await PlaceService.deletePlace(id);
    if (response.code === 1) {
      message.success('Xóa thành công');
      history.push('/places/1')
    } else {
      message.error(response.message ? response.message : 'Xóa thất bại, vui lòng liên hệ kỹ thuật');
    }
  }

  const editPlace = async (data) => {
    return await PlaceService.editPlace(data, id);
  }

  const afterEdit = () => {
    getDetailInfo();
    setVisibleModalEdit(false);
    message.success('Xửa thành công');
  }


  return (<div className="detail-case-page">
    <Divider orientation="left">
      <h4 className="text-primary-green left-align padding-left-xs margin-bottom-none">Thông
        tin {info.type && PLACE_TYPE_TEXT[info.type]}</h4>
    </Divider>
    <Row className="margin-bottom-5">
      <a className="button-link button-link-edit" onClick={() => setVisibleModalEdit(true)}>Sửa</a>
      <Popconfirm
        title="Bạn có chắc là muốn xóa phòng khám này"
        onConfirm={confirmDelete}
        okText="Yes"
        cancelText="No"
      >
        <a className="button-link button-link-delete">Xóa</a>
      </Popconfirm>
    </Row>
    <Row justify="space-between">
      <Col span={14} offset={5}>
        <Descriptions
          bordered
          column={2}
        >
          <Descriptions.Item span={2}
                             label={"Tên " + (PLACE_TYPE_TEXT[info.type] ? PLACE_TYPE_TEXT[info.type] : '')}>{info.name}</Descriptions.Item>
          {
            info.children && info.children.length > 0 &&
            <Descriptions.Item span={2} label={"Danh sách chi nhánh"}>
              {
                info.children.map(function (child, key) {
                  return <p><Link to={"/detail-place/" + child.id} key={key}>{child.name}</Link></p>
                })
              }
            </Descriptions.Item>
          }
          {
            info.parent &&
            <Descriptions.Item span={2} label={"Là chi nhánh của"}>
              <Link to={"/detail-place/" + info.parent.id}>{info.parent.name}</Link>
            </Descriptions.Item>
          }
          <Descriptions.Item span={2} label="Địa chỉ">{info.address}</Descriptions.Item>
          <Descriptions.Item span={2} label="Hotline">{info.phone}</Descriptions.Item>
          {
            (info.type == PLACE_TYPE.COMMON_HOME || info.type == PLACE_TYPE.HOSPITAL) &&
            <Descriptions.Item span={2} label="Người phụ trách">
              {info.director_name && <p>Tên: {info.director_name}</p>}
              {info.director_phone && <p>Số điện thoại: {info.director_phone}</p>}
            </Descriptions.Item>
          }
          <Descriptions.Item span={2} label="Ghi chú">{info.note}</Descriptions.Item>
        </Descriptions>
      </Col>
    </Row>

    <Modal
      title="Basic Modal"
      visible={visibleModalEdit}
      width="90vw"
      okButtonProps={{style: {display: 'none'}}}
      cancelButtonProps={{style: {display: 'none'}}}
      onCancel={() => setVisibleModalEdit(false)}
    >
      {
        info.type == PLACE_TYPE.HOSPITAL ?
          <CreateHospital
            dataInsert={info}
            submitAction={editPlace}
            afterSubmit={afterEdit}
            type={info.type}
            branch={!!info.parent_id}
          />
          :
          <CreatePlaceForm
            dataInsert={info}
            submitAction={editPlace}
            afterSubmit={afterEdit}
            type={info.type}
          />
      }

    </Modal>
  </div>)
}

export default DetailCase