import React, { Component } from 'react';
import { Link } from 'dva/router';
import { Map } from 'react-amap';
import Heatmap from 'react-amap-plugin-heatmap';
import { connect } from 'dva';
import styles from './HotMap.less';

@connect(({ hotmap, loading }) => ({
    hotmap,
    loading: loading.effects['hotmap/fetchHotMapData'],
}))

export default class HotMap extends Component {
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch({
            type: 'hotmap/fetchHotMapData',
            payload: {
                school_id: localStorage.getItem('school_id') ? localStorage.getItem('school_id') : 1,
            },
        });
    }

    render() {
        const {hotmap, loading} = this.props;

        // 热力图配置 config props
        const {points} = hotmap;
        const visible = true;
        const radius = 25;
        const gradient = {
            0.5: 'blue',
            0.65: 'rgb(117,211,248)',
            0.7: 'rgb(0, 255, 0)',
            0.9: '#ffea00',
            1.0: 'red',
        };
        const zooms = [3, 18];
        const dataSet = {
            data: points,
            max: 10, // TODO: 数据量大时修改最大值
        };
        const opacity = [0, 0.8];

        const pluginProps = {
            visible,
            radius,
            gradient,
            zooms,
            dataSet,
            opacity,
        };

        // 地图配置
        // const center = [104.406932,31.132006];
        let center = [116.322287,39.957509]; // 北京理工大学
        const {location} = hotmap;
        if (location) {
            if ('lat' in location && 'lng' in location){
                center = [location.lng,location.lat];
            }else {
                center = [116.322287,39.957509];
            }
        }
        const zoom = 14;
        const resizeEnable = true;
        const features = ['bg', 'road'];

        const map = {
            // features,
            center,
            zoom,
            resizeEnable,
        };

        return (
          <Map {...map}>
            <Heatmap loading={loading} {...pluginProps} />
          </Map>
        );
    }
}

