import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import Accordion from '../components/Accordion';
import getEnvVar from '../environment';
const { apiURL } = getEnvVar();
import Color from '../constants/Colors';


class FAQScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            faqs: []
        };
    }

    /** get FAQ from back-end */
    componentDidMount = async () => {
        try {
            const response = await fetch(`${apiURL}/faqs`);
            const faqs = await response.json();
            if (response.ok) {
                this.setState({
                    loading: false,
                    faqs
                });
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    render() {
        /** map faq */
        const FAQ = this.state.faqs.map((faq, i) => {
            return (
                <View key={i} >
                    <Accordion answer={faq.answer} question={faq.question} />
                </View>
            )
        });
        return (
            <ScrollView>
                {FAQ}
            </ScrollView>
        )
    }
}

FAQScreen.navigationOptions = () => {
    return {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Color.TEAL : ''
        },
        headerTintColor: Platform.OS === 'android' ? Color.WHITE : Color.TEAL,

    };
};

export default FAQScreen;
