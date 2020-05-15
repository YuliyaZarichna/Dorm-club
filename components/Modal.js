
import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

/** component to manage modal window */
class ModalWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleModal: false,
        };
    }

    _openModal = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text>{text}</Text>
            </View>
        </TouchableOpacity>
    );

    _renderModalContent = () => (
        <View style={styles.modalContent}>
            {this._openModal('Hide post', () => this.setState({ visibleModal: false }))}
        </View>
    );

    render() {
        return (
            <View style={styles.container}>
                {this._openModal('Default modal', () => this.setState({ visibleModal: true }))}
                <Modal isVisible={this.state.visibleModal === true}>
                    {this._renderModalContent()}
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
});
export default ModalWindow;


// https://snack.expo.io/@kulack/react-native-modal-example
//https://github.com/react-native-community/react-native-modal