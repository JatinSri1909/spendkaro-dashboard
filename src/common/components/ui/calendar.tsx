import * as React from "react"
import { DayPicker } from "react-day-picker"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={`p-3 ${className}`}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium tracking-wide text-text",
        nav: "space-x-1 flex items-center",
        nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity text-text-muted hover:text-text rounded-md border border-surface-border flex items-center justify-center backdrop-blur-md",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-text-muted rounded-md w-9 font-normal text-[0.8rem] uppercase tracking-widest",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 flex items-center justify-center relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/20 [&:has([aria-selected])]:bg-accent/20 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: "h-8 w-8 p-0 font-normal hover:bg-surface-alt hover:text-text transition-colors rounded-full text-text-muted aria-selected:opacity-100",
        day_range_end: "day-range-end",
        day_selected: "bg-accent text-white hover:bg-accent hover:text-white focus:bg-accent focus:text-white font-bold shadow-[0_0_15px_rgba(56,189,248,0.5)]",
        day_today: "bg-surface-alt text-accent font-bold",
        day_outside: "day-outside text-text-muted/30 aria-selected:bg-accent/20 aria-selected:text-accent",
        day_disabled: "text-text-muted/30 opacity-50",
        day_range_middle: "aria-selected:bg-accent/20 aria-selected:text-accent rounded-none aria-selected:hover:bg-accent/30 aria-selected:hover:text-text",
        day_hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }