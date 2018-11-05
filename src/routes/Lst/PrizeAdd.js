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
  submitting: loading.effects['prize_lst/addPrize'],
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
          type: 'prize_lst/addPrize',
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
    logoOnChange = e => {
        if (e.file.status === 'done') {
            this.props.form.setFieldsValue({ img: e.file.response.data.path });
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
      <PageHeaderLayout title="prize添加">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="SCHOOLID">
              {getFieldDecorator('school_id', {
                rules: [
                  {
                    required: true,
                    message: '请输入SCHOOLID',
                  },
                ],
              })(<Input placeholder="这个学校的SCHOOLID" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="title">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入学校的title',
                  },
                ],
              })(<Input placeholder="请输入学校ID" />)}
            </FormItem>
              <FormItem
                  {...formItemLayout}
                  label={
                      <span>
                  图片<em className={styles.optional}>（选填）</em>
                </span>
                  }
              >
                  {getFieldDecorator('_img', {
                      valuePropName: 'fileList',
                      getValueFromEvent: this.normFile,
                  })(
                      <Upload
                          name="img"
                          action={location.origin + '/admin/Index/uploadImg'}
                          listType="picture-card"
                          className="avatar-uploader"
                          onChange={this.logoOnChange}
                      >
                          <Button>
                              <Icon type="upload" /> 选择图片
                          </Button>
                      </Upload>
                  )}
              </FormItem>

              <FormItem {...formItemLayout}>
                  {getFieldDecorator('img', {
                      rules: [
                          {

                          },
                      ],
                  })(<Input type="hidden" />)}
              </FormItem>
            <FormItem {...formItemLayout} label="描述">
              {getFieldDecorator('desc', {
                rules: [
                  {
                    required: true,
                    message: '请输入描述',
                  },
                ],
              })(<Input placeholder="请标明描述" />)}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }} href="#/lst/prize">
                取消
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
