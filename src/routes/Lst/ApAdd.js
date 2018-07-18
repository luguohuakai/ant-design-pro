/* eslint-disable linebreak-style */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, DatePicker, Select, Button, Card } from 'antd';
import ColorSimple from 'components/SketchPicker';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './ApAdd.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['ap_lst/addAp'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  constructor(props) {
    super(props);
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'ap_lst/addAp',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting } = this.props;
    const { getFieldDecorator } = this.props.form;

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
      <PageHeaderLayout title="AP添加" content="太棒了,又一所学校即将支持小程序认证。">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="AP_NAME">
              {getFieldDecorator('ap_name', {
                rules: [
                  {
                    required: true,
                    message: '请输入ap_name',
                  },
                ],
              })(<Input placeholder="这个学校的ap_name" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="地址">
              {getFieldDecorator('ip_addr', {
                rules: [
                  {
                    required: true,
                    message: '请输入学校的地址',
                  },
                ],
              })(<Input placeholder="请输入学校的地址" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="AP_MAC">
              {getFieldDecorator('ap_mac', {
                rules: [
                  {
                    required: true,
                    message: '请输入Ap_mac',
                  },
                ],
              })(<Input placeholder="请输入AP_MAC" />)}
            </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }} href="#/lst/ap-lst">
                取消
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
