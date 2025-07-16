import { cn } from "@/lib/utils"
import { CheckCircle } from "lucide-react"

interface StepperProps {
  steps: { label: string; status: any }[]
}

export function Stepper({ steps }: StepperProps) {
  return (
    <div className="flex justify-between items-center w-full mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center flex-1 relative">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300",
              step.status === "current" && "bg-[#FF6B00] scale-110 shadow-lg",
              step.status === "completed" && "bg-[#FDCB06] scale-100",
              step.status === "upcoming" && "bg-gray-600 scale-100",
            )}
          >
            {step.status === "completed" ? (
              <CheckCircle className="h-5 w-5 text-[#0D1B2A]" />
            ) : (
              <span className={cn(step.status === "current" ? "text-[#0D1B2A]" : "text-white")}>{index + 1}</span>
            )}
          </div>
          <p
            className={cn(
              "mt-2 text-xs sm:text-sm text-center transition-colors duration-300",
              step.status === "current" && "text-[#FF6B00] font-semibold",
              step.status === "completed" && "text-[#FDCB06]",
              step.status === "upcoming" && "text-gray-400",
            )}
          >
            {step.label}
          </p>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "absolute left-[calc(50%+16px)] right-[calc(50%+16px)] top-4 h-0.5 transition-all duration-300",
                step.status === "completed" ? "bg-[#FDCB06]" : "bg-gray-600",
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}
