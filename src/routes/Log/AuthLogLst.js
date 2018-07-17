/* eslint-disable linebreak-style */
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
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
  Table,
  Divider,
} from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './AuthLogLst.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

@connect(({ log_lst, loading }) => ({
  log_lst,
  loading: loading.models.log_lst,
}))
export default class BasicList extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'log_lst/fetchLogLst',
      payload: {
        size: 10,
      },
    });
  }

  render() {
    const { log_lst, loading } = this.props;
    const { logData } = log_lst;

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );
    //搜索
    const handleSearch = () => {
      const values = {
        account: search.value,
      };
      this.props.dispatch({
        type: 'log_lst/fetchLogLst',
        payload: values,
      });
    };

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="progress">已上线</RadioButton>
          <RadioButton value="waiting">即将上线</RadioButton>
        </RadioGroup>
        <Search
          id="search"
          className={styles.extraContentSearch}
          placeholder="请按照ap_name搜索"
          onSearch={handleSearch}
        />
      </div>
    );
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: Number(logData.per_page) ? Number(logData.per_page) : 10,
      total: Number(logData.total) ? Number(logData.total) : 0,
      current: Number(logData.current_page) ? Number(logData.current_page) : 1,
      onChange: (page, pageSize) => {
        this.props.dispatch({
          type: 'log_lst/fetchLogLst',
          payload: {
            page,
            size: pageSize,
          },
        });
      },
      onShowSizeChange: (current, size) => {
        this.props.dispatch({
          type: 'log_lst/fetchLogLst',
          payload: {
            page: current,
            size,
          },
        });
      },
    };
    const goToEdit = payload => {
      this.props.history.push(`/lst/log-details?id=${payload.id}`);
    };
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'uid',
        dataIndex: 'uid',
        key: 'uid',
      },
      {
        title: 'school_id',
        dataIndex: 'school_id',
        key: 'school_id',
      },
      {
        title: '账户',
        dataIndex: 'account',
        key: 'account',
      },
      {
        title: 'ssid',
        dataIndex: 'ssid',
        key: 'ssid',
      },
      {
        title: 'bssid',
        dataIndex: 'bssid',
        key: 'bssid',
      },
      {
        title: '操作',
        dataIndex: '',
        key: 'handle',
        width: 200,
        render: (text, record) => (
          <Fragment>
            <a onClick={() => goToEdit(record)}>详情</a>
          </Fragment>
        ),
      },
    ];
    return (
      <PageHeaderLayout>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={6} xs={12}>
                <Info title="已部署学校总数" value="8个" bordered />
              </Col>
              <Col sm={6} xs={12}>
                <Info title="已正常上线总数" value="4个" bordered />
              </Col>
              <Col sm={6} xs={12}>
                <Info title="即将上线的" value="4个" bordered />
              </Col>
              <Col sm={6} xs={12}>
                <Info title="单AC学校总数" value="18个" />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="日志列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Table
              rowKey="id"
              loading={loading}
              columns={columns}
              dataSource={logData.data}
              pagination={paginationProps}
              renderItem={item => <List.Item>{/*<ListContent data={item} />*/}</List.Item>}
            />
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
