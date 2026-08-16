import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_URL = "https://mongo-crud-app-lhgo.onrender.com/api/posts";

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setPosts(res.data);
    } catch (error) {
      console.error(error);
      setMessage("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = async () => {
    try {
      setMessage("");

      if (!title.trim() || !content.trim()) {
        setMessage("Please fill all fields");
        return;
      }

      const res = await axios.post(API_URL, {
        title,
        content,
      });

      console.log("Success:", res.data);

      setTitle("");
      setContent("");
      setMessage("Post Added Successfully");

      fetchPosts();
    } catch (error) {
      console.error("POST Error:", error);
      setMessage(error.response?.data?.message || "Failed to add post");
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchPosts();
    } catch (error) {
      console.error(error);
      setMessage("Delete failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mongo CRUD App</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br />
      <br />

      <button onClick={addPost}>Add Post</button>

      {message && (
        <>
          <br />
          <br />
          <p>{message}</p>
        </>
      )}

      <hr />

      {loading ? (
        <h3>Loading...</h3>
      ) : (
        posts.map((post) => (
          <div key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>

            <button onClick={() => deletePost(post._id)}>Delete</button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default App;
