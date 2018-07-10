/* eslint-disable linebreak-style */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { List, Card, Radio, Input } from 'antd';

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
    const { feedbackData } = feed_lst;
    const ListContent = ({ data: { phone, contents, create_time } }) => (
      <div className={styles.listContent}>
        {/*<div className={styles.listContentItem}>*/}
        {/*<span>手机号</span>*/}
        {/*<p>{phone}</p>*/}
        {/*</div>*/}
        <div className={styles.listContentItem}>
          {/*<span>反馈意见</span>*/}
          <p>{contents}</p>
        </div>
        <div className={styles.listContentItem}>
          {/*<span>创建时间</span>*/}
          <p>{create_time}</p>
        </div>
      </div>
    );
    const handleSearch = () => {
      const values = {
        contents: search.value,
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
          placeholder="请按照意见内容搜索"
          onSearch={handleSearch}
        />
      </div>
    );

    const deal = payload => {
      const feed_id = {
        id: payload.id,
      };
      this.props.dispatch({
        type: 'feed_lst/fetchdealLst',
        payload: feed_id,
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
            <List
              header={<div>反馈意见</div>}
              // footer={<div>Footer</div>}
              bordered
              loading={loading}
              pagination={paginationprops}
              dataSource={feedbackData.data}
              renderItem={item => (
                <List.Item actions={[<a onClick={() => deal({ id: item.id })}>未处理</a>]}>
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
