import "../../main.scss";
import "./sharePosts.scss";


import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import ShowAds from "../ShowADs/ShowAds";
import axios from "axios";
import Overlay from "../loadingScreens/Overlay";
import PostsLoading from "../loadingScreens/Posts/PostsLoading";
import SharePost from "../sharePost/SharePost";

const SharePosts = () => {
    const fetchPosts = async () => {
        try {
          const res = await axios.get(`${process.env.REACT_APP_URL}/posts/getSharedPosts`);
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
        <div key={post.id}>
            <SharePost post={post}/>
          {/* <Post post={post} /> */}
          {/* {index % 3 === 0 && <ShowAds />} */}
        </div>
      ))}
    </div>
  );
}

export default SharePosts