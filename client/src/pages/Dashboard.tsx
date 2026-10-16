import { useStore } from "../../store/store"
import { useEffect } from "react"

const Dashboard = () => {

  const {dashboardProducts, dashboard} = useStore()

  useEffect(() => {
    dashboard()
  }, [])
  console.log(dashboardProducts )
  return (
   <div>
      <div>
        <p>
          Key Metrics
        </p>
      </div>
   </div>
  )
}

export default Dashboard
