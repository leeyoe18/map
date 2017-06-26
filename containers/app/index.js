/**
 * Created by yoe on 2017/6/20.
 */
import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Dimensions from 'Dimensions';
import { Button, Card, Tabs, TabBar } from 'antd-mobile';
import { get } from '../../services/project';
import All from '../all-projects';
import New from '../new';

const Item = TabBar.Item;

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hide: false,
            selectedTab: 'all',
            totalProjects: 0
        };
    }

    componentDidMount() {

    }

    setTotal = (totalProjects) => {
        this.setState({
            totalProjects
        });
    };

    showContent = () => {
        switch(this.state.selectedTab) {
            case 'all': return <All setTotal={this.setTotal} interface="getProjects"/>;
            case 'new': return <New />;
            case 'analysis': return <Text>analysis</Text>;
            default: return <Text>default</Text>;
        }
    };

    render() {
        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
                hidden={this.state.hidden}
            >
                <Item
                    title="所有项目"
                    key="1"
                    selected={this.state.selectedTab === 'all'}
                    badge={this.state.totalProjects}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'all',
                        });
                    }}
                />
                <Item
                    title="新开工项目"
                    key="2"
                    selected={this.state.selectedTab === 'new'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'new',
                        });
                    }}
                />
                <Item
                    title="项目建设分析"
                    key="3"
                    selected={this.state.selectedTab === 'analysis'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'analysis',
                        });
                    }}
                >
                    {this.showContent()}
                </Item>
            </TabBar>
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
    },
    iconStyle: {
        height: 28,
        width: 28
    }
});