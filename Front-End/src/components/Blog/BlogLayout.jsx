import Footer from "../Layout/Fotter"
import Navbar from "../Layout/Navbar"
import PostArchive from "./AllBlog"


function BlogLayout() {
  return (
    <div>
          <div className="w-full overflow-hidden">
        <div className="bg-green-50 shadow-lg">
        <Navbar />
      </div>
      <PostArchive />
      <Footer />
      
    </div>
    </div>
  )
}

export default BlogLayout
