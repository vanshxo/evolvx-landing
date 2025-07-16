"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Menu,
  X,
  Lightbulb,
  Users,
  BookOpen,
  Target,
  Award,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  ArrowRight,
  Trophy,
  Star,
  Sparkles,
  Linkedin,
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  ChevronUp,
} from "lucide-react"
import { SimpleRegistrationModal } from "@/components/simple-registration-modal"
import { LoginModal } from "@/components/login-modal"
import { useRouter } from "next/navigation"

// Enhanced animated background particles component
const AnimatedBackground = () => {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; opacity: number; delay: number }>
  >([])

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = []
      for (let i = 0; i < 80; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          opacity: Math.random() * 0.6 + 0.2,
          delay: Math.random() * 5,
        })
      }
      setParticles(newParticles)
    }

    generateParticles()
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animation: `twinkle ${3 + Math.random() * 4}s infinite ${particle.delay}s`,
          }}
        >
          <Star className="text-white fill-current" size={particle.size} />
        </div>
      ))}
    </div>
  )
}

// Scroll to top button component
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <button
      className={`fixed bottom-8 right-8 z-40 w-12 h-12 bg-[#FF6B00] hover:bg-[#e55a00] text-white rounded-full shadow-lg transition-all duration-500 flex items-center justify-center group ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      onClick={scrollToTop}
      title="Scroll to top"
    >
      <ChevronUp className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
    </button>
  )
}

export default function EVOLVXLanding() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState("home")
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Update active section based on scroll position with navbar offset
      const sections = ["home", "about", "phases", "bootcamp", "contact"]
      const navbarHeight = 64

      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= navbarHeight + 50 && rect.bottom >= navbarHeight + 50
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("evolvx_user")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      if (user.type === "student") {
        router.push("/student-dashboard")
      } else if (user.type === "school") {
        router.push("/school-dashboard")
      }
    }
  }, [router])

  const handleRegistrationSuccess = () => {
    // Just show success message, don't auto-login
    console.log("Registration successful! User can now login.")
  }

  const phases = [
    {
      number: "1",
      title: "Registration & Online Quiz",
      description: "School and individual registrations, followed by an engaging online quiz for Classes 6–8 and 9–12.",
      color: "bg-[#FF6B00]",
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      number: "2",
      title: "Online Mentorship Phase 1",
      description: "Expert guidance for idea development and validation through interactive mentorship sessions.",
      color: "bg-[#0D1B2A]",
      icon: <Users className="h-6 w-6" />,
    },
    {
      number: "3",
      title: "1-Day Bootcamp",
      description: "Hands-on learning at MNIT Jaipur with workshops, speaker sessions, and mentor interactions.",
      color: "bg-[#FF6B00]",
      icon: <Target className="h-6 w-6" />,
    },
    {
      number: "4",
      title: "Online Mentorship Phase 2",
      description: "Advanced mentorship focusing on refining startup ideas and preparing for investor pitches.",
      color: "bg-[#0D1B2A]",
      icon: <Lightbulb className="h-6 w-6" />,
    },
    {
      number: "5",
      title: "Investor Pitching & Sphinx",
      description: "Final pitch competition at Sphinx, MNIT Jaipur with investors, founders, and faculty.",
      color: "bg-[#FF6B00]",
      icon: <Trophy className="h-6 w-6" />,
    },
  ]

  const downloadLocalPDF=()=> {
    const link = document.createElement('a');
    link.href = `/EvolvX.pdf`; // assumes file is in /public
    link.download = `/EvolvX.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const objectives = [
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Spark Ideas",
      description: "Encourage creative thinking and real-world problem-solving.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Build Skills",
      description: "Develop communication, leadership, teamwork, and financial literacy.",
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Mentorship",
      description: "Provide expert guidance for idea development and validation.",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Hands-on Learning",
      description: "Engage in activities, workshops, and a campus bootcamp.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Pitch Ready",
      description: "Train students to confidently pitch on platforms like Sphinx.",
    },
  ]

  const bootcampActivities = [
    {
      title: "Workshop 1",
      description: "Hands-on session on Idea Generation & Problem Solving",
      icon: <Lightbulb className="h-5 w-5" />,
    },
    {
      title: "Workshop 2",
      description: "Practical session on Building a Simple Business Model",
      icon: <Target className="h-5 w-5" />,
    },
    {
      title: "Speaker Session",
      description: "Motivational talk by a young entrepreneur or innovator",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Mentor Interaction",
      description: "Direct interaction with mentors for idea refinement and feedback",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: "Closing & Next Steps",
      description: "Summary, student reflections, and announcement for Mentorship Phase 2",
      icon: <CheckCircle className="h-5 w-5" />,
    },
  ]

  const socialLinks = [
    { icon: <Linkedin className="h-5 w-5" />, color: "#0077B5", name: "LinkedIn",link:'https://www.linkedin.com/company/evolvx2025/' },
    { icon: <Instagram className="h-5 w-5" />, color: "#E4405F", name: "Instagram",link:'https://www.instagram.com/the_evolvx?igsh=MWlpMXpuNGRkcnozMw==' },
    // { icon: <Twitter className="h-5 w-5" />, color: "#1DA1F2", name: "Twitter" },
    // { icon: <Youtube className="h-5 w-5" />, color: "#FF0000", name: "YouTube" },
    // { icon: <Facebook className="h-5 w-5" />, color: "#1877F2", name: "Facebook" },
  ]

  const login=async()=>{
    const res = await fetch("/api/get-cookies")
    if (!res.ok) throw new Error("Failed to fetch cookie")
    const data = await res.json()
   if(data.myCookie){
   router.push('/student-dashboard')
   }
   else{
    setIsLoginModalOpen(true)
   }
  }

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      const navbarHeight = 64 // 16 * 4 = 64px (h-16)
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementId === "home" ? 0 : elementPosition - navbarHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF7EC] overflow-x-hidden">
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1) rotate(0deg); }
          50% { opacity: 0.8; transform: scale(1.3) rotate(180deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(5deg); }
          66% { transform: translateY(-5px) rotate(-3deg); }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 107, 0, 0.3); }
          50% { box-shadow: 0 0 40px rgba(255, 107, 0, 0.6); }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-slide-in-up {
          animation: slideInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .animate-fade-in-scale {
          animation: fadeInScale 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
        }
        
        .hover-lift {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(255, 107, 0, 0.15);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #FF6B00, #FDCB06, #FF6B00);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 3s ease infinite;
        }
        
        .glass-effect {
          backdrop-filter: blur(20px);
          background: rgba(255, 247, 236, 0.95);
          border: 1px solid rgba(255, 107, 0, 0.1);
          box-shadow: 0 8px 32px rgba(255, 107, 0, 0.1);
        }
        
        .social-icon {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .social-icon:hover {
          transform: translateY(-3px) scale(1.1);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }
        
        .nav-link {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #FF6B00, #FDCB06);
          transition: width 0.3s ease;
        }
        
        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }
        
        @media (max-width: 768px) {
          .animate-slide-in-up,
          .animate-slide-in-left,
          .animate-slide-in-right,
          .animate-fade-in-scale {
            animation-duration: 0.6s;
          }
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md text-[#0D1B2A] z-50 border-b border-[#FF6B00]/10 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => smoothScrollTo("home")}
                className="text-2xl sm:text-3xl font-bold gradient-text hover:scale-105 transition-transform duration-300"
              >
                EVOLVX
              </button>
              <div className="text-xs sm:text-sm text-gray-500 hidden sm:block">evolvx.org.in</div>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {[
                  { name: "HOME", id: "home" },
                  { name: "ABOUT", id: "about" },
                  { name: "PHASES", id: "phases" },
                  { name: "BOOTCAMP", id: "bootcamp" },
                  { name: "CONTACT", id: "contact" },
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => smoothScrollTo(item.id)}
                    className={`nav-link font-medium transition-all duration-300 ${
                      activeSection === item.id ? "text-[#FF6B00] active" : "hover:text-[#FF6B00]"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-3">
              <Button
                onClick={login}
                variant="outline"
                className="border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white transition-all duration-300"
              >
                LOGIN
              </Button>
              <Button
                onClick={() => setIsRegistrationModalOpen(true)}
                className="bg-[#FF6B00] hover:bg-[#e55a00] text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl animate-pulse-glow"
              >
                REGISTER
              </Button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-[#0D1B2A] hover:text-[#FF6B00] transition-all duration-300"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden animate-slide-in-up">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md border-t border-[#FF6B00]/10">
              {[
                { name: "HOME", id: "home" },
                { name: "ABOUT", id: "about" },
                { name: "PHASES", id: "phases" },
                { name: "BOOTCAMP", id: "bootcamp" },
                { name: "CONTACT", id: "contact" },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    smoothScrollTo(item.id)
                    setIsMenuOpen(false)
                  }}
                  className={`block w-full text-left px-3 py-2 transition-colors duration-300 ${
                    activeSection === item.id ? "text-[#FF6B00]" : "hover:text-[#FF6B00]"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <div className="px-3 py-2 space-y-2">
                <Button
                  onClick={() => {
                    setIsLoginModalOpen(true)
                    setIsMenuOpen(false)
                  }}
                  variant="outline"
                  className="w-full border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white transition-all duration-300"
                >
                  LOGIN
                </Button>
                <Button
                  onClick={() => {
                    setIsRegistrationModalOpen(true)
                    setIsMenuOpen(false)
                  }}
                  className="w-full bg-[#FF6B00] hover:bg-[#e55a00] text-white transition-all duration-300"
                >
                  REGISTER
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative bg-gradient-to-br from-[#0D1B2A] via-[#1a2332] to-[#0D1B2A] text-white pt-16 pb-12 sm:py-20 min-h-screen flex items-center overflow-hidden"
      >
        <AnimatedBackground />

        <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B00]/5 to-[#FDCB06]/5"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 w-full">
          <div className="animate-fade-in-scale">
            <div className="mb-8">
              <p
                className="text-sm sm:text-lg md:text-xl text-gray-300 mb-4 animate-slide-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                3-MONTH ENTREPRENEURIAL JOURNEY
              </p>

              <div className="relative inline-block mb-6 sm:mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B00] to-[#FDCB06] rounded-2xl transform rotate-1 animate-float"></div>
                <div className="relative bg-white text-[#0D1B2A] px-6 sm:px-12 py-4 sm:py-6 rounded-2xl shadow-2xl">
                  <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold">
                    <span className="gradient-text">EVOLV</span>
                    <span className="text-[#0D1B2A]">X</span>
                  </h1>
                </div>
              </div>

              <p
                className="text-lg sm:text-2xl md:text-3xl text-[#FDCB06] mb-4 animate-slide-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                ROAD TO ENTREPRENEURSHIP
              </p>

              <p
                className="text-sm sm:text-lg text-gray-300 max-w-4xl mx-auto mb-6 sm:mb-8 px-4 animate-slide-in-up leading-relaxed"
                style={{ animationDelay: "0.6s" }}
              >
                Transform ideas into impactful ventures while developing confidence, leadership, and real-world
                problem-solving abilities.
              </p>
            </div>

            <div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-slide-in-up px-4"
              style={{ animationDelay: "0.8s" }}
            >
              <Button
                size="lg"
                onClick={() => setIsRegistrationModalOpen(true)}
                className="bg-[#FF6B00] hover:bg-[#e55a00] text-white px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-[#FF6B00]/25 w-full sm:w-auto"
              >
                REGISTER NOW
                <Sparkles className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#0D1B2A] px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold bg-transparent transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              onClick={downloadLocalPDF}
              >
                BROCHURE
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Social Media Icons */}
        <div className="fixed right-4 sm:right-6 top-1/2 transform -translate-y-1/2 z-40 space-y-3 sm:space-y-4">
          {socialLinks.map((social, index) => (
            <a
              key={social.name}
              href={social.link}
              onClick={(e) => {
                e.preventDefault()
                // Add your social media links here
              }}
              className="social-icon w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer group animate-slide-in-right block"
              style={{
                animationDelay: `${index * 0.1}s`,
                background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, ${social.color}20, ${social.color}10)`
                e.currentTarget.style.borderColor = social.color
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))`
                e.currentTarget.style.borderColor = "transparent"
              }}
              title={social.name}
            >
              <div
                className="transition-colors duration-300 text-white group-hover:scale-110"
                style={{ color: "white" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = social.color
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "white"
                }}
              >
                {social.icon}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Objectives Section */}
      <section id="about" className="py-12 sm:py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF7EC] to-white"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#0D1B2A] mb-4 sm:mb-6 animate-slide-in-up">
              OBJECTIVES
            </h2>
            <p
              className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto animate-slide-in-up px-4"
              style={{ animationDelay: "0.2s" }}
            >
              Our comprehensive program is designed to nurture young entrepreneurs through structured learning and
              practical experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {objectives.map((objective, index) => (
              <Card
                key={index}
                className="border-2 border-[#FF6B00]/20 hover:border-[#FF6B00] transition-all duration-500 group hover-lift glass-effect animate-fade-in-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#FF6B00] to-[#e55a00] rounded-full flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {objective.icon}
                  </div>
                  <CardTitle className="text-[#0D1B2A] text-lg sm:text-xl font-bold">{objective.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center leading-relaxed text-sm sm:text-base">
                    {objective.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Phases Section */}
      <section
        id="phases"
        className="py-12 sm:py-20 bg-gradient-to-br from-[#FFF7EC] to-[#f5f1e8] relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 sm:w-32 sm:h-32 bg-[#FF6B00] rounded-full animate-float"></div>
          <div
            className="absolute bottom-10 right-10 w-16 h-16 sm:w-24 sm:h-24 bg-[#FDCB06] rounded-full animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#0D1B2A] mb-4 sm:mb-6 animate-slide-in-up">
              PROGRAM PHASES
            </h2>
            <p
              className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto animate-slide-in-up px-4"
              style={{ animationDelay: "0.2s" }}
            >
              A structured 5-phase journey from registration to final pitch competition
            </p>
          </div>

          {/* Desktop Timeline */}
          <div className="hidden lg:flex items-center justify-between mb-16 relative">
            <div className="absolute top-10 left-10 right-10 h-1 bg-gradient-to-r from-[#FF6B00] to-[#FDCB06] rounded-full animate-gradient"></div>
            {phases.map((phase, index) => (
              <div
                key={index}
                className="flex flex-col items-center relative z-10 animate-fade-in-scale"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div
                  className={`w-20 h-20 ${phase.color} rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 shadow-xl hover:scale-110 transition-all duration-300 border-4 border-white animate-pulse-glow`}
                >
                  {phase.icon}
                </div>
                <div className="text-center max-w-48 glass-effect p-4 rounded-lg hover-lift">
                  <h3 className="font-bold text-[#0D1B2A] mb-2 text-sm">{phase.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-6 sm:space-y-8">
            {phases.map((phase, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 sm:space-x-6 animate-slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`w-12 h-12 sm:w-16 sm:h-16 ${phase.color} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 shadow-lg`}
                >
                  {phase.icon}
                </div>
                <div className="glass-effect p-4 sm:p-6 rounded-lg flex-1 hover-lift">
                  <h3 className="font-bold text-[#0D1B2A] mb-2 text-base sm:text-lg">{phase.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Details */}
      <section className="py-12 sm:py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-4 sm:mb-6">
                PHASE 1: <span className="gradient-text">Registration</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Begins with school and individual registrations, followed by an engaging online quiz for Classes 6–8 and
                9–12. The quiz assesses creativity, logic, and entrepreneurial thinking.
              </p>

              <div className="space-y-4 sm:space-y-6">
                <div className="glass-effect p-4 sm:p-6 rounded-xl border-l-4 border-[#FF6B00] hover-lift">
                  <h3 className="font-bold text-[#0D1B2A] mb-3 flex items-center text-sm sm:text-base">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF6B00] mr-2 sm:mr-3 flex-shrink-0" />
                    Registration Types
                  </h3>
                  <ul className="space-y-2 sm:space-y-3 text-gray-600">
                    <li className="flex items-center text-sm sm:text-base">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF6B00] mr-2 sm:mr-3 flex-shrink-0" />
                      School Registration – Schools can register a group of students
                    </li>
                    <li className="flex items-center text-sm sm:text-base">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF6B00] mr-2 sm:mr-3 flex-shrink-0" />
                      Individual Student Registration – Students can register independently
                    </li>
                  </ul>
                </div>

                <div className="glass-effect p-4 sm:p-6 rounded-xl border-l-4 border-[#FDCB06] hover-lift">
                  <h3 className="font-bold text-[#0D1B2A] mb-3 flex items-center text-sm sm:text-base">
                    <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-[#FDCB06] mr-2" />
                    Online Quiz Categories
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/50 p-3 sm:p-4 rounded-lg">
                      <h4 className="font-semibold text-[#FF6B00] mb-2 text-sm sm:text-base">Alpha Category (6-8)</h4>
                      <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                        <li>• Logical reasoning & puzzles</li>
                        <li>• Basic entrepreneurship</li>
                        <li>• General awareness</li>
                      </ul>
                    </div>
                    <div className="bg-white/50 p-3 sm:p-4 rounded-lg">
                      <h4 className="font-semibold text-[#FF6B00] mb-2 text-sm sm:text-base">Beta Category (9-12)</h4>
                      <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                        <li>• Critical thinking & case studies</li>
                        <li>• Financial literacy</li>
                        <li>• Real-world problem-solving</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-in-right" style={{ animationDelay: "0.3s" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B00]/20 to-[#FDCB06]/20 rounded-2xl transform rotate-3 animate-float"></div>
              <img
                src="/images/registration-process.png"
                alt="Registration Process"
                className="relative w-full rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bootcamp Section */}
      <section
        id="bootcamp"
        className="py-12 sm:py-20 bg-gradient-to-br from-[#0D1B2A] to-[#1a2332] text-white relative overflow-hidden"
      >
        <AnimatedBackground />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 animate-slide-in-up">
              <span className="text-[#FDCB06]">1-DAY ENTREPRENEURSHIP</span>
              <br />
              <span className="text-white">BOOTCAMP AT MNIT JAIPUR</span>
            </h2>
            <p
              className="text-base sm:text-xl text-gray-300 max-w-4xl mx-auto animate-slide-in-up px-4"
              style={{ animationDelay: "0.2s" }}
            >
              Hands-on learning through dynamic workshops, inspiring speaker sessions, and mentor interaction
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
            <div className="animate-slide-in-left">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#FF6B00] mb-6 sm:mb-8">BOOTCAMP OVERVIEW</h3>
              <div className="space-y-3 sm:space-y-4">
                {bootcampActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all duration-300 hover-lift animate-slide-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#FF6B00] to-[#e55a00] rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                      {activity.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#FDCB06] mb-1 sm:mb-2 text-sm sm:text-base">{activity.title}</h4>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-slide-in-right" style={{ animationDelay: "0.4s" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B00]/30 to-[#FDCB06]/30 rounded-2xl transform -rotate-3 animate-float"></div>
              <img
                src="/images/bootcamp-overview.png"
                alt="Bootcamp Overview"
                className="relative w-full rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="text-center animate-slide-in-up" style={{ animationDelay: "0.6s" }}>
            <p className="text-base sm:text-lg text-[#FDCB06] mb-4 sm:mb-6">
              Selected students from Phase 1 mentorship program will participate in the Bootcamp
            </p>
            <Button
              size="lg"
              className="bg-[#FF6B00] hover:bg-[#e55a00] text-white px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              Learn More About Bootcamp
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Final Phase Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-[#FFF7EC] to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="relative animate-slide-in-left">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B00]/20 to-[#FDCB06]/20 rounded-2xl transform rotate-2 animate-float"></div>
              <img
                src="/images/phase4-slide.png"
                alt="Phase 4 - Pitching Competition"
                className="relative w-full rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-4 sm:mb-6">
                FINAL PITCH AT <span className="gradient-text">SPHINX</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Phase 4 culminates in a high-energy live pitch competition at Sphinx, MNIT Jaipur, where selected
                students present their startup ideas before a panel of investors, startup founders, and faculty.
              </p>

              <div className="space-y-4 sm:space-y-6">
                <div className="glass-effect p-4 sm:p-6 rounded-xl border-l-4 border-[#FF6B00] hover-lift">
                  <h3 className="font-bold text-[#0D1B2A] mb-3 flex items-center text-sm sm:text-base">
                    <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF6B00] mr-2" />
                    Competition Format
                  </h3>
                  <ul className="space-y-2 sm:space-y-3 text-gray-600">
                    <li className="flex items-center text-sm sm:text-base">
                      <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF6B00] mr-2 sm:mr-3 flex-shrink-0" />5 minutes to
                      pitch + Q&A session
                    </li>
                    <li className="flex items-center text-sm sm:text-base">
                      <Users className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF6B00] mr-2 sm:mr-3 flex-shrink-0" />
                      Panel of investors, startup founders, and MNIT faculty
                    </li>
                    <li className="flex items-center text-sm sm:text-base">
                      <Award className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF6B00] mr-2 sm:mr-3 flex-shrink-0" />
                      Recognition, certificates, and potential investor interest
                    </li>
                  </ul>
                </div>

                <div className="glass-effect p-4 sm:p-6 rounded-xl border-l-4 border-[#FDCB06] hover-lift">
                  <h3 className="font-bold text-[#0D1B2A] mb-3 flex items-center text-sm sm:text-base">
                    <Target className="h-4 w-4 sm:h-5 sm:w-5 text-[#FDCB06] mr-2" />
                    Evaluation Criteria
                  </h3>
                  <ul className="space-y-1 text-gray-600 text-xs sm:text-sm grid grid-cols-1 md:grid-cols-2 gap-2">
                    <li>• Clarity & presentation skills</li>
                    <li>• Market potential & feasibility</li>
                    <li>• Revenue & financial understanding</li>
                    <li>• Innovation & uniqueness</li>
                    <li>• Teamwork & execution capability</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-[#FF6B00] to-[#e55a00] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 animate-slide-in-up">
            Ready to Start Your Journey?
          </h2>
          <p
            className="text-base sm:text-xl mb-6 sm:mb-8 opacity-90 animate-slide-in-up px-4"
            style={{ animationDelay: "0.2s" }}
          >
            Join EVOLVX and transform your innovative ideas into impactful ventures. Register now and be part of the
            next generation of entrepreneurs.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-slide-in-up px-4"
            style={{ animationDelay: "0.4s" }}
          >
            <Button
              size="lg"
              onClick={() => setIsRegistrationModalOpen(true)}
              className="bg-white text-[#FF6B00] hover:bg-gray-100 px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-2xl w-full sm:w-auto"
            >
              REGISTER NOW
              <Sparkles className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#FF6B00] px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold bg-transparent transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              onClick={downloadLocalPDF}
            >
              DOWNLOAD BROCHURE
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#0D1B2A] text-white py-8 sm:py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <AnimatedBackground />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="animate-slide-in-up">
              <div className="text-2xl sm:text-3xl font-bold gradient-text mb-4">EVOLVX</div>
              <p className="text-gray-300 mb-4 leading-relaxed text-sm sm:text-base">
                A 3-month entrepreneurial journey for students of classes 6 to 12, designed to spark creativity and
                nurture innovative thinking.
              </p>
              <p className="text-[#FDCB06] font-semibold text-sm sm:text-base">evolvx.org.in</p>
            </div>

            <div className="animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
              <h3 className="text-base sm:text-lg font-semibold mb-4 text-[#FF6B00]">Quick Links</h3>
              <ul className="space-y-2 sm:space-y-3 text-gray-300">
                {["Home", "About", "Phases", "Bootcamp", "Contact"].map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => smoothScrollTo(link.toLowerCase())}
                      className="hover:text-[#FF6B00] transition-colors duration-300 flex items-center group text-sm sm:text-base"
                    >
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="animate-slide-in-up" style={{ animationDelay: "0.4s" }}>
              <h3 className="text-base sm:text-lg font-semibold mb-4 text-[#FF6B00]">Contact Info</h3>
              <div className="space-y-2 sm:space-y-3 text-gray-300">
                <p className="flex items-center text-sm sm:text-base">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-[#FDCB06] flex-shrink-0" />
                  MNIT Jaipur
                </p>
                <p className="flex items-center text-sm sm:text-base">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-[#FDCB06] flex-shrink-0" />
                  3-Month Program
                </p>
                <p className="flex items-center text-sm sm:text-base">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-[#FDCB06] flex-shrink-0" />
                  Classes 6-12
                </p>
              </div>
            </div>
          </div>

          {/* Partner Mentions Section */}
          <div
            className="mt-8 pt-6 border-t border-gray-700 flex flex-col sm:flex-row justify-center items-center gap-4 text-center animate-slide-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            <p className="text-sm sm:text-base text-gray-300">
              Powered by <span className="text-[#FDCB06] font-semibold">Scasys Technologies</span>
            </p>
            <span className="hidden sm:block text-gray-500">|</span>
            <p className="text-sm sm:text-base text-gray-300">
              Marketed by <span className="text-[#FDCB06] font-semibold">Kreatenow.in</span>{" "}
              <span className="text-gray-500 italic text-xs">from brand to trend</span>
            </p>
          </div>

          <Separator className="my-6 sm:my-8 bg-gray-700" />

          <div
            className="text-center text-gray-400 animate-slide-in-up text-sm sm:text-base"
            style={{ animationDelay: "0.6s" }}
          >
            <p>&copy; 2025 EVOLVX. All rights reserved. | Designed for young entrepreneurs</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Registration Modal */}
      <SimpleRegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        onRegistrationSuccess={handleRegistrationSuccess}
      />

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  )
}
