import {
    GET_MESSAGES_START,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_FAILD,

    ADD_MESSAGES_START,
    ADD_MESSAGES_SUCCESS,
    ADD_MESSAGES_FAILD,

    GET_ROOM_START,
    GET_ROOM_SUCCESS,
    GET_ROOM_FAILD,

    ADD_ROOM_FAILD,
    ADD_ROOM_START,
    ADD_ROOM_SUCCESS,

    GET_ALL_USER_START,
    GET_ALL_USER_SUCCESS,
    GET_ALL_USER_FAILD

} from './types'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import * as RootNavigation from '../RootNavigation';

export const startRoom = (path,params) => {
    return (dispatch) => {
        dispatch({ type: ADD_ROOM_START })
        firestore()
            .collection('Messages').doc(path)
            .set(params)
            .then((data) => {
                console.log('Start Room!', data);
                // let messageId = data.id
                dispatch({ type: ADD_ROOM_SUCCESS })
                
            }).catch(() => {
                dispatch({ type: ADD_ROOM_FAILD })
                console.log('room not get!');
            })

    }
}

export const getRooms = () => {
    return (dispatch) => {
        dispatch({ type: GET_ROOM_START })
        firestore().collection('Messages').orderBy('createdDate', 'desc').onSnapshot(room => {
            console.log('room data: ', room);
            let data = [];
            room.forEach((doc) => {
                console.log('Gelen data. ', doc );
                data.push(doc.data())
            });
            console.log('gelen room datası: ', data);
            dispatch({ type: GET_ROOM_SUCCESS, payload: data });

        });

    }
}


export const getMessages = (path) => {
    return (dispatch) => {
        dispatch({ type: GET_MESSAGES_START });
        firestore().collection('Messages').doc(path).collection('items').orderBy('createdDate', 'desc').onSnapshot(message => {
            console.log('send message data: ', message);
            let data = [];
            message.forEach((doc) => {
                data.push(doc.data())
            });
            console.log('gelene mesaj datası: ', data);
            dispatch({ type: GET_MESSAGES_SUCCESS, payload: data });

        });
    }
}


export const addMessages = (path,params) => {
    return (dispatch) => {
        //dispatch({ type: ADD_MESSAGES_START })
        firestore()
            .collection('Messages').doc(path).collection('items')
            .add({...params, image: null})
            .then((data) => {
                //console.log('Message send!', data);
                //dispatch({ type: ADD_MESSAGES_SUCCESS });

                let messageId = data.id

                if(params.image) {
                    console.log("image", params.image)
                    const reference = storage().ref(`/message/${messageId}`);
                    reference.putFile(params.image).then( () => {
                        reference.getDownloadURL().then((imageURL) => {
                            console.log('image URL', imageURL);

                            firestore().collection('Messages').doc(path).collection('items').doc(messageId).update({ image: imageURL }).then(() => {
                                //dispatch({ type: ADD_MESSAGES_SUCCESS, payload: params })
                                RootNavigation.pop()
                            })
                        })
                    }).catch(error => {
                        console.log('Hatalı Resim Yükleme: ', error);
                    })
                } else {
                    //dispatch({ type: ADD_MESSAGES_SUCCESS, payload: params })
                    //RootNavigation.pop()
                }
                
            }).catch(() => {
                //dispatch({ type: ADD_MESSAGES_FAILD })
                console.log('Message not send!');
            })

    }
}


export const getAllUsers = () => {
    return (dispatch) => {
        dispatch({ type: GET_ALL_USER_START })
        firestore().collection('Users').get().then((users) => {
            let data = [];
            users.forEach((doc) => {
                data.push(doc.data())
            });

            console.log('gelen all users: ', data);
            dispatch({ type: GET_ALL_USER_SUCCESS, payload: data });
        }).catch(error => {
            console.log('mesajları çekerken hata aldık:', error);
            dispatch({ type: GET_ALL_USER_FAILD });
        })

    }
}
