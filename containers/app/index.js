/**
 * Created by yoe on 2017/6/20.
 */
import React, {
    Component,
    PropTypes
} from 'react';

import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Dimensions from 'Dimensions';
import { Button } from 'antd-mobile';
import { get } from '../../services/project';
import BaiduMap from '../baidu-map';

export default class BaiduMapDemo extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {
        get('getProjects', null, (data) => {

        });
    }

    render() {
        return (
            <BaiduMap style={styles.container}/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    map: {
        flex: 1
    }
});