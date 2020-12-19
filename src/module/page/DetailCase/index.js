import React, { useState, useEffect }                                  from 'react'
import moment                                                          from 'moment';
import './style.scss'

import { Modal, Row, Col, Divider, Descriptions, Popconfirm, message } from 'antd';
import CaseService                                                     from '../../../service/CaseService';
import { PLACE_TYPE_TEXT, CASE_TYPE_TEXT, GENDER_TEXT, PLACE_TYPE }    from "../../../config";
import { Link, useHistory }                                            from "react-router-dom";
import { format_date, detect_age, detect_age_arr }                     from '../../../utils/helper'
import ImageGallery                                                    from 'react-image-gallery';
import { useParams }                                                   from "react-router";
import "react-image-gallery/styles/scss/image-gallery.scss";
import CreateCaseForm                            from "../../component/Form/CreateCaseForm";
import PlaceService                                                    from "../../../service/PlaceService";

const DetailCase = () => {
  const [info, setInfo]                         = useState({});
  const [images, setImages]                     = useState([]);
  const [imagesToEdit, setImagesToEdit]         = useState([]);
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [placeId, setPlaceId]                   = useState(false);
  const [branchId, setBranchId]                 = useState(false);
  const [fosters, setFosters]                   = useState([]);
  const [owners, setOwners]                     = useState([]);
  const [hospitals, setHospitals]               = useState([]);
  const [commonHomes, setCommonHomes]           = useState([]);

  const history = useHistory()
  var {id}      = useParams()

  useEffect(() => {
    getDetailInfo()
    getAllFosters()
    getAllOwners()
    getAllCommonHome()
    getAllHospital()
  }, [])


  const editCase = async (data, images) => {
    return await CaseService.editCase(data, images, id)
  }

  const afterSubmit = async () => {
    setVisibleModalEdit(false)
    getDetailInfo()
  }

  const getDetailInfo = async () => {
    let response = await CaseService.getCaseDetail(id);

    if (response.data.animal_image) {
      let imagesData = response.data.animal_image.map(function (image) {
        return {original: image.path, thumbnail: image.path}
      })

      let imageToEdit = response.data.animal_image.map(function (image) {
        return {
          uid: image.id,
          name: 'image.png',
          status: 'done',
          url: image.path,
        }
      });
      setImagesToEdit(imageToEdit)
      setImages(imagesData)
    }
    setInfo(response.data)

    if (response.data.place && response.data.place.parent_id) {
      console.log('place_id', response.data.place.parent_id)
      console.log('branch_id', response.data.place.id)
      setPlaceId(response.data.place.parent_id)
      setBranchId(response.data.place.id)
    } else {
      setPlaceId(response.data.place_id)
    }
  }

  const handleCancelEdit = () => setVisibleModalEdit(false)

  const confirmDelete = async () => {
    let response = await CaseService.deleteCase(id);
    if (response.code === 1) {
      message.success('Xóa thành công');
      history.push('/list-case')
    } else {
      message.error(response.message ? response.message : 'Xóa thất bại, vui lòng liên hệ kỹ thuật');
    }
  }

  const getAllFosters = async () => {
    let response = await PlaceService.getPlaces({}, '', PLACE_TYPE.FOSTER, true)
    setFosters(response.data.places)
  }

  const getAllOwners = async () => {
    let response = await PlaceService.getPlaces({}, '', PLACE_TYPE.OWNER, true)
    setOwners(response.data.places)
  }

  const getAllHospital = async () => {
    let response = await PlaceService.getPlaces({}, '', PLACE_TYPE.HOSPITAL, true)
    setHospitals(response.data.places)
  }

  const getAllCommonHome = async () => {
    let response = await PlaceService.getPlaces({}, '', PLACE_TYPE.COMMON_HOME, true)
    setCommonHomes(response.data.places)
  }


  return (<div className="detail-case-page">
    <Divider orientation="left" className="">
      <h4 className="text-primary-green left-align padding-left-xs margin-bottom-none">Thông tin
        case {info.code_full}</h4>
    </Divider>
    <Row className="margin-bottom-5">
      <a className="button-link button-link-edit" onClick={() => setVisibleModalEdit(true)}>Sửa</a>
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
      <Col span={8}>
        <ImageGallery items={images} autoPlay={false} showPlayButton={false}/>
      </Col>
      }
      <Col span={16}>
        <Descriptions
          bordered
          column={2}
        >
          <Descriptions.Item label="Ngày nhận"><span>{format_date(info.receive_date)}</span></Descriptions.Item>
          <Descriptions.Item label="Nơi nhận"><span>{info.receive_place}</span></Descriptions.Item>
          <Descriptions.Item label="Tên">{info.name}</Descriptions.Item>
          <Descriptions.Item label="Loài">{CASE_TYPE_TEXT[info.type]}</Descriptions.Item>
          <Descriptions.Item label="Giới tính">{GENDER_TEXT[info.gender]} </Descriptions.Item>
          <Descriptions.Item label="Tuổi">{detect_age(info.date_of_birth)} </Descriptions.Item>
          <Descriptions.Item label="Nơi ở hiện tại" span={2}>
            {info.place && <span>{PLACE_TYPE_TEXT[info.place.type]} <Link to="">{info.place.name}</Link></span>}
          </Descriptions.Item>
          <Descriptions.Item label="Mô tả" span={2}>
            <pre className="animal-notes">{info.description}</pre>
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái" span={2}>{info.status && info.status.name} </Descriptions.Item>
          {
            info.foster &&
            <Descriptions.Item label="Thông tin Foster" span={2}>
              <p>Tên: {info.foster.name}</p>,
              <p>Điện thoại: {info.foster.phone}</p>,
              <p>Địa chỉ: {info.foster.address}</p>
            </Descriptions.Item>
          }
          {
            info.owner &&
            <Descriptions.Item label="Thông tin chủ nuôi" span={2}>
              <p>Tên: {info.owner.name}</p>,
              <p>Điện thoại: {info.owner.phone}</p>,
              <p>Địa chỉ: {info.owner.address}</p>
            </Descriptions.Item>
          }
          <Descriptions.Item label="Ghi chú" span={2}>
            <pre className="animal-notes">{info.note}</pre>
          </Descriptions.Item>
        </Descriptions>
      </Col>
    </Row>
    <Modal
      title="Basic Modal"
      visible={visibleModalEdit}
      width="90vw"
      okButtonProps={{style: {display: 'none'}}}
      cancelButtonProps={{style: {display: 'none'}}}
      onCancel={handleCancelEdit}
    >
      <CreateCaseForm
        dataInsert={{
          code: info.code,
          receive_place: info.receive_place,
          receive_date: moment(info.receive_date, 'YYYY-MM-DD'),
          name: info.name,
          type: info.type,
          gender: info.gender,
          age_month: detect_age_arr(info.date_of_birth)[1],
          age_year: detect_age_arr(info.date_of_birth)[0],
          place_type: info.place && info.place.type,
          description: info.description,
          status: info.status && info.status.id,
          note: info.note,
          place_id: placeId,
          foster_id: info.foster_id,
          branch_id: branchId,
          owner_id: info.owner_id,
        }}
        placeId={placeId}
        images={imagesToEdit}
        submitAction={editCase}
        afterSubmit={afterSubmit}
        fosters={fosters}
        owners={owners}
        hospitals={hospitals}
        commonHomes={commonHomes}
      />
    </Modal>
  </div>)
}

export default DetailCase