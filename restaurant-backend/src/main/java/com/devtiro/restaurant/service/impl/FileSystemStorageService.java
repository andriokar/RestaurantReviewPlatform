package com.devtiro.restaurant.service.impl;

import com.devtiro.restaurant.exceptions.StorageException;
import com.devtiro.restaurant.service.StorageService;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;

@Service
@Slf4j
public class FileSystemStorageService implements StorageService {

    @Value("${app.storage.location:uploads}")
    private String storageLocation;

    private Path rootLocation;

    @PostConstruct
    public void init() {
        rootLocation = Paths.get(storageLocation);
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new StorageException("Could not initialize storage location", e);
        }
    }

    @Override
    public String store(MultipartFile file, String filename) {
        try {
            // Check for empty files
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file");
            }

            // Create final filename with extension
            String extension = StringUtils.getFilenameExtension(file.getOriginalFilename());
            String finalFilename = filename + "." + extension;

            // Resolve and normalize the destination path
            Path destinationFile = this.rootLocation
                    .resolve(Paths.get(finalFilename))
                    .normalize()
                    .toAbsolutePath();

            // Security check to prevent directory traversal
            if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
                throw new StorageException("Cannot store file outside current directory");
            }

            // Copy the file to the destination
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
            }

            return finalFilename;
        } catch (IOException e) {
            throw new StorageException("Failed to store file", e);
        }
    }

    @Override
    public Optional<Resource> loadAsResource(String id) {
        return Optional.empty();
    }
}
