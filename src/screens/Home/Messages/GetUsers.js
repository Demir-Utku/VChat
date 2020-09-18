import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { getAllUsers, startRoom } from '../../../actions'

const count = 0;

const GetUsers = (props) => {
    useEffect(() => {
        props.getAllUsers()
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                style={{ flex: 1, backgroundColor: 'white' }}
                data={props.allUsers}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    console.log('Gelen user: ', item);
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                console.log('User: ', props.user);
                                const second_user = item
                                const path = props.user.userName + '+' + second_user.userName
                                const params = {
                                    userName: props.user.userName,
                                    createdDate: new Date(),
                                    first_user: props.user,
                                    second_user,
                                    path
                                }
                                props.startRoom(path, params)
                                props.navigation.navigate('MessageDetail', { path })
                            }}
                            style={{ flexDirection: 'row', margin: 10, borderBottomWidth: 0.4, borderBottomColor: 'gray' }}>

                            <View style={{ padding: 10 }}>
                                <Text style={{ fontSize: 16 }}>{!item.userName ? '' : '@' }{item.userName}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    );
}

const styles = {
    text: { padding: 3 }
}

const mapStateToProps = ({ messageResponse, authResponse }) => {
    const { loadingUsers, allUsers } = messageResponse;
    return { loadingUsers, allUsers, user: authResponse.user };
};

export default connect(mapStateToProps, { getAllUsers, startRoom })(GetUsers);