package lt.techin.gintare.back.service;

import lombok.AllArgsConstructor;
import lt.techin.gintare.back.dto.BookPageResponseDTO;
import lt.techin.gintare.back.dto.BookRequestDTO;
import lt.techin.gintare.back.dto.BookResponseDTO;
import lt.techin.gintare.back.dto.CategoryResponseDTO;
import lt.techin.gintare.back.exceptions.BookNotFoundException;
import lt.techin.gintare.back.exceptions.CategoryNotFoundException;
import lt.techin.gintare.back.model.Book;
import lt.techin.gintare.back.model.Category;
import lt.techin.gintare.back.repository.BookRepository;
import lt.techin.gintare.back.repository.CategoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final CategoryRepository categoryRepository;

    public BookResponseDTO createBook(Long categoryId, BookRequestDTO bookRequestDTO) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new CategoryNotFoundException("No category found with an ID = "+categoryId));
        Book book = new Book();
        book.setName(bookRequestDTO.getName());
        book.setDescription(bookRequestDTO.getDescription());
        book.setIsbn(bookRequestDTO.getIsbn());
        book.setImage(bookRequestDTO.getImage());
        book.setPagesCount(bookRequestDTO.getPagesCount());
        book.setCategory(category);
        bookRepository.save(book);

        return getBookResponseDTO(book);
    }

    public BookResponseDTO deleteBook(Long id) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new BookNotFoundException("No book found with an id = "+id));
        bookRepository.delete(book);
        return getBookResponseDTO(book);
    }

    public BookPageResponseDTO getAllBooks(Integer page) {
        Pageable firstPageWithTwoElements = PageRequest.of(page, 8, Sort.by("name"));
        Page<Book> booksPage = bookRepository.findAll(firstPageWithTwoElements);
        List<Book> books = booksPage.toList();
        BookPageResponseDTO bookPageResponseDTO = new BookPageResponseDTO();
        bookPageResponseDTO.setTotalRecords(booksPage.getTotalElements());
        bookPageResponseDTO.setCountPerPage(booksPage.getNumberOfElements());
        bookPageResponseDTO.setPage(booksPage.getNumber());
        bookPageResponseDTO.setTotalPages(booksPage.getTotalPages());
        List<BookResponseDTO> bookResponseDTOS = new ArrayList<>();
        for(Book book : books) {
            BookResponseDTO bookResponseDTO = getBookResponseDTO(book);
            bookResponseDTOS.add(bookResponseDTO);
        }
        bookPageResponseDTO.setBooks(bookResponseDTOS);
        return bookPageResponseDTO;
    }

    private BookResponseDTO getBookResponseDTO(Book book) {
        BookResponseDTO bookResponseDTO = new BookResponseDTO();
        bookResponseDTO.setId(book.getId());
        bookResponseDTO.setName(book.getName());
        bookResponseDTO.setDescription(book.getDescription());
        bookResponseDTO.setIsbn(book.getIsbn());
        bookResponseDTO.setImage(book.getImage());
        bookResponseDTO.setPagesCount(book.getPagesCount());
        CategoryResponseDTO categoryResponseDTO = new CategoryResponseDTO();
        categoryResponseDTO.setId(book.getCategory().getId());
        categoryResponseDTO.setTitle(book.getCategory().getTitle());
        bookResponseDTO.setCategory(categoryResponseDTO);
        return bookResponseDTO;
    }

    public BookResponseDTO updateBook(Long categoryId, Long id, BookRequestDTO bookRequestDTO) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new CategoryNotFoundException("No category found with an ID = "+categoryId));
        Book book = bookRepository.findById(id).orElseThrow(() -> new BookNotFoundException("No book found with an id = "+id));
        book.setName(bookRequestDTO.getName());
        book.setDescription(bookRequestDTO.getDescription());
        book.setIsbn(bookRequestDTO.getIsbn());
        book.setImage(bookRequestDTO.getImage());
        book.setPagesCount(bookRequestDTO.getPagesCount());
        book.setCategory(category);
        bookRepository.save(book);
        return getBookResponseDTO(book);
    }

    public BookResponseDTO getOneBook(Long id) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new BookNotFoundException("No book found with an id = "+id));
        return getBookResponseDTO(book);
    }

    public List<BookResponseDTO> getBooksByCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new CategoryNotFoundException("No category found with an ID = "+categoryId));
        List<Book> books = bookRepository.findByCategory(category);
        List<BookResponseDTO> bookResponseDTOS = new ArrayList<>();
        for(Book book : books){
            bookResponseDTOS.add(getBookResponseDTO(book));
        }
        return bookResponseDTOS;
    }
}
