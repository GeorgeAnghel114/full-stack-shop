package com.codecool.sneakersStore.payload;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.util.Date;


@Getter
@Setter
@ToString
public class OrderRequest {
    private String first_name;
    private String last_name;
    private String phone_number;
    private String country;
    private String city;
    private String address;
    private String postal_code;
    private Date orderDate;
    private Date deliveryDate;
    private String notes;
}
