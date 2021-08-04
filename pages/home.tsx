import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Container from "../components/container"
import Layout from "../components/layout"
import Nav from "../components/nav"
import { useStoreState } from "../components/store"
import { UserBoundary } from "../components/userBoundary"
import firebase from '../firebase'
import { Post } from '../components/types'
import PostPreview from "../components/postPreview"



interface HomeProps {
    posts: Post[] | undefined
}

function Home(props: HomeProps) {

    return (
        <div>
            <Head>
                <title>Your Feed | reauthor</title>
                <meta name="description" content="Fast and Free Blogging Service" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav />
            <Layout>
                <Container>
                    {props.posts ? props.posts.map((post, index) => <PostPreview post={post} key={index} showSource />) : <div style={{display: 'flex', justifyContent: 'center'}}><p>No posts to show...</p></div>}
                </Container>
            </Layout>
        </div>
    );
}

export default function HomeWrapper() {
    const router = useRouter();
    const user = useStoreState(state => state.user);
    const [posts, setPosts] = useState<Post[]>();


    useEffect(() => {
        // code review: does this fire unnecessarily if user is updated?
        if(!user || user.following.length === 0) return;
        (async () => {
            try {
                console.log('following', user.following);
                const postsRef = await firebase.firestore().collectionGroup('posts').where('blog', 'in', user.following).orderBy('date', 'desc').limit(10).get();
                console.log('postsRef', postsRef.docs);
                if(!postsRef.docs || postsRef.docs.length === 0) {
                    setPosts(undefined);
                    console.log('set undefined')
                    return
                };
                const posts = postsRef.docs.map((doc) => doc.data());
                console.log('posts', posts);
                // code review: as any
                setPosts(posts as any);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [user])

    return (<UserBoundary onUserLoaded={(user, username) => {
        if (!user) {
            router.push('/login')
            return;
        }
        if (!username) {
            router.push('/create-user')
            return;
        }
    }}><Home posts={posts} /></UserBoundary>);
}