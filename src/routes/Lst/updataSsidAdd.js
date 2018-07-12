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
  submitting: loading.effects['ssid_lst/addSsid'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  constructor(props) {
    super(props);

    window.addEventListener(
      'message',
      function(event) {
        // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
        const loc = event.data;
        if (loc && loc.module === 'locationPicker') {
          props.form.setFieldsValue({
            lat: loc.latlng.lat,
            lng: loc.latlng.lng,
            name: loc.poiname,
            addr: loc.poiaddress,
          });
        }
      },
      false
    );
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'ssid_lst/addSsid',
          payload: values,
        });
      }
    });
  };
  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  // 当前控件改变时动态设置其他控件的值 怎么设置当前控件的值?
  logoOnChange = e => {
    if (e.file.status === 'done') {
      this.props.form.setFieldsValue({ logo: e.file.response.data.path });
    }
  };
  loginBgOnChange = e => {
    if (e.file.status === 'done') {
      this.props.form.setFieldsValue({ login_bg: e.file.response.data.path });
    }
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
      <PageHeaderLayout title="学校添加" content="太棒了,又一所学校即将支持小程序认证。">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="school_id">
              {getFieldDecorator('school_id', {
                rules: [
                  {
                    required: true,
                    message: '请输入默认school_id',
                  },
                ],
              })(<Input placeholder="这个学校的school_id" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="ssid">
              {getFieldDecorator('ssid', {
                rules: [
                  {
                    required: true,
                    message: '请输入默认ssid',
                  },
                ],
              })(<Input placeholder="这个学校的ssid" />)}
            </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }} href="#/lst/Ac-lst">
                返回列表
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
