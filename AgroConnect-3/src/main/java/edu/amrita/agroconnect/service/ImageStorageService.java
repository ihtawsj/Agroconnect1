package edu.amrita.agroconnect.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class ImageStorageService {

    @Value("${image.upload.dir}")
    private String uploadDir;

    // This method must be public and accept MultipartFile, return String
    public String storeImage(MultipartFile file) {
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        File destination = new File(uploadDir, fileName);

        try {
            file.transferTo(destination);
            return "/images/" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store image", e);
        }
    }
}
