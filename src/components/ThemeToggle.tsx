
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/ThemeProvider"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-10 w-10 rounded-full bg-white/20 dark:bg-black/40 backdrop-blur-sm border-white/30 dark:border-white/10 overflow-hidden relative hover:scale-110 transition-transform duration-300 group shadow-md shadow-brand-primary/10 dark:shadow-brand-primary/20">
          <motion.div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300"
            animate={{
              background: theme === "dark" 
                ? "radial-gradient(circle at center, rgba(79, 70, 229, 0.8), rgba(79, 70, 229, 0.4))" 
                : "radial-gradient(circle at center, rgba(79, 70, 229, 0.6), rgba(79, 70, 229, 0.2))"
            }}
          />
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 text-gray-800 dark:text-white" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 text-gray-800 dark:text-white" />
          <span className="sr-only">Toggle theme</span>
          <motion.div 
            className="absolute inset-0 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={{
              boxShadow: theme === "dark"
                ? "0 0 15px 2px rgba(79, 70, 229, 0.7)"
                : "0 0 15px 2px rgba(79, 70, 229, 0.7)"
            }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="animate-in fade-in duration-300 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-brand-primary/20 dark:border-white/10 shadow-lg shadow-brand-primary/10 dark:shadow-brand-primary/20">
        <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer hover:bg-brand-primary/10">
          <Sun className="h-4 w-4 mr-2" /> Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer hover:bg-brand-primary/10">
          <Moon className="h-4 w-4 mr-2" /> Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer hover:bg-brand-primary/10">
          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
