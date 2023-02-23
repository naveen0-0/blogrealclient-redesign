import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_BASE_URL } from "../constants";
import Spinner from "../components/Spinner";

type Blog = {
  username: string;
  title: string;
  description: string;
  keyword1: string;
  keyword2: string;
  keyword3: string;
  url: string;
  _id: string;
};

export default function Dashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    setLoading(true);
    let { data } = await axios.get(`${SERVER_BASE_URL}/api/allblogs`);
    setBlogs(data.blogs);
    setLoading(false);
  };

  if (loading) return <Spinner />;

  if (blogs.length === 0) {
    return (
      <div className="flex justify-center items-center mt-24 text-4xl uppercase font-medium font-anton text-center">
        Nothing to Read Yet
      </div>
    );
  }

  return (
    <div className="m-2 md:m-3">
      {blogs.map((blog) => (
        <Blog key={blog._id} blog={blog} />
      ))}
    </div>
  );
}

function Blog({ blog }: { blog: Blog }) {
  const goto = useNavigate();
  return (
    <div
      onClick={() => goto(`/${blog._id}`)}
      className="cursor-pointer rounded-md bg-slate-900 my-2 md:my-3 flex flex-col md:flex-row text-slate-400 shadow-md shadow-black md:h-[180px] "
    >
      <div className="md:w-[200px] overflow-hidden">
        <img
          src={blog.url}
          alt={blog.title}
          className="rounded-t-md md:rounded-none md:rounded-l-md md:h-full object-cover w-full h-[200px] hover:scale-110 transition-all ease-out"
        />
      </div>

      <div className="flex-1 flex font-roboto flex-col justify-around p-3">
        <div className="py-1 text-3xl">{blog.title}</div>

        <div className="truncate md:w-[calc(100vw-200px)] w-full">
          <div className="py-1 text-md text-slate-500">{blog.description}</div>
        </div>

        <div className="text-slate-400 flex flex-col md:flex-row font-roboto justify-around md:items-center md:justify-start flex-wrap">
          <div>
            <span>#</span>
            {blog.keyword1}
          </div>
          <div className="md:ml-4">
            <span>#</span>
            {blog.keyword2}
          </div>
          <div className="md:ml-4">
            <span>#</span>
            {blog.keyword3}
          </div>
        </div>

        <div className="pt-1">{blog.username}</div>
      </div>
    </div>
  );
}
