package com.tobeto.RentACar.repositories;

import com.tobeto.RentACar.entities.concretes.campaigns.Campaigns;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CampaignsRepository extends JpaRepository<Campaigns,Integer> {
}
