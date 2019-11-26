import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Accordion from '../components/Accordion';


class FAQScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: false,
            // faqs: []
            faqs: [
                {
                    question: 'Non Veg Biryanis',
                    answer: 'Biryani also known as biriyani, biriani, birani or briyani, is a mixed rice dish with its origins among the Muslims of the Indian subcontinent. This dish is especially popular throughout the Indian subcontinent, as well as among the diaspora from the region. It is also prepared in other regions such as Iraqi Kurdistan.',
                },
                {
                    question: 'Pizzas',
                    answer: 'Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven. In formal settings, like a restaurant, pizza is eaten with knife and fork, but in casual settings it is cut into wedges to be eaten while held in the hand. Small pizzas are sometimes called pizzettas.'
                },
                {
                    question: 'Drinks',
                    answer: 'A drink (or beverage) is a liquid intended for human consumption. In addition to their basic function of satisfying thirst, drinks play important roles in human culture. Common types of drinks include plain drinking water, milk, coffee, tea, hot chocolate, juice and soft drinks. In addition, alcoholic drinks such as wine, beer, and liquor, which contain the drug ethanol, have been part of human culture for more than 8,000 years.'
                },
                {
                    question: 'Deserts',
                    answer: 'A dessert is typically the sweet course that concludes a meal in the culture of many countries, particularly Western culture. The course usually consists of sweet foods, but may include other items. The word "dessert" originated from the French word desservir "to clear the table" and the negative of the Latin word servire'
                },
            ]
        };
    }

    /*   componentDidMount = async () => {
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
      } */

    render() { 
        const FAQ = this.state.faqs.map((faq, i) => {
            return (
                <View key={i} >
                    <Accordion answer={faq.answer} question={faq.question} />
                </View>
            )
        });
        return (
            <>
             {/*    <View style={styles.container}>
                    <Text style={styles.text}>FAQ</Text>
                </View> */}
                <ScrollView>
                    {FAQ}
                </ScrollView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
    },
    text: {
        fontSize: 20,
        marginLeft: 10

    }

})


export default FAQScreen;

//https://medium.com/@KPS250/creating-an-accordion-in-react-native-f313748b7b46