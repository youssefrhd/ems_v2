package ems.project.ems_project.Repository;

import ems.project.ems_project.Model.LineItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LineItemRepository extends JpaRepository<LineItem,Long> {
}
