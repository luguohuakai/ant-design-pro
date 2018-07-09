/* eslint-disable linebreak-style */
import React, { PureComponent } from 'react';

import { List, Card, Row, Col, Radio, Input, Button, Icon, Dropdown, Menu, Avatar } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Search } = Input;
import styles from './AuthLogLst.less';
export default class BasicList extends PureComponent {
  render() {
    const data = [
      'Racing car sprays burning fuel into crowd.',
      'Japanese princess to wed commoner.',
      'Australian walks 100km after outback crash.',
      'Man charged over missing wedding girl.',
      'Los Angeles battles huge wildfires.',
    ];
      const extraContent = (
          <div className={styles.extraContent}>
              <Search
                  id="search"
                  className={styles.extraContentSearch}
                  placeholder="请按照ap_name搜索"
                  // onSearch={handleSearch}
              />
          </div>
      );
    return (
        <PageHeaderLayout>
            <div className={styles.standardList}>
                <Card
                    className={styles.listCard}
                    bordered={false}
                    title="AP列表"
                    style={{ marginTop: 24 }}
                    bodyStyle={{ padding: '0 32px 40px 32px' }}
                    extra={extraContent}
                >
                    <List
                        header={<div>Header</div>}
                        footer={<div>Footer</div>}
                        bordered
                        dataSource={data}
                        renderItem={item => <List.Item>{item}</List.Item>}
                    />
                </Card>
            </div>
        </PageHeaderLayout>

    );
  }
}
