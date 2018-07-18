/* eslint-disable linebreak-style */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, DatePicker, Select, Button, Card } from 'antd';
import ColorSimple from 'components/SketchPicker';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './SchoolAdd.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
let id = '';

@connect(({ user_lst, loading }) => ({
  user_lst,
  submitting: loading.effects['user_lst/updateUser'],
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
      type: 'user_lst/fetchUserDetail',
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
          type: 'user_lst/updateUser',
          payload: value,
        });
      }
    });
  };

  render() {
    const { submitting } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { user_lst } = this.props;
    const { userDetail } = user_lst;
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
      <PageHeaderLayout title="用户添加" content="太棒了,又一所学校即将支持小程序认证。">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="ID">
              {getFieldDecorator('id', {
                initialValue: userDetail.id,
                rules: [
                  {
                    required: true,
                    message: '请输入默认ID',
                  },
                ],
              })(<Input placeholder="这个学校的ID" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="昵称">
              {getFieldDecorator('wx_nick_name', {
                initialValue: userDetail.wx_nick_name,
                rules: [
                  {
                    required: true,
                    message: '微信昵称',
                  },
                ],
              })(<Input placeholder="微信昵称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="SCHOOL_ID">
              {getFieldDecorator('school_id', {
                initialValue: userDetail.school_id,
                rules: [
                  {
                    required: true,
                    message: '请输入SCHOOL_ID',
                  },
                ],
              })(<Input placeholder="请输入SCHOOL_ID" />)}
            </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }} href="#/lst/user-lst">
                返回列表
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
