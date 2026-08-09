import Sidebar from "./Sidebar"

import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"


const Dashboard = () => {
  return (
      <SidebarProvider>
      <Sidebar/>
     
    </SidebarProvider>
  )
}

export default Dashboard
