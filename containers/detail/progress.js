/**
 * Created by yoe on 2017/6/20.
 */
import React, {
    Component,
    PropTypes
} from 'react';

import {
    StyleSheet, View, Platform, PixelRatio, Text, ScrollView, Image
} from 'react-native';
import { Flex, Card } from 'antd-mobile';
import Dimensions from 'Dimensions';

const Item = Flex.Item;

export default class Progress extends Component {

    constructor(props) {
        super(props);
    }

    getColumns = () => {
        let progress = this.props.data.progress || [];
        let cols = [];
        let col = [];
        progress.forEach((data, index) => {
           if((index + 1) % 3 === 0 || (index + 1) === progress.length) {
               col.push(
                   <Item key={index} style={styles.item}>
                       <Text>{data.title}</Text>
                   </Item>
               );
               cols.push(
                   <Flex key={index}>
                       {col}
                   </Flex>
               );
               col = [];
           } else {
               col.push(
                   <Item key={index}>
                       <Text>{data.title}</Text>
                   </Item>
               );
           }
        });
        return cols;
    };

    render() {
        return (
            <View style={styles.container}>
                { this.getColumns() }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        flex: 1
    },
    card: {
        flex: 1,
        height: 200
    },
    item: {
        flex: 1
    }
});