package com.devtiro.restaurant.services;

import com.devtiro.restaurant.domain.RestaurantCreateUpdateRequest;
import com.devtiro.restaurant.domain.entities.Restaurant;

public interface RestaurantService {

    Restaurant createRestaurant(RestaurantCreateUpdateRequest request);
}
