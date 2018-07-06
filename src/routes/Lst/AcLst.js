/* eslint-disable linebreak-style */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { List, Card, Row, Col, Radio, Input, Button, Icon, Dropdown, Menu, Avatar } from 'antd';

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
  }

  render() {
    const { ac_lst, loading } = this.props;
    const { acData } = ac_lst;

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
        <RadioGroup defaultValue="all">
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="progress">已上线</RadioButton>
          <RadioButton value="waiting">即将上线</RadioButton>
        </RadioGroup>
        <Search
          id="search"
          className={styles.extraContentSearch}
          placeholder="请输入ac_id搜索"
          onSearch={handleSearch}
        />
      </div>
    );

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
    };

    const ListContent = ({ data: { ac_id, school_id, note } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>ACID</span>
          <p>{ac_id}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>schoolID</span>
          <p>{school_id}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>note</span>
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
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={acData.data}
              renderItem={item => (
                <List.Item
                  actions={[
                    <a onClick={() => deleteAc({ id: item.id })}>删除</a>,
                    <a onClick={() => goToEdit({ id: item.id })}>修改</a>,
                  ]}
                >
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
