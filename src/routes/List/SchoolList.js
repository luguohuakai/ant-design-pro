import React, {PureComponent, Fragment} from 'react';
import {connect} from 'dva';
import moment from 'moment';
import {
    Card,
    Form,
    Input,
    Icon,
    Button,
    Dropdown,
    Menu,
    Modal,
    message,
    Divider,
} from 'antd';
import StandardTable from 'components/StandardTable';
import ColorSimple from 'components/SketchPicker';
import PriceInput from 'components/Price';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './SchoolList.less';

const FormItem = Form.Item;
const getValue = obj =>
    Object.keys(obj)
        .map(key => obj[key])
        .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

const CreateForm = Form.create()(props => {
    const {modalVisible, form, handleAdd, handleModalVisible} = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            form.resetFields();
            handleAdd(fieldsValue);
        });
    };
    return (
        <Modal
            title="添加一个学校"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible()}
        >
            <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="名称">
                {form.getFieldDecorator('name', {
                    rules: [{required: true, message: '学校名称必填'}],
                })(<Input placeholder="学校名称"/>)}
            </FormItem>
            <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="纬度">
                {form.getFieldDecorator('lat', {
                    // rules: [{required: true, message: '必填'}],
                })(<Input placeholder=""/>)}
            </FormItem>
            <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="经度">
                {form.getFieldDecorator('lng', {
                    // rules: [{required: true, message: '必填'}],
                })(<Input placeholder=""/>)}
            </FormItem>
            <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="地理位置">
                {form.getFieldDecorator('addr', {
                    // rules: [{required: true, message: '必填'}],
                })(<Input placeholder=""/>)}
            </FormItem>
            <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="学校logo">
                {form.getFieldDecorator('logo', {
                    // rules: [{required: true, message: '必填'}],
                })(<Input placeholder=""/>)}
            </FormItem>
            <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="学校主色调">
                {form.getFieldDecorator('color', {
                    initialValue: {hex: '#000'},
                    rules: [{required: true, message: '必填'}],
                })(<ColorSimple />)}
            </FormItem>
            <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="学校">
                {form.getFieldDecorator('p', {
                    // rules: [{required: true, message: '必填'}],
                })(<PriceInput />)}
            </FormItem>
            <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="学校背景图">
                {form.getFieldDecorator('login_bg', {
                    // rules: [{required: true, message: '必填'}],
                })(<Input placeholder=""/>)}
            </FormItem>
            <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="默认acid">
                {form.getFieldDecorator('default_ac_id', {
                    // rules: [{required: true, message: '必填'}],
                })(<Input placeholder=""/>)}
            </FormItem>
        </Modal>
    );
});

@connect(({rule, loading}) => ({
    rule,
    loading: loading.models.rule,
}))
@Form.create()
export default class TableList extends PureComponent {
    state = {
        modalVisible: false,
        expandForm: false,
        selectedRows: [],
        formValues: {},
    };

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch({
            type: 'rule/fetch',
        });
    }

    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const {dispatch} = this.props;
        const {formValues} = this.state;

        const filters = Object.keys(filtersArg).reduce((obj, key) => {
            const newObj = {...obj};
            newObj[key] = getValue(filtersArg[key]);
            return newObj;
        }, {});

        const params = {
            page: pagination.current,
            size: pagination.pageSize,
            ...formValues,
            ...filters,
        };
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }

        dispatch({
            type: 'rule/fetch',
            payload: params,
        });
    };

    handleFormReset = () => {
        const {form, dispatch} = this.props;
        form.resetFields();
        this.setState({
            formValues: {},
        });
        dispatch({
            type: 'rule/fetch',
            payload: {},
        });
    };

    toggleForm = () => {
        this.setState({
            expandForm: !this.state.expandForm,
        });
    };

    handleMenuClick = e => {
        const {dispatch} = this.props;
        const {selectedRows} = this.state;

        if (!selectedRows) return;

        switch (e.key) {
            case 'remove':
                dispatch({
                    type: 'rule/remove',
                    payload: {
                        no: selectedRows.map(row => row.no).join(','),
                    },
                    callback: () => {
                        this.setState({
                            selectedRows: [],
                        });
                    },
                });
                break;
            default:
                break;
        }
    };

    deleteItem = record => {
        this.props.dispatch({
            type: 'rule/remove',
            payload: record,
        });

        message.success('删除成功');
    };

    handleSelectRows = rows => {
        this.setState({
            selectedRows: rows,
        });
    };

    handleSearch = e => {
        e.preventDefault();

        const {dispatch, form} = this.props;

        form.validateFields((err, fieldsValue) => {
            if (err) return;

            const values = {
                ...fieldsValue,
                updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
            };

            this.setState({
                formValues: values,
            });

            dispatch({
                type: 'rule/fetch',
                payload: values,
            });
        });
    };

    handleModalVisible = flag => {
        this.setState({
            modalVisible: !!flag,
        });
    };

    handleAdd = fields => {
        this.props.dispatch({
            type: 'rule/add',
            payload: fields,
        });

        message.success('添加成功');
        this.setState({
            modalVisible: false,
        });
    };

    render() {
        const {rule: {data}, loading} = this.props;
        const {selectedRows, modalVisible} = this.state;

        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '地址',
                dataIndex: 'addr',
                key: 'addr',
            },
            {
                title: '默认ac_id',
                dataIndex: 'default_ac_id',
                key: 'default_ac_id',
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                key: 'create_time',
            },
            {
                title: '更新时间',
                dataIndex: 'update_time',
                key: 'update_time',
            },
            {
                title: '操作',
                key: 'handle',
                render: (text, record, index) => (
                    <Fragment>
                        <a href="">编辑</a>
                        <Divider type="vertical"/>
                        <a href="javascript:void(0);" onClick={() => this.deleteItem(record)}>删除</a>
                    </Fragment>
                ),
            },
        ];

        const menu = (
            <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
                <Menu.Item key="remove">删除</Menu.Item>
                <Menu.Item key="approval">批量审批</Menu.Item>
            </Menu>
        );

        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
        };

        return (
            <PageHeaderLayout title="学校管理">
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListOperator}>
                            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                                新建
                            </Button>
                            {selectedRows.length > 0 && (
                                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down"/>
                    </Button>
                  </Dropdown>
                </span>
                            )}
                        </div>
                        <StandardTable
                            rowKey="id"
                            selectedRows={selectedRows}
                            loading={loading}
                            data={data}
                            columns={columns}
                            onSelectRow={this.handleSelectRows}
                            onChange={this.handleStandardTableChange}
                        />
                    </div>
                </Card>
                <CreateForm {...parentMethods} modalVisible={modalVisible}/>
            </PageHeaderLayout>
        );
    }
}
