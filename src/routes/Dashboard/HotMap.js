import React from 'react';
import { Link } from 'dva/router';
import { Map } from 'react-amap';
import Heatmap from 'react-amap-plugin-heatmap';
import { connect } from 'dva';

const points = [
  { lng: 116.191031, lat: 39.988585, count: 10 },
  { lng: 116.389275, lat: 39.925818, count: 60 },
  { lng: 116.287444, lat: 39.810742, count: 12 },
  { lng: 116.481707, lat: 39.940089, count: 13 },
  { lng: 116.410588, lat: 39.880172, count: 14 },
  { lng: 116.394816, lat: 39.91181, count: 15 },
  { lng: 116.31626, lat: 39.956306, count: 100 },
  { lng: 116.416002, lat: 39.952917, count: 80 },
  { lng: 121.50074, lat: 31.30639, count: 80 },
];

// config props
const visible = true;
const radius = 30;
const gradient = {
  '0.4': 'rgb(0, 255, 255)',
  '0.65': 'rgb(0, 110, 255)',
  '0.85': 'rgb(100, 0, 255)',
  '1.0': 'rgb(100, 0, 255)',
};
const zooms = [3, 18];
const dataSet = {
  data: data,
  max: 100,
};

const pluginProps = {
  visible,
  radius,
  gradient,
  zooms,
  dataSet,
};

export default () => (
  <Map>
    <Heatmap {...pluginProps} />
  </Map>
);

// @connect(({data, loading}) => ({
//     data,
//     loading: loading.effects['hotmap/fetchHotMapData'],
// }))
//
//
// export default class HotMap extends Component {
//     componentDidMount() {
//         const {dispatch} = this.props;
//         dispatch({
//             type: 'hotmap/fetchHotMapData',
//         });
//     }
//
//     render() {
//         const {data, loading} = this.props;
//
//         // config props
//         const visible = true;
//         const radius = 30;
//         const gradient = {
//             '0.4': 'rgb(0, 255, 255)',
//             '0.65': 'rgb(0, 110, 255)',
//             '0.85': 'rgb(100, 0, 255)',
//             '1.0': 'rgb(100, 0, 255)',
//         };
//         const zooms = [3, 18];
//         const dataSet = {
//             data: data,
//             max: 100,
//         };
//
//         const pluginProps = {
//             visible,
//             radius,
//             gradient,
//             zooms,
//             dataSet,
//         };
//
//         return (
//             <Map>
//                 <Heatmap {...pluginProps} />
//             </Map>
//         );
//     }
// }
//
