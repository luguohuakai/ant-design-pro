/* eslint-disable linebreak-style */
import React, { PureComponent } from 'react';

import { Table, Input, Card, Row, Col } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Search } = Input;
import styles from './UserLst.less';
export default class BasicList extends PureComponent {
  render() {
    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
      },
      {
        title: '头像',
        dataIndex: 'head',
      },
      {
        title: '微信的openID',
        dataIndex: 'openid',
      },

      {
        title: '微信昵称',
        dataIndex: 'name',
      },
      {
        title: '注册时间',
        dataIndex: 'time',
      },
      {
        title: '操作',
        dataIndex: '',
        // fixed: 'right',
        width: 200,
        render: text => (
          <span>
            <a href="#/lst/user-details">详情</a>
            {/*<span className="ant-divider" />*/}
            {/*<a href="#">编辑</a>*/}
            {/*<span className="ant-divider" />*/}
            {/*<a href="#" className="ant-dropdown-link">*/}
            {/*更多 <Icon type="down" />*/}
            {/*</a>*/}
          </span>
        ),
      },
    ];
    const extraContent = (
      <div className={styles.extraContent}>
        <Search
          id="search"
          className={styles.extraContentSearch}
          placeholder="请輸入微信昵称"
          // onSearch={handleSearch}
        />
      </div>
    );
    const data = [
      {
        key: '1',
        id: '15',
        head: '',
        openid: 158649889,
        name: '张安',
        time: '2018-7-12 13:47:45',
      },
      {
        key: '2',
        id: '18',
        head: '',
        openid: 123589977,
        name: '张安',
        time: '2018-7-12 13:47:45',
      },
      {
        key: '3',
        id: '23',
        head: '',
        openid: 123589977,
        name: '张安',
        time: '2018-7-12 13:47:45',
      },
      {
        key: '4',
        id: '28',
        head: '',
        openid: 123589977789,
        name: '张安',
        time: '2018-7-12 13:47:45',
      },
      {
        key: '5',
        id: '25',
        head: '',
        openid: 12358997789,
        name: '张安',
        time: '2018-7-12 13:47:45',
      },
    ];
    return (
      <PageHeaderLayout>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={6} xs={12}>
                <Info title="用户总数" value="8" bordered />
              </Col>
              <Col sm={6} xs={12}>
                <Info title="Android总数" value="4" bordered />
              </Col>
              <Col sm={6} xs={12}>
                <Info title="IOS总数" value="4" bordered />
              </Col>
              <Col sm={6} xs={12}>
                <Info title="其他" value="18" />
              </Col>
            </Row>
          </Card>
          <Card
            className={styles.listCard}
            bordered={false}
            title="用戶列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Table columns={columns} dataSource={data} />
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
