import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Accordion from '../components/Accordion';

const { APP_URL } = process.env;

class FAQScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: false,
            faqs: []
        };
    }

    componentDidMount = async () => {
        try {
            //const res = await fetch(`${APP_URL}/faqs`);
            const res = await fetch('https://calm-fish-76.localtunnel.me/faqs');

            const faqs = await res.json();
            this.setState({
                loading: false,
                faqs
            });
        }
        catch (err) {
            this.setState({ loading: false, err: true })
        }
    }

    render() {
        return this.state.faqs.map((faq, i) => {
            return (
                <View style={styles.container} key={i}>
                    <Accordion answer={faq.answer} question={faq.question} />
                </View>
            )
        })
    }
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        //paddingTop:100,
    },

})


export default FAQScreen;