package com.codecool.sneakersStore.controller;

import com.codecool.sneakersStore.model.Cart;
import com.codecool.sneakersStore.model.CartItem;
import com.codecool.sneakersStore.model.Client;
import com.codecool.sneakersStore.model.Order;
import com.codecool.sneakersStore.payload.OrderRequest;
import com.codecool.sneakersStore.service.CartService;
import com.codecool.sneakersStore.service.ClientService;
import com.codecool.sneakersStore.service.OrderService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/", methods = {RequestMethod.PUT, RequestMethod.GET, RequestMethod.DELETE, RequestMethod.POST})
@RestController
@RequestMapping("/order")
public class OrderController {

    private final OrderService orderService;
    private final ClientService clientService;
    private final CartService cartService;

    public OrderController(OrderService orderService, ClientService clientService, CartService cartService) {
        this.orderService = orderService;
        this.clientService = clientService;
        this.cartService = cartService;
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/get-order/{username}")
    public List<Order> getClientOrders(@PathVariable String username){
        Client client = clientService.findByUsername(username);
        return client.getOrders();
    }

    @PostMapping("/add-order/{username}")
    public Order addOrders(@PathVariable String username,@RequestBody OrderRequest orderRequest){
        System.out.println(orderRequest.getFirst_name());
        Client client = clientService.findByUsername(username);
        Cart cart = client.getCart();
        List<CartItem> cartItemList = cart.getCartItems();
        orderService.handleStock(cartItemList);
        Order order = orderService.addOrder(orderRequest,client);
        cartService.deleteCart(cart);

        return order;
    }

}
