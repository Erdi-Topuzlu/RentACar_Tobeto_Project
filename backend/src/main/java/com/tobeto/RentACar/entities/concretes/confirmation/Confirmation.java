package com.tobeto.RentACar.entities.concretes.confirmation;


import com.tobeto.RentACar.entities.concretes.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "confirmations")
public class Confirmation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String confirmationToken;

    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private LocalDateTime createdDate;

    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

//    public Confirmation(User user) {
//        this.user = user;
//        this.confirmationToken = UUID.randomUUID().toString();
//        this.createdDate = LocalDateTime.now();
//    }

    public Confirmation(User user, String confirmationToken, LocalDateTime createdDate) {
        this.user = user;
        this.confirmationToken = confirmationToken;
        this.createdDate = createdDate;
    }
}
