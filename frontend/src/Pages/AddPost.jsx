import Header from "../Components/Header"
import Navigation from "../Components/Navigation"

function AddPost() {

  return (
    <>
        <div>
            <Header/>
            <Navigation/>
            <div className="ml-44 mt-20">
                <h1 className="text-2xl font-bold">Add Post</h1>
            </div>
        </div>
        
    </>
  )
}

export default AddPost