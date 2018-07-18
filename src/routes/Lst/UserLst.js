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

@connect(({ user_lst, loading }) => ({
  user_lst,
  loading: loading.models.user_lst,
}))
export default class BasicList extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'user_lst/fetchUserLst',
      payload: {
        size: 10,
      },
    });
  }

  render() {
    const { user_lst, loading } = this.props;
    const { userData } = user_lst;

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
        wx_nick_name: search.value,
      };
      this.props.dispatch({
        type: 'user_lst/fetchUserLst',
        payload: values,
      });
    };

    const extraContent = (
      <div className={styles.extraContent}>
        <Search
          id="search"
          className={styles.extraContentSearch}
          placeholder="请按微信昵称搜索"
          onSearch={handleSearch}
        />
      </div>
    );
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '头像',
        key: 'wx_avatar_url',
        render: index => <Avatar src={index.wx_avatar_url} shape="square" size="large" />,
      },
      {
        title: 'OPENID',
        dataIndex: 'open_id',
        key: 'open_id',
      },
      {
        title: '微信昵称',
        dataIndex: 'wx_nick_name',
        key: 'wx_nick_name',
      },
      {
        title: '今日登录次数',
        dataIndex: 'today_times',
        key: 'today_times',
      },
      {
        title: '设备类型',
        dataIndex: 'client_type',
        key: 'client_type',
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        key: 'create_time',
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
            <a onClick={() => deleteUser(record)}>删除</a>
          </Fragment>
        ),
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: Number(userData.per_page) ? Number(userData.per_page) : 10,
      total: Number(userData.total) ? Number(userData.total) : 0,
      current: Number(userData.current_page) ? Number(userData.current_page) : 1,
      onChange: (page, pageSize) => {
        this.props.dispatch({
          type: 'user_lst/fetchUserLst',
          payload: {
            page,
            size: pageSize,
          },
        });
      },
      onShowSizeChange: (current, size) => {
        this.props.dispatch({
          type: 'user_lst/fetchUserLst',
          payload: {
            page: current,
            size,
          },
        });
      },
    };

    // 删除
    const deleteUser = payload => {
      this.props.dispatch({
        type: 'user_lst/deleteUser',
        payload: {
          ...payload,
          page: paginationProps.current,
          size: paginationProps.pageSize,
        },
      });
    };

    const moreHandle = ({ item, key }) => {
      alert(key);
    };
    const goToEdit = payload => {
      this.props.history.push(`/lst/user-update?id=${payload.id}`);
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
          <Card
            className={styles.listCard}
            bordered={false}
            title="用户列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Table
              rowKey="id"
              loading={loading}
              columns={columns}
              dataSource={userData.data}
              pagination={paginationProps}
              renderItem={item => (
                <List.Item>
                  {/*avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}*/}
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
