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
import { Card, Tabs, List, WingBlank, Flex, SegmentedControl } from 'antd-mobile';
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

    onChange = (e) => {
        const index = e.nativeEvent.selectedSegmentIndex;
        if(index === 0) {
            this.setState({
                mapData: this.state.data.rows
            });
        } else {
            const years = this.getYears(this.state.data);
            const year = Object.keys(years)[index - 1];
            this.setState({
                mapData: years[year]
            });
        }
    };

    render() {
        const years = this.getYears(this.state.data);
        let total = 0;
        if(this.state.data.rows) total = this.state.data.rows.length;
        const items = [`全部 (${total})`];
        for(const year of Object.keys(years)) {
            const item = years[year];
            items.push(`${year} (${item.length})`);
        }
        return (
            <Card style={styles.card}>
                <Card.Body>
                    <WingBlank style={styles.toolbar}>
                        <SegmentedControl
                            selectedIndex={0}
                            values={items}
                            onChange={this.onChange}
                        />
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