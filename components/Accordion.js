import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

class Accordion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.faqs,
            expanded: false,
        };
    }

    toggleExpand = () => {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.row} onPress={() => this.toggleExpand()}>
                    <Text style={[styles.title, styles.font]}>{this.props.question}</Text>
                    <Ionicons style={styles.icon} name={this.state.expanded ? 'md-arrow-dropdown' : 'md-arrow-dropup'} size={30} color='green' />

                </TouchableOpacity>
                <View style={styles.parentHr} />
                {
                    this.state.expanded &&
                    <View style={styles.child}>
                        <Text>{this.props.answer}</Text>
                    </View>
                }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        //paddingTop:100,
    },

    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'green',
    },
    row: {
        flexDirection: 'row',
        height: 56,
        paddingLeft: 25,
        paddingRight: 18,
        alignItems: 'center',
        backgroundColor: 'yellow',
    },
    icon: {
        justifyContent: 'flex-end',
    },
    parentHr: {
        height: 1,
        color: 'white',
        width: '100%'
    },
    child: {
        backgroundColor: 'gray',
        padding: 16,
    }

});

export default Accordion;