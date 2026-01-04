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
  file,      // อาจเป็น Base64, URL เดิม, หรือ undefined
  publicId,
  folder = "uploads",
}: ImageInput) => {
  
  // 1. ตรวจสอบว่าเป็นไฟล์ใหม่จริงหรือไม่ (เช็คว่าเป็น Base64 หรือไม่)
  // ปกติ Base64 จากฟังก์ชันอัปโหลดจะขึ้นต้นด้วย "data:image/..."
  const isBase64 = file && file.startsWith("data:image");

  // ❌ ถ้าไม่ใช่ Base64 (เป็น URL เดิม หรือ undefined) -> ไม่ต้องทำอะไรกับ Cloudinary
  if (!isBase64) {
    return {
      publicId, // ส่งค่าเดิมกลับไป
      url: file, 
      action: "NONE",
    };
  }

  // ✏️ กรณีเป็นไฟล์ใหม่ (isBase64 === true)
  // ถ้ามี publicId เดิมอยู่ แปลว่าเป็นการเปลี่ยนรูป ให้ลบรูปเก่าออกก่อน
  if (publicId) {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error("Cloudinary Destroy Error:", error);
      // เลือกได้ว่าจะ throw error หรือทำต่อ (กรณีรูปเดิมอาจถูกลบไปแล้วใน Cloudinary)
    }
  }

  // 📤 Upload ไฟล์ใหม่ (Base64)
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


