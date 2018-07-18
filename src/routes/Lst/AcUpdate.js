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

@connect(({ ac_lst, loading }) => ({
  ac_lst,
  submitting: loading.effects['ac_lst/updateAc'],
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
      type: 'ac_lst/fetchAcDetail',
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
          type: 'ac_lst/updateAc',
          payload: value,
        });
      }
    });
  };

  render() {
    const { submitting } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { ac_lst } = this.props;
    const { acDetail } = ac_lst;
    // console.log('woshidetail:',acDetail)
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
      <PageHeaderLayout title="AC修改">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="ACID">
              {getFieldDecorator('ac_id', {
                initialValue: acDetail.ac_id,
                rules: [
                  {
                    required: true,
                    message: '请输入ACID',
                  },
                ],
              })(<Input placeholder="这个555学校的ACID" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="SCHOOL_ID">
              {getFieldDecorator('school_id', {
                initialValue: acDetail.school_id,
                rules: [
                  {
                    required: true,
                    message: '请输入学校的school_id',
                  },
                ],
              })(<Input placeholder="请输入学校的school_id" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="NOTE">
              {getFieldDecorator('note', {
                initialValue: acDetail.note,
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
                返回列表
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
