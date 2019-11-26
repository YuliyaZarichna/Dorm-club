import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import сolor from '../constants/Colors';

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
                    <Ionicons style={styles.icon} name={this.state.expanded ? 'md-arrow-dropdown' : 'md-arrow-dropup'} size={30} />
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
        //flex:1,
        flexDirection: 'column',
       // marginTop:100,
    },

    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
    },
    row: {
        flexDirection: 'row',
        height: 56,
        paddingLeft: 25,
        paddingRight: 18,
        alignItems: 'center',
        backgroundColor: сolor.VIOLET,
    },
    icon: {
        justifyContent: 'flex-end',
        marginLeft: 10,
        color: 'white'

    },
    parentHr: {
        height: 1,
        color: 'white',
        width: '100%'
    },
    child: {
        backgroundColor: 'white',
        padding: 16,
    }

});

export default Accordion;

// https://medium.com/@KPS250/creating-an-accordion-in-react-native-f313748b7b46