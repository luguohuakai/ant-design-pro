import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
    Form,
    Input,
    Button,
    Card,
    Upload,
    Icon,
    Modal,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {REMOTE_URL} from "../../utils/config";

const FormItem = Form.Item;

@connect(({ loading }) => ({
    submitting: loading.effects['gift/giftAdd'],
}))
@Form.create()

export default class BasicForms extends PureComponent {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };

    handleChange = ({ fileList, file }) => {
        this.setState({ fileList });

        if (file.status === 'done') {
            let str = '';
            for (let i = 0; i < fileList.length; i += 1) {
                str += `${fileList[i].response.data.path  },`;
            }
            this.props.form.setFieldsValue({gift_imgs: str})
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: 'gift/giftAdd',
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

        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
          <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
          </div>
        );

        return (
          <PageHeaderLayout title="Gift添加">
            <Card bordered={false}>
              <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
                  <FormItem {...formItemLayout} label="*商品名称">
                  {getFieldDecorator('title', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入商品名称',
                                    },
                                ],
                            })(<Input placeholder="商品名称" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="学校ID">
                    {getFieldDecorator('school_id')(<Input placeholder="请输入学校ID 默认所有学校"/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="描述">
                    {getFieldDecorator('description')(<Input placeholder="请标明描述"/>)}
                </FormItem>
                  <FormItem {...formItemLayout} label="*所需积分">
                  {getFieldDecorator('need_score', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入积分',
                                    },
                                ],
                            })(<Input placeholder="请标明积分" />)}
                </FormItem>
                  <FormItem {...formItemLayout} label="*数量">
                  {getFieldDecorator('num', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入数量',
                                    },
                                ],
                            })(<Input placeholder="请标明数量" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="加价购买">
                  {getFieldDecorator('prize')(<Input placeholder="请标明价格 默认: 0元" />)}
                </FormItem>
                  <FormItem {...formItemLayout} label="*商品相册">
                  {getFieldDecorator('gift_imgs', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择商品图片',
                                    },
                                ],
                            })(
                              <div className="clearfix">
                                <Upload
                                  name="gift"
                                  action={`${REMOTE_URL}admin/Index/uploadImg`}
                                  listType="picture-card"
                                  fileList={fileList}
                                  onPreview={this.handlePreview}
                                  onChange={this.handleChange}
                                >
                                    {fileList.length >= 5 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                              </div>
                  )}
                </FormItem>

                <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                  <Button type="primary" htmlType="submit" loading={submitting}>
                                提交
                  </Button>
                  <Button style={{ marginLeft: 8 }} href="#/gift/gift-lst">
                                返回列表
                  </Button>
                </FormItem>
              </Form>
            </Card>
          </PageHeaderLayout>
        );
    }
}
