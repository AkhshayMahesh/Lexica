import NavBar from '../components/Nav.tsx'
import Footer from '../components/Footer.tsx'
import Landing from '../components/Landing.tsx'
import Actual from '../components/Actual.tsx'

type homeProps = {
    page: string
}

const Layout = (props: homeProps) => {
    return (
        <div className=' flex items-center flex-col'>
            <NavBar />
            {props.page == "landing" && <Landing />}
            {props.page == "try" && <Actual />}
            
            {/* <Footer /> */}
        </div>
    )
}

export default Layout;