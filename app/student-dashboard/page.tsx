// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"
// import { Badge } from "@/components/ui/badge"
// import {
//   User,
//   BookOpen,
//   Calendar,
//   Trophy,
//   Bell,
//   LogOut,
//   CheckCircle,
//   Clock,
//   Award,
//   ArrowRight,
//   Construction,
//   Home,
// } from "lucide-react"
// import { useRouter } from "next/navigation"

// export default function StudentDashboard() {
//   const router = useRouter()
//   const [activeTab, setActiveTab] = useState("overview")
//   const [userData, setUserData] = useState<any>(null)
//   const [isLoading, setIsLoading] = useState(false)

//   useEffect(() => {
//     // Check if user is logged in and get user data
//     const checkAuth = () => {
//       const storedUser = localStorage.getItem("evolvx_user")
//       if (!storedUser) {
//         router.push("/")
//         return
//       }

//       const user = JSON.parse(storedUser)
//       if (user.type !== "student") {
//         router.push("/")
//         return
//       }

//       setUserData(user.data)
//       setIsLoading(false)
//     }

//     // checkAuth()
//   }, [router])

//   const handleLogout = () => {
//     localStorage.removeItem("evolvx_user")
//     router.push("/")
//   }

//   const ComingSoonCard = ({ title }: { title: string }) => (
//     <Card className="border-[#FF6B00]/20 h-96 flex items-center justify-center">
//       <CardContent className="text-center">
//         <Construction className="h-16 w-16 text-[#FF6B00] mx-auto mb-4" />
//         <h3 className="text-2xl font-bold text-[#0D1B2A] mb-2">{title}</h3>
//         <p className="text-gray-600">Coming Soon!</p>
//         <p className="text-sm text-gray-500 mt-2">This feature is under development</p>
//       </CardContent>
//     </Card>
//   )

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-[#FFF7EC] to-[#f5f1e8] flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FF6B00]"></div>
//       </div>
//     )
//   }

//   // if (!userData) {
//   //   return null
//   // }

//   const programProgress = 65 // Mock progress percentage

//   const recentActivities = [
//     {
//       id: 1,
//       title: "Phase 1 Quiz Completed",
//       description: "Successfully completed the entrepreneurship quiz",
//       date: "2 days ago",
//       status: "completed",
//       icon: <CheckCircle className="h-5 w-5 text-green-500" />,
//     },
//     {
//       id: 2,
//       title: "Mentorship Session Scheduled",
//       description: "Next mentorship session on Jan 20, 2025",
//       date: "5 days ago",
//       status: "upcoming",
//       icon: <Clock className="h-5 w-5 text-yellow-500" />,
//     },
//     {
//       id: 3,
//       title: "Bootcamp Registration Open",
//       description: "Register for the 1-day bootcamp at MNIT Jaipur",
//       date: "1 week ago",
//       status: "action-required",
//       icon: <Bell className="h-5 w-5 text-blue-500" />,
//     },
//   ]

//   const upcomingEvents = [
//     {
//       id: 1,
//       title: "Online Mentorship Session",
//       date: "Jan 20, 2025",
//       time: "4:00 PM - 5:00 PM",
//       type: "mentorship",
//     },
//     {
//       id: 2,
//       title: "Bootcamp at MNIT Jaipur",
//       date: "Feb 15, 2025",
//       time: "9:00 AM - 6:00 PM",
//       type: "bootcamp",
//     },
//     {
//       id: 3,
//       title: "Final Pitch Competition",
//       date: "Mar 10, 2025",
//       time: "2:00 PM - 5:00 PM",
//       type: "competition",
//     },
//   ]

//   const achievements = [
//     { title: "Quiz Master", description: "Completed Phase 1 Quiz", earned: true },
//     { title: "Idea Generator", description: "Submitted first business idea", earned: true },
//     { title: "Mentor's Choice", description: "Selected for advanced mentorship", earned: false },
//     { title: "Pitch Perfect", description: "Qualified for final competition", earned: false },
//   ]

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#FFF7EC] to-[#f5f1e8]">
//       {/* Header */}
//       <header className="bg-white/95 backdrop-blur-md border-b border-[#FF6B00]/10 sticky top-0 z-40">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => router.push("/")}
//                 className="text-2xl font-bold gradient-text hover:scale-105 transition-transform duration-300"
//               >
//                 EVOLVX
//               </button>
//               <Badge variant="outline" className="border-[#FF6B00] text-[#FF6B00]">
//                 Student Dashboard
//               </Badge>
//             </div>
//             <div className="flex items-center space-x-4">
//               {/* <div className="text-sm text-gray-600">Welcome, {userData.name}</div> */}
//               <Button
//                 onClick={() => router.push("/")}
//                 variant="outline"
//                 size="sm"
//                 className="border-gray-300 text-gray-600 hover:bg-gray-100 bg-transparent"
//               >
//                 <Home className="h-4 w-4 mr-2" />
//                 Home
//               </Button>
//               <Button
//                 onClick={handleLogout}
//                 variant="outline"
//                 size="sm"
//                 className="border-gray-300 text-gray-600 hover:bg-gray-100 bg-transparent"
//               >
//                 <LogOut className="h-4 w-4 mr-2" />
//                 Logout
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Navigation Tabs */}
//         <div className="flex space-x-1 mb-8 bg-white/50 p-1 rounded-lg">
//           {[
//             { id: "overview", label: "Overview", icon: <User className="h-4 w-4" /> },
//             { id: "progress", label: "Progress", icon: <BookOpen className="h-4 w-4" /> },
//             { id: "events", label: "Events", icon: <Calendar className="h-4 w-4" /> },
//             { id: "achievements", label: "Achievements", icon: <Trophy className="h-4 w-4" /> },
//           ].map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
//                 activeTab === tab.id ? "bg-[#FF6B00] text-white shadow-md" : "text-gray-600 hover:bg-white/70"
//               }`}
//             >
//               {tab.icon}
//               <span>{tab.label}</span>
//             </button>
//           ))}
//         </div>

