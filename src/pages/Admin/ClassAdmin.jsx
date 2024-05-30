import React, { useEffect, useState } from "react";
import { LayoutAdmin } from "../../Layout/LayoutAdmin";
import { CardAdmin } from "../../components/Card/CardAdmin";
import { CiCirclePlus } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { Button, Modal } from "flowbite-react";
import { useCourseAdmin } from "../../services/admin/GetCourseAdmin";
import { usePostCourse } from "../../services/admin/PostCourseAdmin";
import { useMentor } from "../../services/admin/GetMentor";
import { useCategory } from "../../services/user/GetCategory";
import { useDebounce } from "use-debounce";
import { useCourseId } from "../../services/admin/GetCourseIdAdmin";
import { usePutCourse } from "../../services/admin/PutCourseAdmin";
import { useDeleteCourse } from "../../services/admin/DeleteCourse";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi";
import { FaRegCirclePlay } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";

export const ClassAdmin = () => {
  const navigate = useNavigate();

  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [sortNomor, setSortNomor] = useState(false);
  const [sortTitle, setSortTitle] = useState(false);
  const [sortHarga, setSortHarga] = useState(false);

  const [getLimit, setLimit] = useState(10);
  const [getSearch, setSearch] = useState("");
  const [getSort, setSort] = useState("");
  const [getOrder, setOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [getDataCourse, setDataCourse] = useState([]);
  const [searchValue] = useDebounce(getSearch, 1200);

  // GET COURSE
  const {
    data: getCourse,
    isSuccess: courseSuccess,
    refetch: refetchCourse,
  } = useCourseAdmin({
    limit: getLimit,
    page: currentPage,
    search: searchValue,
    sort: getSort,
    order: getOrder,
    category: [],
    level: [],
  });
  console.log(
    "🚀 ~ file: ClassAdmin.jsx:56 ~ ClassAdmin ~ getCourse:",
    getDataCourse
  );

  useEffect(() => {
    const resultAll = getCourse?.data?.course?.filter((value) => {
      if (value.is_visible !== false) {
        return { ...value };
      }
    });
    setDataCourse(resultAll);
  }, [searchValue, courseSuccess, refetchCourse, currentPage, getCourse]);

  // HANDLE PAGE
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const totalCourse = getCourse?.data?.pagination?.total_items;
    const forLastPage = totalCourse / 10;
    setLastPage(Math.ceil(forLastPage));
  }, [lastPage, getCourse]);

  // GET COURSE BY ID
  const [getCourseId, setCourseId] = useState();
  const [getDataCourseById, setDataCourseById] = useState([]);

  const { data: getDataCourseId, isSuccess: courseIdSuccess } = useCourseId({
    course_id: getCourseId,
  });

  const handleOpenEdit = (id) => {
    setOpenModalEdit(true);
    setCourseId(id);
  };

  useEffect(() => {
    if (getCourseId !== 0) {
      setDataCourseById(getDataCourseId);
    }
  }, [getCourseId, courseIdSuccess, getDataCourseId, openModalEdit]);

  const callDataCourseId = getDataCourseById?.data?.course || [];

  // POST COURSE
  const [getTitle, setTitle] = useState();
  const [getDeskripsi, setDeskripsi] = useState();
  const [getKodeKelas, setKodeKelas] = useState();
  const [getKategori, setKategori] = useState();
  const [getHarga, setHarga] = useState(0);
  const [getPremium, setPremium] = useState();
  const [getMentor, setMentor] = useState();
  const [getLevel, setLevel] = useState();
  const [getImage, setImage] = useState();

  const { mutate: postCourse, isSuccess: successPostCourse } = usePostCourse();

  useEffect(() => {
    if (successPostCourse) {
      toast.success("Course berhasil diubah", {
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

    setOpenModalAdd(false);
    refetchCourse();
  }, [successPostCourse, setOpenModalAdd, refetchCourse]);

  const handleSimpan = () => {
    postCourse({
      title: getTitle,
      deskripsi: getDeskripsi,
      kode_kelas: getKodeKelas,
      kategori_id: getKategori,
      harga: getHarga,
      premium: getPremium,
      mentor_id: getMentor,
      level: getLevel,
      url_image_preview: getImage,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // PUT COURSE
  const { mutate: putCourse, isSuccess: successPutCourse } = usePutCourse({
    course_id: getCourseId,
  });

  const handleEdit = () => {
    putCourse({
      title: getTitle,
      deskripsi: getDeskripsi,
      kode_kelas: getKodeKelas,
      kategori_id: getKategori,
      harga: getHarga,
      premium: getPremium,
      mentor_id: getMentor,
      level: getLevel,
      url_image_preview: getImage,
    });
  };

  useEffect(() => {
    if (successPutCourse) {
      toast.success("Course berhasil diubah", {
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

    setOpenModalEdit(false);
    refetchCourse();
  }, [successPutCourse, setOpenModalEdit, refetchCourse]);

  //GET CATEGORY
  const { data: getDataCategory } = useCategory(50);

  const dataCategory = getDataCategory?.data.category || [];

  //GET MENTOR
  const [getLimitMentor, setLimitMentor] = useState(10);
  const [getPageMentor, setPageMentor] = useState(1);

  const { data: getDataMentor } = useMentor({
    limit: getLimitMentor,
    page: getPageMentor,
  });

  const dataMentor = getDataMentor?.data.mentor || [];

  // FOR PUT COURSE
  useEffect(() => {
    if (getCourseId !== undefined) {
      setTitle(callDataCourseId.title);
      setDeskripsi(callDataCourseId.deskripsi);
      setKodeKelas(callDataCourseId.kode_kelas);
      const categoryId = dataCategory.filter((value) => {
        if (value?.title === callDataCourseId?.Kategori?.title) {
          return value?.kategori_id;
        }
      });
      setKategori(categoryId[0]?.kategori_id);
      setHarga(callDataCourseId.harga);
      setPremium(callDataCourseId.premium);
      const mentorName = dataMentor.filter((value) => {
        if (value?.name === callDataCourseId?.Mentor?.name) {
          return value?.mentor_id;
        }
      });
      setMentor(mentorName[0]?.mentor_id);
      setLevel(callDataCourseId.level);
      setImage(callDataCourseId.url_image_preview);
    }
  }, [callDataCourseId, dataCategory, dataMentor, getCourseId]);

  // DELETE COURSE
  const [getIdCourseDelete, setIdCourseDelete] = useState();

  const {
    mutate: deleteCourse,
    data: dataDeleteCourse,
    isSuccess: successDeleteCourse,
  } = useDeleteCourse({
    course_id: getIdCourseDelete,
  });

  useEffect(() => {
    if (successDeleteCourse) {
      toast.success("Course berhasil dihapus!", {
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

    refetchCourse();
  }, [successDeleteCourse, refetchCourse]);

  const handleDeleteCourse = (id) => {
    setIdCourseDelete(id);
    deleteCourse();
  };

  // HANDLE TO PAGE ADD VIDEO
  const handleAddVideo = (id) => {
    navigate("/admin/add-video", {
      state: {
        course_id: id,
      },
    });
  };

  // SORT TITLE AND PRIVE
  const handleSortTitle = () => {
    if (!sortTitle) {
      setSortTitle(true);
      setSort("title");
      setOrder("desc");
    } else {
      setSortTitle(false);
      setSort("title");
      setOrder("asc");
    }
  };

  const handleSortHarga = () => {
    if (!sortHarga) {
      setSortHarga(true);
      setSort("harga");
      setOrder("desc");
    } else {
      setSortHarga(false);
      setSort("harga");
      setOrder("asc");
    }
  };

  const handleSortNomor = () => {
    if (!sortNomor) {
      setSortNomor(true);
      setSort("course_id");
      setOrder("desc");
    } else {
      setSortNomor(false);
      setSort("course_id");
      setOrder("asc");
    }
  };

  return (
    <>
      <LayoutAdmin>
        <div className="flex flex-col gap-7">
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
          <CardAdmin />
          <div>
            <div className="flex justify-between items-center">
              <div className="font-bold text-xl">Kelola Kelas</div>
              <div className="flex items-center gap-4 text-primary">
                <button
                  onClick={() => setOpenModalAdd(true)}
                  className="flex items-center gap-1 text-lg border text-white bg-primary border-primary rounded-lg px-4 py-[0.130rem] cursor-pointer"
                >
                  <CiCirclePlus className="stroke-1 text-xl" />
                  <span className="font-semibold">Tambah</span>
                </button>

                <Modal
                  show={openModalAdd}
                  onClose={() => setOpenModalAdd(false)}
                >
                  <Modal.Header>Tambah Kelas</Modal.Header>
                  <Modal.Body>
                    <div className="space-y-3 text-sm">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="namakelas">Nama Kelas</label>
                        <input
                          type="text"
                          id="namakelas"
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Front-end with ReactJS"
                          className="text-sm border-gray-300 rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="Kategori">Kategori</label>
                        <select
                          name="Kategori"
                          id="Kategori"
                          onChange={(e) => setKategori(e.target.value)}
                          className="text-sm border-gray-300 rounded-lg"
                        >
                          <option value="">-- Pilih Kategori --</option>
                          {dataCategory.map((value, index) => {
                            return (
                              <option key={index} value={value.kategori_id}>
                                {value.title}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="mentor">Mentor</label>
                        <select
                          name="mentor"
                          id="mentor"
                          onChange={(e) => setMentor(e.target.value)}
                          className="text-sm border-gray-300 rounded-lg"
                        >
                          <option value="">-- Pilih Mentor --</option>
                          {dataMentor.map((value, index) => {
                            return (
                              <option key={index} value={value.mentor_id}>
                                {value.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="kodekelas">Kode Kelas</label>
                        <input
                          type="text"
                          id="kodekelas"
                          onChange={(e) => setKodeKelas(e.target.value)}
                          placeholder="WD1101"
                          className="text-sm border-gray-300 rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="tipekelas">Tipe Kelas</label>
                        <select
                          name="tipekelas"
                          id="tipekelas"
                          onChange={(e) => setPremium(e.target.value)}
                          className="text-sm border-gray-300 rounded-lg"
                        >
                          <option value="">-- Pilih Tipe Kelas --</option>
                          <option value="false">Gratis</option>
                          <option value="true">Premium</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="level">Level</label>
                        <select
                          name="level"
                          id="level"
                          onChange={(e) => setLevel(e.target.value)}
                          className="text-sm border-gray-300 rounded-lg"
                        >
                          <option value="">-- Pilih Level --</option>
                          <option value="pemula">Pemula</option>
                          <option value="menengah">Menengah</option>
                          <option value="lanjutan">Lanjutan</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="harga">Harga</label>
                        <input
                          type="text"
                          id="harga"
                          onChange={(e) => setHarga(e.target.value)}
                          placeholder="300000"
                          className="text-sm border-gray-300 rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="deskripsi">Deskripsi Kelas</label>
                        <textarea
                          name="deskripsi"
                          id="deskripsi"
                          onChange={(e) => setDeskripsi(e.target.value)}
                          placeholder="ReactJS saat ini .."
                          className="text-sm border-gray-300 rounded-lg w-full h-28"
                        ></textarea>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="gambar">Input Gambar</label>
                        <input
                          type="file"
                          id="gambar"
                          onChange={handleImageChange}
                          className="w-full rounded-lg border border-gray-300"
                        />
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer className="flex justify-end gap-3">
                    <Button
                      color="gray"
                      onClick={() => handleSimpan()}
                      className="bg-primary hover:!bg-purple-800 text-white hover:!text-white"
                    >
                      Simpan
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Modal
                  show={openModalEdit}
                  onClose={() => setOpenModalEdit(false)}
                >
                  <Modal.Header>Tambah Kelas</Modal.Header>
                  <Modal.Body>
                    <div className="space-y-3 text-sm">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="namakelas">Nama Kelas</label>
                        <input
                          type="text"
                          id="namakelas"
                          onChange={(e) => setTitle(e.target.value)}
                          value={getTitle}
                          placeholder="Front-end with ReactJS"
                          className="text-sm border-gray-300 rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="Kategori">Kategori</label>
                        <select
                          name="Kategori"
                          id="Kategori"
                          onChange={(e) => setKategori(e.target.value)}
                          className="text-sm border-gray-300 rounded-lg"
                        >
                          <option value="">-- Pilih Kategori --</option>
                          {dataCategory.map((value, index) => {
                            return (
                              <option
                                key={index}
                                value={value.kategori_id}
                                selected={
                                  value.title ===
                                  callDataCourseId.Kategori?.title
                                    ? "selected"
                                    : ""
                                }
                              >
                                {value.title}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="mentor">Mentor</label>
                        <select
                          name="mentor"
                          id="mentor"
                          onChange={(e) => setMentor(e.target.value)}
                          className="text-sm border-gray-300 rounded-lg"
                        >
                          <option value="">-- Pilih Mentor --</option>
                          {dataMentor.map((value, index) => {
                            return (
                              <option
                                key={index}
                                value={value.mentor_id}
                                selected={
                                  value.name === callDataCourseId.Mentor?.name
                                    ? "selected"
                                    : ""
                                }
                              >
                                {value.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="kodekelas">Kode Kelas</label>
                        <input
                          type="text"
                          id="kodekelas"
                          onChange={(e) => setKodeKelas(e.target.value)}
                          value={getKodeKelas}
                          placeholder="WD1101"
                          className="text-sm border-gray-300 rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="tipekelas">Tipe Kelas</label>
                        <select
                          name="tipekelas"
                          id="tipekelas"
                          onChange={(e) => setPremium(e.target.value)}
                          className="text-sm border-gray-300 rounded-lg"
                        >
                          <option value="">-- Pilih Tipe Kelas --</option>
                          <option
                            value="false"
                            selected={
                              callDataCourseId?.premium?.toString() === "false"
                                ? "selected"
                                : ""
                            }
                          >
                            Gratis
                          </option>
                          <option
                            value="true"
                            selected={
                              callDataCourseId?.premium?.toString() === "true"
                                ? "selected"
                                : ""
                            }
                          >
                            Premium
                          </option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="level">Level</label>
                        <select
                          name="level"
                          id="level"
                          onChange={(e) => setLevel(e.target.value)}
                          className="text-sm border-gray-300 rounded-lg"
                        >
                          <option value="">-- Pilih Level --</option>
                          <option
                            value="Pemula"
                            selected={
                              callDataCourseId.level === "Pemula"
                                ? "selected"
                                : ""
                            }
                          >
                            Pemula
                          </option>
                          <option
                            value="Menengah"
                            selected={
                              callDataCourseId.level === "Menengah"
                                ? "selected"
                                : ""
                            }
                          >
                            Menengah
                          </option>
                          <option
                            value="Lanjutan"
                            selected={
                              callDataCourseId.level === "Lanjutan"
                                ? "selected"
                                : ""
                            }
                          >
                            Lanjutan
                          </option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="harga">Harga</label>
                        <input
                          type="text"
                          id="harga"
                          onChange={(e) => setHarga(e.target.value)}
                          value={getHarga}
                          placeholder="300000"
                          className="text-sm border-gray-300 rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="deskripsi">Deskripsi Kelas</label>
                        <textarea
                          name="deskripsi"
                          id="deskripsi"
                          onChange={(e) => setDeskripsi(e.target.value)}
                          value={getDeskripsi}
                          placeholder="ReactJS saat ini .."
                          className="text-sm border-gray-300 rounded-lg w-full h-28"
                        ></textarea>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="gambar">Input Gambar</label>
                        <input
                          type="file"
                          id="gambar"
                          onChange={handleImageChange}
                          className="w-full rounded-lg border border-gray-300"
                        />
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer className="flex justify-end gap-3">
                    <Button
                      color="gray"
                      onClick={() => handleEdit()}
                      className="bg-primary hover:!bg-purple-800 text-white hover:!text-white"
                    >
                      Simpan
                    </Button>
                  </Modal.Footer>
                </Modal>

                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="cari.."
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-primary rounded-lg ps-8 pe-3 py-[0.275rem] w-[15rem]"
                  />
                  <FaSearch className="w-3.5 h-3.5 absolute left-2.5" />
                </div>
              </div>
            </div>
            <table className="text-sm w-full mt-3 text-left">
              <thead className="bg-[#EBF3FC]">
                <tr>
                  <th
                    onClick={handleSortNomor}
                    className="ps-2 py-2.5 flex items-center gap-3 cursor-pointer hover:text-gray-400"
                  >
                    <div>ID</div>
                    {sortNomor ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                  </th>
                  <th className="py-2.5">Kategori</th>
                  <th
                    onClick={handleSortTitle}
                    className="py-2.5 flex items-center gap-3 cursor-pointer hover:text-gray-400"
                  >
                    <div>Nama Kelas</div>
                    {sortTitle ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                  </th>
                  <th className="py-2.5">Tipe Kelas</th>
                  <th className="py-2.5">Level</th>
                  <th
                    onClick={handleSortHarga}
                    className="py-2.5 flex items-center gap-3 cursor-pointer hover:text-gray-400"
                  >
                    <div>Harga Kelas</div>
                    {sortHarga ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                  </th>
                  <th className="py-2.5">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {getDataCourse?.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td className="ps-2 py-3 text-center">
                        {value.course_id}
                      </td>
                      <td className="py-3">{value.Kategori.title}</td>
                      <td className="py-3">{value.title}</td>
                      <td className="py-3 font-bold">
                        {value.premium ? "PREMIUM" : "GRATIS"}
                      </td>
                      <td className="py-3">{value.level}</td>
                      <td className="py-3">Rp {value.harga}</td>
                      <td>
                        <div className="flex items-center gap-3 text-white">
                          <button
                            onClick={() => handleAddVideo(value.course_id)}
                            className="text-primary cursor-pointer"
                            title="atur video"
                          >
                            <FaRegCirclePlay className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(value.course_id)}
                            className="text-yellow-400 cursor-pointer"
                            title="edit"
                          >
                            <HiOutlinePencilAlt className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteCourse(value.course_id)}
                            className="text-red-400 cursor-pointer"
                            title="hapus"
                          >
                            <HiOutlineTrash className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-center mt-8 mobile:w-[70%] desktop:w-full">
              <button
                className={`px-4 py-2 mx-1 rounded text-white font-bold ${
                  currentPage <= 1
                    ? "bg-gray-300"
                    : "bg-[#489CFF] cursor-pointer hover:bg-secondary"
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                Previous Page
              </button>
              <span className="px-4 py-2 mx-1 rounded text-gray-700 font-bold">
                Page {currentPage}
              </span>
              <button
                className={`px-4 py-2 mx-1 rounded text-white font-bold ${
                  currentPage === lastPage
                    ? "bg-gray-300"
                    : "bg-[#489CFF] cursor-pointer hover:bg-secondary"
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === lastPage}
              >
                Next Page
              </button>
            </div>
          </div>
        </div>
      </LayoutAdmin>
    </>
  );
};
