import React, { useEffect, useState } from "react";
import { FaTelegramPlane, FaStar, FaRegClock, FaBookOpen, FaArrowLeft } from "react-icons/fa";
import { RiShieldStarLine } from "react-icons/ri";
import { Modal } from "flowbite-react";
import { FaArrowCircleRight } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import { GiPadlock } from "react-icons/gi";
import Onboarding from "../../assets/img/onboarding.png";
import { LayoutUser } from "../../Layout/LayoutUser";
import { useCourseDetail } from "../../services/user/GetCourseDetail";
import { usePostPayment } from "../../services/user/PostPayment";
import { useSelector } from "react-redux";
import { usePutVideo } from "../../services/user/PutVideo";
import { useGetProgress } from "../../services/user/GetProgressCourses";
import { useGetRating } from "../../services/user/GetRating";
import { usePostRating } from "../../services/user/PostRating";
import { usePostCourse } from "../../services/user/PostBeliCourse";
import Cookies from "universal-cookie";
import { useLoginUser } from "../../services/auth/PostLogin";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useLoginUserModal } from "../../services/auth/PostLoginModal";
import { TbPolygon } from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Detail = () => {
  const [activeVideoUrl, setActiveVideoUrl] = useState("");
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [completedChapters, setCompletedChapters] = useState([]);
  const [PageNow, setPageNow] = useState(1);
  const [SelctedScore, setSelctedScore] = useState("");
  const [selectedScore, setSelectedScore] = useState(0);
  const [skor, setskor] = useState("");
  const [comment, setcomment] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const cookies = new Cookies();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // Scroll ke atas setiap kali pengguna masuk ke halaman detail
    window.scrollTo(0, 0);
  }, []);

  const closeModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navigate = useNavigate();
  const { state } = useLocation();

  const userData = useSelector((state) => state.user);
  console.log(userData, "user dari reduxxxxx");

  const { mutate: putVideo } = usePutVideo();

  // FETCH DETAIL
  const {
    data: getCourseDetail,
    isSuccess: detailSuccess,
    refetch: refetchCourseDetail,
  } = useCourseDetail({
    course_id: state?.courseId,
    account_id: userData?.id_user,
  });

  // BELI COURSE
  const { mutate: getPostCourse, isSuccess: postCourseSuccess } = usePostCourse();

  // GET PROGRESS COURSE USER
  const { data: progressCourse, refetch: refetchProgress } = useGetProgress();

  const progress = progressCourse?.data?.data?.result;
  console.log(progress, "progressnyaa");

  // mencari progress dari courseid
  const progressForCurrentCourse = progress?.find((progress) => progress.course_id === state.courseId);
  const completionPercentage = progressForCurrentCourse ? progressForCurrentCourse.percentage : 0;

  //fetch rating
  const { data: ratingCourse } = useGetRating({}, state.courseId, SelctedScore, 10, PageNow);
  console.log(ratingCourse, "rating courseeee");

  //POST RATING
  const { mutate: getPostRating } = usePostRating();

  //POST LOGIN
  const {
    mutate: login,
    isError,
    error,
  } = useLoginUserModal({
    onError: (error) => {
      setLoginError(error);
    },
  });

  const dataCourseDetail = getCourseDetail?.data || [];
  console.log(dataCourseDetail, "detailcourse");

  const handleCheckout = () => {
    getPostCourse({
      course_id: dataCourseDetail?.course?.course_id,
    });
  };
  if (postCourseSuccess) {
    navigate("/kelas/payment", {
      state: {
        courseId: dataCourseDetail?.course?.course_id,
      },
    });
  }

  // const isMobile = window.innerWidth <= 768;

  const handleJoinTelegram = () => {
    // Membuka link Telegram pada tab baru
    const telegramUrl = dataCourseDetail?.course.url_gc_tele;
    if (telegramUrl) {
      window.open(telegramUrl, "_blank");
    }
  };

  const handleVideoClick = (video) => {
    const token = cookies.get("authToken");

    if (!token) {
      setShowLoginModal(true);
      return;
    }

    if (video.is_preview === false && !dataCourseDetail.sudahBeli) {
      toast.error("Anda belum membeli kelas", {
        autoClose: 1000,
        position: "top-center",
      });
      return;
    }

    const videoId = video.url_video.split("/").pop();
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    setActiveVideoUrl(embedUrl);
  };

  useEffect(() => {
    if (detailSuccess && getCourseDetail?.data?.course?.Chapter?.length > 0) {
      const firstChapter = getCourseDetail?.data?.course?.Chapter[0];
      if (firstChapter?.Video?.length > 0) {
        const firstVideo = firstChapter.Video[0];
        const firstVideoId = firstVideo.url_video.split("/").pop();
        const firstVideoEmbedUrl = `https://www.youtube.com/embed/${firstVideoId}`;
        setActiveVideoUrl(firstVideoEmbedUrl);
      }
    }
  }, [detailSuccess, getCourseDetail?.data?.Chapter]);

  const isVideoDone = (videoId) => {
    const account_id = userData.id_user;
    return dataCourseDetail?.progress?.some((p) => p.video_id === videoId && p.account_id === account_id && p.is_done);
  };

  const handleSelectVideo = (selectedVideo) => {
    const selectedVideoId = selectedVideo.video_id; // Mendapatkan ID dari video yang diklik
    let selectedChapterIndex = -1;
    let selectedVideoIndex = -1;

    // Loop melalui semua bab dan video untuk mencari video yang sesuai dengan ID yang diklik
    dataCourseDetail.course.Chapter.forEach((chapter, chapterIndex) => {
      const videoIndex = chapter.Video.findIndex((video) => video.video_id === selectedVideoId);
      if (videoIndex !== -1) {
        // Jika video ditemukan, set index bab dan index video yang sesuai
        selectedChapterIndex = chapterIndex;
        selectedVideoIndex = videoIndex;
      }
    });

    if (selectedChapterIndex !== -1 && selectedVideoIndex !== -1) {
      // Jika bab dan video yang sesuai ditemukan, atur indeks video aktif dan panggil fungsi handleVideoClick
      setCurrentChapterIndex(selectedChapterIndex);
      setActiveVideoIndex(selectedVideoIndex);
      handleVideoClick(selectedVideo);
    }
  };

  const handleNextVideo = () => {
    const currentChapter = dataCourseDetail.course.Chapter[currentChapterIndex];
    const currentVideo = currentChapter.Video[activeVideoIndex];
    const currentVideoId = currentVideo.video_id;

    putVideo(
      { video_id: currentVideoId },
      {
        onSuccess: () => {
          // Hanya pindah ke video berikutnya jika update berhasil
          if (activeVideoIndex < currentChapter.Video.length - 1) {
            setActiveVideoIndex(activeVideoIndex + 1);
            const nextVideo = currentChapter.Video[activeVideoIndex + 1];
            handleVideoClick(nextVideo);
          } else {
            // Jika sudah mencapai video terakhir di chapter yang sama, periksa apakah chapter ini sudah selesai
            if (!completedChapters.includes(currentChapterIndex)) {
              // Jika chapter belum diselesaikan, tandai chapter ini sebagai selesai
              setCompletedChapters([...completedChapters, currentChapterIndex]);
            }

            // Pindah ke chapter selanjutnya jika ada
            if (currentChapterIndex < dataCourseDetail.course.Chapter.length - 1) {
              setCurrentChapterIndex(currentChapterIndex + 1);
              const nextChapterFirstVideo = dataCourseDetail.course.Chapter[currentChapterIndex + 1].Video[0];
              setActiveVideoIndex(0);
              handleVideoClick(nextChapterFirstVideo);
            }
          }
          setCompletedChapters([...completedChapters, currentChapterIndex]);
        },
        onError: (error) => {
          console.error("Error updating video status", error);
        },
      }
    );
  };

  useEffect(() => {
    refetchProgress();
    refetchCourseDetail();
  }, [completedChapters, refetchCourseDetail, refetchProgress]);

  const handleFilterByScore = (score) => {
    setSelctedScore(score);
  };

  const handleStarClick = (score) => {
    setSelectedScore(score);
  };

  const handleRatingSubmit = (e) => {
    e.preventDefault();

    // Pastikan skor dan komentar telah diisi sebelum mengirim rating
    if (selectedScore === 0 || comment.trim() === "") {
      toast.error("Harap isi skor dan komentar sebelum mengirim rating.", {
        position: "top-center",
        pauseOnHover: true,
        autoClose: 2000,
      });
      return;
    }

    getPostRating({
      course_id: state.courseId,
      skor: selectedScore,
      comment: comment,
    });

    setSelectedScore(0);
    setcomment("");
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`cursor-pointer text-5xl ${selectedScore >= i ? "text-yellow-400" : "text-gray-300"}`} onClick={() => handleStarClick(i)}>
          {selectedScore >= i ? <FaStar /> : <FaStar />}
        </span>
      );
    }
    return stars;
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    if (id === "email") setEmail(value);
    if (id === "password") setPassword(value);
  };

  const loginUser = (e) => {
    e.preventDefault();
    login(
      { email, password },
      {
        onSuccess: (user) => {
          setShowLoginModal(false); // Menutup modal setelah login berhasil

          // Reload halaman untuk memperbarui data dan state sesuai pengguna yang baru login
          window.location.reload();
        },
        onError: (error) => {
          setLoginError(error.message); // Menampilkan pesan error jika login gagal
        },
      }
    );
  };

  const handleJoinClass = () => {
    const token = cookies.get("authToken");
    if (!token) {
      setShowLoginModal(true);
    } else {
      setOpenModal(true);
    }
  };

  const MateriBelajar = ({ isMobile, detailSuccess, getCourseDetail, completionPercentage, handleSelectVideo }) => {
    if (!detailSuccess) return null;
    return (
      <div className={`${isMobile ? "order-3 mt-10" : "hidden"} px-4 overflow-auto`}>
        <div className="bg-white rounded-lg p-4 shadow-md mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold ">Materi Belajar</h2>
            <div className={`flex items-center w-3/5 relative ${dataCourseDetail.sudahBeli ? "" : "hidden"}`}>
              {" "}
              {/* Add relative here */}
              <FaRegCheckCircle className="text-green-500 mr-2" />
              <div className="w-full bg-black rounded-full dark:bg-gray-700 overflow-hidden">
                <div className="bg-[#6148FF] h-7 flex items-center rounded-full" style={{ width: `${completionPercentage}%` }}>
                  {/* No changes here */}
                </div>
                <span className="absolute left-0 ml-7 text-white font-semibold desktop:text-[10px] desktopfull:text-sm" style={{ top: "50%", transform: "translateY(-50%)" }}>
                  {`${completionPercentage}% complete`}
                </span>
              </div>
            </div>
          </div>

          {getCourseDetail?.data?.course.Chapter &&
            getCourseDetail?.data?.course.Chapter.map((chapter, index) => (
              <div key={chapter?.title}>
                {index > 0 && <hr className="my-4" />}
                <h2 className="text-lg font-bold mb-4 text-[#6148FF]">{chapter.title}</h2>
                <ol className="list-decimal list-inside">
                  {chapter.Video.map((video, videoIndex) => (
                    <li key={video.video_id} className="mb-2 mt-2 flex items-center justify-between" onClick={() => handleSelectVideo(video)}>
                      <button className="flex items-center text-xs">
                        <TbPolygon />
                        <span className={`text-start mx-2 ${activeVideoIndex === videoIndex && currentChapterIndex === index ? "font-bold" : ""}`}>{video.title}</span>
                      </button>
                      {video.is_preview || dataCourseDetail.sudahBeli === true ? (
                        <FaCirclePlay className={`w-5 h-5 flex-shrink-0 ${isVideoDone(video.video_id) ? "text-[#73CA5C]" : "text-[#6148FF]"}`} />
                      ) : (
                        <GiPadlock className="w-5 h-5 flex-shrink-0 text-gray-500" />
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <LayoutUser>
        {/* Modal untuk login */}
        {showLoginModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4" onClick={() => setShowLoginModal(false)}>
            <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-md mx-auto relative" onClick={(e) => e.stopPropagation()}>
              <button className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-800" onClick={() => setShowLoginModal(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h3 className="text-xl font-semibold text-center mb-6">Masuk ke Akun Anda</h3>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  onChange={handleInput}
                  value={email}
                />
              </div>
              <div className="mt-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={passwordShown ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    onChange={handleInput}
                    value={password}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer" onClick={togglePasswordVisibility}>
                    {passwordShown ? <IoEyeOutline className="text-gray-500" /> : <IoEyeOffOutline className="text-gray-500" />}
                  </div>
                </div>
              </div>

              {isError && <div className="mt-4 text-sm text-red-600 text-center">{error.message}</div>}

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={loginUser}
                >
                  Lanjut Kelas
                </button>
              </div>

              {/* Alternative login option */}
              <div className="mt-4 text-center">
                <p className="text-sm">
                  Belum punya akun?
                  <Link to="/register" className="text-blue-600 hover:underline">
                    Daftar Disini
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Modal */}
        {openModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={closeModal}>
            <div className="bg-white p-8 rounded shadow-lg desktop:w-[45%] desktopfull:w-[40%]" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center flex-col mb-4">
                <span className="text-black font-bold text-2xl">Selangkah lagi menuju</span>
                <span className="text-[#6148FF] font-bold text-2xl">Kelas Premium</span>
              </div>
              {detailSuccess && (
                <div className="flex justify-center">
                  <div className="w-full shadow-xl rounded-3xl mb-4 overflow-hidden">
                    <div className="overflow-hidden">
                      <img className="w-full h-40 object-cover" src={dataCourseDetail?.course?.url_image_preview} alt="Course thumbnail" />
                    </div>
                    <div className="px-4 py-5 bg-white rounded-b-3xl shadow-lg">
                      <div className="flex justify-between items-center pt-2">
                        <h4 className="text-xl font-bold text-[#6148FF]">{dataCourseDetail?.course.Kategori?.title}</h4>
                        <div className="flex items-center">
                          <FaStar className="text-yellow-400 mr-1" />
                          <span className=" font-semibold">{dataCourseDetail?.course?.avgRating !== 0 ? Math.floor(dataCourseDetail?.course?.avgRating * 10) / 10 : "-"}</span>
                        </div>
                      </div>
                      <h1 className="font-bold text-lg">{dataCourseDetail?.sudahBeli}</h1>
                      <h4 className="text-lg font-bold">{dataCourseDetail?.course?.title}</h4>
                      <p className="text-md mb-2 font-semibold">by {dataCourseDetail?.course?.Mentor?.name}</p>
                      <div className="text-sm text-gray-600 mb-4 flex gap-10">
                        <div className="flex items-center">
                          <RiShieldStarLine className="text-green-500 mr-2" />
                          <span className="text-[#6148FF] text-sm font-semibold">{dataCourseDetail?.course?.level}</span>
                        </div>
                        <div className="flex items-center">
                          <FaBookOpen className="text-green-500 mr-2" />
                          <span className="text-gray-700 text-sm font-semibold">{dataCourseDetail?.course?.module} Modul</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-1/2 bg-gray-200 rounded-full dark:bg-gray-700">
                          <div className="bg-[#489CFF] h-7 flex justify-between items-center rounded-full">
                            <span className="ml-5 text-white font-semibold">Beli</span>
                            <span className="text-white font-semibold mr-5">Rp.{dataCourseDetail?.course.harga}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-center">{/* Isi modal di sini sesuai kebutuhan */}</div>
              <div className="flex justify-center mt-4">
                <button className="bg-[#6148FF] h-12 w-1/2 flex justify-center items-center rounded-full" onClick={handleCheckout}>
                  <span className="text-white font-semibold">Beli Sekarang</span>
                  <FaArrowCircleRight className="text-[#EBF3FC] ml-2" />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className={`flex gap-10 ${isMobile ? "flex-col" : ""}`}>
          <div className="desktop:w-3/5 desktopfull:w-2/3">
            <div className={`${isMobile ? "mx-5 mb-6" : "mb-6"}`}>
              {/* Isi dari bagian dengan latar belakang #EBF3FC */}
              <div className="pt-4">
                <Link to="/kelas" className="hover:underline">
                  <div className="flex items-center mb-4">
                    <FaArrowLeft className="mr-4 text-black" />
                    <h2 className="text-black font-bold">Kelas Lainnya</h2>
                  </div>
                </Link>

                {detailSuccess && (
                  <div className="flex flex-wrap lg:flex-nowrap justify-between items-start">
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold text-[#6148FF] mb-2">{dataCourseDetail.course?.Kategori?.title}</h1>
                      <p className="text-xl text-black mb-1">{dataCourseDetail.course?.title}</p>
                      <p className="text-black mb-3">by {dataCourseDetail.course?.Mentor?.name}</p>
                      <div className="flex flex-wrap items-center mb-4">
                        <div className="flex items-center mr-6">
                          <RiShieldStarLine className="text-[#73CA5C]" />
                          <span className="ml-1 font-semibold">{dataCourseDetail.course?.level}</span>
                        </div>
                        <div className="flex items-center mr-6">
                          <FaBookOpen className="text-[#73CA5C]" />
                          <span className="ml-1 font-semibold">{dataCourseDetail.course?.module} Modul</span>
                        </div>
                      </div>
                      <div className="flex">
                        {dataCourseDetail.sudahBeli && (
                          <button className="flex items-center px-4 py-2 bg-[#73CA5C] hover:bg-[#5ba347] text-white rounded-full mr-4" onClick={handleJoinTelegram}>
                            Join Grup Telegram
                            <FaTelegramPlane className="ml-2" />
                          </button>
                        )}

                        {!dataCourseDetail.sudahBeli && (
                          <button className="flex items-center px-4 py-2 bg-[#73CA5C] hover:bg-[#5ba347] text-white rounded-full" onClick={handleJoinClass}>
                            Gabung Kelas
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center ml-4 mt-4 lg:mt-0">
                      <FaStar className="text-yellow-500" />
                      <span className="text-black ml-1">{dataCourseDetail?.course?.avgRating !== 0 ? Math.floor(dataCourseDetail?.course?.avgRating * 10) / 10 : "-"}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Video Section - Adjusted size */}
            <div className={`${isMobile ? "mx-5 order-2" : "justify-start mb-6"}`}>
              <iframe
                className="w-full aspect-video rounded-3xl" // This line controls the width at different breakpoints
                src={activeVideoUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="flex justify-end mt-5 gap-5">
                <Link to="/kelas" className="bg-[#EBF3FC] hover:bg-[#d6e9ff] text-[#6148FF] py-2 px-4 rounded-full shadow-lg w-1/5 text-center">
                  Kelas Lainnya
                </Link>
                {dataCourseDetail.sudahBeli && (
                  <button className="bg-[#6148FF] hover:bg-[#41368a] text-white py-2 px-4 rounded-full shadow-lg w-1/5 text-center" onClick={handleNextVideo}>
                    Next
                  </button>
                )}
              </div>
            </div>

            <MateriBelajar isMobile={isMobile} detailSuccess={detailSuccess} getCourseDetail={getCourseDetail} completionPercentage={completionPercentage} handleSelectVideo={handleSelectVideo} />

            {/* Content Section */}
            <hr className="my-3" />
            <div className={`${isMobile ? "mx-5 order-3" : ""} desktop:mx-0 desktopfull:mx-0`}>
              <h2 className="text-xl font-bold mb-2">Tentang Kelas</h2>
              <p className="mb-6 text-base">{dataCourseDetail.course?.deskripsi}</p>
            </div>
            {completionPercentage === 100 && (
              <form onSubmit={handleRatingSubmit} className="w-full max-w-lg mobile:mx-5 desktop:mx-0 desktopfull:mx-0">
                <div className="mb-4">
                  <p className="font-bold text-2xl mb-4">Beri Rating Course</p>
                  <div className="flex items-center" aria-label="Beri Rating Course">
                    {renderStars()}
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="comment" className="text-black-300 text-xl font-semibold mb-2 block">
                    Komentar
                  </label>
                  <input
                    id="comment"
                    value={comment}
                    onChange={(e) => setcomment(e.target.value)}
                    placeholder="Tulis komentar..."
                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mobile:w-[70%] desktop:w-full desktopfull:w-full"
                  />
                </div>
                <div className="flex justify-center mb-5 mobile:justify-start">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full rounded-3xl transition duration-300 ease-in-out mobile:w-[70%] desktop:w-full desktopfull:w-full"
                  >
                    Kirim Rating
                  </button>
                </div>
              </form>
            )}
            <hr className="my-3" />
            <div>
              <h1 className="text-xl font-bold mb-4 mobile:mx-5 desktop:mx-0 desktopfull:mx-0">Review Dari User Yang Telah Berlangganan</h1>
              <div className="flex gap-5 items-center mb-4 mobile:mx-5 desktop:mx-0 desktopfull:mx-0">
                <button
                  className={`mobile:w-full mobile:text-sm desktop:w-[15%] desktop:text-base desktopfull:text-base desktopfull:w-[10%] px-2 py-1 rounded-full font-semibold text-center flex justify-center items-center ${
                    SelctedScore === "" ? "bg-black text-white" : " bg-slate-300 text-black"
                  }`}
                  onClick={() => handleFilterByScore("")}
                >
                  All
                </button>
                <button
                  className={`mobile:w-full mobile:text-sm desktop:w-[15%] desktop:text-base desktopfull:text-base desktopfull:w-[10%] px-2 py-1 rounded-full font-semibold text-center flex justify-center items-center ${
                    SelctedScore === "1" ? "bg-black text-white" : " bg-slate-300 text-black hover:bg-slate-400"
                  }`}
                  onClick={() => handleFilterByScore("1")}
                >
                  <FaStar className="text-yellow-400 mr-1" />1
                </button>
                <button
                  className={`mobile:w-full mobile:text-sm desktop:w-[15%] desktop:text-base desktopfull:text-base desktopfull:w-[10%] px-2 py-1 rounded-full font-semibold text-center flex justify-center items-center ${
                    SelctedScore === "2" ? "bg-black text-white" : " bg-slate-300 text-black hover:bg-slate-400"
                  }`}
                  onClick={() => handleFilterByScore("2")}
                >
                  <FaStar className="text-yellow-400 mr-1" />2
                </button>
                <button
                  className={`mobile:w-full mobile:text-sm desktop:w-[15%] desktop:text-base desktopfull:text-base desktopfull:w-[10%] px-2 py-1 rounded-full font-semibold text-center flex justify-center items-center ${
                    SelctedScore === "3" ? "bg-black text-white" : " bg-slate-300 text-black hover:bg-slate-400"
                  }`}
                  onClick={() => handleFilterByScore("3")}
                >
                  <FaStar className="text-yellow-400 mr-1" />3
                </button>
                <button
                  className={`mobile:w-full mobile:text-sm desktop:w-[15%] desktop:text-base desktopfull:text-base desktopfull:w-[10%] px-2 py-1 rounded-full font-semibold text-center flex justify-center items-center ${
                    SelctedScore === "4" ? "bg-black text-white" : " bg-slate-300 text-black hover:bg-slate-400"
                  }`}
                  onClick={() => handleFilterByScore("4")}
                >
                  <FaStar className="text-yellow-400 mr-1" />4
                </button>
                <button
                  className={`mobile:w-full mobile:text-sm desktop:w-[15%] desktop:text-base desktopfull:text-base desktopfull:w-[10%] px-2 py-1 rounded-full font-semibold text-center flex justify-center items-center ${
                    SelctedScore === "5" ? "bg-black text-white" : " bg-slate-300 text-black hover:bg-slate-400"
                  }`}
                  onClick={() => handleFilterByScore("5")}
                >
                  <FaStar className="text-yellow-400 mr-1" />5
                </button>
              </div>

              <div className="flex justify-between flex-wrap gap-5 mobile:justify-center mobile:mx-5 desktop:mx-0 desktop:justify-between desktopfull:mx-0 desktop:w-full desktopfull:w-[90%] desktopfull:justify-between bg-white rounded-xl shadow p-6">
                {ratingCourse?.data?.rating.length > 0 ? (
                  (() => {
                    const filteredRating = ratingCourse?.data?.rating.filter((rating) => (SelctedScore === "" ? true : rating.skor === parseInt(SelctedScore)));
                    return filteredRating.length > 0 ? (
                      filteredRating.map((rating) => (
                        <div key={rating.rating_id} className="mobile:w-full desktop:w-[100%] desktopfull:w-[47%] flex flex-col gap-2 border-b border-gray-200 pb-4">
                          <div className="font-semibold text-base">{rating.comment}</div>
                          <div className="flex items-center">
                            {Array.from({ length: rating.skor }, (_, index) => (
                              <FaStar key={index} className="text-yellow-400 mr-1" />
                            ))}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <label
                              htmlFor="upload"
                              className="w-7 h-7 bg-gray-300 rounded-full flex items-center justify-center border-2 border-[#6148FF]"
                              style={{
                                backgroundImage: `url(${rating.Account?.url_image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                            ></label>
                            <div className="">{rating.Account?.nama}</div>
                          </div>
                          {/* <div className="flex items-center m-3 ml-5">
                            <label
                              htmlFor="upload"
                              className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center border-2 border-[#6148FF]"
                              style={{
                                backgroundImage: `url(${rating.Account?.url_image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                            ></label>
                          </div>
                          <div className="flex flex-col text-sm">
                            <div className="">
                              {rating.Account?.nama}
                            </div>
                            <div className="h-full flex flex-col justify-between">
                              
                              <div className="flex items-center m-1.5">
                                {Array.from(
                                  { length: rating.skor },
                                  (_, index) => (
                                    <FaStar
                                      key={index}
                                      className="text-yellow-400 mr-1"
                                    />
                                  )
                                )}
                              </div>
                            </div>
                          </div> */}
                        </div>
                      ))
                    ) : (
                      <div className="w-[100%] gap-5 flex flex-col rounded-xl">
                        <h1 className="font-bold text-lg">Belum ada review dengan skor {SelctedScore}</h1>
                      </div>
                    );
                  })()
                ) : (
                  <div className="w-[100%] gap-5 flex flex-col rounded-xl">
                    <h1 className="font-bold text-lg">Belum ada review sejauh ini</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Materi Belajar Section */}
          {detailSuccess && !isMobile && (
            <div className="desktop:w-1/2 desktopfull:w-1/3 px-4 overflow-auto">
              <div className="bg-white rounded-lg p-4 shadow-md mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold ">Materi Belajar</h2>
                  <div className={`flex items-center w-3/5 relative ${dataCourseDetail.sudahBeli ? "" : "hidden"}`}>
                    {" "}
                    {/* Add relative here */}
                    <FaRegCheckCircle className="text-green-500 mr-2" />
                    <div className="w-full bg-black rounded-full dark:bg-gray-700 overflow-hidden">
                      <div className="bg-[#6148FF] h-7 flex items-center rounded-full" style={{ width: `${completionPercentage}%` }}>
                        {/* No changes here */}
                      </div>
                      <span className="absolute left-0 ml-7 text-white font-semibold desktop:text-[10px] desktopfull:text-sm" style={{ top: "50%", transform: "translateY(-50%)" }}>
                        {`${completionPercentage}% complete`}
                      </span>
                    </div>
                  </div>
                </div>

                {getCourseDetail?.data?.course.Chapter &&
                  getCourseDetail?.data?.course.Chapter.map((chapter, index) => (
                    <div key={chapter?.title}>
                      {index > 0 && <hr className="my-4" />}
                      <h2 className="text-lg font-bold mb-4 text-[#6148FF]">{chapter.title}</h2>
                      <ol className="list-decimal list-inside">
                        {chapter.Video.map((video, videoIndex) => (
                          <li key={video.video_id} className="mb-2 mt-2 flex items-center justify-between" onClick={() => handleSelectVideo(video)}>
                            <button className="flex items-center">
                              <span className="flex items-center justify-center h-6 w-6 flex-shrink-0 bg-blue-100 text-black rounded-full text-xs mr-2">{videoIndex + 1}</span>
                              <span className={`text-start mx-2 ${activeVideoIndex === videoIndex && currentChapterIndex === index ? "font-bold" : ""}`}>{video.title}</span>
                            </button>
                            {video.is_preview || dataCourseDetail.sudahBeli === true ? (
                              <FaCirclePlay className={`w-6 h-6 flex-shrink-0 ${isVideoDone(video.video_id) ? "text-[#73CA5C]" : "text-[#6148FF]"}`} />
                            ) : (
                              <GiPadlock className="w-6 h-6 flex-shrink-0 text-gray-500" />
                            )}
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </LayoutUser>
    </>
  );
};