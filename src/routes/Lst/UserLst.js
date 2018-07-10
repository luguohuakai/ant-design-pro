/* eslint-disable linebreak-style */
import React, { PureComponent } from 'react';

import { Table, Input, List, Card, Button, Icon, Row, Col } from 'antd';
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
        title: '用户ID',
        dataIndex: 'name',
      },
      {
        title: '账号',
        dataIndex: 'age',
      },
      {
        title: '姓名',
        dataIndex: 'address',
      },
      {
        title: '状态',
        dataIndex: 'status',
      },
      {
        title: '操作',
        dataIndex: '',
        // fixed: 'right',
        fixed: 'right',
        width: 200,
        render: text => (
          <span>
            <a href="#">删除</a>
            <span className="ant-divider" />
            <a href="#">编辑</a>
            <span className="ant-divider" />
            <a href="#" className="ant-dropdown-link">
              更多 <Icon type="down" />
            </a>
          </span>
        ),
      },
    ];
    const extraContent = (
      <div className={styles.extraContent}>
        <Search
          id="search"
          className={styles.extraContentSearch}
          placeholder="请輸入"
          // onSearch={handleSearch}
        />
      </div>
    );
    const data = [
      {
        key: '1',
        name: '15',
        age: 158649889,
        address: '张安',
        status: '已在线',
      },
      {
        key: '2',
        name: '18',
        age: 123589977,
        address: '张安',
        status: '已在线',
      },
      {
        key: '3',
        name: '23',
        age: 123589977,
        address: '张安',
        status: '已在线',
      },
      {
        key: '4',
        name: '28',
        age: 123589977789,
        address: '张安',
        status: '已在线',
      },
      {
        key: '5',
        name: '25',
        age: 12358997789,
        address: '张安',
        status: '已在线',
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
            title="用戶列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Button
              // onClick={handleAdd}
              type="dashed"
              style={{ width: '100%', marginBottom: 8 }}
              icon="plus"
            >
              添加
            </Button>
            <Table columns={columns} dataSource={data} />
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
