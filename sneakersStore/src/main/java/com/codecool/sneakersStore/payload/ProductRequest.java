package com.codecool.sneakersStore.payload;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class ProductRequest {
    private Long categoryId;
    private Long brandId;
    private Long supplierId;
    private String productName;
    private String referenceCode;
    private String descriptionColor;
    private String descriptionMaterial;
    private String descriptionInterior;
    private String descriptionSole;
    private String image;
    private String size;
    private Float sellingPrice;
    private Float purchasePrice;
    private Date purchaseDate;
    private Integer totalStock;
    private Float discount;
    private Boolean isAvailable;


}
