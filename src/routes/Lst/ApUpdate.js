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

@connect(({ ap_lst, loading }) => ({
  ap_lst,
  submitting: loading.effects['ap_lst/updateAp'],
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
      type: 'ap_lst/fetchApDetail',
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
          type: 'ap_lst/updateAp',
          payload: value,
        });
      }
    });
  };

  render() {
    const { submitting } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { ap_lst } = this.props;
    const { apDetail } = ap_lst;
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
      <PageHeaderLayout title="AP修改">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="AP_NAME">
              {getFieldDecorator('ap_name', {
                initialValue: apDetail.ap_name,
                rules: [
                  {
                    required: true,
                    message: '请输入AP_NAME',
                  },
                ],
              })(<Input placeholder="这个学校的AP_NAME" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="地址">
              {getFieldDecorator('ip_addr', {
                initialValue: apDetail.ip_addr,
                rules: [
                  {
                    required: true,
                    message: '请输入学校的ap_mac',
                  },
                ],
              })(<Input placeholder="请输入学校的ap_mac" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="AP_MAC">
              {getFieldDecorator('ap_mac', {
                initialValue: apDetail.ap_mac,
                rules: [
                  {
                    required: true,
                    message: '请输入AP_MAC',
                  },
                ],
              })(<Input placeholder="请输入AP_MAC" />)}
            </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }} href="#/lst/ap-lst">
                返回列表
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
