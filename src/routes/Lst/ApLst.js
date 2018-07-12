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
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
  Table,
  Divider,
} from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './ApLst.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

@connect(({ ap_lst, loading }) => ({
  ap_lst,
  loading: loading.models.ap_lst,
}))
export default class BasicList extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'ap_lst/fetchApLst',
      payload: {
        size: 10,
      },
    });
  }

  render() {
    const { ap_lst, loading } = this.props;
    const { apData } = ap_lst;

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
        ap_name: search.value,
      };
      this.props.dispatch({
        type: `ap_lst/fetchApLst`,
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
          placeholder="请按照ap_name搜索"
          onSearch={handleSearch}
        />
      </div>
    );
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: Number(apData.per_page) ? Number(apData.per_page) : 10,
      total: Number(apData.total) ? Number(apData.total) : 0,
      current: Number(apData.current_page) ? Number(apData.current_page) : 1,
      onChange: (page, pageSize) => {
        this.props.dispatch({
          type: 'ap_lst/fetchApLst',
          payload: {
            page,
            size: pageSize,
          },
        });
      },
      onShowSizeChange: (current, size) => {
        this.props.dispatch({
          type: 'ap_lst/fetchApLst',
          payload: {
            page: current,
            size,
          },
        });
      },
    };

    // 删除
    const deleteAp = payload => {
      this.props.dispatch({
        type: 'ap_lst/deleteAp',
        payload: {
          ...payload,
          page: paginationProps.current,
          size: paginationProps.pageSize,
        },
      });
    };
    const goToEdit = payload => {
      this.props.history.push(`/lst/ap-update?id=${payload.id}`);
    };

    const ListContent = ({ data: { ap_name, ip_addr, ap_model, ap_mac } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>ap_name</span>
          <p>{ap_name}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>ip_addr</span>
          <p>{ip_addr}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>ap_model</span>
          <p>{ip_addr}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>ap_mac</span>
          <p>{ap_mac}</p>
        </div>
      </div>
    );
    const columns = [
      {
        title: 'ap_name',
        dataIndex: 'ap_name',
        key: 'ap_name',
      },
      {
        title: 'ip_addr',
        dataIndex: 'ip_addr',
        key: 'ip_addr',
      },
      {
        title: 'ap_model',
        dataIndex: 'ap_model',
        key: 'ap_model',
      },
      {
        title: 'ap_mac',
        dataIndex: 'ap_mac',
        key: 'ap_mac',
      },
      {
        title: '操作',
        dataIndex: '',
        key: 'handle',
        width: 200,
        render: (text, record) => (
          <Fragment>
            <a onClick={() => goToEdit(record)}>编辑</a>
            <Divider type="vertical" />
            <a onClick={() => deleteAp(record)}>删除</a>
          </Fragment>
        ),
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
            title="AP列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Button
              href="#/lst/Ap-add"
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
              dataSource={apData.data}
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
