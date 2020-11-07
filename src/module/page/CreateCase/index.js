import React, {useState, useEffect}                                             from 'react'
import './style.scss'
import {Row, Col, Divider, Table, Tag, Space, Input, Button, Select, Modal, Upload, DatePicker} from 'antd';

const { Option } = Select;
const { TextArea } = Input;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const ListCase = () => {

  const [previewVisible, setPreviewVisible]=  useState(false)
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const [fileList, setFileList] = useState( [
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-xxx',
      percent: 50,
      name: 'image.png',
      status: 'uploading',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'error',
    },
  ]);

  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage( file.url || file.preview)
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ fileList }) => setFileList({ fileList });

  return (<div className="home-page">
    <Divider orientation="left">
      <h4 className="text-primary-green left-align padding-left-xs">Tạo case </h4>
    </Divider>
    <Row justify="space-between" className="filter-row" >
      <Col span={8}>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
        </Upload>
      </Col>
      <Col span={16} className="create-case__input-boxs">
        <Row>
          <Col offset={8} span={2}>CODE</Col>
          <Col span={6}>
            <Input addonBefore="20CM"/>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Row>
              <Col span={8}>Ngày nhận</Col>
              <Col span={16}>
                <DatePicker width="100%" className="w-100"/>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={8} className="padding-left-sm">Nơi nhận</Col>
              <Col span={16}>
                <Input className="w-100"/>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Row>
              <Col span={8}>Tên</Col>
              <Col span={16}>
                <Input width="100%" className="w-100"/>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={8} className="padding-left-sm">Loài</Col>
              <Col span={16}>
                <Select className="w-100">
                  <Option>Chó</Option>
                  <Option>Mèo</Option>
                  <Option>Khác</Option>
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
              placeholder="Autosize height with minimum and maximum number of lines"
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            Nơi ở hiện tại
          </Col>
          <Col span={20}>
            <Select className="w-100">
              <Option>Chó</Option>
              <Option>Mèo</Option>
              <Option>Khác</Option>
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            Trạng thái
          </Col>
          <Col span={20}>
            <Select className="w-100">
              <Option>Chó</Option>
              <Option>Mèo</Option>
              <Option>Khác</Option>
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
              <Col span={5}><Input /></Col>
              <Col span={3} className="padding-left-sm">ĐT:</Col>
              <Col span={5}><Input /></Col>
              <Col span={3} className="padding-left-sm">Đ/C:</Col>
              <Col span={5}><Input /></Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            Ghi chú
          </Col>
          <Col span={20}>
            <TextArea
              placeholder="Autosize height with minimum and maximum number of lines"
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Col>
        </Row>
      </Col>
    </Row>

    <Modal
      visible={previewVisible}
      title={previewTitle}
      footer={null}
      onCancel={handleCancel}
    >
      <img alt="example" style={{ width: '100%' }} src={previewImage} />
    </Modal>
  </div>)
}

export default ListCase