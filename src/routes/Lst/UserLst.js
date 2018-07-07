/* eslint-disable linebreak-style */
import React, { PureComponent } from 'react';

import {Table ,Input,List, Card} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Search } = Input;
import styles from './UserLst.less';
export default class BasicList extends PureComponent {
    render() {
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
        }, {
            title: 'Age',
            dataIndex: 'age',
        }, {
            title: 'Address',
            dataIndex: 'address',
        }];
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
        const data = [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        }, {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        }];
        return (
            <PageHeaderLayout>
                <div className={styles.standardList}>
                    <Card
                        className={styles.listCard}
                        bordered={false}
                        title="用戶列表"
                        style={{ marginTop: 24 }}
                        bodyStyle={{ padding: '0 32px 40px 32px' }}
                        extra={extraContent}
                    >
                    <h4>用戶列表</h4>
                    <Table columns={columns} dataSource={data} size="middle" />
                    </Card>
                </div>
            </PageHeaderLayout>

        );
    }
}
