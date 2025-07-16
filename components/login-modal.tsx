"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Mail, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
const api=process.env.NEXT_PUBLIC_API
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSendOTP = async () => {
    if (!email.trim()) {
      setError("Please enter your email address")
      setShowErrorModal(true)
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      setShowErrorModal(true)
      return
    }

    setIsLoading(true)
    setError("")

    // Simulate API call to send OTP
    // setTimeout(() => {
    //   // Check if email exists in our "database"
    //   const registeredUsers = {
    //     "student@test.com": { type: "student", name: "John Doe", class: "10", school: "ABC School" },
    //     "school@test.com": { type: "school", name: "ABC School", contactPerson: "Jane Smith" },
    //     "john.student@gmail.com": { type: "student", name: "John Student", class: "11", school: "XYZ School" },
    //     "admin@school.edu": { type: "school", name: "XYZ School", contactPerson: "Admin User" },
    //   }

    //   if (registeredUsers[email as keyof typeof registeredUsers]) {
    //     setOtpSent(true)
    //     alert(`OTP sent to ${email}`)
    //   } else {
    //     setError("Email not found. Please register first or check your email address.")
    //     setShowErrorModal(true)
    //   }
    //   setIsLoading(false)
    // }, 1000)

    try{
      const resp=await fetch(`${api}/api/auth/login`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
          },
          body:JSON.stringify({email:email,type:'student'})
      });
      if(resp.status===200){
        const data=await resp.json();
        setOtpSent(true)
        toast.success(data.message, {
          description: data.message,
        })
        
      }
      else{
        setError("Email not found. Please register first or check your email address.")
        setShowErrorModal(true)
      }

    }catch(err){
      setError("Email not found. Please register first or check your email address.")
      setShowErrorModal(true)

    }finally{
      setIsLoading(false)

    }




  }

  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      setError("Please enter the OTP")
      setShowErrorModal(true)
      return
    }

    // if (otp !== "123456") {
    //   // Mock OTP verification
    //   setError("Invalid OTP. Please try again.")
    //   setShowErrorModal(true)
    //   return
    // }

    // setIsLoading(true)

    // // Simulate API call to verify OTP and login
    // setTimeout(() => {
    //   const registeredUsers = {
    //     "student@test.com": { type: "student", name: "John Doe", class: "10", school: "ABC School" },
    //     "school@test.com": { type: "school", name: "ABC School", contactPerson: "Jane Smith" },
    //     "john.student@gmail.com": { type: "student", name: "John Student", class: "11", school: "XYZ School" },
    //     "admin@school.edu": { type: "school", name: "XYZ School", contactPerson: "Admin User" },
    //   }

    //   const user = registeredUsers[email as keyof typeof registeredUsers]
    //   if (user) {
    //     const userData = { email, ...user }

    //     // Store user data in localStorage
    //     localStorage.setItem(
    //       "evolvx_user",
    //       JSON.stringify({
    //         type: user.type,
    //         data: userData,
    //       }),
    //     )

    //     // Redirect to appropriate dashboard
    //     if (user.type === "student") {
    //       router.push("/student-dashboard")
    //     } else {
    //       router.push("/school-dashboard")
    //     }

    //     onClose()
    //     resetForm()
    //   } else {
    //     setError("Login failed. Please try again.")
    //     setShowErrorModal(true)
    //   }
    //   setIsLoading(false)
    // }, 1000)


    try{
      const resp=await fetch(`${api}/api/auth/verify-login-otp`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
          },
          body:JSON.stringify({email:email,type:'student',otp:otp})
      });
      if(resp.status===200){
        const data=await resp.json();
        setOtpSent(true)
        toast.success(data.message, {
          description: data.message,
        })
        const resp1 = await fetch(`/api/set-cookie?token=${data.token}`);
      const newdata = await resp1.json();
        router.push("/student-dashboard")
        
      }
      else{
        setError("Invalid or Expired Otp")
        setShowErrorModal(true)
      }

    }catch(err){
      setError("Login failed. Please try again.")
        setShowErrorModal(true)

    }finally{
      setIsLoading(false)

    }
  }

  const resetForm = () => {
    setEmail("")
    setOtp("")
    setOtpSent(false)
    setError("")
  }

  const handleClose = () => {
    onClose()
    resetForm()
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} />

        {/* Modal Content */}
        <div className="relative z-10 w-full max-w-md mx-4 bg-[#0D1B2A]/95 backdrop-blur-xl text-white rounded-xl border border-gray-700 shadow-2xl">
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
              <h2 className="text-3xl font-bold text-[#FDCB06] mb-2">LOGIN</h2>
              <p className="text-gray-400">Access your EVOLVX dashboard</p>
            </div>

            {/* Login Form */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="login-email" className="text-gray-300">
                  Email *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#FF6B00] pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={otpSent}
                  />
                </div>
              </div>

              {otpSent && (
                <div>
                  <Label htmlFor="login-otp" className="text-gray-300">
                    Enter OTP *
                  </Label>
                  <Input
                    id="login-otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#FF6B00]"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                  />
                  {/* <p className="text-xs text-gray-400 mt-1">Demo OTP: 123456</p> */}
                </div>
              )}

              {!otpSent ? (
                <Button
                  onClick={handleSendOTP}
                  disabled={isLoading}
                  className="w-full bg-[#FF6B00] hover:bg-[#e55a00] text-white"
                >
                  {isLoading ? "Sending OTP..." : "SEND OTP"}
                </Button>
              ) : (
                <div className="space-y-3">
                  <Button
                    onClick={handleVerifyOTP}
                    disabled={isLoading}
                    className="w-full bg-[#FF6B00] hover:bg-[#e55a00] text-white"
                  >
                    {isLoading ? "Verifying..." : "VERIFY & LOGIN"}
                  </Button>
                  <Button
                    onClick={() => {
                      setOtpSent(false)
                      setOtp("")
                    }}
                    variant="outline"
                    className="w-full border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent"
                  >
                    Change Email
                  </Button>
                </div>
              )}
{/* 
              <div className="text-center text-sm text-gray-400 space-y-1">
                <p>Demo accounts:</p>
                <p>student@test.com | school@test.com</p>
                <p>john.student@gmail.com | admin@school.edu</p>
              </div> */}
            </div>
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
            <p className="text-gray-300 mb-6">{error}</p>
            <Button onClick={() => setShowErrorModal(false)} className="bg-red-600 hover:bg-red-700 text-white">
              OK
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
