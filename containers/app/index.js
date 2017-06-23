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
import { Button, Card, Tabs } from 'antd-mobile';
import { get } from '../../services/project';
import BaiduMap from '../baidu-map';
import All from '../all-projects';

export default class App extends Component {

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
        return <All/>;
        return (
            <Tabs style={styles.container}>
                <Tabs.TabPane tab="所有项目" key="1">
                    <All/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="新开工项目" key="2">
                    <Card style={styles.card}>
                        <Card.Body>
                            <BaiduMap />
                        </Card.Body>
                    </Card>
                </Tabs.TabPane>
                <Tabs.TabPane tab="项目建设分析" key="3">
                    <Card style={styles.card}>
                        <Card.Body>

                        </Card.Body>
                    </Card>
                </Tabs.TabPane>
            </Tabs>
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
    },
    card: {
        height: Dimensions.get('window').height - 70
    }
});