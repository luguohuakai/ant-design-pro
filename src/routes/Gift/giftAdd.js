// modules导入
import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Form, Input, Button, Card, Upload, Icon, Modal, Select, Spin, message} from 'antd';
import debounce from 'lodash/debounce';

// 本地导入
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {REMOTE_URL} from '../../utils/config';

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({loading}) => ({
    submitting: loading.effects['gift/giftAdd'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
    constructor(props) {
        super(props);
        this.lastFetchId = 0;
        this.fetchSchool = debounce(this.fetchSchool, 800);
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

    fetchSchool = value => {
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
                const data = body.data.data.map(school => ({
                    text: school.name,
                    value: school.id,
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

    // 上传图片校验
    beforeUpload = (file) => {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJPG) {
            message.error('只允许上传JPG/PNG格式的图片！');
        }
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (!isLt2M) {
            message.error('图片必须小于 1MB!');
        }

        return isJPG && isLt2M;
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
                <div className="ant-upload-text">添加图片</div>
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

                        <FormItem {...formItemLayout} label="学校">
                            {getFieldDecorator('school_id')(
                                <Select
                                    labelInValue
                                    value={value}
                                    placeholder="哪所学校可以参与 不填代表所有"
                                    notFoundContent={fetching ? <Spin size="small"/> : null}
                                    filterOption={false}
                                    showSearch
                                    onFocus={this.fetchSchool}
                                    onSearch={this.fetchSchool}
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
                        <FormItem {...formItemLayout} label="*库存">
                            {getFieldDecorator('num', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入库存',
                                    },
                                ],
                            })(<Input placeholder="请标明库存"/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="原价">
                            {getFieldDecorator('prize')(<Input placeholder="请标明原价 默认: 0元"/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="配送方式">
                            {getFieldDecorator('get_way')(<Input placeholder="请标明配送方式 如：快递包邮 或 xxxx自取"/>)}
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
                                        accept="jpg"
                                        name="gift"
                                        action={`${REMOTE_URL}admin/Index/uploadImg`}
                                        listType="picture-card"
                                        fileList={fileList}
                                        beforeUpload={this.beforeUpload}
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
