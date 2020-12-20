import React, {useState, useEffect}                                       from 'react'
import './style.scss'
import {Row, Col, Divider, Descriptions, Tag, Popconfirm, message, Modal} from 'antd';
import {PLACE_TYPE, ROLE_TAG}                                             from '../../../config'
import {useHistory, useParams}                                            from "react-router";
import UserService                                                        from "../../../service/UserService";
import "react-image-gallery/styles/scss/image-gallery.scss";
import PlaceService                                                       from "../../../service/PlaceService";
import CreateUser                                                     from "../../component/Form/CreateUser";
import CreatePlaceForm                                                    from "../../component/Form/CreatePlace";

const DetailCase = () => {
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [info, setInfo] = useState({});
  const [dataToEdit, setDataToEdit] = useState({});
  const history         = useHistory()
  var {id}              = useParams()

  useEffect(() => {
    getDetailInfo()
  }, [])

  const getDetailInfo = async () => {
    let response = await UserService.getUserDetail(id);
    setInfo(response.data)
  }

  const confirmDelete = async () => {
    let response = await UserService.deleteUser(id);
    if (response.code === 1) {
      message.success('Xóa thành công');
      history.push('/list-user')
    } else {
      message.error(response.message ? response.message : 'Xóa thất bại, vui lòng liên hệ kỹ thuật');
    }
  }

  const editUser = async (data) => {
    return await UserService.editUser(data, id);
  }

  const afterEdit = () => {
    getDetailInfo();
    setVisibleModalEdit(false);
    message.success('Sửa thành công');
  }

  useEffect(() => {
    convertDataToEdit()
  }, [info])

  const convertDataToEdit = () => {
    if(!info.roles) return;
    let userRoles = info.roles.map(function (role) {
      return role.id
    })
    setDataToEdit({
      ...info,
      roles: userRoles
    })
  }

  return (<div className="detail-user-page">
    <Divider>
      <h4 className="text-primary-green left-align padding-left-xs margin-bottom-none">Thông tin thành
        viên {info.code_full}</h4>
    </Divider>
    <div className="margin-bottom-md text-center">
      <a className="button-link margin-right-sm link-orange" onClick={() => setVisibleModalEdit(true)}>Sửa</a>
      <Popconfirm
        title="Are you sure to delete this task?"
        onConfirm={confirmDelete}
        okText="Yes"
        cancelText="No"
      >
        <a className="button-link button-link-delete link-orange">Xóa</a>
      </Popconfirm>
    </div>
    <Row justify="space-between">
      <Col offset={5} span={14} className="padding-left-sm">
        <Descriptions
          bordered
          column={1}
        >
          <Descriptions.Item label="Tên">{info.name}</Descriptions.Item>
          <Descriptions.Item label="Email" span={2}>{info.email} </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ" span={2}>{info.address} </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại" span={2}>{info.phone} </Descriptions.Item>
          <Descriptions.Item label="Ghi chú" span={2}>{info.note} </Descriptions.Item>
          <Descriptions.Item label="Chuyên môn" span={2}>
            {
              info.roles && info.roles.map(function (role, key) {
                return <Tag key={key} color={ROLE_TAG[role.id]}>{role.role_description}</Tag>
              })
            }
          </Descriptions.Item>
        </Descriptions>
      </Col>
    </Row>

    <Modal
      title="Sửa thông tin người dùng"
      visible={visibleModalEdit}
      width="90vw"
      okButtonProps={{style: {display: 'none'}}}
      cancelButtonProps={{style: {display: 'none'}}}
      onCancel={() => setVisibleModalEdit(false)}
    >
      <CreateUser
        dataInsert={dataToEdit}
        submitAction={editUser}
        afterSubmit={afterEdit}
        buttonText="Sửa người dùng"
        />
    </Modal>

  </div>)
}

export default DetailCase