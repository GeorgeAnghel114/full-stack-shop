package com.codecool.sneakersStore.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.Date;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name="brand_id",referencedColumnName = "id")
    @JsonBackReference
    private Brand brand;
    @ManyToOne(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name="category_id",referencedColumnName = "id")
    @JsonBackReference
    private Category category;
    @ManyToOne(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name="supplier_id", referencedColumnName = "id")
    @JsonBackReference
    private Supplier supplier;

    private String productName;
    private String referenceCode;
    private String descriptionColor;
    private String descriptionMaterial;
    private String descriptionInterior;
    private String descriptionSole;
    @Column(length = 10485760)
    private String image;
    private String size;
    private Float sellingPrice;
    private Float purchasePrice;
    private Date purchaseDate;
    private Integer totalStock;
    private Float discount;
    private Boolean isAvailable;

    public Product(
            Category category,
            Brand brand,
            Supplier supplier,
            String productName,
            String referenceCode,
            String descriptionColor,
            String descriptionMaterial,
            String descriptionInterior,
            String descriptionSole,
            String image,
            String size,
            Float sellingPrice,
            Float purchasePrice,
            Date purchaseDate,
            Integer totalStock,
            Float discount,
            Boolean isAvailable
    ) {
        this.setCategory(category);
        this.setBrand(brand);
        this.setSupplier(supplier);
        this.setProductName(productName);
        this.setReferenceCode(referenceCode);
        this.setDescriptionColor(descriptionColor);
        this.setDescriptionMaterial(descriptionMaterial);
        this.setDescriptionInterior(descriptionInterior);
        this.setDescriptionSole(descriptionSole);
        this.setImage(image);
        this.setSize(size);
        this.setSellingPrice(sellingPrice);
        this.setPurchasePrice(purchasePrice);
        this.setPurchaseDate(purchaseDate);
        this.setTotalStock(totalStock);
        this.setDiscount(discount);
        this.setIsAvailable(isAvailable);
    }

}
