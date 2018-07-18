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
      <PageHeaderLayout title="AP修改" content="太棒了,又一所学校即将支持小程序认证。">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="默认ACID">
              {getFieldDecorator('ap_name', {
                initialValue: apDetail.ap_name,
                rules: [
                  {
                    required: true,
                    message: '请输入ap_name',
                  },
                ],
              })(<Input placeholder="这个学校的ap_name" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="ip_addr">
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
            <FormItem {...formItemLayout} label="ap_model">
              {getFieldDecorator('ap_model', {
                initialValue: apDetail.ap_model,
                rules: [
                  {
                    required: true,
                    message: '请输入备注',
                  },
                ],
              })(<Input placeholder="ap_model" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="ap_mac">
              {getFieldDecorator('ap_mac', {
                initialValue: apDetail.ap_mac,
                rules: [
                  {
                    required: true,
                    message: '请输入学校的ap_mac',
                  },
                ],
              })(<Input placeholder="请输入学校的ap_mac" />)}
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
