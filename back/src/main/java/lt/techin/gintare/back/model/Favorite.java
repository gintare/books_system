package lt.techin.gintare.back.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "favorite")
@Getter
@Setter
@NoArgsConstructor
public class Favorite {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "user_id")
        private User user;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "book_id")
        private Book book;

        @Column(name = "created_at")
        private Date createdAt;
}
