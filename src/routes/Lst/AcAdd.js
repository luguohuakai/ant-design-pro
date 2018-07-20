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

@connect(({ loading }) => ({
  submitting: loading.effects['ac_lst/addAc'],
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
          type: 'ac_lst/addAc',
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
      <PageHeaderLayout title="AC添加">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="ACID">
              {getFieldDecorator('ac_id', {
                rules: [
                  {
                    required: true,
                    message: '请输入ACID',
                  },
                ],
              })(<Input placeholder="这个学校的ACID" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="学校ID">
              {getFieldDecorator('school_id', {
                rules: [
                  {
                    required: true,
                    message: '请输入学校的ID',
                  },
                ],
              })(<Input placeholder="请输入学校ID" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="备注">
              {getFieldDecorator('note', {
                rules: [
                  {
                    required: true,
                    message: '请输入备注',
                  },
                ],
              })(<Input placeholder="请标明备注" />)}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }} href="#/lst/ac-lst">
                取消
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
