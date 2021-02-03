import React, { useEffect, useState } from "react";
import * as VideoService from "./VideoService";
import { Video } from "./Video";
import VideoItem from "./VideoItem";
const VideoList = () => {
  const [videos, setvideos] = useState<Video[]>([]);
  const loadVideos = async () => {
    const res = await VideoService.getVideos();
    const formatedVideos= res.data.map(video => {
        return{
            ...video,
            createdAt: video.createdAt ? new Date(video.createdAt): new Date(),
            updatedAt: video.updatedAt ? new Date(video.updatedAt): new Date(),
        }
    })
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    setvideos(formatedVideos);
  };
  useEffect(() => {
    loadVideos();
  }, []);
  return (
    <div className="row">
      {videos.map((video) => {
        return <VideoItem video={video} key={video._id} loadVideos={loadVideos}/>;
      })}
    </div>
  );
};

export default VideoList;
