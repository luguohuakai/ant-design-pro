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
  Divider,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
  Table,
} from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './AcLst.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

@connect(({ prize_lst, loading }) => ({
  prize_lst,
  loading: loading.models.prize_lst,
}))
export default class BasicList extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'prize_lst/fetchPrizeLst',
      payload: {
        size: 10,
      },
    });
  }

  render() {
    const { prize_lst, loading } = this.props;
    const { prizeData } = prize_lst;

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );
    //搜索
    // const handleSearch = () => {
    //   const values = {
    //     school_name: search.value,
    //   };
    //   this.props.dispatch({
    //     type: `ac_lst/fetchAcLst`,
    //     payload: values,
    //   });
    // };
    // const search = keyword => {
    //   const extra = JSON.stringify({ name: keyword });
    //   this.props.dispatch({
    //     type: 'prize/fetchPrizeLst',
    //     payload: {
    //       size: 10,
    //       extra,
    //     },
    //   });
    // };
    const extraContent = (
      <div className={styles.extraContent}>
        <Search
          id="search"
          className={styles.extraContentSearch}
          placeholder="请按照学校名称搜索"
          // onSearch={value => search(value)}
        />
      </div>
    );
    const columns = [
      {
        title: 'title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '学校名称',
        dataIndex: 'school_id',
        key: 'school_id',
      },
      {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: 'img',
        dataIndex: 'img',
        key: 'img',
      },
      {
        title: '操作',
        dataIndex: '',
        key: 'handle',
        width: 200,
        render: (text, record, index) => (
          <Fragment>
            <a onClick={() => goToEdit(record)}>编辑</a>
            <Divider type="vertical" />
            <a onClick={() => deletePrize(record)}>删除</a>
          </Fragment>
        ),
      },
    ];
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: Number(prizeData.per_page) ? Number(prizeData.per_page) : 10,
      total: Number(prizeData.total) ? Number(prizeData.total) : 0,
      current: Number(prizeData.current_page) ? Number(prizeData.current_page) : 1,
      onChange: (page, pageSize) => {
        this.props.dispatch({
          type: 'prize_lst/fetchPrizeLst',
          payload: {
            page,
            size: pageSize,
          },
        });
      },
      onShowSizeChange: (current, size) => {
        this.props.dispatch({
          type: 'prize_lst/fetchPrizeLst',
          payload: {
            page: current,
            size,
          },
        });
      },
    };

    // 删除
    const deletePrize = payload => {
      this.props.dispatch({
        type: 'prize_lst/deletePrize',
        payload: {
          ...payload,
          page: paginationProps.current,
          size: paginationProps.pageSize,
        },
      });
    };

    const ListContent = ({ data: { title, school_id, desc, img } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>奖项名称</span>
          <p>{title}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>学校名称</span>
          <p>{school_id}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>desc</span>
          <p>{desc}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>play</span>
          <p>{img}</p>
        </div>
      </div>
    );

    const moreHandle = ({ item, key }) => {
      alert(key);
    };
    const goToEdit = payload => {
      this.props.history.push(`/lst/update-prize?id=${payload.id}`);
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
          更多 <Icon type="down" />
        </a>
      </Dropdown>
    );

    return (
      <PageHeaderLayout>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col>
                <Info title="prize总数" value="18个" bordered />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="AC列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Button
              href="#/lst/add-prize"
              type="dashed"
              style={{ width: '100%', marginBottom: 8 }}
              icon="plus"
            >
              添加
            </Button>
            <Table
              rowKey="id"
              loading={loading}
              columns={columns}
              dataSource={prizeData.data}
              pagination={paginationProps}
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
