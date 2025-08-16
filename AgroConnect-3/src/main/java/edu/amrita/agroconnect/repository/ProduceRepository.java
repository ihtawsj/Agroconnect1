package edu.amrita.agroconnect.repository;

import edu.amrita.agroconnect.model.User;
import edu.amrita.agroconnect.model.Produce;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProduceRepository extends JpaRepository<Produce, Long> {
    List<Produce> findByFarmer(User farmer);
}
