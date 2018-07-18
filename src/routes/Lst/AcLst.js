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

@connect(({ ac_lst, loading }) => ({
  ac_lst,
  loading: loading.models.ac_lst,
}))
export default class BasicList extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'ac_lst/fetchAcLst',
      payload: {
        size: 10,
      },
    });
    this.props.dispatch({
      type: 'ac_lst/fetchAcCount',
    });
  }

  render() {
    const { ac_lst, loading } = this.props;
    const { acData, acCount } = ac_lst;

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
        ac_id: search.value,
      };
      this.props.dispatch({
        type: `ac_lst/fetchAcLst`,
        payload: values,
      });
    };

    const extraContent = (
      <div className={styles.extraContent}>
        <Search
          id="search"
          className={styles.extraContentSearch}
          placeholder="请输入ac_id搜索"
          onSearch={handleSearch}
        />
      </div>
    );
    const columns = [
      {
        title: 'ACID',
        dataIndex: 'ac_id',
        key: 'ac_id',
      },
      {
        title: '学校名称',
        dataIndex: 'school_name',
        key: 'school_name',
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
            <a onClick={() => deleteAc(record)}>删除</a>
          </Fragment>
        ),
      },
    ];
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: Number(acData.per_page) ? Number(acData.per_page) : 10,
      total: Number(acData.total) ? Number(acData.total) : 0,
      current: Number(acData.current_page) ? Number(acData.current_page) : 1,
      onChange: (page, pageSize) => {
        this.props.dispatch({
          type: 'ac_lst/fetchAcLst',
          payload: {
            page,
            size: pageSize,
          },
        });
      },
      onShowSizeChange: (current, size) => {
        this.props.dispatch({
          type: 'ac_lst/fetchAcLst',
          payload: {
            page: current,
            size,
          },
        });
      },
    };

    // 删除
    const deleteAc = payload => {
      this.props.dispatch({
        type: 'ac_lst/deleteAc',
        payload: {
          ...payload,
          page: paginationProps.current,
          size: paginationProps.pageSize,
        },
      });
      this.props.dispatch({
        type: 'lst/fetchAcCount',
      });
    };

    const ListContent = ({ data: { ac_id, school_id, note } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>ACID</span>
          <p>{ac_id}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>学校名称</span>
          <p>{school_id}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>备注</span>
          <p>{note}</p>
        </div>
      </div>
    );

    const moreHandle = ({ item, key }) => {
      alert(key);
    };
    const goToEdit = payload => {
      this.props.history.push(`/lst/ac-update?id=${payload.id}`);
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
                <Info title="AC总数" value={acCount.count + '个'} bordered />
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
              href="#/lst/Ac-add"
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
              dataSource={acData.data}
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
