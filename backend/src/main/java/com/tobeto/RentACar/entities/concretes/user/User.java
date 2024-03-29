package com.tobeto.RentACar.entities.concretes.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tobeto.RentACar.entities.concretes.campaigns.Campaigns;
import com.tobeto.RentACar.enums.auth.Role;
import com.tobeto.RentACar.entities.concretes.rental.Rental;
import com.tobeto.RentACar.entities.concretes.token.Token;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    @Column(name = "tc_no")
    private Double tcNo;

    @Column(name = "is_enabled")
    private Boolean isEnabled;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Column(name = "user_photo_url")
    private String userPhotoUrl;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Rental> rentals;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Campaigns> campaigns;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Token> tokens;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getAuthorities();
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
