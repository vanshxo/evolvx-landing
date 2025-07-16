"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Stepper } from "./ui/stepper"
import { AlertCircle, X, CheckCircle } from "lucide-react"
import { toast } from "sonner"

interface SimpleRegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  onRegistrationSuccess: () => void
}

export function SimpleRegistrationModal({ isOpen, onClose, onRegistrationSuccess }: SimpleRegistrationModalProps) {
  const [registrationType, setRegistrationType] = useState<"initial" | "student" | "school">("initial")
  const [studentStep, setStudentStep] = useState(1)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const api=process.env.NEXT_PUBLIC_API
  const [formData, setFormData] = useState({
    name: "",
    country: "india",
    mobile: "",
    class: "",
    parentName: "",
    schoolName: "",
    schoolCity: "",
    schoolState: "",
    schoolEmail: "",
    contactPerson: "",
    contactNumber: "",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Reset modal state when opening
  const resetModal = () => {
    setRegistrationType("initial")
    setStudentStep(1)
    setEmail("")
    setOtp("")
    setOtpSent(false)
    setFormErrors({})
    setFormData({
      name: "",
      country: "india",
      mobile: "",
      class: "",
      parentName: "",
      schoolName: "",
      schoolCity: "",
      schoolState: "",
      schoolEmail: "",
      contactPerson: "",
      contactNumber: "",
    })
  }

  const studentSteps = [
    { label: "Email Verification", status: studentStep === 1 ? "current" : studentStep > 1 ? "completed" : "upcoming" },
    { label: "Basic Details", status: studentStep === 2 ? "current" : studentStep > 2 ? "completed" : "upcoming" },
    { label: "School Information", status: studentStep === 3 ? "current" : studentStep > 3 ? "completed" : "upcoming" },
  ]

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateMobile = (mobile: string) => {
    const mobileRegex = /^[6-9]\d{9}$/
    return mobileRegex.test(mobile)
  }

  const validateStep2 = () => {
    const errors: Record<string, string> = {}

    if (!formData.name.trim()) errors.name = "Name is required"
    if (!formData.mobile.trim()) errors.mobile = "Mobile number is required"
    else if (!validateMobile(formData.mobile)) errors.mobile = "Please enter a valid 10-digit mobile number"
    if (!formData.class) errors.class = "Please select your class"
    if (!formData.parentName.trim()) errors.parentName = "Parent's name is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateStep3 = () => {
    const errors: Record<string, string> = {}

    if (!formData.schoolName.trim()) errors.schoolName = "School name is required"
    if (!formData.schoolCity.trim()) errors.schoolCity = "School city is required"
    if (!formData.schoolState.trim()) errors.schoolState = "School state is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateSchoolForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.schoolName.trim()) errors.schoolName = "School name is required"
    if (!formData.schoolEmail.trim()) errors.schoolEmail = "School email is required"
    else if (!validateEmail(formData.schoolEmail)) errors.schoolEmail = "Please enter a valid email address"
    if (!formData.contactPerson.trim()) errors.contactPerson = "Contact person name is required"
    if (!formData.contactNumber.trim()) errors.contactNumber = "Contact number is required"
    else if (!validateMobile(formData.contactNumber))
      errors.contactNumber = "Please enter a valid 10-digit contact number"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSendOTP = async () => {
    if (!email.trim()) {
      setErrorMessage("Please enter your email address")
      setShowErrorModal(true)
      return
    }

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address")
      setShowErrorModal(true)
      return
    }

    setIsLoading(true)


    try{
      const resp=await fetch(`${api}/api/auth/send-otp`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
          },
          body:JSON.stringify({email:email,type:registrationType})

      });
      toast.info("Attempting to send otp...", {
        description: "Please wait while we verify your credentials.",
      })
      const data=await resp.json();
      if(resp.status===200){
        toast.success("Otp sent successfully", {
          description: `otp is sent to your email ${email}`,
        })
        setOtpSent(true)

      }else{
        setErrorMessage(data.message)
        toast.message(data.message, {
          description: data.message,
        })
      }

    }catch(err){
      console.log(err)

    }finally{
      setIsLoading(false)

    }

    // Simulate API call to send OTP
    // setTimeout(() => {
    //   // Check if email is already registered
    //   const registeredEmails = ["test@example.com", "admin@school.com"]
    //   if (registeredEmails.includes(email)) {
    //     setErrorMessage("This email is already registered. Please try logging in or use a different email.")
    //     setShowErrorModal(true)
    //   } else {
    //     setOtpSent(true)
    //     alert(`OTP sent to ${email}`)
    //   }
    //   setIsLoading(false)
    // }, 1000)
  }

  const handleVerifyOTP =async () => {
    if (!otp.trim()) {
      setErrorMessage("Please enter the OTP")
      setShowErrorModal(true)
      return
    }

    // if (otp !== "123456") {
    //   // Mock OTP verification
    //   setErrorMessage("Invalid OTP. Please try again.")
    //   setShowErrorModal(true)
    //   return
    // }


    try{
      const resp=await fetch(`${api}/api/auth/verify-otp`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
          },
          body:JSON.stringify({email:email,otp:otp})

      });
      toast.info("Attempting to Verify otp...", {
        description: "Please wait while we verify your Otp.",
      })
      const data=await resp.json();
      if(resp.status===200){
        toast.success("Otp Verified successfully", {
          description: `your email ${email} is verified`,
        })
        setStudentStep(2)

      }else{
        setErrorMessage(data.message)
        toast.error(data.message, {
          description: data.message,
        })
      }

    }catch(err){
      console.log(err)

    }finally{
      setIsLoading(false)
      

    }





    
  }

  const handleNextStudentStep = () => {
    if (studentStep === 2) {
      if (!validateStep2()) return
      setStudentStep(3)
    } else if (studentStep === 3) {
      if (!validateStep3()) return
      handleStudentRegistrationSubmit()
    }
  }

  const handleBackStudentStep = () => {
    if (studentStep > 1) {
      setStudentStep(studentStep - 1)
      setFormErrors({})
    } else {
      setRegistrationType("initial")
    }
  }

  const handleStudentRegistrationSubmit =async () => {
    setIsLoading(true)
try{
  toast.info("Please wait Good Things Take Time", {
    description: "You are about to enter into EvolvX",
  })

  const resp=await fetch(`${api}/api/auth/student/register`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
      },
      body:JSON.stringify({form:formData,email:email})

  });
 
  const data=await resp.json();
  if(resp.status===200){
    toast.message("Congratulations,You are now a part of EvolvX", {
      description: `your email ${email} is verified`,
    
    })
setShowSuccessModal(true)
// onRegistrationSuccess()
//         // onClose()
//         resetModal()
    // setTimeout(() => {
    //   setShowSuccessModal(true)
    //   setIsLoading(false)

      // setTimeout(() => {
      //   setShowSuccessModal(false)
      //   onRegistrationSuccess()
      //   onClose()
      //   resetModal()
      // }, 10000)
    // }, 1000)

  }else{
    setErrorMessage(data.message)
    toast.error(data.message, {
      description: data.message,
    })
  }





}catch(err){
  console.log(err)

}finally{
  setIsLoading(false)
}
    // Simulate API call
   
  }
