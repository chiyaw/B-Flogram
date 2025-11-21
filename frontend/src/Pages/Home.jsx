import Header from "../Components/Header"
import Navigation from "../Components/Navigation"
import Posts from "../Components/Posts"

function Home() {

    return (
        <>
            <Header className="-z-10" />
            <Navigation className="-z-20" />
            <Posts className="-z-30" />
        </>
    )
}

export default Home