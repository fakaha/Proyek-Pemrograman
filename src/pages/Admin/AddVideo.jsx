import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LayoutAdmin } from "../../Layout/LayoutAdmin";
import { IoIosArrowRoundBack } from "react-icons/io";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { BiPlus } from "react-icons/bi";
import { useGetChapter } from "../../services/admin/GetChapter";
import { RxCross2 } from "react-icons/rx";
import { usePostChapter } from "../../services/admin/PostChapter";
import { usePutChapter } from "../../services/admin/PutChapter";
import { useGetVideo } from "../../services/admin/GetVideo";
import { usePostVideo } from "../../services/admin/PostVideo";
import { usePutVideo } from "../../services/admin/PutVideo";
import { IoRefreshOutline } from "react-icons/io5";
import { useDeleteCourse } from "../../services/admin/DeleteCourse";
import { useDeleteVideo } from "../../services/admin/DeleteVideo";
import { useAllChapter } from "../../services/admin/GetAllChapter";
import { BsDot } from "react-icons/bs";
import { useGetVideoId } from "../../services/admin/GetVideoId";
import { useDeleteChapter } from "../../services/admin/DeleteChapter";
import { ToastContainer, toast } from "react-toastify";

export const AddVideo = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [getIdChapter, setIdChapter] = useState();
  const [getAddChapter, setAddChapter] = useState(false);
  const [getEditChapter, setEditChapter] = useState(false);
  const [getDeleteChapter, setDeleteChapter] = useState(false);
  const [getInputChapter, setInputChapter] = useState("");

  // GET CHAPTER
  const { data: getChapter } = useGetChapter({
    course_id: state.course_id,
  });

  const dataChapter = getChapter?.data || [];

  // GET CHAPTER FOR VIDEO HEADER
  const [getDataAllChapter, setDataAllChapter] = useState([]);

  const { data: getAllChapter, refetch: refetchAllChapter } = useAllChapter({
    limit: 1000,
  });

  const dataAllChapter = getAllChapter?.data.chapter || [];

  useEffect(() => {
    const filterAllChapter = dataAllChapter.filter((value) => {
      if (value.chapter_id === getIdChapter) {
        return { ...value };
      }
    });

    setDataAllChapter(filterAllChapter);
  }, [dataAllChapter, getIdChapter]);

  // POST CHAPTER
  const {
    mutate: postChapter,
    data: dataPostChapter,
    isSuccess: successPostChapter,
  } = usePostChapter();

  // HANDLE SAVE ADD CHAPTER
  const handleAddChapter = (e) => {
    if (e.key === "Enter") {
      postChapter({
        chapter_title: getInputChapter,
        course_id: state.course_id,
        video_id: 201,
      });
    }
  };

  useEffect(() => {
    if (successPostChapter) {
      toast.success("Chapter berhasil ditambahkan", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    refetchAllChapter();
    setAddChapter(false);
    const filterAllChapter = dataAllChapter.filter((value) => {
      if (value.chapter_id === getIdChapter) {
        return { ...value };
      }
    });
    setDataAllChapter(filterAllChapter || []);
  }, [successPostChapter, refetchAllChapter, dataAllChapter, getIdChapter]);

  // PUT CHAPTER
  const { mutate: putChapter, isSuccess: successPutChapter } = usePutChapter({
    chapter_id: getIdChapter,
  });

  // HANDLE BTN EDIT CHAPTER
  const handleBtnEditChapter = (id) => {
    setEditChapter(true);
    setIdChapter(id);
  };

  useEffect(() => {
    setInputChapter(getDataAllChapter[0]?.title);
  }, [getDataAllChapter]);

  // HANDLE SAVE EDIT CHAPTER
  const handleEditChapter = (e) => {
    if (e.key === "Enter") {
      putChapter({
        chapter_title: getInputChapter,
        course_id: state.course_id,
        video_id: 201,
      });
    }
  };

  useEffect(() => {
    if (successPutChapter) {
      toast.success("Chapter berhasil diubah", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    refetchAllChapter();
    setEditChapter(false);
    const filterAllChapter = dataAllChapter.filter((value) => {
      if (value.chapter_id === getIdChapter) {
        return { ...value };
      }
    });
    setDataAllChapter(filterAllChapter || []);
  }, [successPutChapter, refetchAllChapter, dataAllChapter, getIdChapter]);

  // HANDLE DELETE CHAPTER
  const [getChapterIdDelete, setChapterIdDelete] = useState();

  const { mutate: deleteChapter } = useDeleteChapter({
    chapter_id: getChapterIdDelete,
  });

  const handleDeleteChapter = (id) => {
    setChapterIdDelete(id);
    deleteChapter();
  };

  // API VIDEO
  const [getCloseAddEdit, setCloseAddEdit] = useState(false);
  const [getVideoChapter, setVideoChapter] = useState([]);
  const [getVideoId, setVideoId] = useState();
  const [getAddEdit, setAddEdit] = useState();

  const [getTitleVideo, setTitleVideo] = useState("");
  const [getDeskripsiVideo, setDeskripsiVideo] = useState("");
  const [getUrlVideo, setUrlVideo] = useState("");
  const [getPreviewVideo, setPreviewVideo] = useState();

  // GET VIDEO PER CHAPTER
  const {
    data: getVideoPerChapter,
    isSuccess: successVideoChapter,
    refetch: refetchVideoPerChapter,
  } = useGetVideo({
    limit: 1000,
  });

  const dataVideoChapter = getVideoPerChapter?.data?.video || [];

  const handleVideoPerChapter = (idChapter) => {
    setIdChapter(idChapter);
    if (successVideoChapter) {
      const videoChapter = dataVideoChapter?.filter((value) => {
        if (value.chapter_id === idChapter && value.video_id !== 201) {
          return { ...value };
        }
      });

      setVideoChapter(videoChapter);
    }
  };

  // GET VIDEO BY ID
  const { data: getVideoById } = useGetVideoId({
    video_id: getVideoId,
  });

  const dataVideoById = getVideoById?.data.video || [];

  // POST VIDEO PER CHAPTER
  const {
    mutate: postVideo,
    data: getDataVideo,
    isSuccess: successDataVideo,
  } = usePostVideo();

  // HANDLE ADD VIDEO
  const handleAddVideo = () => {
    setAddEdit(true);
    setCloseAddEdit(true);
    setTitleVideo("");
    setUrlVideo("");
    setDeskripsiVideo("");
    setPreviewVideo("");
  };

  useEffect(() => {
    if (getDataVideo?.status === 200) {
      refetchVideoPerChapter();
      const filteredVideoChapter = dataVideoChapter?.filter((value) => {
        return value.chapter_id === getIdChapter && value.video_id !== 201;
      });

      setVideoChapter(filteredVideoChapter || []);
    }
  }, [getDataVideo, getIdChapter, dataVideoChapter, refetchVideoPerChapter]);

  useEffect(() => {
    if (successDataVideo) {
      toast.success("Video berhasil ditambahkan", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [successDataVideo]);

  // HANDLE BTN SIMPAN ADD VIDEO
  const handleBtnSimpanVideo = () => {
    postVideo({
      chapter_id: getIdChapter,
      title: getTitleVideo,
      deskripsi: getDeskripsiVideo,
      url_video: getUrlVideo,
      is_preview: getPreviewVideo,
    });
  };

  // PUT VIDEO PER CHAPTER
  const { mutate: putVideo, data: dataPutVideo, isSuccess: successPutVideo, } = usePutVideo({
    video_id: getVideoId,
  });

  useEffect(() => {
    if (getVideoId) {
      setTitleVideo(dataVideoById.title);
      setDeskripsiVideo(dataVideoById.deskripsi);
      setUrlVideo(dataVideoById.url_video);
      setPreviewVideo(dataVideoById.is_preview);
    }
  }, [dataVideoById, getVideoId]);

  // HANDLE EDIT VIDEO
  const handleEditVideo = (id) => {
    setVideoId(id);
    setAddEdit(false);
    setCloseAddEdit(true);
  };

  // HANDLE BTN EDIT ADD VIDEO
  const handleBtnEditVideo = () => {
    putVideo({
      chapter_id: getIdChapter,
      title: getTitleVideo,
      deskripsi: getDeskripsiVideo,
      url_video: getUrlVideo,
      is_preview: getPreviewVideo,
    });
  };

  useEffect(() => {
    if (dataPutVideo?.status === 200) {
      refetchVideoPerChapter();
      const filteredVideoChapter = dataVideoChapter?.filter((value) => {
        return value.chapter_id === getIdChapter && value.video_id !== 201;
      });

      setVideoChapter(filteredVideoChapter || []);
    }
  }, [dataPutVideo, getIdChapter, dataVideoChapter, refetchVideoPerChapter]);

  useEffect(() => {
    if (successPutVideo) {
      toast.success("Video berhasil ditambahkan", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [successPutVideo]);
  
  // DELETE VIDEO PER CHAPTER
  const [getVideoIdDelete, setVideoIdDelete] = useState();
  const { mutate: deleteVideo, data: dataDeleteVideo } = useDeleteVideo({
    video_id: getVideoIdDelete,
  });

  const handleDeleteVideo = (id) => {
    setVideoIdDelete(id);
    deleteVideo();
  };

  useEffect(() => {
    if (dataDeleteVideo?.status === 200) {
      refetchVideoPerChapter();
      const filteredVideoChapter = dataVideoChapter?.filter((value) => {
        return value.chapter_id === getIdChapter && value.video_id !== 201;
      });

      setVideoChapter(filteredVideoChapter || []);
    }
  }, [dataDeleteVideo, getIdChapter, dataVideoChapter, refetchVideoPerChapter]);

  return (
    <>
      <LayoutAdmin>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="text-sm">
          <div className="flex items-center justify-between">
            <div
              onClick={() => navigate("/admin/kelolakelas")}
              className="flex items-center gap-2 cursor-pointer hover:text-gray-400"
            >
              <IoIosArrowRoundBack />
              <div>Kembali</div>
            </div>
            <div className="flex items-center gap-1.5">
              <div
                onClick={() => navigate("/admin/kelolakelas")}
                className="cursor-pointer hover:text-gray-400"
              >
                Kelola Kelas
              </div>
              <div>/</div>
              <div className="text-primary">Add Video</div>
            </div>
          </div>

          <div className="w-full flex gap-4 mt-4">
            <div className={`${getCloseAddEdit ? "w-1/4" : "w-1/2"}`}>
              <div className="bg-primary text-white rounded ps-2 text-lg font-semibold">
                Chapter
              </div>
              <div className="mt-1 font-medium text-sm px-1">
                <div
                  className={`text-center py-2 ${
                    dataChapter.length === 0 ? "block" : "hidden"
                  }`}
                >
                  Belum ada video.
                </div>
                {dataChapter.map((value, index) => {
                  return (
                    <div key={index} className="py-2 border-b border-gray-300">
                      {getEditChapter && getIdChapter === value.chapter_id ? (
                        <div className="relative flex items-center border-b border-gray-300">
                          <input
                            type="text"
                            placeholder="new chapter"
                            className="py-2 border-none !ring-0 w-full"
                            value={getInputChapter}
                            onChange={(e) => setInputChapter(e.target.value)}
                            onKeyDown={handleEditChapter}
                          />
                          <div
                            onClick={() => setEditChapter(false)}
                            className="absolute right-2.5 cursor-pointer hover:text-gray-700"
                          >
                            <RxCross2 />
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between gap-2 items-center">
                          <div
                            onClick={() =>
                              handleVideoPerChapter(value.chapter_id)
                            }
                            className="cursor-pointer hover:text-gray-400 whitespace-nowrap overflow-hidden"
                          >
                            {value.title}
                          </div>
                          <div className="flex gap-2 items-center">
                            <HiOutlinePencilAlt
                              onClick={() =>
                                handleBtnEditChapter(value.chapter_id)
                              }
                              className="w-5 h-5 cursor-pointer text-yellow-400 hover:text-yellow-300"
                            />
                            {/* <HiOutlineTrash
                              onClick={() =>
                                handleDeleteChapter(value.chapter_id)
                              }
                              className="w-5 h-5 cursor-pointer text-red-400 hover:text-red-300"
                            /> */}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                {getAddChapter && (
                  <div className="relative flex items-center border-b border-gray-300">
                    <input
                      type="text"
                      placeholder="new chapter"
                      className="py-2 border-none !ring-0 w-full"
                      onChange={(e) => setInputChapter(e.target.value)}
                      onKeyDown={handleAddChapter}
                    />
                    <div
                      onClick={() => setAddChapter(false)}
                      className="absolute right-2.5 cursor-pointer hover:text-gray-700"
                    >
                      <RxCross2 />
                    </div>
                  </div>
                )}
                <div
                  onClick={() => setAddChapter(!getAddChapter ? true : true)}
                  className="flex items-center justify-center gap-2 w-fit mx-auto mt-2 px-3 py-1.5 rounded cursor-pointer bg-green-400 text-white hover:text-gray-300"
                >
                  <div>Tambah chapter</div>
                  <BiPlus />
                </div>
              </div>
            </div>

            <div className={`${getCloseAddEdit ? "w-1/4" : "w-1/2"}`}>
              <div className="flex gap-2 items-center bg-primary text-white rounded px-2 text-lg font-semibold">
                <div>Video</div>
                {getDataAllChapter[0]?.title ? (
                  <>
                    <BsDot />
                    <div className="overflow-hidden whitespace-nowrap">
                      {getDataAllChapter[0]?.title}
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-1 font-medium text-sm desktop:h-[470px] desktopfull:h-[800px] overflow-y-auto">
                <div
                  className={`text-center py-2 ${
                    getVideoChapter.length === 0 ? "block" : "hidden"
                  }`}
                >
                  Belum ada video.
                </div>
                <div
                  onClick={() => handleAddVideo()}
                  className={`${
                    getIdChapter ? "flex" : "hidden"
                  } items-center justify-center gap-2 w-fit mx-auto mt-2 px-3 py-1.5 rounded cursor-pointer bg-green-400 text-white hover:text-gray-300`}
                >
                  <div>Tambah Video</div>
                  <BiPlus />
                </div>
                <hr className="mt-2" />
                {getVideoChapter.map((value, index) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-between items-center gap-2 py-2 border-b border-gray-300"
                    >
                      <div className="whitespace-nowrap overflow-hidden">
                        {value.title}
                      </div>
                      <div className="flex gap-2 items-center">
                        <HiOutlinePencilAlt
                          onClick={() => handleEditVideo(value.video_id)}
                          className="w-5 h-5 cursor-pointer text-yellow-400 hover:text-yellow-300"
                        />
                        <HiOutlineTrash
                          onClick={() => handleDeleteVideo(value.video_id)}
                          className="w-5 h-5 cursor-pointer text-red-400 hover:text-red-300"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={`${getCloseAddEdit ? "w-1/2 block" : "hidden"}`}>
              <div className="flex justify-between items-center gap-1.5 bg-primary text-white rounded px-2 text-lg font-semibold">
                <div className=" flex items-center gap-2 overflow-hidden whitespace-nowrap">
                  <div>{getAddEdit ? "Add Video" : "Edit Video"}</div>
                  {getDataAllChapter[0]?.title ? (
                    <>
                      <BsDot />
                      <div>{getDataAllChapter[0]?.title}</div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <RxCross2
                  className="cursor-pointer hover:text-gray-400"
                  onClick={() => setCloseAddEdit(false)}
                />
              </div>
              <div className="mt-2.5 px-2 space-y-2 font-medium text-sm">
                <div className="flex flex-col gap-1">
                  <label htmlFor="judul">Judul</label>
                  <input
                    type="text"
                    placeholder="masukkan judul"
                    id="judul"
                    value={getTitleVideo}
                    onChange={(e) => setTitleVideo(e.target.value)}
                    className="w-full px-4 py-1.5 text-sm rounded"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="deskripsi">deskripsi</label>
                  <input
                    type="text"
                    placeholder="masukkan deskripsi"
                    id="deskripsi"
                    value={getDeskripsiVideo}
                    onChange={(e) => setDeskripsiVideo(e.target.value)}
                    className="w-full px-4 py-1.5 text-sm rounded"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="link">Link Video</label>
                  <input
                    type="text"
                    placeholder="masukkan link video"
                    id="link"
                    value={getUrlVideo}
                    onChange={(e) => setUrlVideo(e.target.value)}
                    className="w-full px-4 py-1.5 text-sm rounded"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="preview">Is_preview</label>
                  <select
                    name="preview"
                    id="preview"
                    value={getPreviewVideo}
                    onChange={(e) => setPreviewVideo(e.target.value === "true")}
                    className="w-full px-4 py-1.5 text-sm rounded"
                  >
                    <option value="">=== Pilih is_preview ===</option>
                    <option value="false">Lock</option>
                    <option value="true">Open</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3">
                  {getAddEdit ? (
                    <button
                      onClick={() => handleBtnSimpanVideo()}
                      className="bg-primary text-white px-4 py-1.5 hover:text-gray-400 rounded"
                    >
                      Simpan
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBtnEditVideo()}
                      className="bg-primary text-white px-4 py-1.5 hover:text-gray-400 rounded"
                    >
                      Ubah
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutAdmin>
    </>
  );
};
