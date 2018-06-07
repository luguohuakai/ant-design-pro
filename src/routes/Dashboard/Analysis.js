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
    Radio,
    DatePicker,
    Tooltip,
    Menu,
    Dropdown,
} from 'antd';
import numeral from 'numeral';
import {
    ChartCard,
    yuan,
    MiniArea,
    MiniBar,
    MiniProgress,
    Field,
    Bar,
    Pie,
    TimelineChart,
} from 'components/Charts';
import Trend from 'components/Trend';
import NumberInfo from 'components/NumberInfo';
import {getTimeDistance} from '../../utils/utils';

import styles from './Analysis.less';

const {TabPane} = Tabs;
const {RangePicker} = DatePicker;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
    rankingListData.push({
        title: `xx学校 ${i} `,
        total: 323234,
    });
}

const Yuan = ({children}) => (
    <span
        dangerouslySetInnerHTML={{__html: yuan(children)}}
    /> /* eslint-disable-line react/no-danger */
);

@connect(({chart, analysis, loading}) => ({
    chart,
    analysis,
    userLoading: loading.effects['analysis/fetchUserData'],
    activeLoading: loading.effects['analysis/fetchActiveData'],
    loading: loading.effects['chart/fetch'],
}))
export default class Analysis extends Component {
    state = {
        salesType: 'all',
        currentTabKey: '',
        rangePickerValue: getTimeDistance('year'),
    };

    componentDidMount() {
        this.props.dispatch({
            type: 'chart/fetch',
        });
        this.props.dispatch({
            type: 'analysis/fetchActiveData',
        });
        this.props.dispatch({
            type: 'analysis/fetchUserData',
        });
    }

    componentWillUnmount() {
        const {dispatch} = this.props;
        dispatch({
            type: 'chart/clear',
        });
    }

    handleChangeSalesType = e => {
        this.setState({
            salesType: e.target.value,
        });
    };

    handleTabChange = key => {
        this.setState({
            currentTabKey: key,
        });
    };

    handleRangePickerChange = rangePickerValue => {
        this.setState({
            rangePickerValue,
        });

        this.props.dispatch({
            type: 'chart/fetchSalesData',
        });
    };

    selectDate = type => {
        this.setState({
            rangePickerValue: getTimeDistance(type),
        });

        this.props.dispatch({
            type: 'chart/fetchSalesData',
        });
    };

    isActive(type) {
        const {rangePickerValue} = this.state;
        const value = getTimeDistance(type);
        if (!rangePickerValue[0] || !rangePickerValue[1]) {
            return;
        }
        if (
            rangePickerValue[0].isSame(value[0], 'day') &&
            rangePickerValue[1].isSame(value[1], 'day')
        ) {
            return styles.currentDate;
        }
    }

