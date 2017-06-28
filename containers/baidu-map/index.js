/**
 * Created by yoe on 2017/6/20.
 */
import React, {
    Component,
    PropTypes
} from 'react';

import {
    MapView,
    MapTypes,
    Geolocation
} from 'react-native-baidu-map';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

import { Popover, Card, Button } from 'antd-mobile';

import Dimensions from 'Dimensions';

const statusMap = {
    0: '红灯',
    1: '黄灯',
    2: '绿灯',
    3: '蓝灯',
    4: '白灯'
};

export default class BaiduMapDemo extends Component {

    constructor() {
        super();

        this.state = {
            mayType: MapTypes.SATELLITE,
            zoom: 15,
            center: {
                longitude: 113.981718,
                latitude: 22.542449
            },
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            visible: false,
            markerData: {}
        };
    }

    componentDidMount() {

    }

    markerClick = (e) => {
        const title = e.title;
        const data = this.props.data.find(data => data.name === title);
        this.setState({
            markerData: data,
            visible: true
        });
        // console.warn(JSON.stringify(e));
    };

    mapClick = (e) => {
        if(!e.title) {
            this.hideCard();
        }
    };

    hideCard = () => {
        this.setState({
            visible: false,
            markerData: {}
        });
    };

    toPath = () => {
        const { navigate } = this.props.navigation;
        const data = this.state.markerData;
        navigate('Detail', {
            path: data.id,
            title: data.name
        });
    };

    render() {
        const markers = this.props.data.map(data => {
           return {
               longitude: data.long,
               latitude: data.lat,
               title: data.name,
               data: data
           };
        });
        let center = {
            longitude: 113.981718,
            latitude: 22.542449
        };
        if(markers.length > 0) {
            center = markers[0];
        }
        let card = null;
        if(this.state.visible && this.props.navigation) {
            card = (
                <View style={styles.tip}>
                    <Card>
                        <Card.Header
                            title={
                                <Text style={styles.cardTitle} onPress={this.toPath}>
                                    {this.state.markerData.name}
                                </Text>
                            }
                            extra={
                                <View onPress={this.hideCard} style={styles.cardExtra}>
                                    <Text style={styles.cardText}>
                                        &times;
                                    </Text>
                                </View>
                            }
                        />
                        <Card.Body>
                            <Text style={styles.text}>年份: {this.state.markerData.year}</Text>
                            <Text style={styles.text}>状态: {statusMap[this.state.markerData.status]}</Text>
                            <Button
                                size='small'
                                style={styles.btn}
                                onClick={this.toPath}
                            >
                                详情
                            </Button>
                        </Card.Body>
                    </Card>
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <MapView
                    trafficEnabled={this.state.trafficEnabled}
                    baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                    zoom={this.state.zoom}
                    mapType={this.state.mapType}
                    center={center}
                    marker={this.state.marker}
                    markers={markers}
                    style={this.props.mapStyle || styles.map}
                    onMarkerClick={this.markerClick}
                    onMapClick={this.mapClick}
                />
                {card}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        height: 40
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 210
    },
    tip: {
        position: 'absolute',
        top: 32,
        right: 32,
        width: 220,
        height: 280
    },
    cardText: {
        fontSize: 24,
        textAlign: 'right'
    },
    cardTitle: {
        color: '#108ee9'
    },
    text: {
        marginLeft: 16,
        marginBottom: 16
    },
    cardExtra: {

    },
    btn: {

    }
});