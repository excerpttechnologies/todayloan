// lib/fileUpload.ts
import { writeFile, mkdir, readFile, unlink } from 'fs/promises';
import path from 'path';
import fs from 'fs';

const UPLOADS_ROOT = path.join(process.cwd(), 'uploads');

export async function ensureDirectoryExists(dir: string) {
  if (!fs.existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

export async function saveFile(file: File, category: string = 'uploads') {
  // Determine upload subdirectory based on file type
  let uploadSubDir = 'others';
  if (file.type.startsWith('image/')) {
    uploadSubDir = 'images';
  } else if (file.type === 'application/pdf') {
    uploadSubDir = 'pdfs';
  } else if (file.type.includes('presentation') || file.name.match(/\.(ppt|pptx)$/i)) {
    uploadSubDir = 'presentations';
  }
  
  const uploadDir = path.join(UPLOADS_ROOT, uploadSubDir, category);
  await ensureDirectoryExists(uploadDir);
  
  // Generate unique filename
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const ext = path.extname(file.name);
  const filename = `${timestamp}-${randomString}${ext}`;
  const filePath = path.join(uploadDir, filename);
  
  // Save file
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  await writeFile(filePath, buffer);
  
  // Generate URL for API access
  const url = `/api/uploads/${uploadSubDir}/${category}/${filename}`;
  
  // Calculate file size
  const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
  
  return {
    filename,
    originalName: file.name,
    size: `${fileSizeMB} MB`,
    sizeBytes: file.size,
    type: file.type.startsWith('image/') ? 'image' : (file.type === 'application/pdf' ? 'pdf' : 'document'),
    mimeType: file.type,
    format: ext.substring(1).toUpperCase(),
    url,
    path: filePath,
    category,
    name: file.name
  };
}

export async function deleteFile(filePath: string) {
  try {
    if (fs.existsSync(filePath)) {
      await unlink(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
}

export async function getFileStream(filePath: string) {
  if (fs.existsSync(filePath)) {
    return await readFile(filePath);
  }
  return null;
}