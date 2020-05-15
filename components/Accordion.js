import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import Color from '../constants/Colors';

class Accordion extends Component {
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
    /**https://medium.com/@KPS250/creating-an-accordion-in-react-native-f313748b7b46 
     * handle accordion component
    */
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.row} onPress={() => this.toggleExpand()}>
                    <Text style={[styles.title, styles.font]}>{this.props.question}</Text>
                    <Ionicons style={styles.icon} name={this.state.expanded ? 'md-arrow-dropdown' : 'md-arrow-dropup'} size={19} />
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
    },

    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Color.TROPICALRAINFOREST
    },
    row: {
        flexDirection: 'row',
        height: 56,
        paddingLeft: 25,
        paddingRight: 18,
        alignItems: 'center',
    },
    icon: {
        justifyContent: 'flex-end',
        marginLeft: 10,
        color: Color.EUCALYPTUS

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
