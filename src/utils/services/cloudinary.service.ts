import cloudinary from "@/utils/lib/cloudinary";

export const uploadImage = async (
  file: string,
  folder = "uploads"
) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: "image",
    });

    return {
      publicId: result.public_id,
      url: result.secure_url,
    };
  } catch (error) {
    throw new Error("Upload image failed");
  }
};

export const updateImage = async (
  oldPublicId: string,
  newFile: string,
  folder = "uploads"
) => {
  try {
    if (oldPublicId) {
      await cloudinary.uploader.destroy(oldPublicId);
    }

    const result = await cloudinary.uploader.upload(newFile, {
      folder,
      resource_type: "image",
    });

    return {
      publicId: result.public_id,
      url: result.secure_url,
    };
  } catch (error) {
    throw new Error("Update image failed");
  }
};

export const deleteImage = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    throw new Error("Delete image failed");
  }
};

type ImageInput = {
  file?: string;          // base64 (optional)
  publicId?: string | null;
  folder?: string;
};

export const handleImageUpload = async ({
  file,
  publicId,
  folder = "uploads",
}: ImageInput) => {
  // ❌ ไม่มีไฟล์ใหม่ → ไม่ต้องทำอะไร
  if (!file) {
    return {
      publicId,
      url: null,
      action: "NONE",
    };
  }

  // ✏️ แก้ไข (มีรูปเดิม + มีไฟล์ใหม่)
  if (file && publicId) {
    await cloudinary.uploader.destroy(publicId);
  }

  // 📤 Upload ใหม่
  const result = await cloudinary.uploader.upload(file, {
    folder,
    resource_type: "image",
  });

  return {
    publicId: result.public_id,
    url: result.secure_url,
    action: publicId ? "UPDATE" : "CREATE",
  };
};



