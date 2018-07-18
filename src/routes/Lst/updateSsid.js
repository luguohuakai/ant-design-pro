/* eslint-disable linebreak-style */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  Radio,
  Icon,
  Tooltip,
  Upload,
  message,
} from 'antd';
import ColorSimple from 'components/SketchPicker';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './SchoolAdd.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
let id = '';

@connect(({ ssid_lst, loading }) => ({
  ssid_lst,
  submitting: loading.effects['ssid_lst/updateSsid'],
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
      type: 'ssid_lst/fetchSsidDetail',
      payload: {
        id,
      },
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, value) => {
      value.id = id;
      console.error(value);
      if (!err) {
        this.props.dispatch({
          type: 'ssid_lst/updateSsid',
          payload: value,
        });
      }
    });
  };

  render() {
    const { submitting } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { ssid_lst } = this.props;
    const { ssidDetail } = ssid_lst;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout title="SSID修改">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="SCHOOL_ID">
              {getFieldDecorator('school_id', {
                initialValue: ssidDetail.school_id,
                rules: [
                  {
                    required: true,
                    message: '请输入默认SCHOOL_ID',
                  },
                ],
              })(<Input placeholder="这个学校的SCHOOL_ID" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="SSID">
              {getFieldDecorator('ssid', {
                initialValue: ssidDetail.ssid,
                rules: [
                  {
                    required: true,
                    message: '请输入默认SSID',
                  },
                ],
              })(<Input placeholder="这个学校的SSID" />)}
            </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }} href="#/lst/ssid-lst">
                返回列表
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
