
import { useGlobalContext } from '@/context/GlobalContext';
import { Avatar } from "@/components/ui/avatar"
import { Card, CardContent} from "@/components/ui/card"

function CalendarIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
      </svg>
    )
  }
  
  
function MessageCircleIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      </svg>
    )
}

const Profile = () => {

    const {user} = useGlobalContext();

    return (
        <div className="grid max-w-3xl gap-8 px-4 mx-auto lg:grid-cols-2 lg:gap-6 xl:gap-10 py-8">
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center space-x-4 gap-8">
              <img
                  src={user?.photo_url || "https://vercel.com/api/www/avatar/kXwUVWYcKQiITwkzB8n8dJFC?s=64"}
                  alt="Avatar"
                  className="rounded-full object-cover w-20 h-20"
                />
              <div className="space-y-1">
                <h1 className="text-3xl font-bold">{`${user?.first_name || 'No User'} ${user?.last_name || 'Found'}`}</h1>
                <p className="text-gray-500 dark:text-gray-400">Senior Software Engineer</p>
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              Passionate about building accessible and inclusive web experiences.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Recent Activity</h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="flex items-center space-x-4 py-4">
                  <CalendarIcon className="w-6 h-6"/>
                  <div className="grid items-center grid-rows-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Scheduled a meeting</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center space-x-4 py-4">
                  <MessageCircleIcon className="w-6 h-6" />
                  <div className="grid items-center grid-rows-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Sent a message</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">1 day ago</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )
}

export default Profile