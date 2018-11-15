// modules导入
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {Form, Input, Button, Card, Upload, Icon, Modal, Select, Spin} from 'antd';
import debounce from 'lodash/debounce';

// 本地导入
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {REMOTE_URL} from '../../utils/config';

const FormItem = Form.Item;

@connect(({ loading }) => ({
    submitting: loading.effects['gift/giftAdd'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
    constructor(props) {
        super(props);
        this.lastFetchId = 0;
        this.fetchUser = debounce(this.fetchUser, 800);
    }

    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
        data: [],
        value: [],
        fetching: false,
    };

    handleCancel = () => this.setState({previewVisible: false});

    handlePreview = file => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };

    handleChange = ({fileList, file}) => {
        this.setState({fileList});

        if (file.status === 'done') {
            let str = '';
            for (let i = 0; i < fileList.length; i += 1) {
                str += `${fileList[i].response.data.path},`;
            }
            this.props.form.setFieldsValue({gift_imgs: str});
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

    fetchUser = value => {
        value = value || '';
        this.lastFetchId += 1;
        const fetchId = this.lastFetchId;
        this.setState({data: [], fetching: true});
        fetch(`${REMOTE_URL}admin/searchSchoolByName?name=${value}`)
            .then(response => response.json())
            .then(body => {
                if (fetchId !== this.lastFetchId) {
                    // for fetch callback order
                    return;
                }
                const data = body.data.data.map(user => ({
                    text: user.name,
                    value: user.id,
                }));
                this.setState({data, fetching: false});
            });
    };

    handleSelectChange = value => {
        if (value.label) {
            const name = value.label;
            fetch(`${REMOTE_URL}admin/searchSchoolByName?name=${name}&type=choose`);
        }
        this.setState({
            value,
            data: [],
            fetching: false,
        });
    };

    render() {
        const {submitting} = this.props;
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 7},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 12},
                md: {span: 10},
            },
        };

        const submitFormLayout = {
            wrapperCol: {
                xs: {span: 24, offset: 0},
                sm: {span: 10, offset: 7},
            },
        };

        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        const {fetching, data, value} = this.state;

        return (
            <PageHeaderLayout title="Gift添加">
                <Card bordered={false}>
                    <Form onSubmit={this.handleSubmit} hideRequiredMark style={{marginTop: 8}}>
                        <FormItem {...formItemLayout} label="*商品名称">
                            {getFieldDecorator('title', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入商品名称',
                                    },
                                ],
                            })(<Input placeholder="商品名称"/>)}
                        </FormItem>

                        <FormItem {...formItemLayout} label="学校ID">
                            {getFieldDecorator('school_id')(
                                <Select
                                    labelInValue
                                    value={value}
                                    placeholder="Select users"
                                    notFoundContent={fetching ? <Spin size="small"/> : null}
                                    filterOption={false}
                                    showSearch
                                    onFocus={this.fetchUser}
                                    onSearch={this.fetchUser}
                                    onChange={this.handleSelectChange}
                                    style={{width: '100%'}}
                                >
                                    {data.map(d => <Option key={d.value}>{d.text}</Option>)}
                                </Select>
                            )}
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
                            })(<Input placeholder="请标明积分"/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="*数量">
                            {getFieldDecorator('num', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入数量',
                                    },
                                ],
                            })(<Input placeholder="请标明数量"/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="加价购买">
                            {getFieldDecorator('prize')(<Input placeholder="请标明价格 默认: 0元"/>)}
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
                                        <img alt="example" style={{width: '100%'}} src={previewImage}/>
                                    </Modal>
                                </div>
                            )}
                        </FormItem>

                        <FormItem {...submitFormLayout} style={{marginTop: 32}}>
                            <Button type="primary" htmlType="submit" loading={submitting}>
                                提交
                            </Button>
                            <Button style={{marginLeft: 8}} href="#/gift/gift-lst">
                                返回列表
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
            </PageHeaderLayout>
        );
    }
}
