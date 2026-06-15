import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const API_URL = "http://127.0.0.1:8000/api/books/";

  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);

  const [titleFilter, setTitleFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    price: "",
    quantity: "",
  });

  const loadBooks = async () => {
    let url = `${API_URL}?page=${page}`;

    if (titleFilter) {
      url += `&title=${titleFilter}`;
    }

    if (authorFilter) {
      url += `&author=${authorFilter}`;
    }

    const response = await axios.get(url);

    setBooks(response.data);
  };

  useEffect(() => {
    loadBooks();
  }, [page]);

  const addBook = async () => {
    await axios.post(API_URL, newBook);

    setNewBook({
      title: "",
      author: "",
      price: "",
      quantity: "",
    });

    loadBooks();
  };

  const showDetail = async (id) => {
    const response = await axios.get(
      `${API_URL}${id}/`
    );

    alert(
      JSON.stringify(response.data, null, 2)
    );
  };

  const editBook = async (book) => {
    const newTitle = prompt(
      "New Title",
      book.title
    );

    if (!newTitle) return;

    await axios.patch(
      `${API_URL}${book.id}/`,
      {
        title: newTitle,
      }
    );

    loadBooks();
  };

  const deleteBook = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this book?"
    );

    if (!confirmDelete) return;

    await axios.delete(
      `${API_URL}${id}/`
    );

    loadBooks();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Book Management</h1>

      <hr />

      <h2>Filter</h2>

      <input
        placeholder="Title"
        value={titleFilter}
        onChange={(e) =>
          setTitleFilter(e.target.value)
        }
      />

      <input
        placeholder="Author"
        value={authorFilter}
        onChange={(e) =>
          setAuthorFilter(e.target.value)
        }
      />

      <button onClick={loadBooks}>
        Search
      </button>

      <hr />

      <h2>Add Book</h2>

      <input
        placeholder="Title"
        value={newBook.title}
        onChange={(e) =>
          setNewBook({
            ...newBook,
            title: e.target.value,
          })
        }
      />

      <input
        placeholder="Author"
        value={newBook.author}
        onChange={(e) =>
          setNewBook({
            ...newBook,
            author: e.target.value,
          })
        }
      />

      <input
        placeholder="Price"
        value={newBook.price}
        onChange={(e) =>
          setNewBook({
            ...newBook,
            price: e.target.value,
          })
        }
      />

      <input
        placeholder="Quantity"
        value={newBook.quantity}
        onChange={(e) =>
          setNewBook({
            ...newBook,
            quantity: e.target.value,
          })
        }
      />

      <button onClick={addBook}>
        Add Book
      </button>

      <hr />

      <table border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {books.results?.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.price}</td>
              <td>{book.quantity}</td>

              <td>
                <button
                  onClick={() =>
                    showDetail(book.id)
                  }
                >
                  Detail
                </button>

                <button
                  onClick={() =>
                    editBook(book)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteBook(book.id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <button
        disabled={page === 1}
        onClick={() =>
          setPage(page - 1)
        }
      >
        Previous
      </button>

      <span>
        {" "}
        Page {page}{" "}
      </span>

      <button
        onClick={() =>
          setPage(page + 1)
        }
      >
        Next
      </button>
    </div>
  );
}

export default App;