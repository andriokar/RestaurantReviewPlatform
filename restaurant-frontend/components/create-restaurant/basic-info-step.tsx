import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function BasicInfoStep() {
  const { register } = useFormContext()

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Restaurant Name</Label>
        <Input id="name" {...register("name", { required: true })} />
      </div>
      <div>
        <Label htmlFor="cuisineType">Cuisine Type</Label>
        <Input id="cuisineType" {...register("cuisineType", { required: true })} />
      </div>
      <div>
        <Label htmlFor="contactInformation">Contact Information</Label>
        <Input id="contactInformation" {...register("contactInformation", { required: true })} />
      </div>
    </div>
  )
}

