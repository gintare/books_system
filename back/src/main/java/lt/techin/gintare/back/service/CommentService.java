package lt.techin.gintare.back.service;

import lombok.AllArgsConstructor;
import lt.techin.gintare.back.dto.CommentRequestDTO;
import lt.techin.gintare.back.dto.CommentResponseDTO;
import lt.techin.gintare.back.exceptions.BookNotFoundException;
import lt.techin.gintare.back.exceptions.CommentNotFoundException;
import lt.techin.gintare.back.exceptions.UserNotFoundException;
import lt.techin.gintare.back.model.Book;
import lt.techin.gintare.back.model.Comment;
import lt.techin.gintare.back.model.User;
import lt.techin.gintare.back.repository.BookRepository;
import lt.techin.gintare.back.repository.CommentRepository;
import lt.techin.gintare.back.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class CommentService {

    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final CommentRepository commentRepository;

    public CommentResponseDTO createComment(Long userId, Long bookId, CommentRequestDTO commentRequestDTO) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("No user found with an id = "+userId));
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new BookNotFoundException("No book found with an id = "+bookId));
        Comment comment = new Comment();
        comment.setText(commentRequestDTO.getText());
        comment.setUser(user);
        comment.setBook(book);
        comment.setCreatedAt(new Date());
        commentRepository.save(comment);

        return getCommentResponseDTO(comment);
    }

    public List<CommentResponseDTO> findByBook(Long bookId) {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new BookNotFoundException("No book found with an id = "+bookId));
        List<Comment> comments = commentRepository.findByBookOrderByCreatedAt(book);
        List<CommentResponseDTO> commentResponseDTOS = new ArrayList<>();
        for(Comment comment : comments){
            commentResponseDTOS.add(getCommentResponseDTO(comment));
        }
        return commentResponseDTOS;
    }

    public CommentResponseDTO deleteComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new CommentNotFoundException("No comment found with an id = "+commentId));
        commentRepository.delete(comment);
        return getCommentResponseDTO(comment);
    }

    private CommentResponseDTO getCommentResponseDTO(Comment comment) {
        CommentResponseDTO commentResponseDTO = new CommentResponseDTO();
        commentResponseDTO.setId(comment.getId());
        commentResponseDTO.setText(comment.getText());
        commentResponseDTO.setUserId(comment.getUser().getId());
        commentResponseDTO.setBookId(comment.getBook().getId());
        commentResponseDTO.setCreatedAt(comment.getCreatedAt());
        return commentResponseDTO;
    }

}
