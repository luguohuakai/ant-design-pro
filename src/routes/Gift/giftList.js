import {Button, Card, Input, Table} from 'antd';
import {connect} from 'dva';
import * as React from "react";
import styles from "../Lst/AcLst.less";
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Search } = Input;

class List extends React.Component {
    state = {};

    componentDidMount() {
        this.props.dispatch({
            type: 'gift/giftList',
        })
    }

    columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '名称',
            dataIndex: 'title',
        },
        {
            title: '库存',
            dataIndex: 'num',
        },
        {
            title: '价格',
            dataIndex: 'prize',
        },
    ];

    render() {
        const {giftLoading, giftModel} = this.props;

        const pagination = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: giftModel.pageSize,
            total: giftModel.total,
            current: giftModel.current,
            onChange: (page, size) => {
                this.props.dispatch({
                    type: 'gift/giftList',
                    payload: {page, size},
                });
            },
            onShowSizeChange: (page, size) => {
                this.props.dispatch({
                    type: 'gift/giftList',
                    payload: {page, size},
                });
            },
        };

        const extraContent = (
          <div className={styles.extraContent}>
            <Search
              id="search"
              className={styles.extraContentSearch}
              placeholder="请按照名称搜索"
              onSearch={value => search(value)}
            />
          </div>
        );

        return (
          <PageHeaderLayout>
            <div className={styles.standardList}>
              <Card
                className={styles.listCard}
                bordered={false}
                title="礼品列表"
                style={{ marginTop: 24 }}
                bodyStyle={{ padding: '0 32px 40px 32px' }}
                extra={extraContent}
              >
                <Button
                  href="#/gift/gift-add"
                  type="dashed"
                  style={{ width: '100%', marginBottom: 8 }}
                  icon="plus"
                >
                  添加
                </Button>
                <Table
                  bordered={false}
                  columns={this.columns}
                  pagination={pagination}
                  dataSource={giftModel.giftList}
                  loading={giftLoading}
                  rowKey="id"
                />
              </Card>
            </div>
          </PageHeaderLayout>
        );
    }
}

function mapStateToProps(state) {
    return {
        giftLoading: state.loading.effects['gift/giftList'],
        giftModel: state.gift,
    }
}

export default connect(mapStateToProps)(List);