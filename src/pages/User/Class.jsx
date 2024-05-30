import React, { useEffect, useState } from "react";
import { FaStar, FaFilter } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useCourse } from "../../services/user/GetCourse";
import { useCategory } from "../../services/user/GetCategory";
import { LayoutUser } from "../../Layout/LayoutUser";
import { MdOutlineSell } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import { CookieStorage, CookiesKeys } from "../../utils/cookies";

export const Class = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const token = CookieStorage.get(CookiesKeys.AuthToken);
  const isUserAuthenticated = !!token;
  const isMobile = window.innerWidth <= 768;
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const [handleAll, setHandleAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dataCourses, setDataCourses] = useState([]);
  const [dataCategories, setDataCategories] = useState([]);
  const [dataLevels, setDataLevels] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [isPremium, setIsPremium] = useState(false);
  const [isFree, setIsFree] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // GET SEARCH VALUES
  useEffect(() => {
    if (state === null || handleAll === true) {
      setSearchQuery("");
      localStorage.removeItem("searchValues");
      navigate({ search: "" }, { replace: true });
      setCurrentPage(1);
    } else {
      setSearchQuery(state?.search);
      setCurrentPage(1);
    }
  }, [handleAll, searchQuery, state]);

  // GET COURSE ALL
  const { data: coursesAll, isLoading } = useCourse(
    searchQuery,
    10,
    selectedCategories,
    selectedLevels,
    "",
    "",
    currentPage
  );

  const { data: levelsAll } = useCourse("", 10, [], [], "", "", currentPage);
  const { data: categoryAll } = useCategory(10);

  useEffect(() => {
    if (coursesAll?.data && coursesAll?.data?.course) {
      setDataCourses(coursesAll.data.course);
    }
    if (categoryAll?.data && categoryAll?.data?.category) {
      setDataCategories(categoryAll.data.category);
    }
    if (levelsAll?.data && levelsAll?.data?.course) {
      setDataLevels([
        ...new Set(levelsAll.data.course.map((course) => course.level)),
      ]);
    }
  }, [coursesAll, categoryAll, levelsAll]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const totalCourse = coursesAll?.data?.pagination?.total_items;
    const forLastPage = totalCourse / 10;
    setLastPage(Math.ceil(forLastPage));
  }, [lastPage, coursesAll]);

  const handleCategoryChange = (categoryId) => {
    setCurrentPage(1);
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(categoryId)) {
        return prevCategories.filter((id) => id !== categoryId);
      } else {
        return [...prevCategories, categoryId];
      }
    });
  };

  const handleLevelChange = (level) => {
    setCurrentPage(1);
    setSelectedLevels((prevLevels) => {
      if (prevLevels.includes(level)) {
        return prevLevels.filter((lv) => lv !== level);
      } else {
        return [...prevLevels, level];
      }
    });
  };

  const handleClearFilters = () => {
    setCurrentPage(1);
    setSelectedCategories([]);
    setSelectedLevels([]);
  };

  const handleToDetail = (id) => {
    navigate("/kelas/detail", {
      state: {
        courseId: id,
      },
    });
  };

  const handlePremiumClick = () => {
    setCurrentPage(1);
    setIsPremium(true);
    setIsFree(false);
    setHandleAll(false);
  };

  const handleFreeClick = () => {
    setCurrentPage(1);
    setIsPremium(false);
    setIsFree(true);
    setHandleAll(false);
  };

  const handleAllClick = () => {
    !handleAll ? setHandleAll(true) : setHandleAll(false);
    setIsPremium(false);
    setIsFree(false);
  };
  const filteredCourses = dataCourses.filter((course) => {
    if (isPremium) return course.harga !== 0;
    if (isFree) return course.harga === 0;
    return true;
  });

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Close the sidebar when the window is resized
  useEffect(() => {
    const handleResize = () => {
      if (isMobile && isSidebarOpen) {
        closeSidebar();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile, isSidebarOpen]);

  const [isFilterOpen, setFilterOpen] = useState(false);

  const openFilter = () => {
    setFilterOpen(true);
  };

  const closeFilter = () => {
    setFilterOpen(false);
  };

  return (
    <>
      <LayoutUser>
        {/* Title and Search */}
        {!isMobile ? (
          <div className="flex justify-between items-center mb-6 ">
            <h2 className="text-2xl font-bold text-gray-700">Topik Kelas</h2>
          </div>
        ) : (
          <div className="flex items-center justify-between px-7 mb-4 mt-6">
            <div className="font-bold text-lg">Topik Kelas</div>
            <div
              className="font-bold text-primary cursor-pointer"
              onClick={openFilter}
            >
              Filter
            </div>
          </div>
        )}

        <div className="relative flex desktop:gap-10 desktopfull:gap-14 mobile:px-3 desktop:px-0">
          {/* FILTER */}
          <div className="mobile:hidden desktop:block desktopfull:block h-fit desktop:1/4 desktopfull:w-1/5 px-7 py-5 bg-white rounded-xl shadow">
            <h3 className="flex items-center gap-2 text-lg font-bold mb-2">
              <FaFilter className="w-3 h-3" />
              <span>FILTER</span>
            </h3>
            <div className="flex flex-col gap-4 whitespace-nowrap overflow-x-hidden">
              <div className="space-y-3 px-1.5">
                <h4 className="text-base font-bold text-primary -pt-3">
                  Kategori
                </h4>
                {dataCategories.map((category) => {
                  return (
                    <div
                      className="flex gap-2 items-center"
                      key={category.kategori_id}
                    >
                      <input
                        type="checkbox"
                        id={`category_${category.kategori_id}`}
                        onChange={() =>
                          handleCategoryChange(category.kategori_id)
                        }
                        checked={selectedCategories.includes(
                          category.kategori_id
                        )}
                        className="appearance-none w-5 h-5 cursor-pointer border-2 border-gray-500 rounded-lg bg-[#E8F1FF] checked:bg-[#6148FF] checked:border-0"
                      />
                      <label
                        htmlFor={`category_${category.kategori_id}`}
                        className="cursor-pointer hover:text-primary"
                      >
                        {category.title}
                      </label>
                    </div>
                  );
                })}
              </div>
              <div className="space-y-3 px-1.5">
                <h4 className="text-base font-bold text-primary -pt-3">
                  Level Kesulitan
                </h4>
                {dataLevels?.map((level) => {
                  return (
                    <div className="flex gap-2 items-center">
                      <input
                        type="checkbox"
                        id={level}
                        onChange={() => handleLevelChange(level)}
                        checked={selectedLevels.includes(level)}
                        className="appearance-none w-5 h-5 border-2 border-gray-500 rounded-lg bg-[#E8F1FF] checked:bg-[#6148FF] checked:border-0"
                      />
                      <label
                        htmlFor={level}
                        className="cursor-pointer hover:text-primary"
                      >
                        {level}
                      </label>
                    </div>
                  );
                })}
              </div>
              <div className="w-full flex justify-center mt-2">
                <button
                  className="font-bold text-red-500 hover:underline"
                  onClick={handleClearFilters}
                >
                  Hapus Filter
                </button>
              </div>
            </div>
          </div>

          {/* FILTER Mobile */}
          {isMobile && (
            <>
              <div
                className="fixed inset-0 bg-black bg-opacity-40 z-50"
                style={{ display: isFilterOpen ? "block" : "none" }}
                onClick={closeFilter}
              ></div>
              <div
                className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl transform ${
                  isFilterOpen ? "translate-y-0" : "translate-y-full"
                } transition-transform ease-in-out duration-300 overflow-hidden z-50`}
                style={{ maxHeight: "75vh" }}
              >
                <div className="flex justify-between items-center px-5 py-3 border-b">
                  <FaFilter className="w-3 h-3" />
                  <span className="font-bold text-lg">Filter</span>
                  <button onClick={closeFilter}>
                    <span className="text-gray-500 text-xl">X</span>
                  </button>
                </div>
                <div
                  className="gap-4 whitespace-nowrap overflow-y-auto px-4"
                  style={{ maxHeight: "60vh" }}
                >
                  <div className="space-y-3 px-1.5 pt-4">
                    <h4 className="text-base font-bold text-primary -pt-3">
                      Kategori
                    </h4>
                    {dataCategories.map((category) => {
                      return (
                        <div
                          className="flex gap-2 items-center"
                          key={category.kategori_id}
                        >
                          <input
                            type="checkbox"
                            id={`category_${category.kategori_id}`}
                            onChange={() =>
                              handleCategoryChange(category.kategori_id)
                            }
                            checked={selectedCategories.includes(
                              category.kategori_id
                            )}
                            className="appearance-none w-5 h-5 border-2 border-gray-500 rounded-lg bg-[#E8F1FF] checked:bg-[#6148FF] checked:border-0"
                          />
                          <span className="">{category.title}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="space-y-3 px-1.5 pt-4">
                    <h4 className="text-base font-bold text-primary -pt-3">
                      Level Kesulitan
                    </h4>
                    {dataLevels?.map((level) => {
                      return (
                        <div className="flex gap-2 items-center">
                          <input
                            type="checkbox"
                            id={level}
                            onChange={() => handleLevelChange(level)}
                            checked={selectedLevels.includes(level)}
                            className="appearance-none w-5 h-5 border-2 border-gray-500 rounded-lg bg-[#E8F1FF] checked:bg-[#6148FF] checked:border-0"
                          />
                          <label htmlFor={level} className="">
                            {level}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                  <div className="w-full flex justify-center mt-2">
                    <button
                      className="font-bold text-red-500 hover:underline mb-5"
                      onClick={handleClearFilters}
                    >
                      Hapus Filter
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* BODY */}
          <div
            className={`${
              isMobile ? "w-full px-3" : "desktop:w-3/4 desktopfull:w-4/5 "
            }`}
          >
            <div className="grid grid-cols-3 gap-4 mb-7 text-center">
              <div
                className={`py-2 font-semibold hover:text-white rounded-full hover:bg-primary cursor-pointer shadow ${
                  handleAll
                    ? "bg-primary shadow-primary text-white"
                    : "bg-white text-gray-600"
                }`}
                onClick={handleAllClick}
              >
                All
              </div>
              <div
                className={`py-2 font-semibold hover:text-white rounded-full hover:bg-primary cursor-pointer shadow ${
                  isPremium
                    ? "bg-primary shadow-primary text-white"
                    : "bg-white text-gray-600"
                }`}
                onClick={handlePremiumClick}
              >
                Kelas Premium
              </div>
              <div
                className={`py-2 font-semibold hover:text-white rounded-full hover:bg-primary cursor-pointer shadow ${
                  isFree
                    ? "bg-primary te shadow-primary text-white"
                    : "bg-white text-gray-600"
                }`}
                onClick={handleFreeClick}
              >
                Kelas Gratis
              </div>
            </div>
            {/* spinner when load data */}
            {isLoading && (
              <div className="w-full flex items-center justify-center mt-4">
                <div>
                  <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
            <div className="grid mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-2 desktopfull:grid-cols-2 gap-5 gap-y-7">
              {/* {render courses} */}
              {!isLoading &&
                filteredCourses.map((course, index) => {
                  return (
                    <div
                      className="rounded-3xl shadow-lg bg-white hover:shadow-2xl hover:border hover:border-gray-300 hover:scale-105 cursor-pointer"
                      key={index}
                      onClick={() => handleToDetail(course.course_id)}
                    >
                      <img
                        src={course.url_image_preview}
                        alt=""
                        className="w-full h-[9rem] object-cover rounded-t-3xl"
                      />
                      <div className="px-3.5 pt-2 pb-5">
                        <div className="text-primary flex justify-between items-center">
                          <div>{course.Kategori.title}</div>
                          <div className="flex items-center gap-1">
                            <FaStar className="fill-yellow-400" />
                            <span>
                              {course.avgRating !== 0
                                ? Math.floor(course.avgRating * 10) / 10
                                : "-"}
                            </span>
                          </div>
                        </div>
                        <div className="font-bold whitespace-nowrap overflow-hidden text-base">
                          {course.title}
                        </div>
                        <div className="font-medium text-xs">
                          by <span>{course.Mentor.name}</span>
                        </div>
                        <div
                          className={`flex gap-1 items-center text-base font-semibold ${
                            course.harga === 0
                              ? "text-blue-700"
                              : "text-green-500 "
                          }  mt-2.5 mb-1.5`}
                        >
                          <MdOutlineSell />
                          <span>
                            {course.harga === 0
                              ? "Gratis"
                              : `Rp${course.harga}`}
                          </span>
                        </div>
                        <div className="flex items-center gap-0.5 text-xs">
                          <div>{course.level}</div>
                          <BsDot />
                          <div>{course.module} Modul</div>
                          <BsDot />
                          <div>Sertifikasi Profesional</div>
                        </div>
                        <button
                          className={`bg-primary rounded-full p-1.5 px-6 font-medium text-white mt-2.5 w-full text-center`}
                        >
                          Gabung Kelas
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end mb-8">
          <div className="flex justify-center mt-8 mobile:w-full tablet:w-full desktop:w-3/4 desktopfull:w-4/5">
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
      </LayoutUser>
    </>
  );
};