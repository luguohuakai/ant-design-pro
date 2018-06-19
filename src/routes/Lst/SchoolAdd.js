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
  submitting: loading.effects['lst/addSchool'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
    constructor(props) {
        super(props);

        window.addEventListener('message', function(event) {
            // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
            const loc = event.data;
            if (loc && loc.module === 'locationPicker') {
                props.form.setFieldsValue({
                    lat:loc.latlng.lat,
                    lng:loc.latlng.lng,
                    name:loc.poiname,
                    addr:loc.poiaddress,
                })
            }
        }, false);
    }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'lst/addSchool',
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
              <FormItem {...formItemLayout} label="搜索">
                  {getFieldDecorator('name')(
                      <iframe id="mapPage" width="100%" height="500px" frameBorder="0"
                              src="http://apis.map.qq.com/tools/locpicker?search=1&type=1&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp">
                      </iframe>
                  )}
              </FormItem>
          </Card>
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="学校名">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入校名',
                  },
                ],
              })(<Input placeholder="这个学校的名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="地址">
              {getFieldDecorator('addr', {
                rules: [
                  {
                    required: true,
                    message: '请输入地址',
                  },
                ],
              })(<Input placeholder="这个学校的地址" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="经度">
              {getFieldDecorator('lng', {
                rules: [
                  {
                    required: true,
                    message: '请输入经度',
                  },
                ],
              })(<Input placeholder="这个学校的经度" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="纬度">
              {getFieldDecorator('lat', {
                rules: [
                  {
                    required: true,
                    message: '请输入纬度',
                  },
                ],
              })(<Input placeholder="这个学校的纬度" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="默认ACID">
              {getFieldDecorator('default_ac_id', {
                rules: [
                  {
                    required: true,
                    message: '请输入默认ACID',
                  },
                ],
              })(<Input placeholder="这个学校的默认ACID" />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="是否为单AC"
              help="当前学校是否只有一台AC,或只有一台AC在投入使用"
            >
              <div>
                {getFieldDecorator('is_single_ac', {
                  initialValue: '1',
                })(
                  <Radio.Group>
                    <Radio value="1">是</Radio>
                    <Radio value="2">否</Radio>
                  </Radio.Group>
                )}
              </div>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  颜色
                  <em className={styles.optional}>
                    （选填）
                    <Tooltip title="当前学校的主色调">
                      <Icon type="info-circle-o" style={{ marginRight: 4 }} />
                    </Tooltip>
                  </em>
                </span>
              }
              help="当前学校的主色调"
            >
              {getFieldDecorator('color', {
                initialValue: '#000',
              })(<ColorSimple />)}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={
                <span>
                  Logo<em className={styles.optional}>（选填）</em>
                </span>
              }
            >
              {getFieldDecorator('_logo', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload
                  name="logo"
                  action="http://106.14.7.51/admin/Index/uploadImg"
                  listType="picture-card"
                  className="avatar-uploader"
                  onChange={this.logoOnChange}
                >
                  <Button>
                    <Icon type="upload" /> 选择Logo
                  </Button>
                </Upload>
              )}
            </FormItem>

              <FormItem {...formItemLayout}>
                  {getFieldDecorator('logo', {
                      rules: [
                          {
                              // required: true,
                              // message: '选择Logo',
                          },
                      ],
                  })(<Input type='hidden'/>)}
              </FormItem>

            <FormItem
              {...formItemLayout}
              label={
                <span>
                  认证后背景<em className={styles.optional}>（选填）</em>
                </span>
              }
            >
              {getFieldDecorator('_login_bg')(
                  <Upload
                      name="login_bg"
                      action="http://106.14.7.51/admin/Index/uploadImg"
                      listType="picture-card"
                      className="avatar-uploader"
                      onChange={this.loginBgOnChange}
                  >
                      <Button>
                          <Icon type="upload" /> 选择背景
                      </Button>
                  </Upload>
              )}
            </FormItem>

              <FormItem {...formItemLayout}>
                  {getFieldDecorator('login_bg', {
                      rules: [
                          {
                              // required: true,
                              // message: '选择背景',
                          },
                      ],
                  })(<Input type='hidden'/>)}
              </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }} href="#/lst/school-lst">
                取消
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
