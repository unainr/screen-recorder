import { ScreenRecorderDialog } from "@/components/recording/screen-recorder-dialog"
import { ShowAllVideo } from "@/components/recording/show-all-video"


const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen"><ScreenRecorderDialog />
    <ShowAllVideo/>
    </div>
  )
}

export default Home