//         {/* Overview Tab */}
//         {activeTab === "overview" && (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Profile Card */}
//             {/* <Card className="lg:col-span-1 border-[#FF6B00]/20">
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <User className="h-5 w-5 text-[#FF6B00]" />
//                   <span>Profile</span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <p className="text-sm text-gray-600">Name</p>
//                   <p className="font-semibold">{userData.name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Class</p>
//                   <p className="font-semibold">Class {userData.class}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">School</p>
//                   <p className="font-semibold">{userData.school}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Email</p>
//                   <p className="font-semibold">{userData.email}</p>
//                 </div>
//                 <div className="pt-4">
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-sm font-medium">Program Progress</span>
//                     <span className="text-sm text-gray-600">{programProgress}%</span>
//                   </div>
//                   <Progress value={programProgress} className="h-3" />
//                 </div>
//               </CardContent>
//             </Card> */}

//             {/* Recent Activities */}
//             <Card className="lg:col-span-2 border-[#FF6B00]/20">
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <Bell className="h-5 w-5 text-[#FF6B00]" />
//                   <span>Recent Activities</span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {recentActivities.map((activity) => (
//                     <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
//                       {activity.icon}
//                       <div className="flex-1">
//                         <h4 className="font-semibold text-gray-900">{activity.title}</h4>
//                         <p className="text-sm text-gray-600">{activity.description}</p>
//                         <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         )}

//         {/* Progress Tab */}
//         {activeTab === "progress" && (
//           <div className="space-y-6">
//             <Card className="border-[#FF6B00]/20">
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <BookOpen className="h-5 w-5 text-[#FF6B00]" />
//                   <span>Program Progress</span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm font-medium">Overall Progress</span>
//                     <span className="text-sm text-gray-600">{programProgress}%</span>
//                   </div>
//                   <Progress value={programProgress} className="h-3" />
//                   <p className="text-sm text-gray-600">
//                     You're doing great! Keep up the momentum to complete your entrepreneurial journey.
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Phase Progress */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {[
//                 { phase: "Phase 1", title: "Registration & Quiz", progress: 100, status: "completed" },
//                 { phase: "Phase 2", title: "Mentorship 1", progress: 75, status: "in-progress" },
//                 { phase: "Phase 3", title: "Bootcamp", progress: 0, status: "upcoming" },
//                 { phase: "Phase 4", title: "Mentorship 2", progress: 0, status: "upcoming" },
//                 { phase: "Phase 5", title: "Final Pitch", progress: 0, status: "upcoming" },
//               ].map((phase, index) => (
//                 <Card key={index} className="border-[#FF6B00]/20">
//                   <CardContent className="p-4">
//                     <div className="space-y-2">
//                       <div className="flex justify-between items-center">
//                         <h4 className="font-semibold text-sm">{phase.phase}</h4>
//                         <Badge
//                           variant={phase.status === "completed" ? "default" : "secondary"}
//                           className={
//                             phase.status === "completed"
//                               ? "bg-green-100 text-green-800"
//                               : phase.status === "in-progress"
//                                 ? "bg-yellow-100 text-yellow-800"
//                                 : "bg-gray-100 text-gray-800"
//                           }
//                         >
//                           {phase.status}
//                         </Badge>
//                       </div>
//                       <p className="text-xs text-gray-600">{phase.title}</p>
//                       <Progress value={phase.progress} className="h-2" />
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Events Tab */}
//         {activeTab === "events" && (
//           <div className="space-y-6">
//             <Card className="border-[#FF6B00]/20">
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <Calendar className="h-5 w-5 text-[#FF6B00]" />
//                   <span>Upcoming Events</span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {upcomingEvents.map((event) => (
//                     <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                       <div className="flex items-center space-x-4">
//                         <div className="w-12 h-12 bg-[#FF6B00]/10 rounded-lg flex items-center justify-center">
//                           <Calendar className="h-6 w-6 text-[#FF6B00]" />
//                         </div>
//                         <div>
//                           <h4 className="font-semibold">{event.title}</h4>
//                           <p className="text-sm text-gray-600">{event.date}</p>
//                           <p className="text-xs text-gray-500">{event.time}</p>
//                         </div>
//                       </div>
//                       <Button size="sm" className="bg-[#FF6B00] hover:bg-[#e55a00]">
//                         View Details
//                         <ArrowRight className="h-4 w-4 ml-2" />
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         )}

