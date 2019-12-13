import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import color from '../constants/Colors';
import str from '../constants/Strings';
import getEnvVars from '../environment';
const { apiURL } = getEnvVars();

class AddPostScreen extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            title: '',
            text: '',
            titleIsValid: false,
            newPost: {
                title: '',
                text: '',
            }
        };
    }

    componentWillMount() {
        this._isMounted = false;
    }

    createPost = async () => {
        try {
            this._isMounted = true;
            await fetch(`${apiURL}/post`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: this.state.title,
                    text: this.state.text,
                }),
            })
                .then(() => {
                    this.setState({
                        newPost: {
                            title: this.state.title,
                            text: this.state.text
                        }
                    })
                    console.log("state in add post", this.state)
                });
        }
        catch (error) {
            console.error(error);
        }
    }

    componentDidMount() {
        this.createPost();
    }

    componentWillUnmount() {
        //this.props.navigation.state.params.getAllPosts();
        //this.props.navigation.state.params.addNewPostToArray(this.state.newPost);
    }

    submitHandler() {
        console.log("combinedFunctionOnSubmit");
        const { navigation } = this.props;
        this.createPost();
        //  navigation.state.params.getAllPosts();
        navigation.state.params.addNewPostToArray({ title: this.state.title, text: this.state.text });
        navigation.goBack();
        //navigation.state.params.onNavigateBack();
    }

    /*   changeHandlerTitle = (title, text) => {
          console.log("title text", text);
          if (text.trim().length === 0 && title.trim().length === 0) {
              this.setState({
                  titleIsValid: false
              })
          } else {
              this.setState({
                  titleIsValid: true
              })
          }
          this.setState({
              title: title,
              text: text
          })
      }
  
      submitHandler = () => {
          const { navigation } = this.props;
          if (!this.state.titleIsValid) {
              alert('Please enter a title and description', [
                  { text: 'Okay' }
              ]);
              return;
          } else {
              this.createPost();
              navigation.state.params.addNewPostToArray({ title: this.state.title, text: this.state.text });
              navigation.goBack();
          }
      } */


    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <TextInput
                        placeholder={str.POST_TITLE}
                        placeholderTextColor="lightgrey"
                        value={this.state.title}
                        onChangeText={(title) => this.setState({ title })}
                        //onChangeText={this.changeHandlerTitle.bind(this, 'title')}
                        style={styles.input}
                        autoCorrect
                        returnKeyType="next"
                    />
                    <TextInput
                        placeholder={str.POST_DETAILS}
                        placeholderTextColor="lightgrey"
                        value={this.state.text}
                        onChangeText={(text) => this.setState({ text })}
                        //onChangeText={this.changeHandlerTitle.bind(this, 'text')}
                        style={styles.input}
                        autoCorrect
                    />

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={() => this.submitHandler()}
                        disabled={!this.state.text || !this.state.title}
                    >
                        <Text style={styles.submitButtonText}> Submit </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        height: 40,
        marginBottom: 20,
        borderColor: "rgba(255,255,255,0.7)",
        color: color.BLACK,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: color.LIGHTGRAY
    },
    submitButton: {
        backgroundColor: '#fc454e',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText: {
        color: 'white'
    }

})


export default AddPostScreen;

//https://medium.com/@KPS250/creating-an-accordion-in-react-native-f313748b7b46

// to prevent an error - can't perform a react state update on an unmounted component. this is a no-op
//https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component


//on navigate back, refresh the page
//https://stackoverflow.com/questions/50921080/react-native-reload-screen-a-in-back-action