    render() {
        const {rangePickerValue, salesType, currentTabKey} = this.state;
        const {chart, analysis, loading, userLoading, activeLoading} = this.props;
        const visitData = analysis.recent_active;
        const {yesterday_active, month_active, user_total, yesterday_total, today_total, ios_total, android_total, others_total} = analysis;
        const {
            searchData,
            offlineData,
            salesTypeData,
            salesTypeDataOnline,
            salesTypeDataOffline,
        } = chart;
        const salesPieData =
            salesType === 'all'
                ? salesTypeData
                : salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;

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

        const salesExtra = (
            <div className={styles.salesExtraWrap}>
                <div className={styles.salesExtra}>
                    <a className={this.isActive('today')} onClick={() => this.selectDate('today')}>
                        今日
                    </a>
                    <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
                        本周
                    </a>
                    <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
                        本月
                    </a>
                    <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>
                        全年
                    </a>
                </div>
                <RangePicker
                    value={rangePickerValue}
                    onChange={this.handleRangePickerChange}
                    style={{width: 256}}
                />
            </div>
        );

        const columns = [
            {
                title: '用户名',
                dataIndex: 'index',
                key: 'index',
            },
            {
                title: '问题概览',
                dataIndex: 'keyword',
                key: 'keyword',
                render: text => <a href="/">{text}</a>,
            },
            // {
            //     title: '用户数',
            //     dataIndex: 'count',
            //     key: 'count',
            //     sorter: (a, b) => a.count - b.count,
            //     className: styles.alignRight,
            // },
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

        const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);

        const CustomTab = ({data, currentTabKey: currentKey}) => (
            <Row gutter={8} style={{width: 138, margin: '8px 0'}}>
                <Col span={12}>
                    <NumberInfo
                        title={data.name}
                        subTitle="转化率"
                        gap={2}
                        total={`${data.cvr * 100}%`}
                        theme={currentKey !== data.name && 'light'}
                    />
                </Col>
                <Col span={12} style={{paddingTop: 36}}>
                    <Pie
                        animate={false}
                        color={currentKey !== data.name && '#BDE4FF'}
                        inner={0.55}
                        tooltip={false}
                        margin={[0, 0, 0, 0]}
                        percent={data.cvr * 100}
                        height={64}
                    />
                </Col>
            </Row>
        );

        const topColResponsiveProps = {
            xs: 24,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 6,
            style: {marginBottom: 24},
        };
        const chartData = [];
        for (let i = 0; i < 20; i += 1) {
            chartData.push({
                x: (new Date().getTime()) + (1000 * 60 * 30 * i),
                y1: Math.floor(Math.random() * 100) + 1000,
                y2: Math.floor(Math.random() * 100) + 500,
            });
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
                        <Tabs tabBarExtraContent={salesExtra} size="large" tabBarStyle={{marginBottom: 24}}>
                            <TabPane tab="认证方式" key="sales">
                                <Row>
                                    <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                                        <div className={styles.salesBar}>
                                            <TimelineChart
                                                height={200}
                                                data={chartData}
                                                titleMap={{y1: '直接认证', y2: '扫码认证'}}
                                            />
                                        </div>
                                    </Col>
                                    <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                                        <div className={styles.salesRank}>
                                            <h4 className={styles.rankingTitle}>认证次数排名</h4>
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
                            {/* <TabPane tab="访问量" key="views"> */}
                            {/* <Row> */}
                            {/* <Col xl={16} lg={12} md={12} sm={24} xs={24}> */}
                            {/* <div className={styles.salesBar}> */}
                            {/* <Bar height={292} title="访问量趋势" data={salesData}/> */}
                            {/* </div> */}
                            {/* </Col> */}
                            {/* <Col xl={8} lg={12} md={12} sm={24} xs={24}> */}
                            {/* <div className={styles.salesRank}> */}
                            {/* <h4 className={styles.rankingTitle}>门店访问量排名</h4> */}
                            {/* <ul className={styles.rankingList}> */}
                            {/* {rankingListData.map((item, i) => ( */}
                            {/* <li key={item.title}> */}
                            {/* <span className={i < 3 ? styles.active : ''}>{i + 1}</span> */}
                            {/* <span>{item.title}</span> */}
                            {/* <span>{numeral(item.total).format('0,0')}</span> */}
                            {/* </li> */}
                            {/* ))} */}
                            {/* </ul> */}
                            {/* </div> */}
                            {/* </Col> */}
                            {/* </Row> */}
                            {/* </TabPane> */}
                        </Tabs>
                    </div>
                </Card>

                <Row gutter={24}>
                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
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
                                dataSource={searchData}
                                pagination={{
                                    style: {marginBottom: 0},
                                    pageSize: 8,
                                }}
                            />
                        </Card>
                    </Col>
                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                        <Card
                            loading={loading}
                            className={styles.salesCard}
                            bordered={false}
                            title="近七日认证客户端类型占比"
                            bodyStyle={{padding: 24}}
                            extra={
                                <div className={styles.salesCardExtra}>
                                    {/*{iconGroup}*/}
                                    <div className={styles.salesTypeRadio}>
                                        <Radio.Group value={salesType} onChange={this.handleChangeSalesType}>
                                            <Radio.Button value="all">全部</Radio.Button>
                                            <Radio.Button value="online">直接认证</Radio.Button>
                                            <Radio.Button value="offline">扫码认证</Radio.Button>
                                        </Radio.Group>
                                    </div>
                                </div>
                            }
                            style={{marginTop: 24, minHeight: 509}}
                        >
                            <h4 style={{marginTop: 8, marginBottom: 32}}>客户端类型</h4>
                            <Pie
                                hasLegend
                                subTitle="认证次数"
                                total={() => salesPieData.reduce((pre, now) => now.y + pre, 0)}
                                data={salesPieData}
                                valueFormat={value => value}
                                height={248}
                                lineWidth={4}
                            />
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}
