package com.devtiro.restaurant.controllers;

import com.devtiro.restaurant.domain.dtos.PhotoDto;
import com.devtiro.restaurant.domain.entities.Photo;
import com.devtiro.restaurant.mappers.PhotoMapper;
import com.devtiro.restaurant.service.PhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/photos")
public class PhotoController {

    private final PhotoService photoService;

    private final PhotoMapper photoMapper;

    @PostMapping
    public PhotoDto uploadPhoto(
            @RequestParam("file") MultipartFile file
    ) {
        Photo savedPhoto = photoService.uploadPhoto(file);

        return photoMapper.toDto(savedPhoto);
    }
}
