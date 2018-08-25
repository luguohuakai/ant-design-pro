/* eslint-disable linebreak-style */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Card, Radio, Icon, Tooltip, Upload, Avatar } from 'antd';
import ColorSimple from 'components/SketchPicker';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './SchoolAdd.less';

const FormItem = Form.Item;
let id;

@connect(({ lst, loading }) => ({
  lst,
  submitting: loading.effects['lst/updateSchool'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  constructor(props) {
    super(props);

    // window.removeEventListener('message', this.fillForm, false);
    window.addEventListener('message', this.fillForm, false);
  }
  state = {
    fileList: [],
    fileList1: [],
  };
  componentDidMount() {
    const url = window.location.href;
    id = url.split('=')[1];
    this.props.dispatch({
      type: 'lst/fetchSchoolDetail',
      payload: {
        id,
      },
    });
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.fillForm, false);
  }

  fillForm = data => {
    const loc = data.data;
    if (loc && loc.module === 'locationPicker') {
      console.log('update');
      this.props.form.setFieldsValue({
        lat: loc.latlng.lat,
        lng: loc.latlng.lng,
        name: loc.poiname,
        addr: loc.poiaddress,
      });
    } else {
      console.log('update_unmount');
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      values.id = id;
      if (!err) {
        this.props.dispatch({
          type: 'lst/updateSchool',
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
    let fileList = e.fileList;
    if (e.file.status === 'done') {
      this.props.form.setFieldsValue({ logo: e.file.response.data.path });
    }
    this.setState({ fileList });
  };

  loginBgOnChange = e => {
    let fileList1 = e.fileList;
    if (e.file.status === 'done') {
      this.props.form.setFieldsValue({ login_bg: e.file.response.data.path });
    }
    this.setState({ fileList1 });
  };

  render() {
    const { submitting } = this.props;
    const { fileList, fileList1 } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { lst } = this.props;
    const { schoolDetail } = lst;
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
    const uploadButton = (
      <div>
        <Button>
          <Icon type="upload" />上传logo
        </Button>
      </div>
    );
    const uploadButton1 = (
      <div>
        <Button>
          <Icon type="upload" />上传logoBg
        </Button>
      </div>
    );
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
              <iframe
                id="mapPage"
                width="100%"
                height="500px"
                frameBorder="0"
                src="http://apis.map.qq.com/tools/locpicker?search=1&type=1&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp"
              />
            )}
          </FormItem>
        </Card>
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="学校名">
              {getFieldDecorator('name', {
                initialValue: schoolDetail.name,
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
                initialValue: schoolDetail.addr,
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
                initialValue: schoolDetail.lng,
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
                initialValue: schoolDetail.lat,
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
                initialValue: schoolDetail.default_ac_id,
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
                  {' '}
                  Logo<em className={styles.optional}>（选填）</em>
                </span>
              }
            >
              <span>(*一次只能选择一张)</span>
              {getFieldDecorator('_logo', {
                valuePropName: 'setFieldsValue',
                getValueFromEvent: this.normFile,
              })(
                <div>
                  <Upload
                    name="logo"
                    // action="http://106.14.7.51/admin/Index/uploadImg"
                    action={location.origin + '/admin/Index/uploadImg'}
                    listType="picture-card"
                    className="avatar-uploader"
                    // disabled={this.state.fileList.length ===1}
                    fileList={fileList}
                    onChange={this.logoOnChange}
                  >
                    {fileList.length >= 1 ? null : uploadButton}
                  </Upload>
                </div>
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={
                <span>
                  {' '}
                  Logo<em className={styles.optional}>原logo</em>
                </span>
              }
            >
              {getFieldDecorator('logo', {
                rules: [
                  {
                    // required: true,
                    // message: '选择Logo',
                  },
                ],
              })(<Avatar shape="square" size="large" src="" />)}
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
                <div>
                  <Upload
                    name="login_bg"
                    // action="http://106.14.7.51/admin/Index/uploadImg"
                    action={location.origin + '/admin/Index/uploadImg'}
                    listType="picture-card"
                    className="avatar-uploader"
                    fileList={fileList1}
                    onChange={this.loginBgOnChange}
                  >
                    {fileList1.length >= 1 ? null : uploadButton1}
                  </Upload>
                </div>
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={
                <span>
                  {' '}
                  背景<em className={styles.optional}>原背景</em>
                </span>
              }
            >
              {getFieldDecorator('login_bg', {
                rules: [
                  {
                    // required: true,
                    // message: '选择背景',
                  },
                ],
              })(
                <Avatar
                  shape="square"
                  size="large"
                  src="http://106.14.7.51/upload/logo/20180704/474a955961f1ca0be7a3b057816ae487.png"
                />
              )}
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
