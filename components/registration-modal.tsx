"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Stepper } from "./ui/stepper"
import { AlertCircle } from "lucide-react"
import Image from "next/image" // Keep import for placeholder logo if needed

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [registrationType, setRegistrationType] = useState<"initial" | "student" | "school">("initial")
  const [studentStep, setStudentStep] = useState(1)
  const [email, setEmail] = useState("")
  const [isEmailRegistered, setIsEmailRegistered] = useState(false) // Simulate check
  const [showErrorModal, setShowErrorModal] = useState(false)

  const studentSteps = [
    { label: "Email Verification", status: studentStep === 1 ? "current" : studentStep > 1 ? "completed" : "upcoming" },
    { label: "Basic Details", status: studentStep === 2 ? "current" : studentStep > 2 ? "completed" : "upcoming" },
    { label: "School Information", status: studentStep === 3 ? "current" : studentStep > 3 ? "completed" : "upcoming" },
  ]

  const handleEmailVerification = () => {
    // Simulate API call to check if email is registered
    const isRegistered = email === "test@example.com" // Example: "test@example.com" is already registered
    setIsEmailRegistered(isRegistered)

    if (isRegistered) {
      setShowErrorModal(true)
    } else {
      setStudentStep(2) // Proceed to next step
    }
  }

  const handleNextStudentStep = () => {
    if (studentStep < studentSteps.length) {
      setStudentStep(studentStep + 1)
    } else {
      // Final step submission logic
      onClose() // Close modal on successful registration
      alert("Student Registration Complete!")
    }
  }

  const handleBackStudentStep = () => {
    if (studentStep > 1) {
      setStudentStep(studentStep - 1)
    } else {
      setRegistrationType("initial") // Go back to type selection
    }
  }

  const handleSchoolRegistrationSubmit = () => {
    // School registration logic
    onClose()
    alert("School Registration Complete!")
  }

  const renderStudentRegistrationForm = () => {
    switch (studentStep) {
      case 1:
        return (
          <>
            <Stepper steps={studentSteps} />
            <div className="space-y-4">
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#FF6B00]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button onClick={handleEmailVerification} className="w-full bg-[#FF6B00] hover:bg-[#e55a00] text-white">
                SEND OTP
              </Button>
            </div>
          </>
        )
      case 2:
        return (
          <>
            <Stepper steps={studentSteps} />
            <div className="space-y-4">
              <Label htmlFor="name" className="text-gray-300">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Your full name"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#FF6B00]"
              />
              <Label htmlFor="country" className="text-gray-300">
                Country
              </Label>
              <Select>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:ring-[#FF6B00]">
                  <SelectValue placeholder="India" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white border-gray-700">
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="usa">USA</SelectItem>
                  <SelectItem value="uk">UK</SelectItem>
                </SelectContent>
              </Select>
              <div className="grid grid-cols-[auto_1fr] gap-2">
                <Label htmlFor="mobile" className="sr-only">
                  Mobile Number
                </Label>
                <Input
                  value="+91"
                  readOnly
                  className="bg-gray-800 border-gray-700 text-white w-20 focus-visible:ring-[#FF6B00]"
                />
                <Input
                  id="mobile"
                  placeholder="10-digit mobile number"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#FF6B00]"
                />
              </div>
              <Label htmlFor="class" className="text-gray-300">
                Class
              </Label>
              <Select>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:ring-[#FF6B00]">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white border-gray-700">
                  {Array.from({ length: 7 }, (_, i) => i + 6).map((cls) => (
                    <SelectItem key={cls} value={cls.toString()}>
                      Class {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Label htmlFor="track" className="text-gray-300">
                Track
              </Label>
              <Input
                id="track"
                placeholder="Track will be auto-filled"
                readOnly
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#FF6B00]"
              />
              <Label htmlFor="parent-name" className="text-gray-300">
                Parent's Name
              </Label>
              <Input
                id="parent-name"
                placeholder="Parent's name"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#FF6B00]"
              />
              <div className="flex justify-between gap-4 pt-4">
                <Button
                  onClick={handleBackStudentStep}
                  variant="outline"
                  className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent"
                >
                  Back
                </Button>
                <Button onClick={handleNextStudentStep} className="flex-1 bg-[#FF6B00] hover:bg-[#e55a00] text-white">
                  Next
                </Button>
              </div>
            </div>
          </>
        )
      case 3:
        return (
          <>
            <Stepper steps={studentSteps} />
            <div className="space-y-4">
              <Label htmlFor="school-name" className="text-gray-300">
                School Name
              </Label>
              <Input
                id="school-name"
                placeholder="Your school's name"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#FF6B00]"
              />
              <Label htmlFor="school-city" className="text-gray-300">
                School City
              </Label>
              <Input
                id="school-city"
                placeholder="City where your school is located"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#FF6B00]"
              />
              <Label htmlFor="school-state" className="text-gray-300">
                School State
              </Label>
              <Input
                id="school-state"
                placeholder="State where your school is located"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#FF6B00]"
              />
              <div className="flex justify-between gap-4 pt-4">
                <Button
                  onClick={handleBackStudentStep}
                  variant="outline"
                  className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent"
                >
                  Back
                </Button>
                <Button onClick={handleNextStudentStep} className="flex-1 bg-[#FF6B00] hover:bg-[#e55a00] text-white">
                  Submit Registration
                </Button>
              </div>
            </div>
          </>
        )
      default:
        return null
    }
  }

  const renderSchoolRegistrationForm = () => {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-[#FF6B00] text-center mb-4">School Registration</h3>
        <Label htmlFor="school-name-reg" className="text-gray-300">
          School Name
        </Label>
        <Input
          id="school-name-reg"
          placeholder="Enter your school's name"
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#FF6B00]"
        />
        <Label htmlFor="school-email" className="text-gray-300">
          School Email
        </Label>
        <Input
          id="school-email"
          type="email"
          placeholder="Enter school's official email"
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#FF6B00]"
        />
        <Label htmlFor="school-contact-person" className="text-gray-300">
          Contact Person Name
        </Label>
        <Input
          id="school-contact-person"
          placeholder="Name of contact person"
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#FF6B00]"
        />
        <Label htmlFor="school-contact-number" className="text-gray-300">
          Contact Number
        </Label>
        <Input
          id="school-contact-number"
          placeholder="School contact number"
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#FF6B00]"
        />
        <div className="flex justify-between gap-4 pt-4">
          <Button
            onClick={() => setRegistrationType("initial")}
            variant="outline"
            className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Back
          </Button>
          <Button
            onClick={handleSchoolRegistrationSubmit}
            className="flex-1 bg-[#FF6B00] hover:bg-[#e55a00] text-white"
          >
            Register School
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[480px] p-6 bg-[#0D1B2A]/95 backdrop-blur-xl text-white rounded-xl border border-gray-700 shadow-2xl relative">
          {/* Background pattern applied via CSS */}
          <div
            className="absolute inset-0 z-0 rounded-xl"
            style={{
              backgroundImage: 'url("/images/comic-background.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: 0.1, // Adjust opacity as needed
            }}
          />
          <div className="relative z-10">
            <DialogHeader className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <Image
                  src="/placeholder.svg?height=40&width=150" // Placeholder for Eureka Junior logo
                  alt="EVOLVX Logo"
                  width={150}
                  height={40}
                  className="object-contain"
                />
              </div>
              <DialogTitle className="text-3xl font-bold text-[#FDCB06]">
                {registrationType === "initial" && "REGISTER"}
                {registrationType === "student" && "STUDENT REGISTRATION"}
                {registrationType === "school" && "SCHOOL REGISTRATION"}
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                {registrationType === "initial" && "Choose your registration type."}
                {registrationType === "student" && "Join EVOLVX as a student."}
                {registrationType === "school" && "Register your school for EVOLVX."}
              </DialogDescription>
            </DialogHeader>

            {registrationType === "initial" && (
              <div className="flex flex-col gap-4">
                <Button
                  onClick={() => setRegistrationType("student")}
                  className="w-full bg-[#FF6B00] hover:bg-[#e55a00] text-white py-3 text-lg"
                >
                  Register as Student
                </Button>
                <Button
                  onClick={() => setRegistrationType("school")}
                  className="w-full bg-[#0D1B2A] border border-[#FF6B00] hover:bg-[#1a2332] text-[#FF6B00] py-3 text-lg"
                >
                  Register as School
                </Button>
              </div>
            )}

            {registrationType === "student" && renderStudentRegistrationForm()}
            {registrationType === "school" && renderSchoolRegistrationForm()}
          </div>
        </DialogContent>
      </Dialog>

      {/* Already Registered Error Modal */}
      <Dialog open={showErrorModal} onOpenChange={setShowErrorModal}>
        <DialogContent className="sm:max-w-[425px] p-6 bg-[#0D1B2A]/95 backdrop-blur-xl text-white rounded-xl border border-gray-700 shadow-2xl text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-16 w-16 text-red-500" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-red-500">Already Registered</DialogTitle>
            <DialogDescription className="text-gray-300">
              This email is already registered. Please try logging in or use a different email.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowErrorModal(false)} className="mt-6 bg-red-600 hover:bg-red-700 text-white">
            OK
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
