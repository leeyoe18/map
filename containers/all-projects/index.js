/**
 * Created by yoe on 2017/6/20.
 */
import React, {
    Component,
    PropTypes
} from 'react';

import {
    StyleSheet, View, Button
} from 'react-native';
import Dimensions from 'Dimensions';
import { Card, Tabs, List, WingBlank, Flex } from 'antd-mobile';
import { get } from '../../services/project';
import BaiduMap from '../baidu-map';

const Item = List.Item;

export default class BaiduMapDemo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            activeKey: 'all',
            mapData: []
        };
    }

    componentDidMount() {
        get('getProjects', null, (data) => {
            if(data.pass) {
                this.setState({
                    data: data.data,
                    mapData: data.data.rows
                });
                this.props.setTotal(data.data.rows.length);
            }
        });
    }

    getYears = (data) => {
        let results = {};
        if(data.rows) {
            data.rows.forEach(item => {
                const year = item.year;
                if(!results[year]) {
                    results[year] = [item];
                } else {
                    results[year].push(item);
                }
            });
        }
        return results;
    };

    getColor = (key) => {
        if (key === this.state.activeKey) return '#108ee9';
        return '#ccc'
    };

    handleClickYear = (key) => {
        this.setState({
            activeKey: key
        });
        if(key === 'all') {
            this.setState({
                mapData: this.state.data.rows
            });
        } else {
            const years = this.getYears(this.state.data);
            this.setState({
                mapData: years[key]
            });
        }
    };

    render() {
        const years = this.getYears(this.state.data);
        let total = 0;
        if(this.state.data.rows) total = this.state.data.rows.length;
        const items = [
            <Flex.Item key='all'>
                <Button title={`全部 (${total})`} color={this.getColor('all')} onPress={() => {this.handleClickYear('all')}}/>
            </Flex.Item>
        ];
        for(const year of Object.keys(years)) {
            const item = years[year];
            items.push(
                <Flex.Item key={year}>
                    <Button title={`${year} (${item.length})`} color={this.getColor(year)} onPress={() => {this.handleClickYear(year)}}/>
                </Flex.Item>
            );
        }
        return (
            <Card style={styles.card}>
                <Card.Body>
                    <WingBlank style={styles.toolbar}>
                        <Flex>
                            {items}
                        </Flex>
                    </WingBlank>
                    <BaiduMap
                        data={this.state.mapData}
                    />
                </Card.Body>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        height: Dimensions.get('window').height - 70
    },
    toolbar: {
        marginBottom: 12
    }
});