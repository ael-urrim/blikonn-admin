import "../../main.scss";
import "./posts.scss";

import Post from "../post/Post";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import ShowAds from "../ShowADs/ShowAds";
import axios from "axios";
import Overlay from "../loadingScreens/Overlay";
import PostsLoading from "../loadingScreens/Posts/PostsLoading";
import { AuthContext } from "../../context/authContext";

const Posts = () => {
  const { authToken } = useContext(AuthContext);
  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/posts`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw new Error(error.message);
    }
  };

  //console.log(posts)
  const { isLoading, data, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    refetchOnWindowFocus: false
    //refetchInterval: 3000
  });

  return isLoading ? (
    <>
      <PostsLoading key={null} />
      <Overlay />
    </>
  ) : (
    <div className="posts-card">
      {/* <ShowAds/> */}
      {data?.map((post, index) => (
        <div key={post.postId}>
          <Post post={post} />
          {/* {index % 3 === 0 && <ShowAds />} */}
        </div>
      ))}
    </div>
  );
};

export default Posts;
