import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { uploadImage } from "@/lib/uploadUtils";
import { toast } from "sonner";

interface ProfileData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  country?: string;
  city?: string;
  bio?: string;
  quote?: string;
  designation?: string;
  personalInterests?: string[];
  currentProjects?: string[];
  topSkills?: string[];
  linkPreferences?: string[];
  lookingFor?: string[];
  topInterests?: string[];
  avatar?: string;
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProfileData) => void;
  section: string;
  initialData: ProfileData;
}

export function EditProfileModal({
  isOpen,
  onClose,
  onSave,
  section,
  initialData,
}: EditProfileModalProps) {
  const [isUploading, setIsUploading] = useState(false);
  // Transform initial data to ensure all fields have defined values
  const defaultValues = {
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    phoneNumber: initialData?.phoneNumber || "",
    country: initialData?.country || "",
    city: initialData?.city || "",
    bio: initialData?.bio || "",
    quote: initialData?.quote || "",
    designation: initialData?.designation || "",
    avatar: initialData?.avatar || "",
    personalInterests: initialData?.personalInterests || [],
    currentProjects: initialData?.currentProjects || [],
    topSkills: initialData?.topSkills || [],
    linkPreferences: initialData?.linkPreferences || [],
    lookingFor: initialData?.lookingFor || [],
    topInterests: initialData?.topInterests || [],
  };

  const form = useForm<ProfileData>({
    defaultValues,
  });

  // Reset form when initialData changes
  useEffect(() => {
    form.reset(defaultValues);
  }, [initialData]);

  // Add file input ref
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const imageUrl = await uploadImage(file);
      form.setValue("avatar", imageUrl);
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const renderFields = () => {
    switch (section) {
      case "personal":
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Picture</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="flex items-center gap-4">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          disabled={isUploading}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploading}
                        >
                          {isUploading ? (
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-custom-blue border-t-transparent" />
                              Uploading...
                            </div>
                          ) : (
                            "Upload Image"
                          )}
                        </Button>
                        <Input
                          {...field}
                          placeholder="Or enter image URL"
                          disabled={isUploading}
                        />
                      </div>
                      {field.value && (
                        <div className="relative">
                          <img
                            src={field.value}
                            alt="Avatar preview"
                            className="w-20 h-20 rounded-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://via.placeholder.com/100";
                            }}
                          />
                          {isUploading && (
                            <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center">
                              <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        );
      case "additional":
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quote</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="designation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        );
      case "skills":
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="topSkills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Top Skills (comma-separated)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={(field.value || []).join(", ")}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean)
                        )
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        );
      case "interests":
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="personalInterests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Personal Interests (comma-separated)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value?.join(", ") || ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean)
                        )
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="topInterests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Top Interests (comma-separated)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value?.join(", ") || ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean)
                        )
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        );
      case "projects":
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="currentProjects"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Projects (comma-separated)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value?.join(", ") || ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean)
                        )
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        );
      case "preferences":
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="linkPreferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link Preferences (comma-separated)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value?.join(", ") || ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean)
                        )
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        );
      case "lookingFor":
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="lookingFor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Looking For (comma-separated)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value?.join(", ") || ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean)
                        )
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const handleSave = (data: ProfileData) => {
    onSave(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {section}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            key={section} // Add key to force form remount
            onSubmit={form.handleSubmit(handleSave)}
            className="space-y-4"
          >
            <div className="py-4">{renderFields()}</div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
