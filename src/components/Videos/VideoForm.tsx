import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Video } from "./Video";
import { toast } from "react-toastify";
import * as VideoService from "./VideoService";
import { useHistory, useParams } from "react-router-dom";
type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface Params {
  id: string;
}

const VideoForm = () => {
  const history = useHistory();
  const params = useParams<Params>();
  const initialState = {
    title: "",
    description: "",
    url: "",
  };
  const [video, setvideo] = useState<Video>(initialState);

  const handleInputChange = (e: InputChange) => {
    setvideo({ ...video, [e.target.name]: e.target.value });
  };
  const handleSubmint = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!params.id) {
      await VideoService.createVideo(video);
      toast.success("Video guardado correctamente");
      setvideo(initialState);
    } else {
      await VideoService.updateVideo(params.id, video);
      toast.success("Video actualizado correctamente");
      history.push('/')
    }
    
  };
  const getVideo = async (id: string) => {
    const res = await VideoService.getVideo(id);
    const { title, description, url } = res.data;
    setvideo({ title, description, url });
  };
  useEffect(() => {
    if (params.id) getVideo(params.id);
  }, []);

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <div className="card">
          <div className="card-title text-center">
            <h4>Nuevo video</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmint}>
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  placeholder="Título del video"
                  className="form-control"
                  onChange={handleInputChange}
                  value={video.title}
                  autoFocus
                />
              </div>
              <div className="form-group">
                <input
                  type="url"
                  name="url"
                  className="form-control"
                  placeholder="https://ejemplo.com"
                  value={video.url}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <textarea
                  name="description"
                  rows={3}
                  className="form-control"
                  placeholder="Descripción del video"
                  onChange={handleInputChange}
                  value={video.description}
                ></textarea>
              </div>
              {params.id ? (
                <button className="btn btn-primary">Actualizar</button>
              ) : (
                <button className="btn btn-primary">Guardar</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoForm;
