export const metadata = {
  title: "About | Next.js Boilerplate",
  description: "Learn more about our Next.js boilerplate application",
}

export default function AboutPage() {
  return (
    <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Us</h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Learn more about our team and our mission.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-3xl mt-12 space-y-6">
        <p>
          This boilerplate was created to help developers quickly bootstrap new Next.js projects with a modern stack and
          best practices built in.
        </p>
        <p>
          It includes the App Router, which is the latest routing system in Next.js, along with React Server Components
          for improved performance and a better developer experience.
        </p>
        <p>
          The styling is handled by Tailwind CSS, which provides a utility-first approach to building responsive designs
          quickly and efficiently.
        </p>
        <p>
          We've also included a theme provider for dark mode support, which respects the user's system preferences by
          default but can also be toggled manually.
        </p>
      </div>
    </div>
  )
}
