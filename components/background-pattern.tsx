import Image from "next/image"

export function BackgroundPattern() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <Image
        src="/images/comic-background.png"
        alt="Comic book style background pattern"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="opacity-20" // Adjust opacity to make it subtle
      />
      <div className="absolute inset-0 bg-black/70"></div> {/* Dark overlay */}
    </div>
  )
}
