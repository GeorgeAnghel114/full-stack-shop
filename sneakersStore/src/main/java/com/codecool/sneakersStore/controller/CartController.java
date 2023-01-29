package com.codecool.sneakersStore.controller;

import com.codecool.sneakersStore.model.Cart;
import com.codecool.sneakersStore.model.Client;
import com.codecool.sneakersStore.model.Product;
import com.codecool.sneakersStore.payload.CartItemRequest;
import com.codecool.sneakersStore.service.CartService;
import com.codecool.sneakersStore.service.ClientService;
import com.codecool.sneakersStore.service.ProductService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.security.Principal;


@CrossOrigin(origins = "http://localhost:3000/", methods = {RequestMethod.PUT, RequestMethod.GET, RequestMethod.DELETE, RequestMethod.POST})
@RestController
@RequestMapping("/cart")
public class CartController {
    private final CartService cartService;
    private final ClientService clientService;
    private final ProductService productService;

    public CartController(CartService cartService, ClientService clientService, ProductService productService) {
        this.cartService = cartService;
        this.clientService = clientService;
        this.productService = productService;
    }
//    @PreAuthorize("hasRole('USER')")
    @GetMapping("/get-cart/{username}")
    public Cart getClientCart(@PathVariable String username) {
        Client client = clientService.findByUsername(username);
        return client.getCart();
    }

    @PostMapping("/add-to-cart/{id}/{username}")
    public Cart addItemToCart(@PathVariable("id") Long id,@PathVariable("username") String username, @RequestBody String size) {
        System.out.println("sizzzzzzzzzzzzzzzzz" + size);
        Product product = productService.getProductById(id);
        Client client = clientService.findByUsername(username);
        Cart cart = cartService.addItemToCartTest(product, 1, client);
        return cart;
    }

    @PostMapping ("/update-cart-item-quantity/{username}")
    public Cart updateQuantityCartItem(@PathVariable String username,@RequestBody CartItemRequest cartItemRequest) {
        System.out.println(cartItemRequest.getQuantity());
        System.out.println(cartItemRequest.getId());

        Product product = productService.getProductById((long) cartItemRequest.getId());

        Client client = clientService.findByUsername(username);
        return cartService.updateItemInCart(product, cartItemRequest.getQuantity(), client);
    }

    @DeleteMapping("/delete-cart-item/{id}/{username}")
    public Cart deleteCartitem(@PathVariable Long id,@PathVariable String username){
        Product product = productService.getProductById(id);
        Client client = clientService.findByUsername(username);
        Cart cart = cartService.deleteItemFromCart(product,client);

        return cart;
    }
}
