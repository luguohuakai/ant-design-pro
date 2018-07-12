/* eslint-disable linebreak-style */
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Table, Input, Card, Row, Col, Divider, Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Search } = Input;
import styles from './SsidLst.less';

@connect(({ ssid_lst, loading }) => ({
  ssid_lst,
  loading: loading.models.ssid_lst,
}))
export default class BasicList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'ssid_lst/fetchSsidLst',
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

    const columns = [
      {
        title: '学校名称',
        dataIndex: 'school_id',
        key: 'school_id',
      },
      {
        title: 'ssid',
        dataIndex: 'ssid',
        key: 'ssid',
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
            <a onClick={() => deleteSsid(record)}>删除</a>
          </Fragment>
        ),
      },
    ];
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
    const ListContent = ({ data: { school_name, ssid } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <p>{school_name}</p>
        </div>
        <div className={styles.listContentItem}>
          <p>{ssid}</p>
        </div>
      </div>
    );
    const extraContent = (
      <div className={styles.extraContent}>
        <Search
          id="search"
          className={styles.extraContentSearch}
          placeholder="请根据ssid查找"
          onSearch={handleSearch}
          // onSearch={value => search(value)}
        />
      </div>
    );
    // const search = keyword => {
    //     const like = JSON.stringify({ name: keyword });
    //     this.props.dispatch({
    //         type: 'lst/fetchSsidLst',
    //         payload: {
    //             size: 100,
    //             like,
    //         },
    //     });
    // };
    return (
      <PageHeaderLayout>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={6} xs={12}>
                <Info title="用户总数" value="8" bordered />
              </Col>
              <Col sm={6} xs={12}>
                <Info title="Android总数" value="4" bordered />
              </Col>
              <Col sm={6} xs={12}>
                <Info title="IOS总数" value="4" bordered />
              </Col>
              <Col sm={6} xs={12}>
                <Info title="其他" value="18" />
              </Col>
            </Row>
          </Card>
          <Card
            className={styles.listCard}
            bordered={false}
            title="用戶列表"
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
            <Table
              rowKey="id"
              loading={loading}
              columns={columns}
              dataSource={ssidData.data}
              pagination={paginationProps}
              // onSelectRow={this.handleSelectRows}
              // onChange={this.handleStandardTableChange}
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
