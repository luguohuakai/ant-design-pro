import React, { Component } from 'react';
import { Link } from 'dva/router';
import { Map } from 'react-amap';
import Heatmap from 'react-amap-plugin-heatmap';
import { connect } from 'dva';
import styles from './HotMap.less';

// const points = [
//   { lng: 116.191031, lat: 39.988585, count: 10 },
//   { lng: 116.389275, lat: 39.925818, count: 60 },
//   { lng: 116.287444, lat: 39.810742, count: 12 },
//   { lng: 116.481707, lat: 39.940089, count: 13 },
//   { lng: 116.410588, lat: 39.880172, count: 14 },
//   { lng: 116.394816, lat: 39.91181, count: 15 },
//   { lng: 116.31626, lat: 39.956306, count: 100 },
//   { lng: 116.416002, lat: 39.952917, count: 80 },
//   { lng: 121.50074, lat: 31.30639, count: 80 },
// ];

// config props
// const visible = true;
// const radius = 30;
// const gradient = {
//   '0.4': 'rgb(0, 255, 255)',
//   '0.65': 'rgb(0, 110, 255)',
//   '0.85': 'rgb(100, 0, 255)',
//   '1.0': 'rgb(100, 0, 255)',
// };
// const zooms = [3, 18];
// const dataSet = {
//   data: data,
//   max: 100,
// };
//
// const pluginProps = {
//   visible,
//   radius,
//   gradient,
//   zooms,
//   dataSet,
// };
//
// export default () => (
//   <Map>
//     <Heatmap {...pluginProps} />
//   </Map>
// );

@connect(({ hotmap, loading }) => ({
    hotmap,
    loading: loading.effects['hotmap/fetchHotMapData'],
}))

export default class HotMap extends Component {
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch({
            type: 'hotmap/fetchHotMapData',
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
            max: 10,
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
        const center = [116.322287,39.957509];
        const {location} = hotmap;
        // const center = [location.lng,location.lat];
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

