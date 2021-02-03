import React from "react";
import { Video } from "./Video";
import ReactPlayer from "react-player";
import "./VideoItem.css";
import { useHistory } from "react-router-dom";
import * as VideoService from "./VideoService";
import VideoList from "./VideoList";
interface Props {
  video: Video;
  loadVideos: () => void;
}

function VideoItem({ video, loadVideos }: Props) {
  const history = useHistory();
  const handleDelete = async (id: string) => {
    if (window.confirm("¿Está seguro que desea eliminar el video?")) {
      await VideoService.deleteVideo(id);
      loadVideos();
    }
  };
  return (
    <div className="col-md-4">
      <div className="card video-card">
        <div className="card-title text-center">
          <div className="d-flex justify-content-between">
            <h3>{video.title}</h3>
            <span
              className=" btn btn-danger"
              onClick={() =>
                video._id
                  ? handleDelete(video._id)
                  : console.error("nothing to delete")
              }
            >
              X
            </span>
          </div>
        </div>
        <div
          className="card-body"
          style={{ cursor: "pointer" }}
          onClick={() => history.push(`/update/${video._id}`)}
        >
          <p>{video.description}</p>
          <div className="embed-responsive embed-responsive-16by9">
            <ReactPlayer url={video.url} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoItem;
