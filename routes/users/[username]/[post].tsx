import { GetServerSideProps } from "next"
import firebase from '../../../firebase'
import Post from '../../[blogSlug]/[post]'


export const getServerSideProps: GetServerSideProps = async (context) => {
    console.log('params', context.params);
    const { username, post } = context.params ? context.params : { username: '404', post: '404' };

    let userObject = null;
    let userPost = null;

    if (username && post && typeof (username) === 'string' && typeof (post) === 'string') {
        const userRef = await firebase.firestore().collection('users').doc(username).get();
        const userData = userRef.data();

        if (userRef.exists && userData) {
            userObject = { username: username, ...userData };

            const postRef = await firebase.firestore().collection('users').doc(username).collection('posts').doc(post).get();
            const postData = postRef.data();
            if (postRef.exists && postData) {
                userPost = {
                    title: postData.title,
                    description: postData.description,
                    date: postData.date,
                    image: postData.image,
                    tags: postData.tags,
                    content: postData.content,
                };
            }
        }
    }


    return {
        props: {
            post: userPost,
            user: userObject
        }
    }
}


export default Post;