import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { UsedCarListing } from "@prisma/client";
import { CldImage, CloudinaryUploadWidgetResults } from "next-cloudinary";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UsedCarListingFormSchema, {
  UsedCarListingFormSchemaType,
} from "../Forms/UsedCarListingFormSchema";
import ImageUploadButton from "../ImageUI/ImageUploadButton";

interface UsedCarListingEditProps {
  selectedUsedCarListing: UsedCarListing;
  submitEditUsedCarListing: (
    values: UsedCarListingFormSchemaType
  ) => Promise<void>;
  handleCancel: () => void;
}

export function UsedCarListingEditModal({
  selectedUsedCarListing,
  submitEditUsedCarListing,
  handleCancel,
}: UsedCarListingEditProps) {
  const form = useForm({
    resolver: zodResolver(UsedCarListingFormSchema),
    defaultValues: {
      title: selectedUsedCarListing.title,
      agentEmail: selectedUsedCarListing.agentEmail,
      sellerEmail: selectedUsedCarListing.sellerEmail,
      mileage: selectedUsedCarListing.mileage,
      color: selectedUsedCarListing.color,
      condition: selectedUsedCarListing.condition,
      imgUrl: selectedUsedCarListing.imgUrl,
      manufacturedYear: selectedUsedCarListing.manufacturedYear,
      price: selectedUsedCarListing.price,
      description: selectedUsedCarListing.description,
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  interface CloudinaryResult {
    public_id: string;
  }

  useEffect(() => {
    setPublicId(selectedUsedCarListing.imgUrl);
  }, []);

  const [publicId, setPublicId] = useState<string>("");

  const onUpload = (result: CloudinaryUploadWidgetResults) => {
    if (result.event !== "success") {
      form.setValue("imgUrl", "");
      return;
    } else {
      const info = result.info as CloudinaryResult;
      console.log(result);
      form.setValue("imgUrl", info.public_id);
      setPublicId(info.public_id);
    }
  };

  return (
    <Dialog open onOpenChange={handleCancel} modal={false}>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edit used car listing</DialogTitle>
          <DialogDescription>
            Make changes to your used car listing details here. Click save when
            you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(submitEditUsedCarListing)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                type="text"
                {...register("title")}
                className="col-span-3"
              />
              {errors.title && (
                <p className="col-span-4 text-red-500 text-sm">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="agentEmail" className="text-right">
                Agent Email
              </Label>
              <Input
                id="agentEmail"
                type="email"
                {...register("agentEmail")}
                className="col-span-3"
              />
              {errors.agentEmail && (
                <p className="col-span-4 text-red-500 text-sm">
                  {errors.agentEmail.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sellerEmail" className="text-right">
                Seller Email
              </Label>
              <Input
                id="sellerEmail"
                type="email"
                {...register("sellerEmail")}
                className="col-span-3"
              />
              {errors.sellerEmail && (
                <p className="col-span-4 text-red-500 text-sm">
                  {errors.sellerEmail.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="mileage" className="text-right">
                Mileage
              </Label>
              <Input
                id="mileage"
                type="number"
                {...register("mileage")}
                className="col-span-3"
              />
              {errors.mileage && (
                <p className="col-span-4 text-red-500 text-sm">
                  {errors.mileage.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="color" className="text-right">
                Color
              </Label>
              <Input
                id="color"
                type="text"
                {...register("color")}
                className="col-span-3"
              />
              {errors.color && (
                <p className="col-span-4 text-red-500 text-sm">
                  {errors.color.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="condition" className="text-right">
                Condition
              </Label>
              <Input
                id="condition"
                type="text"
                {...register("condition")}
                className="col-span-3"
              />
              {errors.condition && (
                <p className="col-span-4 text-red-500 text-sm">
                  {errors.condition.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imgUrl" className="text-right">
                Image URL
              </Label>
              {publicId && (
                <CldImage
                  src={publicId}
                  width={150}
                  height={150}
                  alt="Preview"
                  style={{ objectFit: "contain" }} // Maintain aspect ratio
                />
              )}
              <div>
                <ImageUploadButton onUpload={onUpload} />
              </div>
              <input type="hidden" {...form.register("imgUrl")} />
              {errors.imgUrl && (
                <p className="col-span-4 text-red-500 text-sm">
                  {errors.imgUrl.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="manufacturedYear" className="text-right">
                Manufactured Year
              </Label>
              <Input
                id="manufacturedYear"
                type="number"
                {...register("manufacturedYear")}
                className="col-span-3"
              />
              {errors.manufacturedYear && (
                <p className="col-span-4 text-red-500 text-sm">
                  {errors.manufacturedYear.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                {...register("price")}
                className="col-span-3"
              />
              {errors.price && (
                <p className="col-span-4 text-red-500 text-sm">
                  {errors.price.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                type="text"
                {...register("description")}
                className="col-span-3"
              />
              {errors.description && (
                <p className="col-span-4 text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
            <Button type="button" variant="ghost" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
