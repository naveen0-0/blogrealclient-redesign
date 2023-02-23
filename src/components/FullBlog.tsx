import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_BASE_URL } from "../constants";
import { useAuth } from "../hooks/useAuth";
import Spinner from "./Spinner";
import { AiOutlineComment } from "react-icons/ai";

export default function FullBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { loggedIn } = useAuth();

  const getBlog = async () => {
    setLoading(true);
    try {
      let { data } = await axios.get(`${SERVER_BASE_URL}/api/blog/${id}`);
      if (data.statusload) {
        setBlog(data.blog);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error("Error Fetching The Blog");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  const CommentOnThePost = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    let { data } = await axios.post(
      `${SERVER_BASE_URL}/api/comment/${id}`,
      { comment },
      { headers: { Authorization: localStorage.getItem("blogrealauthtoken")! } }
    );
    console.log(data);
    setBlog((prevState: any) => {
      return {
        ...prevState,
        comments: [
          { comment: data.comment, username: data.username },
          ...prevState.comments,
        ],
      };
    });
    setComment("");
  };

  if (loading) return <Spinner />;
  if (error) return <FullBlogError />;

  return (
    <div className="mb-12 w-[95%] md:w-[80%] mx-auto bg-slate-600 p-2 my-3 rounded-md shadow-2xl">
      <div className="text-5xl my-1 p-1 font-anton">{blog.title}</div>
      <div className="flex flex-col md:flex-row font-roboto justify-around md:items-center md:justify-start">
        <div>
          <span className="text-slate-400">#</span>
          {blog.keyword1}
        </div>
        <div className="md:ml-4">
          <span className="text-slate-400">#</span>
          {blog.keyword2}
        </div>
        <div className="md:ml-4">
          <span className="text-slate-400">#</span>
          {blog.keyword3}
        </div>
      </div>
      <div className="my-1">
        <img src={blog.url} alt={blog.title} className="mx-auto rounded-md" />
      </div>
      <div className="my-1 p-1 font-roboto">{blog.description}</div>

      <div className="my-1 font-roboto text-right">- {blog.username}</div>

      <div className="my-1 font-roboto text-right">
        {new Date(blog.createdAt).toLocaleDateString()}
      </div>

      {/* //@ Comments Section */}
      <div className="my-1">
        <div className="font-anton text-2xl p-1 my-1">Comments</div>
        {loggedIn ? (
          <form
            onSubmit={CommentOnThePost}
            className="flex flex-col md:flex-row"
          >
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="leave a comment...."
              className="text-slate-400 p-2  w-full outline-none bg-slate-800 resize-none font-roboto rounded-t-sm md:rounded-none md:rounded-l-sm"
              required
            />
            <button
              type="submit"
              className="flex justify-center items-center bg-slate-900 p-2 rounded-b-sm md:rounded-none md:rounded-r-sm w-full md:w-max"
            >
              <AiOutlineComment color="#CBD5E1" size={20} />
              <div className="flex-1 font-roboto text-slate-400 ml-1">
                Comment
              </div>
            </button>
          </form>
        ) : (
          <div className="m-1 mb-4 text-md font-anton">
            Login to leave a comment
          </div>
        )}

        <div>
          {blog.comments.map((comment: any, index: number) => (
            <Comment key={index} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
}

const Comment = ({
  comment,
}: {
  comment: { comment: string; username: string };
}) => {
  return (
    <div className="font-roboto my-1 p-1 rounded-sm">
      <div className="flex items-center">
        <div className="text-sm bg-slate-900 w-6  aspect-square rounded-full flex justify-center items-center text-slate-500">
          {comment.username[0].toUpperCase()}
        </div>
        <div className="ml-1">{comment.username}</div>
      </div>

      <div className="break-all">{comment.comment}</div>
    </div>
  );
};

const FullBlogError = () => {
  return (
    <div className="text-center font-anton text-4xl md:text-6xl xl:text-[100px] flex justify-center items-center h-full drop-shadow-3xl">
      Blog Moved Or Deleted
    </div>
  );
};
