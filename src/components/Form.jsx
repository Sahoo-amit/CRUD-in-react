import { useEffect, useState } from "react";
import { AddPost, updateData } from "../api/Api";

const Form = ({ post, setPost, updatedPost, setUpdatePost }) => {
  const [addPost, setAddPost] = useState({
    title: "",
    body: "",
  });

  let isEmpty = Object.keys(updatedPost).length === 0;

  useEffect(() => {
    if (updatedPost) {
      setAddPost({
        title: updatedPost.title || "",
        body: updatedPost.body || "",
      });
    }
  }, [updatedPost]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addPosts = async () => {
    try {
      const res = await AddPost(addPost);
      console.log("Add post response:", res);

      if (res?.status === 201 && res.data) {
        setPost([...post, res.data]);
        setAddPost({ title: "", body: "" });
      } else {
        console.error("Unexpected response structure:", res);
      }
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const updatePostData = async () => {
    try {
      const res = await updateData(updatedPost.id, addPost);
      console.log("Update post response:", res);

      if (res?.status === 200 && res.data) {
        setPost((prev) =>
          prev.map((curElem) =>
            curElem.id === res.data.id ? res.data : curElem
          )
        );
        setAddPost({ title: "", body: "" });
        setUpdatePost({});
      } else {
        console.error("Unexpected response structure:", res);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleData = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      addPosts();
    } else if (action === "Edit") {
      updatePostData();
    }
  };

  return (
    <form
      onSubmit={handleData}
      className="flex items-center justify-center md:flex-row flex-col md:space-y-0 space-y-4 md:space-x-7"
    >
      <div className="p-1">
        <input
          type="text"
          required
          className="outline-none border-none w-72 px-2 py-1 text-black"
          placeholder="Title..."
          name="title"
          value={addPost.title}
          onChange={handleChange}
        />
      </div>
      <div className="p-1">
        <input
          type="text"
          required
          className="outline-none border-none w-72 px-2 py-1 text-black"
          placeholder="Body..."
          name="body"
          value={addPost.body}
          onChange={handleChange}
        />
      </div>
      <button value={isEmpty ? "Add" : "Edit"} className="bg-green-500 px-6 py-1 text-white rounded-lg" type="submit">
        {isEmpty ? "Add" : "Edit"}
      </button>
    </form>
  );
};

export default Form;
