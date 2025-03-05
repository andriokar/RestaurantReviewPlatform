'use client';

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BasicInfoStep from "@/components/create-restaurant/basic-info-step";
import AddressStep from "@/components/create-restaurant/address-step";
import OperatingHoursStep from "@/components/create-restaurant/operating-hours-step";
import PhotosStep from "@/components/create-restaurant/photos-step";
import { useAppContext } from "@/providers/app-context-provider";
import { CreateRestaurantRequest, Photo } from "@/domain/domain";

type FormData = {
  name: string;
  cuisineType: string;
  contactInformation: string;
  address: {
    streetNumber: string;
    streetName: string;
    unit?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  operatingHours: {
    monday?: { openTime: string; closeTime: string };
    tuesday?: { openTime: string; closeTime: string };
    wednesday?: { openTime: string; closeTime: string };
    thursday?: { openTime: string; closeTime: string };
    friday?: { openTime: string; closeTime: string };
    saturday?: { openTime: string; closeTime: string };
    sunday?: { openTime: string; closeTime: string };
  };
  photos: string[];
};

const steps = ["Basic Info", "Address", "Operating Hours", "Photos"];


export default function CreateRestaurantPage() {
  const { apiService } = useAppContext();
  const [currentStep, setCurrentStep] = useState(0);
  const methods = useForm<FormData>();

  const uploadPhoto = async (file: File, caption?: string): Promise<Photo> => {
    if (null == apiService) {
      throw Error("API Service not available!");
    }
    return apiService.uploadPhoto(file, caption);
  };

  const onSubmit = async (data: FormData) => {
    console.log("Form submitted:", data);

    const createRestaurantRequest: CreateRestaurantRequest = {
        name: data.name,
        cuisineType: data.cuisineType,
        contactInformation: data.contactInformation,
        address: data.address,
        operatingHours: data.operatingHours,
        photoIds: data.photos,
    }

    if(null == apiService) {
        throw Error("API Service not available!");
    }
    
    await apiService?.createRestaurant(createRestaurantRequest);    
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="max-w-[800px] mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create a New Restaurant</h1>
      <Card>
        <CardContent className="pt-6">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {currentStep === 0 && <BasicInfoStep />}
              {currentStep === 1 && <AddressStep />}
              {currentStep === 2 && <OperatingHoursStep />}
              {currentStep === 3 && <PhotosStep uploadPhoto={uploadPhoto} />}
              <div className="flex justify-between mt-6">
                {currentStep > 0 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}
                {currentStep < steps.length - 1 ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit">Submit</Button>
                )}
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
