/* eslint-disable camelcase */
import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {
    Row,
    Col,
    Icon,
    Card,
    Tabs,
    Table,
    Tooltip,
    Menu,
    Dropdown,
} from 'antd';
import numeral from 'numeral';
import {
    ChartCard,
    MiniArea,
    MiniBar,
    MiniProgress,
    Field,
    TimelineChart,
} from 'components/Charts';
import Trend from 'components/Trend';

import styles from './Analysis.less';

const {TabPane} = Tabs;

@connect(({chart, analysis, loading}) => ({
    chart,
    analysis,
    userLoading: loading.effects['analysis/fetchAnalysisData'],
    activeLoading: loading.effects['analysis/fetchAnalysisData'],
    loading: loading.effects['chart/fetch'],
}))
export default class Analysis extends Component {
    state = {};

    componentDidMount() {
        this.props.dispatch({
            type: 'chart/fetch',
        });
        this.props.dispatch({
            type: 'analysis/fetchAnalysisData',
        });
    }

    componentWillUnmount() {
        const {dispatch} = this.props;
        dispatch({
            type: 'chart/clear',
        });
    }

    render() {
        const {analysis, loading, userLoading, activeLoading} = this.props;
        const visitData = analysis.recent_active;
        const {
            yesterday_active,
            month_active,
            user_total,
            yesterday_total,
            today_total,
            ios_total,
            android_total,
            others_total,
            school_user_count_top_10,
            auth_way_count,
            feedback_lst,
        } = analysis;

        const recentFeedback = feedback_lst.data;

        const rankingListData = [];
        for (let i = 0; i < school_user_count_top_10.length; i++) {
            rankingListData.push({
                title: school_user_count_top_10[i].name,
                total: school_user_count_top_10[i].user_num,
            });
        }

        const menu = (
            <Menu>
                <Menu.Item>操作</Menu.Item>
                <Menu.Item>全部标记为已处理</Menu.Item>
            </Menu>
        );

        const iconGroup = (
            <span className={styles.iconGroup}>
            <Dropdown overlay={menu} placement="bottomRight">
              <Icon type="ellipsis"/>
            </Dropdown>
          </span>
        );

        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '问题概览',
                dataIndex: 'contents',
                key: 'contents',
                render: text => <a href="/">{text = text.length > 20 ? text.slice(0,20) + '...' : text}</a>,
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                key: 'create_time',
                className: styles.alignRight,
            },
            {
                title: '客户端类型',
                dataIndex: 'client_type',
                key: 'client_type',
                className: styles.alignRight,
                render: text => text === 1 ? 'iOS' : 'Android',
            },
            // {
            //     title: '周涨幅',
            //     dataIndex: 'range',
            //     key: 'range',
            //     sorter: (a, b) => a.range - b.range,
            //     render: (text, record) => (
            //       <Trend flag={record.status === 1 ? 'down' : 'up'}>
            //         <span style={{marginRight: 4}}>{text}%</span>
            //       </Trend>
            //     ),
            //     align: 'right',
            // },
        ];

        const topColResponsiveProps = {
            xs: 24,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 6,
            style: {marginBottom: 24},
        };
        const chartData = [];
        if (auth_way_count) {
            for (let i = 0; i < auth_way_count.length; i += 1) {
                chartData.push({
                    x: auth_way_count[i].x,
                    y1: auth_way_count[i].y1,
                    y2: auth_way_count[i].y2,
                });
            }
        }else {
            for (let i = 0; i < 2; i += 1) {
                chartData.push({
                    x: (new Date().getTime()) + (1000 * 60 * 30 * i),
                    y1: Math.floor(Math.random() * 100) + 1000,
                    y2: Math.floor(Math.random() * 100) + 500,
                });
            }
        }
        return (
            <Fragment>
                <Row gutter={24}>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            loading={userLoading}
                            bordered={false}
                            title="用户总数"
                            action={
                                <Tooltip title="指标说明">
                                    <Icon type="info-circle-o"/>
                                </Tooltip>
                            }
                            total={() => user_total}
                            footer={
                                <div style={{whiteSpace: 'nowrap', overflow: 'hidden'}}>
                                    <Trend flag="" style={{marginRight: 16}}>
                                        iOS<span
                                        className={styles.trendText}
                                    >{`${numeral(ios_total).format('0,0')}`}
                                        </span>
                                    </Trend>
                                    <Trend flag="" style={{marginRight: 16}}>
                                        Android<span className={styles.trendText}>{`${numeral(android_total).format(
                                        '0,0'
                                    )}`}
                                        </span>
                                    </Trend>
                                    <Trend flag="">
                                        其它<span
                                        className={styles.trendText}
                                    >{`${numeral(others_total).format('0,0')}`}
                                        </span>
                                    </Trend>
                                </div>
                            }
                            contentHeight={46}
                        >
                            <Trend flag="" style={{marginRight: 16}}>
                                昨日新增<span
                                className={styles.trendText}
                            >{`${numeral(yesterday_total).format('0,0')}`}
                                </span>
                            </Trend>
                            <Trend flag="">
                                今日新增<span className={styles.trendText}>{`${numeral(today_total).format('0,0')}`}</span>
                            </Trend>
                        </ChartCard>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            loading={activeLoading}
                            bordered={false}
                            title="月活"
                            action={
                                <Tooltip title="当天认证成功后才算是当天的活跃用户">
                                    <Icon type="info-circle-o"/>
                                </Tooltip>
                            }
                            total={numeral(month_active).format('0,0')}
                            footer={<Field label="昨日活跃用户" value={numeral(yesterday_active).format('0,0')}/>}
                            contentHeight={46}
                        >
                            <MiniArea color="#975FE4" data={visitData}/>
                        </ChartCard>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="虚位以待"
                            action={
                                <Tooltip title="指标说明">
                                    <Icon type="info-circle-o"/>
                                </Tooltip>
                            }
                            total={numeral(month_active).format('0,0')}
                            footer={<Field label="昨日活跃用户" value={numeral(yesterday_active).format('0,0')}/>}
                            contentHeight={46}
                        >
                            <MiniBar data={visitData}/>
                        </ChartCard>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="虚位以待"
                            action={
                                <Tooltip title="指标说明">
                                    <Icon type="info-circle-o"/>
                                </Tooltip>
                            }
                            total="78%"
                            footer={
                                <div style={{whiteSpace: 'nowrap', overflow: 'hidden'}}>
                                    <Trend flag="up" style={{marginRight: 16}}>
                                        周同比<span className={styles.trendText}>12%</span>
                                    </Trend>
                                    <Trend flag="down">
                                        日环比<span className={styles.trendText}>11%</span>
                                    </Trend>
                                </div>
                            }
                            contentHeight={46}
                        >
                            <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2"/>
                        </ChartCard>
                    </Col>
                </Row>

                <Card loading={loading} bordered={false} bodyStyle={{padding: 0}}>
                    <div className={styles.salesCard}>
                        <Tabs size="large" tabBarStyle={{marginBottom: 24}}>
                            <TabPane tab="认证方式" key="sales">
                                <Row>
                                    <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                                        <div className={styles.salesBar}>
                                            <TimelineChart
                                                height={350}
                                                data={chartData}
                                                titleMap={{y1: '直接认证', y2: '扫码认证'}}
                                            />
                                        </div>
                                    </Col>
                                    <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                                        <div className={styles.salesRank}>
                                            <h4 className={styles.rankingTitle}>学校用户量排名</h4>
                                            <ul className={styles.rankingList}>
                                                {rankingListData.map((item, i) => (
                                                    <li key={item.title}>
                                                        <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                                                        <span>{item.title}</span>
                                                        <span>{numeral(item.total).format('0,0')}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </Col>
                                </Row>
                            </TabPane>
                        </Tabs>
                    </div>
                </Card>

                <Row gutter={24}>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Card
                            loading={loading}
                            bordered={false}
                            title="最新问题反馈"
                            extra={iconGroup}
                            style={{marginTop: 24}}
                        >
                            <Table
                                rowKey={record => record.index}
                                size="small"
                                columns={columns}
                                dataSource={recentFeedback}
                                pagination={{
                                    style: {marginBottom: 0},
                                    pageSize: 8,
                                }}
                            />
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}