//         {/* Achievements Tab */}
//         {activeTab === "achievements" && (
//           <div className="space-y-6">
//             <Card className="border-[#FF6B00]/20">
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <Trophy className="h-5 w-5 text-[#FF6B00]" />
//                   <span>Achievements</span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {achievements.map((achievement, index) => (
//                     <div
//                       key={index}
//                       className={`p-4 rounded-lg border-2 transition-all duration-200 ${
//                         achievement.earned ? "border-[#FF6B00] bg-[#FF6B00]/5" : "border-gray-200 bg-gray-50 opacity-60"
//                       }`}
//                     >
//                       <div className="flex items-center space-x-3">
//                         <div
//                           className={`w-10 h-10 rounded-full flex items-center justify-center ${
//                             achievement.earned ? "bg-[#FF6B00] text-white" : "bg-gray-300 text-gray-500"
//                           }`}
//                         >
//                           <Award className="h-5 w-5" />
//                         </div>
//                         <div>
//                           <h4 className="font-semibold">{achievement.title}</h4>
//                           <p className="text-sm text-gray-600">{achievement.description}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  User,
  BookOpen,
  Calendar,
  Trophy,
  LogOut,
  Construction,
  Home,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function StudentDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const checkauth = async () => {
      const res = await fetch("/api/get-cookies")
      if (!res.ok) throw new Error("Failed to fetch cookie")
      const data = await res.json()
      if (!data.myCookie) {
        window.location.href = '/'
      }
    }
    checkauth()
  }, [])

  const handleLogout = async () => {
    const nextresponse = await fetch("/api/delete-cookies")
    const nextdata = await nextresponse.json()
    if (nextresponse.ok) {
      window.location.href = '/'
    }
  }

  // Responsive Coming Soon card
  const ComingSoonCard = ({ title }: { title: string }) => (
    <Card className="border-[#FF6B00]/20 h-72 sm:h-80 md:h-96 flex items-center justify-center">
      <CardContent className="text-center flex flex-col flex-grow items-center justify-center">
        <Construction className="h-14 w-14 sm:h-16 sm:w-16 text-[#FF6B00] mx-auto mb-4" />
        <h3 className="text-lg sm:text-2xl font-bold text-[#0D1B2A] mb-2">{title}</h3>
        <p className="text-gray-600 font-medium text-base sm:text-lg">Coming Soon!</p>
        <p className="text-sm text-gray-500 mt-2">Stay tuned for exciting updates in this section.</p>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7EC] to-[#f5f1e8]">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-[#FF6B00]/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => router.push("/")}
                className="text-xl sm:text-2xl font-bold gradient-text hover:scale-105 transition-transform duration-300"
              >
                EVOLVX
              </button>
              <Badge variant="outline" className="border-[#FF6B00] text-[#FF6B00] text-xs sm:text-base py-1 px-2 sm:px-3">
                Student Dashboard
              </Badge>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button
                onClick={() => router.push("/")}
                variant="outline"
                size="sm"
                className="border-gray-300 text-gray-600 hover:bg-gray-100 bg-transparent px-2 sm:px-4"
              >
                <Home className="h-4 w-4 mr-2" />
                <span className="hidden xs:inline">Home</span>
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-gray-300 text-gray-600 hover:bg-gray-100 bg-transparent px-2 sm:px-4"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden xs:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6 sm:py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white/50 p-1 rounded-lg overflow-x-auto whitespace-nowrap scrollbar-hide">
          {[
            { id: "overview", label: "Overview", icon: <User className="h-4 w-4" /> },
            { id: "progress", label: "Progress", icon: <BookOpen className="h-4 w-4" /> },
            { id: "events", label: "Events", icon: <Calendar className="h-4 w-4" /> },
            { id: "achievements", label: "Achievements", icon: <Trophy className="h-4 w-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-[#FF6B00] text-white shadow-md"
                  : "text-gray-600 hover:bg-white/70"
              }`}
              style={{ minWidth: 120 }}
            >
              {tab.icon}
              <span className="text-sm sm:text-base">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Coming Soon Section for Every Tab */}
        <div className="w-full max-w-2xl mx-auto">
          {activeTab === "overview" && (
            <ComingSoonCard title="Student Overview" />
          )}

          {activeTab === "progress" && (
            <ComingSoonCard title="Your Progress" />
          )}

          {activeTab === "events" && (
            <ComingSoonCard title="Upcoming Events" />
          )}

          {activeTab === "achievements" && (
            <ComingSoonCard title="Achievements" />
          )}
        </div>
      </div>
    </div>
  )
}
