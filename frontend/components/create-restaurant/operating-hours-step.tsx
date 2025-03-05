import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

export default function OperatingHoursStep() {
  const { register } = useFormContext()

  return (
    <div className="space-y-4">
      {daysOfWeek.map((day) => (
        <div key={day} className="flex items-center space-x-4">
          <Label className="w-24 capitalize">{day}</Label>
          <div className="flex-1 space-x-2">
            <Input type="time" {...register(`operatingHours.${day}.openTime`)} className="w-[120px] inline-block" />
            <span>to</span>
            <Input type="time" {...register(`operatingHours.${day}.closeTime`)} className="w-[120px] inline-block" />
          </div>
        </div>
      ))}
    </div>
  )
}

