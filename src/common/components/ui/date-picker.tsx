import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Calendar } from "./calendar"

interface DatePickerProps {
  date?: Date | null
  onDateChange: (date: Date | undefined) => void
  placeholder?: string
}

export function DatePicker({ date, onDateChange, placeholder = "Pick a date" }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={`flex h-10 w-full items-center justify-start rounded-xl border border-white/10 bg-surface/40 px-4 py-2 text-sm backdrop-blur-xl transition-all hover:bg-surface/60 focus:outline-none focus:border-accent/50 shadow-[inset_0_1px_4px_rgba(0,0,0,0.3)] ${
            !date ? "text-text-muted" : "text-text font-medium"
          }`}
        >
          <CalendarIcon className="mr-3 h-4 w-4 opacity-50" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date ?? undefined}
          onSelect={onDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
