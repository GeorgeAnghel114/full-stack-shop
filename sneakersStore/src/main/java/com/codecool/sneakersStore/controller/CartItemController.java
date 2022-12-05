package com.codecool.sneakersStore.controller;

import com.codecool.sneakersStore.model.CartItem;
import com.codecool.sneakersStore.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(value = {"*"} )
@RestController
@RequestMapping("/cart-item")
public class CartItemController {

    private final CartItemService cartItemService;

    public CartItemController(CartItemService cartItemService) {
        this.cartItemService = cartItemService;
    }

    @GetMapping("/increase-cart-value/{id}")
    public CartItem increaseCartItemQuantity(@PathVariable Long id){
        CartItem cartItem = cartItemService.getCartItem(id);
        cartItemService.increaseCartItemQuantity(cartItem);
        cartItemService.addCartItem(cartItem);

        return  cartItemService.getCartItem(id);
    }
}