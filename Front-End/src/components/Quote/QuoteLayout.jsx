import Navbar from "../Layout/Navbar"
import QuotePage from "./Quote"


function QuoteLayout() {
  return (
    <div className="overflow-hidden">
      <div className="bg-green-50">
      <Navbar />
      </div>
      <QuotePage />
    </div>
  )
}

export default QuoteLayout
