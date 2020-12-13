import React          from 'react'
import './style.scss'
import {Divider}      from 'antd';
import CaseService    from '../../../service/CaseService';
import CreateCaseForm from "../../component/CreateCaseForm"

const ListCase = () => {
  const handleCreateCase = async (data, images) => {
    return await CaseService.createCase(data, images)
  }


  return (<div className="home-page">
    <Divider orientation="left">
      <h4 className="text-primary-green left-align padding-left-xs">Tạo case</h4>
    </Divider>

    <CreateCaseForm
      dataInsert={{}}
      submitAction={handleCreateCase}
    />
  </div>)
}

export default ListCase