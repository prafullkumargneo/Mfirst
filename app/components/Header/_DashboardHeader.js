import React, { Component } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Keyboard,
    Alert,
    StatusBar,
    ScrollView,
    FlatList, ActivityIndicator
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DrawerActions } from 'react-navigation-drawer';
import Image from 'react-native-image-progress';
import { RNToasty } from 'react-native-toasty';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchIcon from 'react-native-vector-icons/AntDesign';
import NavService from '../../containers/navigators/navigationService';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import { deviceWidth, deviceHeight } from '../../constants/globals';

class DashboardHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            visble: false
        };
    }

    componentDidMount() {

    }

    cartNavigation() {
        NavService.navigate('root', 'Cart')

    }

    favouriteOrderNavigation() {

        NavService.navigate('root', 'FavoriteOrders')

    }
    searchBarNavigation() {
        NavService.navigate('root', 'SearchBar')

    }

    render() {
        return (

            <View style={{ backgroundColor: "transparent", flexDirection: 'row', paddingHorizontal: '15%' }}>
                <View style={{ justifyContent: "center", paddingBottom: "5%", marginRight: 23 }}>
                    <TouchableOpacity onPress={() => { this.searchBarNavigation() }}>
                        <SearchIcon
                            name={'search1'}

                            color={'black'}
                            size={24}
                            style={{ top: "5%" }}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: "center", paddingBottom: "5%" }}>
                    <TouchableOpacity onPress={() => { this.favouriteOrderNavigation() }}>
                        <Icon
                            name={'heart-outline'}

                            color={'black'}
                            size={25}
                            style={{ marginRight: 25, top: "5%" }}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: "center", paddingBottom: "5%" }}>
                    <TouchableOpacity onPress={() => { this.cartNavigation() }}>
                        <Icon
                            name={'cart-outline'}

                            color={'black'}
                            size={25}
                            style={{ marginRight: 5, top: "5%" }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeader)

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: 'yellow',

        justifyContent: 'space-around',
    },
});
