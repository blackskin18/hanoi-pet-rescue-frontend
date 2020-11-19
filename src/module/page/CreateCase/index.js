import React, {useState, useEffect}                                          from 'react'
import './style.scss'
import {Row, Col, Divider, Input, Button, Select, Modal, Upload, DatePicker} from 'antd';
import {PlusOutlined}                                                        from '@ant-design/icons';
import CaseService                                                           from '../../../service/CaseService';
import {PLACE_TYPE}                                                          from "../../../config";
import PlaceService                                                          from "../../../service/PlaceService";

const {Option}   = Select;
const {TextArea} = Input;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload  = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const ListCase = () => {

  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage]     = useState('');
  const [previewTitle, setPreviewTitle]     = useState('');
  const [images, setImages]                 = useState([]);
  const [placeId, setPlaceId]               = useState(null);
  // const [placeType, setPlaceType]           = useState(null);
  const [placeToChoose, setPlaceToChoose]   = useState([]);
  const [dataInsert, setDataInsert]         = useState({});


  useEffect(() => {
    getPlaceSelect()
  }, [dataInsert.place_type])

  const getPlaceSelect = async () => {
    let response = await PlaceService.getPlaces({}, '', dataInsert.place_type)
    setPlaceToChoose(response.data.places)
    setPlaceId(null)
  }

  const handleCancelPreview = () => setPreviewVisible(false);
  const handlePreviewImages = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChangeImages = ({fileList}) => setImages(fileList)

  const handleCreateCase = () => {
    var data = {
      ...dataInsert,
      place_id: placeId
    }
    CaseService.createCase(data, images)
  }

  const editDataInsert = function (key, value) {
    let data = {
      ...dataInsert,
      [key]: value
    }
    setDataInsert(data)
  }

  const uploadButton = (
    <div>
      <PlusOutlined/>
      <div style={{marginTop: 8}}>Upload</div>
    </div>
  );

  return (<div className="home-page">
    <Divider orientation="left">
      <h4 className="text-primary-green left-align padding-left-xs">Tạo case </h4>
    </Divider>
    <Row justify="space-between" className="filter-row">
      <Col span={8}>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={images}
          onPreview={handlePreviewImages}
          onChange={handleChangeImages}
        >
          {uploadButton}
        </Upload>
      </Col>
      <Col span={16} className="create-case__input-boxs">
        <Row>
          <Col offset={8} span={2}>CODE</Col>
          <Col span={6}>
            <Input addonBefore="20CM" value={dataInsert.code} onChange={(e) => editDataInsert('code', e.target.value)}/>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Row>
              <Col span={8}>Ngày nhận</Col>
              <Col span={16}>
                <DatePicker
                  placeholder={"Chọn Ngày"}
                  width="100%"
                  className="w-100"
                  value={dataInsert.receive_date}
                  onChange={(e) => editDataInsert('receive_date', e)}/>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={8} className="padding-left-sm">Nơi nhận</Col>
              <Col span={16}>
                <Input
                  placeholder="Nhập nơi nhận"
                  className="w-100"
                  value={dataInsert.receive_place}
                  onChange={(e) => editDataInsert('receive_place', e.target.value)}/>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Row>
              <Col span={8}>Tên</Col>
              <Col span={16}>
                <Input
                  placeholder="Nhập tên"
                  width="100%"
                  className="w-100"
                  value={dataInsert.name}
                  onChange={(e) => editDataInsert('name', e.target.value)}/>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={8} className="padding-left-sm">Loài</Col>
              <Col span={16}>
                <Select className="w-100" placeholder="Chọn Loài" value={dataInsert.type}
                        onChange={(e) => editDataInsert('type', e)}>
                  <Option value={1}>Chó</Option>
                  <Option value={2}>Mèo</Option>
                  <Option value={3}>Khác</Option>
                </Select>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            Mô tả
          </Col>
          <Col span={20}>
            <TextArea
              placeholder="Nhập mô tả"
              autoSize={{minRows: 2, maxRows: 6}}
              value={dataInsert.description}
              onChange={(e) => editDataInsert('description', e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            Nơi ở hiện tại
          </Col>
          <Col span={20}>
            <Select className="w-100"
                    placeholder="Chọn nơi ở hiện tại"
                    value={dataInsert.place_type}
                    onChange={(e) => editDataInsert('place_type', e)} style={{width: "100%"}}>
              <Option value="" key="0" disabled>Chọn nơi ở hiện tại</Option>
              <Option value={1} key="1">Phòng Phám</Option>
              <Option value={2} key="2">Nhà chung</Option>
              <Option value={3} key="3">Nhà Foster</Option>
              <Option value={4} key="4">Nhà Chủ nuôi mới</Option>
            </Select>
          </Col>
        </Row>
        {
          placeToChoose.length > 0 &&
          <Row>
            <Col span={4}>
            </Col>
            <Col span={20}>
              <Select className="w-100"
                      placeholder="Chọn nơi ở hiện tại"
                      value={placeId}
                      onChange={(e) => setPlaceId(e)} style={{width: "100%"}}>
                {
                  placeToChoose.map(function (place, key) {
                    return <Option value={place.id} key={key}>{place.name}</Option>
                  })
                }
              </Select>
            </Col>
          </Row>
        }
        <Row>
          <Col span={4}>
            Trạng thái
          </Col>
          <Col span={20}>
            <Select className="w-100" placeholder="chọn trạng thái" value={dataInsert.status}
                    onChange={(e) => editDataInsert('status', e)}>
              <Option value={1}>Đang cứu hộ</Option>
              <Option value={2}>Sẵn sàng tìm chủ</Option>
              <Option value={3}>Đã đăng tìm chủ</Option>
              <Option value={4}>Đã về chủ mới</Option>
              <Option value={5}>Đã mất</Option>
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            Thông tin chủ mới / foster
          </Col>
          <Col span={20}>
            <Row>
              <Col span={3}>Tên:</Col>
              <Col span={5}>
                <Input
                  placeholder="Nhập tên chủ nuôi"
                  value={dataInsert.foster_name}
                  onChange={(e) => editDataInsert('foster_name', e.target.value)}/>
              </Col>
              <Col span={3} className="padding-left-sm">ĐT:</Col>
              <Col span={5}>
                <Input
                  placeholder="Nhập sđt chủ nuôi"
                  value={dataInsert.foster_phone}
                  onChange={(e) => editDataInsert('foster_phone', e.target.value)}/>
              </Col>
              <Col span={3} className="padding-left-sm">Đ/C:</Col>
              <Col span={5}>
                <Input
                  placeholder="Nhập địa chỉ chủ nuôi"
                  value={dataInsert.foster_address}
                  onChange={(e) => editDataInsert('foster_address', e.target.value)}/>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            Ghi chú
          </Col>
          <Col span={20}>
            <TextArea
              placeholder="Nhập ghi chú"
              autoSize={{minRows: 2, maxRows: 6}}
              value={dataInsert.note}
              onChange={(e) => editDataInsert('note', e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24} className="text-center">
            <Button type="primary" size="large" onClick={() => handleCreateCase()}>
              Tạo case
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>

    <Modal
      visible={previewVisible}
      title={previewTitle}
      footer={null}
      onCancel={handleCancelPreview}
    >
      <img alt="example" style={{width: '100%'}} src={previewImage}/>
    </Modal>
  </div>)
}

export default ListCase