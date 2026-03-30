package ems.project.ems_project.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "adresse")
public class Adresse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long adresse_id;
    @Column(name = "city")
    private String city;
    @Column(name = "country")
    private String country;
    @Column(name = "zip")
    private Long zip;
    @Column(name = "street_num")
    private String street_num;
    @ManyToOne
    private User user;

    @Override
    public String toString() {
        return "Adresse{" +
                ", street_num='" + street_num + '\'' +
                "city='" + city + '\'' +
                ", zip=" + zip +
                ", country='" + country + '\'' +
                '}';
    }
}
