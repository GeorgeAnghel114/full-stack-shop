package com.codecool.sneakersStore.payload;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ClientRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
