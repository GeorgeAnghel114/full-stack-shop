package com.codecool.sneakersStore.service;

import com.codecool.sneakersStore.model.Cart;
import com.codecool.sneakersStore.model.CartItem;
import com.codecool.sneakersStore.model.Client;
import com.codecool.sneakersStore.model.Product;
import com.codecool.sneakersStore.repository.CartItemRepository;
import com.codecool.sneakersStore.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    @Autowired
    public CartService(CartRepository cartRepository, CartItemRepository cartItemRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
    }

    public void addCart(Cart cart) {
        cartRepository.save(cart);
    }

    public Cart getCartById(Long id) {
        Optional<Cart> optionalCart = cartRepository.findById(id);
        return optionalCart.orElse(null);
    }

    public Cart addItemToCartTest(Cart cart) {
        return cartRepository.save(cart);

    }

    public Cart addItemToCartTest(Product product, int quantity, Client client) {
        Cart cart = client.getCart();

        if (cart == null) {
            cart = new Cart();
        }
        List<CartItem> cartItems = cart.getCartItems();
        CartItem cartItem = findCartItem(cartItems,product.getId());
        System.out.println("inainte de if");
        if(cartItems==null){
            System.out.println("intra in if");
            cartItems = new ArrayList<>();
            cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem.setTotalPrice(quantity*product.getSellingPrice());
            cartItems.add(cartItem);
        }else{
            if(cartItem == null){
                cartItem = new CartItem();
                cartItem.setCart(cart);
                cartItem.setProduct(product);
                cartItem.setQuantity(quantity);
                cartItem.setTotalPrice(quantity * product.getSellingPrice());
                cartItems.add(cartItem);
            }else{
                cartItem.setQuantity(cartItem.getQuantity()+quantity);
                cartItem.setTotalPrice(cartItem.getTotalPrice()+(quantity*product.getSellingPrice()));

            }
        }
        cart.setCartItems(cartItems);
        int totalItems = totalItems(cart.getCartItems());
        double totalPrice = totalPrice(cart.getCartItems());

        cart.setTotalPrices(totalPrice);
        cart.setTotalItems(totalItems);
        cart.setClient(client);

        return cartRepository.save(cart);
    }

    public Cart updateItemInCart(Product product, int quantity, Client client){
        Cart cart = client.getCart();

        List<CartItem> cartItems = cart.getCartItems();
        CartItem cartItem = findCartItem(cartItems,product.getId());
        System.out.println("carrrrtttt item"+cartItem);

        cartItem.setQuantity(quantity);
        cartItem.setTotalPrice(quantity*product.getSellingPrice());

        cartItemRepository.save(cartItem);

        int totalItems = totalItems(cartItems);
        double totalPrice = totalPrice(cartItems);

        cart.setTotalItems(totalItems);
        cart.setTotalPrices(totalPrice);

        return cartRepository.save(cart);


    }

    public Cart deleteItemFromCart(Product product,Client client){
        Cart cart = client.getCart();
        List<CartItem> cartItems = cart.getCartItems();
        CartItem cartItem = findCartItem(cartItems,product.getId());

        cartItems.remove(cartItem);
        System.out.println(cartItems);

        cartItemRepository.delete(cartItem);

        double totalPrice = totalPrice(cartItems);
        int totalItems = totalItems(cartItems);

        cart.setCartItems(cartItems);
        cart.setTotalPrices(totalPrice);
        cart.setTotalItems(totalItems);

        return cartRepository.save(cart);
    }

    public void deleteCart(Cart cart){
        cartItemRepository.deleteAll(cart.getCartItems());
    }

    private double totalPrice(List<CartItem> cartItems) {
        double totalPrice = 0.0;
        for (CartItem item : cartItems) {
            totalPrice += item.getTotalPrice();
        }
        double total = (0.05 * totalPrice) + totalPrice + 20;
        return total;
    }

    private int totalItems(List<CartItem> cartItems) {
        int totalItems = 0;
        for (CartItem item : cartItems) {
            totalItems += item.getQuantity();
        }
        return totalItems;
    }

    private CartItem findCartItem(List<CartItem> cartItems, Long productId) {
        if (cartItems == null) {
            return null;
        }
        CartItem cartItem = null;

        for (CartItem item : cartItems) {
            if (Objects.equals(item.getProduct().getId(), productId)) {
               cartItem = item;
            }
        }
        return cartItem;
    }
}
