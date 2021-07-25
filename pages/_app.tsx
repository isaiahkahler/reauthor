import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { StoreProvider } from 'easy-peasy'
import { store, useStoreActions, useStoreState } from '../components/store'
import firebase from '../firebase'
import React, { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
    return <StoreProvider store={store}><MyAppWrapper><Component {...pageProps} /></MyAppWrapper></StoreProvider>
}

function MyAppWrapper(props: { children?: React.ReactNode }) {

    // const username = useStoreState(state => state.username);
    const setUser = useStoreActions(actions => actions.setUser);
    const setUsername = useStoreActions(actions => actions.setUsername);
    const setBlogs = useStoreActions(actions => actions.setBlogs);
    const setFollowing = useStoreActions(actions => actions.setFollowing);
    const setUserLoading = useStoreActions(actions => actions.setUserLoading);

    useEffect(() => {
        // when auth state changes, update user, username, and blog
        let unsubDocListeners = () => { };
        const unsub = firebase.auth().onAuthStateChanged(async (user) => {
            console.log('auth state changed')
            if (!user) {
                setUser(undefined);
                setUsername(undefined);
                setBlogs(undefined);
                setUserLoading(false);
                return;
            }

            setUser(user);
            try {
                // set username
                const usernameRef = await firebase.firestore().collection('usernames').doc(user.uid).get();
                const usernameData = usernameRef.data();
                if (usernameRef.exists && usernameData) {
                    setUsername(usernameData.username);
                } else {
                    setUsername(undefined);
                }
                const _username = usernameRef.exists && usernameData ? usernameData.username : undefined;

                // set blogs & following
                unsubDocListeners = firebase.firestore().collection('users').doc(_username).onSnapshot((doc) => {
                    const docData = doc.data();
                    if (doc.exists && docData) {
                        if (!docData.following) setFollowing(undefined);
                        if (docData.following) setFollowing(docData.following);
                        if (!docData.blogs) setBlogs(undefined);
                        if (docData.blogs) setBlogs(docData.blogs);
                    }
                })
                // console.log('request: ', `/users/${_username}.blogs`)

            } catch (error) {
                // code review:
                console.error(error)
            }

            setUserLoading(false);

        }, (error) => {
            // code review: handle
        });

        // updateData(firebase.auth().currentUser);

        return () => {
            unsub();
            unsubDocListeners();
        }
    }, []);

    return (<>
        {props.children}
    </>);
}

export default MyApp
