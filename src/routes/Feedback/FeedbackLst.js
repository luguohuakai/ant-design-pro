/* eslint-disable linebreak-style */
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { List, Card, Radio, Input, Table } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './FeedbackLst.less';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

@connect(({ feed_lst, loading }) => ({
  feed_lst,
  loading: loading.models.feed_lst,
}))
export default class BasicList extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'feed_lst/fetchFeedbackLst',
      payload: {
        size: 10,
      },
    });
  }
  render() {
    const { feed_lst, loading } = this.props;
    const { feedbackData, dealfeedbackData } = feed_lst;
    const ListContent = ({ data: { phone, contents, create_time } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <p>{contents}</p>
        </div>
        <div className={styles.listContentItem}>
          <p>{create_time}</p>
        </div>
      </div>
    );

    const handleSearch = () => {
      const values = {
        phone: search.value,
      };
      this.props.dispatch({
        type: `feed_lst/fetchFeedbackLst`,
        payload: values,
      });
    };
    const extraContent = (
      <div className={styles.extraContent}>
        <Search
          id="search"
          className={styles.extraContentSearch}
          placeholder="请按照手机号搜索"
          onSearch={value => search(value)}
        />
      </div>
    );
    const search = keyword => {
      const like = JSON.stringify({ phone: keyword });
      this.props.dispatch({
        type: 'feed_lst/fetchFeedbackLst',
        payload: {
          size: 100,
          like,
        },
      });
    };

    const paginationprops = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: Number(feedbackData.per_page) ? Number(feedbackData.per_page) : 10,
      total: Number(feedbackData.total) ? Number(feedbackData.total) : 0,
      current: Number(feedbackData.current_page) ? Number(feedbackData.current_page) : 1,
      onChange: (page, pageSize) => {
        this.props.dispatch({
          type: 'feed_lst/fetchFeedbackLst',
          payload: {
            page,
            size: pageSize,
          },
        });
      },
      onShowSizeChange: (current, size) => {
        this.props.dispatch({
          type: 'feed_lst/fetchFeedbackLst',
          payload: {
            page: current,
            size,
          },
        });
      },
    };
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '反馈内容',
        dataIndex: 'contents',
        key: 'contents',
      },
      {
        title: '反馈时间',
        dataIndex: 'create_time',
        key: 'create_time',
      },
      {
        title: '操作',
        dataIndex: '',
        key: 'handle',
        width: 100,
        render: (text, record, index) => (
          <Fragment>
            <a onClick={() => onChange(record)}>{record.is_deal === 1 ? '已处理' : '未处理'}</a>
          </Fragment>
        ),
      },
    ];

    const onChange = payload => {
      this.props.dispatch({
        type: 'feed_lst/fetchdealLst',
        payload: {
          ...payload,
          page: paginationprops.current,
          size: paginationprops.pageSize,
        },
      });
      this.props.dispatch({
        type: 'feed_lst/fetchFeedbackLst',
        payload: {
          size: 10,
          is_deal: 1,
        },
      });
    };

    return (
      <PageHeaderLayout>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            title="意见反馈"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Table
              rowKey="id"
              loading={loading}
              columns={columns}
              dataSource={feedbackData.data}
              pagination={paginationprops}
              renderItem={item => (
                <List.Item>
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
