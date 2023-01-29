package com.codecool.sneakersStore.service;

import com.codecool.sneakersStore.model.CartItem;
import com.codecool.sneakersStore.repository.CartItemRepository;
import com.codecool.sneakersStore.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class CartItemService {
    private final CartItemRepository cartItemRepository;

    @Autowired
    public CartItemService(CartItemRepository cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }
    public void addCartItem(CartItem cartItem) {
        cartItemRepository.save(cartItem);
    }
    public CartItem getCartItem(Long id) {
        Optional<CartItem> optionalCartItem = cartItemRepository.findById(id);
        return optionalCartItem.orElse(null);
    }


    public void deleteCartItem(Long id){
        cartItemRepository.deleteById(id);
    }

    public void decreaseCartItemQuantity(CartItem cartItem){
        cartItem.setQuantity(cartItem.getQuantity() - 1);
    }

    public void increaseCartItemQuantity(CartItem cartItem){
        cartItem.setQuantity(cartItem.getQuantity() + 1);
    }


}
