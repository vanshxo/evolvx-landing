"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, BookOpen, Calendar, Trophy, LogOut, Construction } from "lucide-react"

interface StudentDashboardProps {
  userData: any
  onLogout: () => void
}

export function StudentDashboard({ userData, onLogout }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7EC] to-[#f5f1e8]">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-[#FF6B00]/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold gradient-text">EVOLVX</div>
              <Badge variant="outline" className="border-[#FF6B00] text-[#FF6B00]">
                Student Dashboard
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">Welcome, {userData.name}</div>
              <Button
                onClick={onLogout}
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
            { id: "overview", label: "Overview", icon: <User className="h-4 w-4" /> },
            { id: "progress", label: "Progress", icon: <BookOpen className="h-4 w-4" /> },
            { id: "events", label: "Events", icon: <Calendar className="h-4 w-4" /> },
            { id: "achievements", label: "Achievements", icon: <Trophy className="h-4 w-4" /> },
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="lg:col-span-1 border-[#FF6B00]/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-[#FF6B00]" />
                  <span>Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold">{userData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Class</p>
                  <p className="font-semibold">Class {userData.class}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">School</p>
                  <p className="font-semibold">{userData.school}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold">{userData.email}</p>
                </div>
              </CardContent>
            </Card>

            {/* Welcome Message */}
            <Card className="lg:col-span-2 border-[#FF6B00]/20">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold text-[#0D1B2A] mb-4">Welcome to EVOLVX, {userData.name}! 🎉</h2>
                <p className="text-lg text-gray-600 mb-6">
                  You're now part of an exciting 3-month entrepreneurial journey. Get ready to transform your ideas into
                  impactful ventures!
                </p>
                <div className="bg-gradient-to-r from-[#FF6B00]/10 to-[#FDCB06]/10 p-4 rounded-lg">
                  <p className="text-[#FF6B00] font-semibold">🚀 Your entrepreneurial adventure begins now!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Other Tabs - Coming Soon */}
        {activeTab === "progress" && <ComingSoonCard title="Progress Tracking" />}
        {activeTab === "events" && <ComingSoonCard title="Events & Calendar" />}
        {activeTab === "achievements" && <ComingSoonCard title="Achievements & Badges" />}
      </div>
    </div>
  )
}
