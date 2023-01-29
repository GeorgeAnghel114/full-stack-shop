package com.codecool.sneakersStore.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartItemRequest {
    private int quantity;
    private int  id;
}
