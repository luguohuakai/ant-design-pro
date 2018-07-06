/* eslint-disable camelcase */
import React, {PureComponent} from 'react';
import moment from 'moment';
import {connect} from 'dva';
import {
    List,
    Card,
    Row,
    Col,
    Radio,
    Input,
    Button,
    Icon,
    Dropdown,
    Menu,
    Avatar,
    Switch,
} from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './SchoolLst.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const {Search} = Input;

@connect(({lst, loading}) => ({
    lst,
    loading: loading.models.lst,
}))

export default class BasicList extends PureComponent {
    componentDidMount() {
        this.props.dispatch({
            type: 'lst/fetchSchoolLst',
            payload: {
                size: 10,
            },
        });
        this.props.dispatch({
            type: 'lst/fetchSchoolCount',
        });
    };

    onChange = (e) => {
        const status = e.target.value;
        switch (status) {
            case 'progress':
                this.props.dispatch({
                    type: 'lst/fetchSchoolLst',
                    payload: {
                        size: 10,
                        is_online: 1,
                    },
                });
                break;
            case 'waiting':
                this.props.dispatch({
                    type: 'lst/fetchSchoolLst',
                    payload: {
                        size: 100,
                        is_online: 0,
                    },
                });
                break;
            case 'all':
            default:
                this.props.dispatch({
                    type: 'lst/fetchSchoolLst',
                    payload: {
                        size: 10,
                    },
                });
        }
    };

    render() {
        const {lst, loading} = this.props;
        const {schoolData,schoolCount} = lst;

        const Info = ({title, value, bordered}) => (
            <div className={styles.headerInfo}>
                <span>{title}</span>
                <p>{value}</p>
                {bordered && <em />}
            </div>
        );

        const extraContent = (
            <div className={styles.extraContent}>
                <RadioGroup onChange={this.onChange} defaultValue="all">
                    <RadioButton value="all">全部</RadioButton>
                    <RadioButton value="progress">已上线</RadioButton>
                    <RadioButton value="waiting">即将上线</RadioButton>
                </RadioGroup>
                <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={(value) => search(value)} />
            </div>
        );

        const search = (keyword) => {
            const like = JSON.stringify({name:keyword});
            this.props.dispatch({
                type: 'lst/fetchSchoolLst',
                payload: {
                    size: 100,
                    like,
                },
            });
        };

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: Number(schoolData.per_page) ? Number(schoolData.per_page) : 10,
            total: Number(schoolData.total) ? Number(schoolData.total) : 0,
            current: Number(schoolData.current_page) ? Number(schoolData.current_page) : 1,
            onChange: (page, pageSize) => {
                this.props.dispatch({
                    type: 'lst/fetchSchoolLst',
                    payload: {
                        page,
                        size: pageSize,
                    },
                });
            },
            onShowSizeChange: (current, size) => {
                this.props.dispatch({
                    type: 'lst/fetchSchoolLst',
                    payload: {
                        page: current,
                        size,
                    },
                });
            },
        };

        // 删除
        const deleteSchool = (payload) => {
            this.props.dispatch({
                type: 'lst/deleteSchool',
                payload: {
                    ...payload,
                    page: paginationProps.current,
                    size: paginationProps.pageSize,
                },
            });
            this.props.dispatch({
                type: 'lst/fetchSchoolCount',
            });
        };

        const onChange = (is_online,id) => {
            let status;
            if (!is_online) {
                status = 1;
            }else {
                status = 0;
            }

            this.props.dispatch({
                type: 'lst/setOnlineStatus',
                payload: {
                    id,
                    status,
                },
            });

            this.props.dispatch({
                type: 'lst/fetchSchoolCount',
            });
            this.props.dispatch({
                type: 'lst/fetchSchoolLst',
                payload: {
                    size: 10,
                },
            });
        };

        const ListContent = ({data: {id, default_ac_id, create_time, is_online}}) => (
            <div className={styles.listContent}>
                <div className={styles.listContentItem}>
                    <span>默认AC</span>
                    <p>{default_ac_id}</p>
                </div>
                <div className={styles.listContentItem}>
                    <span>创建时间</span>
                    <p>{moment(create_time).format('YYYY-MM-DD HH:mm')}</p>
                </div>
                <div className={styles.listContentItem}>
                    <Switch onChange={() => onChange(is_online,id)} checkedChildren="已上线" unCheckedChildren="未上线"  defaultChecked={is_online === 1} />
                </div>
            </div>
        );

        const moreHandle = ({item, key}) => {
            alert(key);
        };

        const menu = (
            <Menu onClick={moreHandle}>
                <Menu.Item key="edit">编辑</Menu.Item>
                <Menu.Item key="delete">删除</Menu.Item>
            </Menu>
        );

        const MoreBtn = () => (
            <Dropdown overlay={menu}>
                <a>
                    更多 <Icon type="down"/>
                </a>
            </Dropdown>
        );

        return (
            <PageHeaderLayout>
                <div className={styles.standardList}>
                    <Card bordered={false}>
                        <Row>
                            <Col sm={6} xs={12}>
                                <Info title="已部署学校总数" value={schoolCount.count + '个'} bordered />
                            </Col>
                            <Col sm={6} xs={12}>
                                <Info title="已正常上线总数" value={schoolCount.online_count + '个'} bordered />
                            </Col>
                            <Col sm={6} xs={12}>
                                <Info title="即将上线的" value={schoolCount.will_online_count + '个'} bordered />
                            </Col>
                            <Col sm={6} xs={12}>
                                <Info title="单AC学校总数" value={schoolCount.single_ac_count + '个'} />
                            </Col>
                        </Row>
                    </Card>

                    <Card
                        className={styles.listCard}
                        bordered={false}
                        title="学校列表"
                        style={{marginTop: 24}}
                        bodyStyle={{padding: '0 32px 40px 32px'}}
                        extra={extraContent}
                    >
                        <Button href='#/lst/school-add' type="dashed" style={{width: '100%', marginBottom: 8}}
                                icon="plus">
                            添加
                        </Button>
                        <List
                            size="large"
                            rowKey="id"
                            loading={loading}
                            pagination={paginationProps}
                            dataSource={schoolData.data}
                            renderItem={item => (
                                <List.Item actions={[<a onClick={() => deleteSchool({id: item.id})}>删除</a>,
                                    <MoreBtn data={item}/>]}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.logo} shape="square" size="large" />}
                                        title={<a href={item.name}>{item.name}</a>}
                                        description={item.addr}
                                    />
                                    <ListContent data={item} />
                                </List.Item>
                            )}
                        />
                    </Card>
                </div>
            </PageHeaderLayout>
        );
    }
}
