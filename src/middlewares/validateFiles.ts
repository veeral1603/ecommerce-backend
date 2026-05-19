import type { Request, Response, NextFunction } from "express";
import ApiError from "@/utils/apiError";

interface ValidateFilesOptions {
  required?: boolean;
  maxFiles?: number;
  allowedTypes?: string[];
}

const validateFiles =
  ({ required = false, allowedTypes = [], maxFiles }: ValidateFilesOptions) =>
  (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as Express.Multer.File[];

    if (required && (!files || files.length === 0)) {
      throw new ApiError("Files are required", 400);
    }

    if (!files) {
      return next();
    }

    if (maxFiles && files.length > maxFiles) {
      throw new ApiError(`Maximum ${maxFiles} files are allowed`, 400);
    }

    for (const file of files) {
      if (allowedTypes.length > 0 && !allowedTypes.includes(file.mimetype)) {
        const errorMessage = `Invalid file type: ${file.mimetype.split("/")[1]}. Allowed types are: ${allowedTypes.map((type) => type.split("/")[1]).join(", ")}`;
        throw new ApiError(errorMessage, 400);
      }
    }

    next();
  };

export default validateFiles;
