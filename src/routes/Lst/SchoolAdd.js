import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
    Form,
    Input,
    DatePicker,
    Select,
    Button,
    Card,
    InputNumber,
    Radio,
    Icon,
    Tooltip,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './SchoolAdd.less';

const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;

@connect(({loading}) => ({
    submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: 'form/submitRegularForm',
                    payload: values,
                });
            }
        });
    };

    render() {
        const {submitting} = this.props;
        const {getFieldDecorator, getFieldValue} = this.props.form;

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

        return (
            <PageHeaderLayout
                title="学校添加"
                content="太棒了,又一个学校支持或即将支持小程序认证。"
            >
                <Card bordered={false}>
                    <Form onSubmit={this.handleSubmit} hideRequiredMark style={{marginTop: 8}}>
                        <FormItem {...formItemLayout} label="学校名">
                            {getFieldDecorator('name', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入校名',
                                    },
                                ],
                            })(<Input placeholder="这个学校的名称"/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="地址">
                            {getFieldDecorator('addr', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入地址',
                                    },
                                ],
                            })(<Input placeholder="这个学校的地址"/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="经度">
                            {getFieldDecorator('lng', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入经度',
                                    },
                                ],
                            })(<Input placeholder="这个学校的经度"/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="纬度">
                            {getFieldDecorator('lat', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入纬度',
                                    },
                                ],
                            })(<Input placeholder="这个学校的纬度"/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="默认ACID">
                            {getFieldDecorator('default_ac_id', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入默认ACID',
                                    },
                                ],
                            })(<Input placeholder="这个学校的默认ACID"/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="是否为单AC" help="当前学校是否只有一台AC,或只有一台AC在投入使用">
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
                                      <Icon type="info-circle-o" style={{marginRight: 4}}/>
                                    </Tooltip>
                                  </em>
                                </span>
                            }
                        >
                            {getFieldDecorator('color')(
                                <Input placeholder="学校颜色"/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={
                                <span>
                                  Logo<em className={styles.optional}>（选填）</em>
                                </span>
                            }
                        >
                            {getFieldDecorator('logo')(
                                <Input placeholder="学校Logo"/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={
                                <span>
                                  认证后背景<em className={styles.optional}>（选填）</em>
                                </span>
                            }
                        >
                            {getFieldDecorator('login_bg')(
                                <Input placeholder="认证成功后的背景图片"/>
                            )}
                        </FormItem>
                        <FormItem {...submitFormLayout} style={{marginTop: 32}}>
                            <Button type="primary" htmlType="submit" loading={submitting}>
                                提交
                            </Button>
                            <Button style={{marginLeft: 8}}>保存</Button>
                        </FormItem>
                    </Form>
                </Card>
            </PageHeaderLayout>
        );
    }
}
