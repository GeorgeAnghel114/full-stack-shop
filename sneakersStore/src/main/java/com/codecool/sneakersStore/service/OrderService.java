package com.codecool.sneakersStore.service;


import com.codecool.sneakersStore.model.Cart;
import com.codecool.sneakersStore.model.CartItem;
import com.codecool.sneakersStore.model.Client;
import com.codecool.sneakersStore.model.Order;
import com.codecool.sneakersStore.payload.OrderRequest;
import com.codecool.sneakersStore.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Random;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final ClientService clientService;

    public OrderService(OrderRepository orderRepository, ClientService clientService) {
        this.orderRepository = orderRepository;
        this.clientService = clientService;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public void saveOrder(Order order){
        orderRepository.save(order);
    }
    public Order getOrderById(Long id){
        return orderRepository.findById(id).get();
    }

    public Order addOrder(OrderRequest orderRequest, Client client){
        Client client1 = clientService.findByUsername(client.getEmail());
        Cart cart = client1.getCart();
        Order order = new Order();
        order.setEmail(client1.getEmail());
        order.setFirst_name(orderRequest.getFirst_name());
        order.setLast_name(orderRequest.getLast_name());
        order.setPhone_number(orderRequest.getPhone_number());
        order.setCountry(orderRequest.getCountry());
        order.setCity(orderRequest.getCity());
        order.setAddress(orderRequest.getAddress());
        order.setPostal_code(orderRequest.getPostal_code());
        order.setOrderDate(new Date());
        order.setDeliveryDate(new Date());
        order.setTotalPrice(cart.getTotalPrices());
        order.setNotes(orderRequest.getNotes()!=null ? orderRequest.getNotes() : "none");
        order.setClient(client1);

        Random random = new Random();
        order.setTrackingId(random.nextLong());

        saveOrder(order);
        return order;
    }
    public void handleStock(List<CartItem> cartItemList){
        for (CartItem cartItem : cartItemList) {
            System.out.println("product total stock ++++  "+cartItem.getProduct().getTotalStock());
            cartItem.getProduct().setTotalStock(cartItem.getProduct().getTotalStock()-cartItem.getQuantity());
            if(cartItem.getProduct().getTotalStock()<1){
                cartItem.getProduct().setIsAvailable(false);
            }
        }
    }
}
