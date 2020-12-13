import React, {useState, useEffect}                                          from 'react'
import './style.scss'
import {Row, Col, Divider, Input, Button, Select, Modal, Upload, DatePicker} from 'antd';
import {PlusOutlined}                                                        from '@ant-design/icons';
import CaseService                                                           from '../../../service/CaseService';
import {CASE_TYPE, PLACE_TYPE_TEXT, GENDER}                                  from "../../../config";
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

const ListCaseTable = (props) => {
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage]     = useState('');
  const [previewTitle, setPreviewTitle]     = useState('');
  const [images, setImages]                 = useState([]);
  const [placeId, setPlaceId]               = useState(props.placeId ? props.placeId : null);
  const [placeToChoose, setPlaceToChoose]   = useState([]);
  const [dataInsert, setDataInsert]         = useState(props.dataInsert ? props.dataInsert : {});
  const [placeTypeText, setPlaceTypeText]   = useState('');
  const [isSubmit, setIsSubmit]             = useState(false);
  const [errors, setErrors]                 = useState(false);
  const [codePrefix, setCodePrefix]         = useState(false);
  const [fosters, setFosters]               = useState([]);
  const [owners, setOwners]                 = useState([]);

  useEffect(() => {
    getAllFosters()
    getAllOwners()
  }, [])

  useEffect(() => {
    getPlaceSelect()
    setPlaceTypeText(PLACE_TYPE_TEXT[dataInsert.place_type])
  }, [dataInsert.place_type])

  useEffect(() => {
    let $year   = dataInsert.receive_date ? String(dataInsert.receive_date.year()).slice(2) : '';
    let $type   = dataInsert.type ? (dataInsert.type == CASE_TYPE.DOG ? 'D' : (dataInsert.type == CASE_TYPE.CAT ? 'C' : 'O')) : '';
    let $gender = dataInsert.gender ? (dataInsert.gender == GENDER.MAN ? 'M' : (dataInsert.gender == GENDER.FAMALE ? 'F' : 'O')) : '';
    setCodePrefix($year + $type + $gender)
  }, [dataInsert.type, dataInsert.gender, dataInsert.receive_date])


  const getAllFosters = async () => {
    let response = await PlaceService.getPlaces({}, '', 3)
    setFosters(response.data.places)
  }

  const getAllOwners = async () => {
    let response = await PlaceService.getPlaces({}, '', 4)
    setOwners(response.data.places)
  }

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

  const handleCreateCase = async () => {
    setIsSubmit(true)
    var data = {
      ...dataInsert,
      place_id: placeId
    }

    let response = await props.submitAction(data, images)
    if (response.code === 1) {

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

  const uploadButton = (
    <div>
      <PlusOutlined/>
      <div style={{marginTop: 8}}>Upload</div>
    </div>
  );

  return (<div className="home-page">
      <Row justify="space-between" className="filter-row">
        <Col span={8}>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={images}
            multiplemultiple={true}
            accept="image/x-png,image/gif,image/jpeg"
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
              <Input addonBefore={codePrefix} value={dataInsert.code}
                     onChange={(e) => editDataInsert('code', e.target.value)}/>
              {errors.code && <span className="text-red">{errors.code[0]}</span>}
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
                  {errors.receive_date && <span className="text-red">{errors.receive_date[0]}</span>}
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
                  {errors.receive_place && <span className="text-red">{errors.receive_place[0]}</span>}

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
                  {errors.name && <span className="text-red">{errors.name[0]}</span>}
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={8} className="padding-left-sm">Loài</Col>
                <Col span={16}>
                  <Select className="w-100"
                          placeholder="Chọn Loài"
                          value={dataInsert.type}
                          onChange={(e) => editDataInsert('type', e)}>
                    <Option value="1">Chó</Option>
                    <Option value="2">Mèo</Option>
                    <Option value="3">Khác</Option>
                  </Select>
                  {errors.type && <span className="text-red">{errors.type[0]}</span>}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Row>
                <Col span={8}>Giới tính</Col>
                <Col span={16}>
                  <Select className="w-100"
                          placeholder="Chọn giới tính"
                          value={dataInsert.gender}
                          onChange={(e) => editDataInsert('gender', e)}>
                    <Option value="1">Đực</Option>
                    <Option value="2">Cái</Option>
                    <Option value="3">Chưa rõ</Option>
                  </Select>
                  {errors.gender && <span className="text-red">{errors.gender[0]}</span>}
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={8} className="padding-left-sm">Tuổi</Col>
                <Col span={8}>
                  <Input
                    placeholder="Nhập số tháng"
                    width="100%"
                    className="w-100"
                    value={dataInsert.age_month}
                    onChange={(e) => editDataInsert('age_month', e.target.value)}/>
                  {errors.age_month && <span className="text-red">{errors.age_month[0]}</span>}
                </Col>
                <Col span={8}>
                  <Input
                    placeholder="Nhập số năm"
                    width="100%"
                    className="w-100"
                    value={dataInsert.age_year}
                    onChange={(e) => editDataInsert('age_year', e.target.value)}/>
                  {errors.age_year && <span className="text-red">{errors.age_year[0]}</span>}
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col span={4}>Nơi ở hiện tại</Col>
            <Col span={20}>
              <Select className="w-100"
                      showSearch
                      placeholder="Chọn nơi ở hiện tại"
                      value={dataInsert.place_type}
                      onChange={(e) => editDataInsert('place_type', e)} style={{width: "100%"}}>
                <Option value="" key="0" disabled>Chọn nơi ở hiện tại</Option>
                <Option value={1} key="1">Phòng Phám</Option>
                <Option value={2} key="2">Nhà chung</Option>
                <Option value={3} key="3">Nhà Foster</Option>
                <Option value={4} key="4">Nhà Chủ nuôi mới</Option>
              </Select>
              {errors.place_type && <span className="text-red">{errors.place_type[0]}</span>}

            </Col>
          </Row>
          {
            placeToChoose.length > 0 &&
            <Row>
              <Col span={4}>
                Chọn {placeTypeText}
              </Col>
              <Col span={20}>
                <Select className="w-100"
                        showSearch
                        placeholder={'Chọn ' + placeTypeText}
                        value={placeId}
                        filterOption={(input, option) =>
                          option.children && option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={(e) => setPlaceId(e)} style={{width: "100%"}}>
                  {
                    placeToChoose.map(function (place, key) {
                      return <Option value={place.id} key={key}>{place.name}</Option>
                    })
                  }
                </Select>
                {errors.place_id && <span className="text-red">{errors.place_id[0]}</span>}
              </Col>
            </Row>
          }
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
              {errors.description && <span className="text-red">{errors.description[0]}</span>}

            </Col>
          </Row>
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
              {errors.status && <span className="text-red">{errors.status[0]}</span>}
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              Chọn Foster
            </Col>
            <Col span={20}>
              <Select className="w-100"
                      showSearch
                      placeholder='Chọn Foster'
                      value={dataInsert.foster_id}
                      filterOption={(input, option) =>
                        option.children && option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                      onChange={(e) => editDataInsert('foster_id', e)} style={{width: "100%"}}>
                <Option value=""></Option>
                {
                  fosters.map(function (foster, key) {
                    return <Option value={foster.id} key={key}>{foster.name}</Option>
                  })
                }
              </Select>
              {errors.foster_id && <span className="text-red">{errors.foster_id[0]}</span>}

            </Col>
          </Row>


          <Row>
            <Col span={4}>
              Chọn chủ nuôi
            </Col>
            <Col span={20}>
              <Select className="w-100"
                      showSearch
                      placeholder='Chọn chủ nuôi'
                      value={dataInsert.owner_id}
                      filterOption={(input, option) =>
                        option.children && option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                      onChange={(e) => editDataInsert('owner_id', e)} style={{width: "100%"}}>
                <Option value=""></Option>
                {
                  owners.map(function (owner, key) {
                    return <Option value={owner.id} key={key}>{owner.name}</Option>
                  })
                }
              </Select>
              {errors.owner_id && <span className="text-red">{errors.owner_id[0]}</span>}
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
              {errors.note && <span className="text-red">{errors.note[0]}</span>}

            </Col>
          </Row>
          <Row>
            <Col span={24} className="text-center">
              <Button type="primary"
                      size="large"
                      disabled={isSubmit}
                      onClick={handleCreateCase}>
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
    </div>
  )
}


export default ListCaseTable