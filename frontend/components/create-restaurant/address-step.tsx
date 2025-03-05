import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AddressStep() {
  const { register } = useFormContext()

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="streetNumber">Street Number</Label>
        <Input id="streetNumber" {...register("address.streetNumber", { required: true })} />
      </div>
      <div>
        <Label htmlFor="streetName">Street Name</Label>
        <Input id="streetName" {...register("address.streetName", { required: true })} />
      </div>
      <div>
        <Label htmlFor="unit">Unit (Optional)</Label>
        <Input id="unit" {...register("address.unit")} />
      </div>
      <div>
        <Label htmlFor="city">City</Label>
        <Input id="city" {...register("address.city", { required: true })} />
      </div>
      <div>
        <Label htmlFor="state">State</Label>
        <Input id="state" {...register("address.state", { required: true })} />
      </div>
      <div>
        <Label htmlFor="postalCode">Postal Code</Label>
        <Input id="postalCode" {...register("address.postalCode", { required: true })} />
      </div>
      <div>
        <Label htmlFor="country">Country</Label>
        <Input id="country" {...register("address.country", { required: true })} />
      </div>
    </div>
  )
}

