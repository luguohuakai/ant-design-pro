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
    Progress,
    Button,
    Icon,
    Dropdown,
    Menu,
    Avatar,
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
    };

    render() {
        const {lst, loading} = this.props;
        const {schoolData} = lst;

        const Info = ({title, value, bordered}) => (
            <div className={styles.headerInfo}>
                <span>{title}</span>
                <p>{value}</p>
                {bordered && <em/>}
            </div>
        );

        const extraContent = (
            <div className={styles.extraContent}>
                <RadioGroup defaultValue="all">
                    <RadioButton value="all">全部</RadioButton>
                    <RadioButton value="progress">已上线</RadioButton>
                    <RadioButton value="waiting">即将上线</RadioButton>
                </RadioGroup>
                <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})}/>
            </div>
        );

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
        };

        const ListContent = ({data: {default_ac_id, create_time, percent, status}}) => (
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
                    <Progress percent={percent} status={status} strokeWidth={6} style={{width: 180}}/>
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
                                <Info title="已部署学校总数" value="8个" bordered/>
                            </Col>
                            <Col sm={6} xs={12}>
                                <Info title="已正常上线总数" value="4个" bordered/>
                            </Col>
                            <Col sm={6} xs={12}>
                                <Info title="即将上线的" value="4个" bordered/>
                            </Col>
                            <Col sm={6} xs={12}>
                                <Info title="单AC学校总数" value="6个"/>
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
                                        avatar={<Avatar src={item.logo} shape="square" size="large"/>}
                                        title={<a href={item.name}>{item.name}</a>}
                                        description={item.addr}
                                    />
                                    <ListContent data={item}/>
                                </List.Item>
                            )}
                        />
                    </Card>
                </div>
            </PageHeaderLayout>
        );
    }
}
