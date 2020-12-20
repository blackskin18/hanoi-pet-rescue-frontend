import React, {useState, useEffect} from 'react'
import './style.scss'
import {Image, Table, Tabs}         from 'antd';
import {Link}                       from "react-router-dom";

const {TabPane} = Tabs;

const PlaceHistoryTable = (props) => {
  const imagePrefix = props.historyData.image_prefix_url
  const [all, setAll] = useState(props.historyData.all)
  const [now, setNow] = useState(props.historyData.now)

  useEffect(() => {
    setAll(props.historyData.all)
    setNow(props.historyData.now)
  }, [props.historyData])


  const columnsAll = [
    {
      title    : 'Ảnh',
      dataIndex: 'image',
      key      : 'image',
      render: (value, object) => {
        let images = object.animal.animal_image;
        if(images.length === 0) return '';

        let src = imagePrefix + '/' + object.animal_id + '/' + images[images.length - 1].file_name;
        return <Image src={src} width={100} height={100} className="animal-image"/>
      }
    },
    {
      title    : 'code',
      dataIndex: 'code',
      key      : 'code',
      render: (value, object) => {
        return <Link to={"/detail-case/" + object.animal_id}>{object.animal.code_full}</Link>
      }
    },
    {
      title    : 'Ngày cứu hộ',
      dataIndex: 'note',
      key      : 'note',
      render: (value, object) => {
        let receive_date = object.animal.receive_date
        return <span>{receive_date && receive_date.split(' ')[0]}</span>
      }
    },
  ];

  const columnsNow = [
    {
      title    : 'Ảnh',
      dataIndex: 'image',
      key      : 'image',
      render: (value, object) => {
        let images = object.animal_image;
        if(images.length === 0) return '';

        let src = imagePrefix + '/' + object.id + '/' + images[images.length - 1].file_name;
        return <Image src={src} width={100} height={100} className="animal-image"/>
      }
    },
    {
      title    : 'code',
      dataIndex: 'code',
      key      : 'code',
      render: (value, object) => {
        return <Link to={"/detail-case/" + object.id}>{object.code_full}</Link>
      }
    },
    {
      title    : 'Ngày cứu hộ',
      dataIndex: 'note',
      key      : 'note',
      render: (value, object) => {
        let receive_date = object.receive_date
        return <span>{receive_date && receive_date.split(' ')[0]}</span>
      }
    },
  ];

  return (<div>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Đang lưu trú" key="1">
          <Table
            columns={columnsNow}
            dataSource={now}
            pagination={false}
            bordered
          />
        </TabPane>
        <TabPane tab="Đã từng lưu trú" key="2">
          <Table
            columns={columnsAll}
            dataSource={all}
            pagination={false}
            bordered
          />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default PlaceHistoryTable