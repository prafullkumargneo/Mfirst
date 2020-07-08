import React, { PureComponent } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    ScrollView,
    StyleSheet,
    Platform,
    StatusBar,
    FlatList, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationActions } from 'react-navigation';
import { DrawerItems } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import NavService from '../navigationService';

import { lightGrey, white, greyIcon } from '../../../constants/colors';
import * as menuList from '../../../constants/menu';

import { HEIGHT } from '../../../constants/dimensions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _Button from '../../../components/Button/_Button';
import _TouchItem from '../../../components/TouchItem/_TouchItem';
import _Text from '../../../components/Text/_Text';
import _Separator from '../../../components/Separator/_Separator';
import _MainMenu from '../../../components/Menu/_MainMenu';
import _SubMenu from '../../../components/Menu/_SubMenu';
import categoryDetails from '../../../actions/CategoriesActions/CategoryActions';
import DrawerComponent from './DrawerComponent';

class SideBarComponent extends PureComponent {
    constructor() {
        super();
        this.state = {
            activeSwitch: 1,
            loggedInCredentials: null
        };
    }

    componentDidMount() {

    }



    render() {
        return (
            <View style={{ flex: 1 }}>
                <DrawerComponent drawerProps={this.props}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(SideBarComponent)


const styles = StyleSheet.create({
    closeButton: {
        flexDirection: 'row-reverse',
        margin: 10,
    },
    userHeaderContainer: {
        padding: 20,
    },
    navItem: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    navText: {
        fontSize: 20,
    },
    iconTextContainer: {
        margin: 10,
        paddingLeft: 20,
    },
});
