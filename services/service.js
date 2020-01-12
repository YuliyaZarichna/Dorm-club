
import getEnvVars from '../environment';
const { apiURL } = getEnvVars();
import * as SecureStore from 'expo-secure-store';

// get all posts from DB 
const getAllPosts = async () => {
    try {
        var token = await SecureStore.getItemAsync('secure_token');
        console.log("toke", token);
        // this._isMounted = true;
        //this.isLoading = true;

        const res = await fetch(`${apiURL}/posts`, {
            method: 'GET',
            headers: {
                'access-token': token,
                'Content-Type': 'application/json',
            },
        });
        const resJson = await res.json();
        // if (this._isMounted) {
        return {
            //refreshing: false,
            // isLoading: false,
            posts: resJson
        };
        // }
    }
    catch (error) {
        console.error(error);
    }
}
//delete by id  
const deletePostById = async (id) => {
    try {
        this._isMounted = true;
        //add loading true
        await fetch(`${apiURL}/post/` + id, {
            method: 'DELETE',
        })
            .then(() => {
                const index = this.state.posts.findIndex(item => item.id === id);
                this.state.posts.splice(index, 1);
                this.setState({
                    posts: this.state.posts
                })
            });
    }
    catch (err) {
        this.setState({ loading: false, err: true })
    }
}
export { getAllPosts, deletePostById }