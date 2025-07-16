"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Building,
  Users,
  Calendar,
  BarChart3,
  Bell,
  LogOut,
  UserPlus,
  BookOpen,
  Trophy,
  ArrowRight,
  Download,
  Eye,
  Construction,
  Home,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function SchoolDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [userData, setUserData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in and get user data
    const checkAuth = () => {
      const storedUser = localStorage.getItem("evolvx_user")
      if (!storedUser) {
        router.push("/")
        return
      }

      const user = JSON.parse(storedUser)
      if (user.type !== "school") {
        router.push("/")
        return
      }

      setUserData(user.data)
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("evolvx_user")
    router.push("/")
  }

  const ComingSoonCard = ({ title }: { title: string }) => (
    <Card className="border-[#FF6B00]/20 h-96 flex items-center justify-center">
      <CardContent className="text-center">
        <Construction className="h-16 w-16 text-[#FF6B00] mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-[#0D1B2A] mb-2">{title}</h3>
        <p className="text-gray-600">Coming Soon!</p>
        <p className="text-sm text-gray-500 mt-2">This feature is under development</p>
      </CardContent>
    </Card>
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF7EC] to-[#f5f1e8] flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FF6B00]"></div>
      </div>
    )
  }

  if (!userData) {
    return null
  }

  const schoolStats = {
    totalStudents: 45,
    activeStudents: 38,
    completedPhase1: 32,
    qualifiedForBootcamp: 15,
  }

  const recentActivities = [
    {
      id: 1,
      title: "New Student Registration",
      description: "5 new students registered for EVOLVX program",
      date: "2 hours ago",
      type: "registration",
    },
    {
      id: 2,
      title: "Phase 1 Results",
      description: "32 students completed the entrepreneurship quiz",
      date: "1 day ago",
      type: "results",
    },
    {
      id: 3,
      title: "Bootcamp Invitation",
      description: "15 students qualified for the bootcamp at MNIT Jaipur",
      date: "3 days ago",
      type: "achievement",
    },
  ]

  const studentList = [
    { id: 1, name: "Arjun Sharma", class: "10", phase: "Phase 2", status: "Active" },
    { id: 2, name: "Priya Patel", class: "11", phase: "Phase 2", status: "Active" },
    { id: 3, name: "Rahul Kumar", class: "9", phase: "Phase 1", status: "Completed" },
    { id: 4, name: "Sneha Gupta", class: "12", phase: "Phase 3", status: "Qualified" },
    { id: 5, name: "Vikram Singh", class: "10", phase: "Phase 1", status: "Active" },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "School Coordinator Meeting",
      date: "Jan 18, 2025",
      time: "3:00 PM - 4:00 PM",
      type: "meeting",
    },
    {
      id: 2,
      title: "Student Progress Review",
      date: "Jan 25, 2025",
      time: "2:00 PM - 3:30 PM",
      type: "review",
    },
    {
      id: 3,
      title: "Bootcamp Preparation Session",
      date: "Feb 10, 2025",
      time: "4:00 PM - 5:00 PM",
      type: "preparation",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7EC] to-[#f5f1e8]">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-[#FF6B00]/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/")}
                className="text-2xl font-bold gradient-text hover:scale-105 transition-transform duration-300"
              >
                EVOLVX
              </button>
              <Badge variant="outline" className="border-[#FF6B00] text-[#FF6B00]">
                School Dashboard
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">Welcome, {userData.name}</div>
              <Button
                onClick={() => router.push("/")}
                variant="outline"
                size="sm"
                className="border-gray-300 text-gray-600 hover:bg-gray-100 bg-transparent"
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-gray-300 text-gray-600 hover:bg-gray-100 bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white/50 p-1 rounded-lg">
          {[
            { id: "overview", label: "Overview", icon: <Building className="h-4 w-4" /> },
            { id: "students", label: "Students", icon: <Users className="h-4 w-4" /> },
            { id: "analytics", label: "Analytics", icon: <BarChart3 className="h-4 w-4" /> },
            { id: "events", label: "Events", icon: <Calendar className="h-4 w-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                activeTab === tab.id ? "bg-[#FF6B00] text-white shadow-md" : "text-gray-600 hover:bg-white/70"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-[#FF6B00]/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Students</p>
                      <p className="text-3xl font-bold text-[#FF6B00]">{schoolStats.totalStudents}</p>
                    </div>
                    <Users className="h-8 w-8 text-[#FF6B00]/60" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#FF6B00]/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Students</p>
                      <p className="text-3xl font-bold text-green-600">{schoolStats.activeStudents}</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-green-600/60" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#FF6B00]/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Phase 1 Complete</p>
                      <p className="text-3xl font-bold text-blue-600">{schoolStats.completedPhase1}</p>
                    </div>
                    <Trophy className="h-8 w-8 text-blue-600/60" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#FF6B00]/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Bootcamp Qualified</p>
                      <p className="text-3xl font-bold text-purple-600">{schoolStats.qualifiedForBootcamp}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-purple-600/60" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* School Info and Recent Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* School Info Card */}
              <Card className="lg:col-span-1 border-[#FF6B00]/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5 text-[#FF6B00]" />
                    <span>School Info</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">School Name</p>
                    <p className="font-semibold">{userData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Contact Person</p>
                    <p className="font-semibold">{userData.contactPerson}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold">{userData.email}</p>
                  </div>
                  <div className="pt-4">
                    <div className="bg-gradient-to-r from-[#FF6B00]/10 to-[#FDCB06]/10 p-4 rounded-lg">
                      <p className="text-[#FF6B00] font-semibold text-sm">
                        🎓 Empowering students, building the future!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card className="lg:col-span-2 border-[#FF6B00]/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-[#FF6B00]" />
                    <span>Recent Activities</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-[#FF6B00] rounded-full mt-2"></div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === "students" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Student Management</h2>
              <div className="flex space-x-2">
                <Button className="bg-[#FF6B00] hover:bg-[#e55a00]">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <Card className="border-[#FF6B00]/20">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Student
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Class
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Current Phase
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {studentList.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{student.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Class {student.class}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.phase}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge
                              variant={
                                student.status === "Active"
                                  ? "default"
                                  : student.status === "Completed"
                                    ? "secondary"
                                    : "outline"
                              }
                              className={
                                student.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : student.status === "Completed"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-purple-100 text-purple-800"
                              }
                            >
                              {student.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-[#FF6B00]/20">
                <CardHeader>
                  <CardTitle>Phase Completion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { phase: "Phase 1", completed: 32, total: 45, percentage: 71 },
                      { phase: "Phase 2", completed: 28, total: 45, percentage: 62 },
                      { phase: "Phase 3", completed: 15, total: 45, percentage: 33 },
                      { phase: "Phase 4", completed: 8, total: 45, percentage: 18 },
                      { phase: "Phase 5", completed: 0, total: 45, percentage: 0 },
                    ].map((item) => (
                      <div key={item.phase} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{item.phase}</span>
                          <span>
                            {item.completed}/{item.total} ({item.percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#FF6B00] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#FF6B00]/20">
                <CardHeader>
                  <CardTitle>Student Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#FF6B00]">84%</div>
                      <p className="text-sm text-gray-600">Average Quiz Score</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600">15</div>
                        <p className="text-xs text-gray-600">Top Performers</p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">23</div>
                        <p className="text-xs text-gray-600">Average Performers</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === "events" && (
          <div className="space-y-6">
            <Card className="border-[#FF6B00]/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-[#FF6B00]" />
                  <span>Upcoming Events</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-[#FF6B00]/10 rounded-lg flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-[#FF6B00]" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{event.title}</h4>
                          <p className="text-sm text-gray-600">{event.date}</p>
                          <p className="text-xs text-gray-500">{event.time}</p>
                        </div>
                      </div>
                      <Button size="sm" className="bg-[#FF6B00] hover:bg-[#e55a00]">
                        View Details
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
