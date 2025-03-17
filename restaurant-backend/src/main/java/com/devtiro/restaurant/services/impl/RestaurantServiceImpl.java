package com.devtiro.restaurant.services.impl;

import com.devtiro.restaurant.domain.GeoLocation;
import com.devtiro.restaurant.domain.RestaurantCreateUpdateRequest;
import com.devtiro.restaurant.domain.entities.Address;
import com.devtiro.restaurant.domain.entities.Photo;
import com.devtiro.restaurant.domain.entities.Restaurant;
import com.devtiro.restaurant.repositories.RestaurantRepository;
import com.devtiro.restaurant.services.GeoLocationService;
import com.devtiro.restaurant.services.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.elasticsearch.core.geo.GeoPoint;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {

    private final RestaurantRepository restaurantRepository;

    private final GeoLocationService geoLocationService;

    @Override
    public Restaurant createRestaurant(RestaurantCreateUpdateRequest request) {
        Address address = request.getAddress();
        GeoLocation geoLocation = geoLocationService.geoLocate(address);
        GeoPoint geoPoint = new GeoPoint(geoLocation.getLatitude(), geoLocation.getLongitude());

        List<String> photoIds = request.getPhotoId();
        List<Photo> photos = photoIds.stream().map(photoUrl -> Photo.builder()
                .url(photoUrl)
                .uploadDate(LocalDateTime.now())
                .build()
        ).toList();

        Restaurant restaurant = Restaurant.builder()
                .name(request.getName())
                .cuisineType(request.getCuisineType())
                .contactInformation(request.getContactInformation())
                .address(address)
                .geoLocation(geoPoint)
                .operatingHours(request.getOperatingHours())
                .averageRating(0f)
                .photos(photos)
                .build();

        return restaurantRepository.save(restaurant);
    }
}
