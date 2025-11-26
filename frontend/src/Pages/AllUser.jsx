import Header from "../Components/Header"
import Navigation from "../Components/Navigation"
import Users from "../Components/Users"


function AllUser() {

  return (
    <>
        <div>
            <Header/>
            <Navigation/>
            <div className="ml-44 mt-20">
              <Users/>
            </div>
        </div>
        
    </>
  )
}

export default AllUser