const onc=()=>{
  setShowSuccessModal(false)
  onRegistrationSuccess()
  onClose()
  resetModal()

}
  const handleSchoolRegistrationSubmit = () => {
    if (!validateSchoolForm()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setShowSuccessModal(true)
      setIsLoading(false)

      setTimeout(() => {
        setShowSuccessModal(false)
        onRegistrationSuccess()
        onClose()
        resetModal()
      }, 2000)
    }, 3000)
  }

  const handleClose = () => {
    onClose()
    resetModal()
  }

  const renderStudentRegistrationForm = () => {
    switch (studentStep) {
      case 1:
        return (
          <>
            <Stepper steps={studentSteps} />
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-gray-300">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#FF6B00]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={otpSent}
                />
              </div>

              {otpSent && (
                <div>
                  <Label htmlFor="otp" className="text-gray-300">
                    Enter OTP *
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#FF6B00]"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                  />
                  <p className="text-xs text-gray-400 mt-1">Demo OTP: 123456</p>
                </div>
              )}

              {!otpSent ? (
                <Button
                  onClick={handleSendOTP}
                  disabled={isLoading}
                  className="w-full bg-[#FF6B00] hover:bg-[#e55a00] text-white"
                >
                  {isLoading ? "Sending..." : "SEND OTP"}
                </Button>
              ) : (
                <Button onClick={handleVerifyOTP} className="w-full bg-[#FF6B00] hover:bg-[#e55a00] text-white">
                  VERIFY OTP
                </Button>
              )}
            </div>
          </>
        )
      case 2:
        return (
          <>
            <Stepper steps={studentSteps} />
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-gray-300">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  className={`bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#FF6B00] ${
                    formErrors.name ? "border-red-500" : ""
                  }`}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                {formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
              </div>
              <div>
  <Label htmlFor="country" className="text-gray-300">
    Country <span className="text-red-500">*</span>
  </Label>
  <Select
    value={formData.country || ""}
    onValueChange={(value) => setFormData({ ...formData, country: value })}
  >
    <SelectTrigger
      id="country"
      className="w-full bg-gray-800 border border-gray-700 text-white focus:ring-[#FF6B00] focus-visible:outline-none"
    >
      <SelectValue placeholder="Select country" />
    </SelectTrigger>
    <SelectContent className="bg-gray-800 text-white border border-gray-700 z-[9999]" position="popper">
      <SelectItem value="india">India</SelectItem>
      {/* Add more if needed */}
    </SelectContent>
  </Select>
</div>


              <div>
                <Label className="text-gray-300">Mobile Number *</Label>
                <div className="grid grid-cols-[auto_1fr] gap-2">
                  <Input
                    value="+91"
                    readOnly
                    className="bg-gray-800 border-gray-700 text-white w-20 focus-visible:ring-[#FF6B00]"
                  />
                  <Input
                    id="mobile"
                    placeholder="10-digit mobile number"
                    className={`bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#FF6B00] ${
                      formErrors.mobile ? "border-red-500" : ""
                    }`}
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    maxLength={10}
                  />
                </div>
                {formErrors.mobile && <p className="text-red-400 text-xs mt-1">{formErrors.mobile}</p>}
              </div>

              <div>
  <Label htmlFor="class" className="text-gray-300">
    Class <span className="text-red-500">*</span>
  </Label>

  <Select
    value={formData.class || ""}
    onValueChange={(value) => {
      setFormData({ ...formData, class: value })
      setFormErrors((prev) => ({ ...prev, class: "" }))
    }}
  >
    <SelectTrigger
      id="class"
      className={`w-full bg-gray-800 border border-gray-700 text-white focus-visible:ring-[#FF6B00] focus-visible:outline-none ${
        formErrors.class ? "border-red-500" : ""
      }`}
    >
      <SelectValue placeholder="Select class" />
    </SelectTrigger>

    <SelectContent
      className="bg-gray-800 text-white border border-gray-700 z-[9999]"
      position="popper"
    >
      {Array.from({ length: 7 }, (_, i) => i + 6).map((cls) => (
        <SelectItem key={cls} value={cls.toString()}>
          Class {cls}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>

  {formErrors.class && (
    <p className="text-red-400 text-xs mt-1">{formErrors.class}</p>
  )}
</div>




              <div>
                <Label htmlFor="parent-name" className="text-gray-300">
                  Parent's Name *
                </Label>
                <Input
                  id="parent-name"
                  placeholder="Parent's name"
                  className={`bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#FF6B00] ${
                    formErrors.parentName ? "border-red-500" : ""
                  }`}
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                />
                {formErrors.parentName && <p className="text-red-400 text-xs mt-1">{formErrors.parentName}</p>}
              </div>

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
              <div>
                <Label htmlFor="school-name" className="text-gray-300">
                  School Name *
                </Label>
                <Input
                  id="school-name"
                  placeholder="Your school's name"
                  className={`bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#FF6B00] ${
                    formErrors.schoolName ? "border-red-500" : ""
                  }`}
                  value={formData.schoolName}
                  onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                />
                {formErrors.schoolName && <p className="text-red-400 text-xs mt-1">{formErrors.schoolName}</p>}
              </div>

              <div>
                <Label htmlFor="school-city" className="text-gray-300">
                  School City *
                </Label>
                <Input
                  id="school-city"
                  placeholder="City where your school is located"
                  className={`bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#FF6B00] ${
                    formErrors.schoolCity ? "border-red-500" : ""
                  }`}
                  value={formData.schoolCity}
                  onChange={(e) => setFormData({ ...formData, schoolCity: e.target.value })}
                />
                {formErrors.schoolCity && <p className="text-red-400 text-xs mt-1">{formErrors.schoolCity}</p>}
              </div>

              <div>
                <Label htmlFor="school-state" className="text-gray-300">
                  School State *
                </Label>
                <Input
                  id="school-state"
                  placeholder="State where your school is located"
                  className={`bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#FF6B00] ${
                    formErrors.schoolState ? "border-red-500" : ""
                  }`}
                  value={formData.schoolState}
                  onChange={(e) => setFormData({ ...formData, schoolState: e.target.value })}
                />
                {formErrors.schoolState && <p className="text-red-400 text-xs mt-1">{formErrors.schoolState}</p>}
              </div>

              <div className="flex justify-between gap-4 pt-4">
                <Button
                  onClick={handleBackStudentStep}
                  variant="outline"
                  className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent"
                >
                  Back
                </Button>
                <Button
                  onClick={handleNextStudentStep}
                  disabled={isLoading}
                  className="flex-1 bg-[#FF6B00] hover:bg-[#e55a00] text-white"
                >
                  {isLoading ? "Submitting..." : "Submit Registration"}
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

        <div>
          <Label htmlFor="school-name-reg" className="text-gray-300">
            School Name *
          </Label>
          <Input
            id="school-name-reg"
            placeholder="Enter your school's name"
            className={`bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#FF6B00] ${
              formErrors.schoolName ? "border-red-500" : ""
            }`}
            value={formData.schoolName}
            onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
          />
          {formErrors.schoolName && <p className="text-red-400 text-xs mt-1">{formErrors.schoolName}</p>}
        </div>

        <div>
          <Label htmlFor="school-email" className="text-gray-300">
            School Email *
          </Label>
          <Input
            id="school-email"
            type="email"
            placeholder="Enter school's official email"
            className={`bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#FF6B00] ${
              formErrors.schoolEmail ? "border-red-500" : ""
            }`}
            value={formData.schoolEmail}
            onChange={(e) => setFormData({ ...formData, schoolEmail: e.target.value })}
          />
          {formErrors.schoolEmail && <p className="text-red-400 text-xs mt-1">{formErrors.schoolEmail}</p>}
        </div>

        <div>
          <Label htmlFor="school-contact-person" className="text-gray-300">
            Contact Person Name *
          </Label>
          <Input
            id="school-contact-person"
            placeholder="Name of contact person"
            className={`bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#FF6B00] ${
              formErrors.contactPerson ? "border-red-500" : ""
            }`}
            value={formData.contactPerson}
            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
          />
          {formErrors.contactPerson && <p className="text-red-400 text-xs mt-1">{formErrors.contactPerson}</p>}
        </div>

        <div>
          <Label htmlFor="school-contact-number" className="text-gray-300">
            Contact Number *
          </Label>
          <Input
            id="school-contact-number"
            placeholder="School contact number"
            className={`bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#FF6B00] ${
              formErrors.contactNumber ? "border-red-500" : ""
            }`}
            value={formData.contactNumber}
            onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
            maxLength={10}
          />
          {formErrors.contactNumber && <p className="text-red-400 text-xs mt-1">{formErrors.contactNumber}</p>}
        </div>

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
            disabled={isLoading}
            className="flex-1 bg-[#FF6B00] hover:bg-[#e55a00] text-white"
          >
            {isLoading ? "Submitting..." : "Register School"}
          </Button>
        </div>
      </div>
    )
  }

  if (!isOpen) return null

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} />

        {/* Modal Content */}
        <div className="relative z-10 w-full max-w-md mx-4 bg-[#0D1B2A]/95 backdrop-blur-xl text-white rounded-xl border border-gray-700 shadow-2xl max-h-[90vh] overflow-y-auto">
          {/* Background pattern */}
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              backgroundImage: 'url("/images/modal-background.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: 0.1,
            }}
          />

          {/* Content */}
          <div className="relative z-10 p-6">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className="text-2xl font-bold gradient-text">EVOLVX</div>
              </div>
              <h2 className="text-3xl font-bold text-[#FDCB06] mb-2">
                {registrationType === "initial" && "REGISTER"}
                {registrationType === "student" && "STUDENT REGISTRATION"}
                {registrationType === "school" && "SCHOOL REGISTRATION"}
              </h2>
              <p className="text-gray-400">
                {registrationType === "initial" && "Choose your registration type."}
                {registrationType === "student" && "Join EVOLVX as a student."}
                {registrationType === "school" && "Register your school for EVOLVX."}
              </p>
            </div>

            {/* Content based on registration type */}
            {registrationType === "initial" && (
              <div className="flex flex-col gap-4">
                <Button
                  onClick={() => setRegistrationType("student")}
                  className="w-full bg-[#FF6B00] hover:bg-[#e55a00] text-white py-3 text-lg"
                >
                  Register as Student
                </Button>
                {/* <Button
                  onClick={() => setRegistrationType("school")}
                  className="w-full bg-[#0D1B2A] border border-[#FF6B00] hover:bg-[#1a2332] text-[#FF6B00] py-3 text-lg"
                >
                  Register as School
                </Button> */}
              </div>
            )}

            {registrationType === "student" && renderStudentRegistrationForm()}
            {registrationType === "school" && renderSchoolRegistrationForm()}
          </div>
        </div>
      </div>

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowErrorModal(false)} />
          <div className="relative z-10 w-full max-w-sm mx-4 bg-[#0D1B2A]/95 backdrop-blur-xl text-white rounded-xl border border-gray-700 shadow-2xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-16 w-16 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-red-500 mb-2">Error</h3>
            <p className="text-gray-300 mb-6">{errorMessage}</p>
            <Button onClick={() => setShowErrorModal(false)} className="bg-red-600 hover:bg-red-700 text-white">
              OK
            </Button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-sm mx-4 bg-[#0D1B2A]/95 backdrop-blur-xl text-white rounded-xl border border-gray-700 shadow-2xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-green-500 mb-2">Registration Successful!</h3>
            <p className="text-gray-300 mb-4">Welcome to EVOLVX! You can now login to access your dashboard.</p>
            <Button onClick={onc} className="bg-red-600 hover:bg-red-700 text-white">
              OK
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
