import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Next.js Boilerplate. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/about" className="underline underline-offset-4 hover:text-foreground">
            About
          </Link>
          <Link href="/contact" className="underline underline-offset-4 hover:text-foreground">
            Contact
          </Link>
          <Link
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-foreground"
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  )
}
