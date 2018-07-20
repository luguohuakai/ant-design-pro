/* eslint-disable linebreak-style */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, DatePicker, Select, Card, Row, Col } from 'antd';
import ColorSimple from 'components/SketchPicker';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './AuthLogLst.less';

const { Description } = DescriptionList;
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
let id = '';

@connect(({ log_lst }) => ({
  log_lst,
}))
@Form.create()
export default class BasicForms extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const url = window.location.href;
    id = url.split('=')[1];
    this.props.dispatch({
      type: 'log_lst/fetchUserDetail',
      payload: {
        id,
      },
    });
  }

  render() {
    const { log_lst } = this.props;
    const { logDetail } = log_lst;
    return (
      <PageHeaderLayout title="日志详情">
        <Card bordered={false} gutter={24}>
          <DescriptionList size="large" title="日志详情" style={{ marginBottom: 32 }}>
            <Description term="ID">{logDetail.id}</Description>
            <Description term="用户ID">{logDetail.uid}</Description>
            <Description term="账号">{logDetail.account}</Description>
            <Description term="Bssid">{logDetail.bssid}</Description>
            <Description term="学校ID">{logDetail.school_id}</Description>
            <Description term="经度">{logDetail.lng}</Description>
            <Description term="纬度">{logDetail.lat}</Description>
            <Description term="登录时间">{logDetail.create_time}</Description>
            <Description term="更新时间">{logDetail.update_time}</Description>
          </DescriptionList>
        </Card>
      </PageHeaderLayout>
    );
  }
}
