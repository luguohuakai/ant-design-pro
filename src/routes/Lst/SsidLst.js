/* eslint-disable linebreak-style */
import React, { PureComponent } from 'react';

import { connect } from 'dva';
import { List, Card, Row, Col, Radio, Input, Button, Icon, Dropdown, Menu } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './SsidLst.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

@connect(({ ssid_lst, loading }) => ({
  ssid_lst,
  loading: loading.models.ssid_lst,
}))
export default class BasicList extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'ssid_lst/fetchSsidLst',
      payload: {
        size: 10,
      },
    });
  }

  render() {
    const { ssid_lst, loading } = this.props;
    const { ssidData } = ssid_lst;

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
        ssid: search.value,
      };
      this.props.dispatch({
        type: `ssid_lst/fetchSsidLst`,
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
          placeholder="请按照ssid搜索"
          onSearch={handleSearch}
        />
      </div>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: Number(ssidData.per_page) ? Number(ssidData.per_page) : 10,
      total: Number(ssidData.total) ? Number(ssidData.total) : 0,
      current: Number(ssidData.current_page) ? Number(ssidData.current_page) : 1,
      onChange: (page, pageSize) => {
        this.props.dispatch({
          type: 'ssid_lst/fetchSsidLst',
          payload: {
            page,
            size: pageSize,
          },
        });
      },
      onShowSizeChange: (current, size) => {
        this.props.dispatch({
          type: 'ssid_lst/fetchSsidLst',
          payload: {
            page: current,
            size,
          },
        });
      },
    };

    // 删除
    const deleteSsid = payload => {
      this.props.dispatch({
        type: 'ssid_lst/deleteSsid',
        payload: {
          ...payload,
          page: paginationProps.current,
          size: paginationProps.pageSize,
        },
      });
    };
    const goToEdit = payload => {
      this.props.history.push(`/lst/ssid-update?id=${payload.id}`);
    };

    const ListContent = ({ data: { school_id, ssid } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>school_id</span>
          <p>{school_id}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>ssid</span>
          <p>{ssid}</p>
        </div>
      </div>
    );

    const moreHandle = ({ item, key }) => {
      // alert(key);
      // console.log(item)
      // this.props.history.push("/lst/ssid-update");
    };

    const menu = (
      <Menu>
        <Menu.Item key="edit" onClick={moreHandle}>
          编辑
        </Menu.Item>
        <Menu.Item key="delete">删除</Menu.Item>
      </Menu>
    );

    const MoreBtn = ({ data: { id } }) => (
      <Dropdown data={id} overlay={menu}>
        <a>
          更多{id} <Icon type="down" />
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
            title="schoolssid列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Button
              href="#/lst/ssid-add"
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
              dataSource={ssidData.data}
              renderItem={item => (
                <List.Item
                  actions={[
                    <a onClick={() => deleteSsid({ id: item.id })}>删除</a>,
                    <a onClick={() => goToEdit({ id: item.id })}>编辑</a>,
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
