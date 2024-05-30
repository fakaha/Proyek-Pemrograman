import React, { useState } from "react";
import { HeaderUser } from "../../components/Header/HeaderUser";
import banner from "../../assets/img/banner1.jpg";
import img1 from "../../assets/img/banner.png";
import { useCourse } from "../../services/user/GetCourse";
import { useCategoryId } from "../../services/user/GetCategory";
import { BsDot } from "react-icons/bs";
import { MdOutlineSell } from "react-icons/md";
import { HiArrowLongRight } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { useSalary } from "../../services/user/GetSalary";
import { CookieStorage, CookiesKeys } from "../../utils/cookies";
import { useGetRating } from "../../services/user/GetRating";
import { FooterUser } from "../../components/Footer/FooterUser";

import { Carousel } from "flowbite-react";

export const Homepage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const token = CookieStorage.get(CookiesKeys.AuthToken);

  // GET COURSE by Rating
  const { data: getDataCourseByRating } = useCourse("", 4, [], [], "rating", "desc", 1);

  const dataCourseByRating = getDataCourseByRating?.data.course || [];

  // GET COURSE by ID Course
  const [getIdCourse, setIdCourse] = useState(11); // Dipake buat get salary juga

  const { data: getDataCourseById } = useCourse("", 4, [getIdCourse], [], "rating", "desc", 1);

  const dataCoursebyIdCourse = getDataCourseById?.data.course || [];

  // GET CATEGORY BY ID COURSE FOR COURSES
  const idKategori = dataCoursebyIdCourse[0]?.kategori_id;

  const { data: getDataCategoryId } = useCategoryId({
    kategori_id: idKategori,
  });

  const dataCategoryId = getDataCategoryId?.data.category || [];

  // GET SALARY

  const { data: getDataSalary, isSuccess: salarySuccess } = useSalary({
    course_id: getIdCourse,
  });

  const dataSalary = getDataSalary?.data.salary || [];

  // GET REVIEW
  const { data: getDataRating } = useGetRating();

  const dataRating = getDataRating?.data.rating || [];
  console.log("🚀 ~ file: Homepage.jsx:71 ~ Homepage ~ dataRating:", dataRating)

  // GET COURSE FOR REVIEW CATEGORY
  const { data: getDataCourse } = useCourse("", 30, [], [], "", "", 1);

  const dataCourse = getDataCourse?.data.course || [];

  const dataCategory = dataCourse.map((value) => ({
    course_id: value.course_id,
    category: value.Kategori.title,
  }));

  return (
    <div className="bg-white">
      <HeaderUser setSearchQuery={setSearchQuery} />
      <div className="flex">
        <div className="relative w-full h-[90dvh]">
          <img src={banner} alt="banner" className="w-full h-[90dvh] object-cover" />
          <div className="absolute top-0 w-full h-[90dvh] bg-black/75">
            <div className="absolute right-0 flex justify-center items-center mobile:w-full desktop:w-1/2 h-[90dvh] text-white">
              <div className="space-y-5 pe-10 mobile:ps-10 desktop:ps-0">
                <div className="flex flex-col gap-1.5 text-5xl desktopfull:text-6xl tracking-wider font-semibold">
                  <div>Unlock your potential</div>
                  <div className="text-yellow-400">anytime, anywhere</div>
                </div>
                <div className="text-lg desktopfull:text-2xl">Mulai atau tingkatkan kemampuanmu dalam dunia IT dan mendapatkan setifikasi profesional.</div>
                <Link to={"/register"} className={`${token ? "hidden" : "block"} w-fit px-9 py-3.5 bg-primary border-2 border-primary rounded-xl text-lg font-medium hover:border-2 hover:border-primary hover:bg-transparent`}>
                  Daftar Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile:px-8 desktop:px-16 pt-8 pb-4">
        <div className="text-2xl font-bold text-primary mb-4">Kelas Unggulan</div>
        <div className="grid mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-5 text-sm">
          {dataCourseByRating.map((value, index) => {
            return (
              <div
                className="rounded-3xl shadow-lg hover:shadow-2xl hover:border hover:border-gray-300 hover:scale-105 cursor-pointer"
                key={index}
                onClick={() =>
                  navigate("/kelas/detail", {
                    state: {
                      courseId: value.course_id,
                    },
                  })
                }
              >
                <img
                  src={value.url_image_preview}
                  alt=""
                  className="w-full h-[9rem] object-cover rounded-t-3xl"
                />
                <div className="px-3.5 pt-2 pb-5">
                  <div className="text-primary">{value.Kategori.title}</div>
                  <div className="font-bold whitespace-nowrap overflow-hidden text-base">{value.title}</div>
                  <div className="font-medium text-xs">
                    by <span>{value.Mentor.name}</span>
                  </div>
                  <div className={`flex gap-1 items-center text-base font-semibold ${value.harga === 0 ? "text-blue-700" : "text-green-500 "}  mt-2.5 mb-1.5`}>
                    <MdOutlineSell />
                    <span>{value.harga === 0 ? "Gratis" : `Rp ${value.harga}`}</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-xs">
                    <div>{value.level}</div>
                    <BsDot />
                    <div>{value.module} Modul</div>
                    <BsDot />
                    <div>Sertifikasi Profesional</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mobile:px-8 desktop:px-16 pt-6 pb-16 text-sm">
        <div className="flex mobile:flex-col desktop:flex-row desktop:justify-between desktop:items-center mobile:gap-2 desktop:gap-10 mb-4">
          <div className="text-2xl font-bold text-primary">Mulai karir baru anda</div>
          <Link to={"/kelas"} className="flex items-center gap-2 hover:text-gray-400">
            <div>Lihat semua kategori</div>
            <HiArrowLongRight />
          </Link>
        </div>
        <table className="mb-4 w-full text-center">
          <tr>
            <td
              className={`pb-2 px-5 text-base font-medium border-b-2 ${getIdCourse === 11 ? "border-primary text-primary" : "border-gray-300"} hover:border-primary hover:text-primary cursor-pointer`}
              value="11"
              onClick={() => setIdCourse(11)}
            >
              Front-End Developer
            </td>
            <td
              className={`pb-2 px-5 text-base font-medium border-b-2 ${getIdCourse === 12 ? "border-primary text-primary" : "border-gray-300"} hover:border-primary hover:text-primary cursor-pointer`}
              value="12"
              onClick={() => setIdCourse(12)}
            >
              Back-End Developer
            </td>
            <td
              className={`pb-2 px-5 text-base font-medium border-b-2 ${getIdCourse === 1 ? "border-primary text-primary" : "border-gray-300"} hover:border-primary hover:text-primary cursor-pointer`}
              value="1"
              onClick={() => setIdCourse(1)}
            >
              UI / UX Designer
            </td>
            <td
              className={`pb-2 px-5 text-base font-medium border-b-2 ${getIdCourse === 13 ? "border-primary text-primary" : "border-gray-300"} hover:border-primary hover:text-primary cursor-pointer`}
              value="13"
              onClick={() => setIdCourse(13)}
            >
              Machine Learning
            </td>
            <td
              className={`pb-2 px-5 text-base font-medium border-b-2 ${getIdCourse === 4 ? "border-primary text-primary" : "border-gray-300"} hover:border-primary hover:text-primary cursor-pointer`}
              value="4"
              onClick={() => setIdCourse(4)}
            >
              Android Developer
            </td>
            <td
              className={`pb-2 px-5 text-base font-medium border-b-2 ${getIdCourse === 5 ? "border-primary text-primary" : "border-gray-300"} hover:border-primary hover:text-primary cursor-pointer`}
              value="5"
              onClick={() => setIdCourse(5)}
            >
              iOS Developer
            </td>
          </tr>
        </table>
        <div className="p-8 border-2 border-gray-300 rounded-lg">
          <div className="font-bold text-3xl mb-2">{dataCategoryId.title}</div>
          <div className="text-gray-700 mb-5">{dataCategoryId.deskripsi}</div>
          <div className="font-semibold text-base mb-2">Rata - rata gaji</div>
          <div className="flex mobile:flex-col desktop:flex-row desktop:items-center mobile:gap-1 desktop:gap-4 mb-2">
            <div className="desktop:w-1/3 desktop:ps-5 desktop:py-2 desktop:rounded desktop:text-white desktop:bg-yellow-400">Di Indonesia</div>
            <div className="mobile:hidden desktop:block">Rp.{dataSalary.gaji_dn} / thn</div>
            <div className="desktop:hidden mobile:text-xs desktop:text-sm desktopfull:text-sm w-3/5 ps-5 py-2 rounded text-white bg-yellow-400">Rp.{dataSalary.gaji_dn} / thn</div>
          </div>
          <div className="flex mobile:flex-col desktop:flex-row desktop:items-center mobile:gap-1 desktop:gap-4">
            <div className="desktop:w-4/5 desktop:ps-5 desktop:py-2 desktop:rounded desktop:text-white desktop:bg-primary">Di Luar Negeri</div>
            <div className="mobile:hidden desktop:block">Rp.{dataSalary.gaji_ln} / thn</div>
            <div className="desktop:hidden mobile:text-xs desktop:text-sm desktopfull:text-sm w-full ps-5 py-2 rounded text-white bg-primary">Rp.{dataSalary.gaji_ln} / thn</div>
          </div>
          <hr className="my-7" />
          <div className="grid mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-5">
            {dataCoursebyIdCourse.map((value, index) => {
              return (
                <div
                  className="rounded-3xl shadow-lg hover:shadow-2xl hover:border hover:border-gray-300 hover:scale-105 cursor-pointer"
                  key={index}
                  onClick={() =>
                    navigate("/kelas/detail", {
                      state: {
                        courseId: value.course_id,
                      },
                    })
                  }
                >
                  <img src={img1} alt="" className="w-full h-[9rem] object-cover rounded-t-3xl" />
                  <div className="px-3.5 pt-2 pb-5">
                    <div className="text-primary">{value.Kategori.title}</div>
                    <div className="font-bold whitespace-nowrap overflow-hidden text-base">{value.title}</div>
                    <div className="font-medium text-xs">
                      by <span>{value.Mentor.name}</span>
                    </div>
                    <div className={`flex gap-1 items-center text-base font-semibold ${value.harga === 0 ? "text-blue-700" : "text-green-500 "}  mt-2.5 mb-1.5`}>
                      <MdOutlineSell />
                      <span>{value.harga === 0 ? "Gratis" : `Rp ${value.harga}`}</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div>{value.level}</div>
                      <BsDot />
                      <div>{value.module} Modul</div>
                      <BsDot />
                      <div>Sertifikasi Profesional</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-8 pt-8 pb-12 text-sm text-white text-center bg-blue-900">
        <div className="text-lg text-yellow-300 tracking-wider font-medium mb-3">Trusted by 500k+ Students</div>
        <div className="text-2xl font-medium tracking-wide mb-3">Gabung komunitas CourseWay Sekarang !</div>
        <div className="text-lg font-medium text-center desktop:px-64 text-gray-300 mb-10">CourseWay telah dipercaya dan mendapat review baik dari alumni CourseWay dari seluruh Indonesia</div>
        <div className="carousel carousel-center h-80 mobile:w-full desktop:w-1/2 desktop:h-96 desktopfull::w-1/3 desktopfull:h-[400px] bg-transparent space-x-4 rounded-box">
          <Carousel leftControl={<div className="hidden"></div>} rightControl={<div className="hidden"></div>}>
            {dataRating.slice(0, 9).map((value, index) => {
              const categoryReview = (id) => {
                const result = dataCategory.filter((value) => {
                  if (value.course_id === id) {
                    return value.category;
                  }
                });

                return result;
              };

              const categoryName = categoryReview(value.course_id)[0]?.category || "";

              return (
                <div className="flex flex-col w-[80%] h-1/2 space-y-3 bg-white text-black rounded-box px-5 py-6 desktop:w-full desktop:h-56 desktopfull:h-80 desktopfull:w-1/2" key={index}>
                  <div className="flex items-center gap-3">
                    <div>
                      <img src={value.Account.url_image} alt="profile pic" className="w-7 h-7 desktop:w-[50px] desktop:h-[50px] desktopfull:w-[100px] desktopfull:h-[100px] object-cover rounded-full" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-sm desktop:text-xl desktopfull:text-3xl">{value.Account.nama}</div>
                      <div className="text-gray-500 text-sm desktop:text-lg desktopfull:text-xl">{categoryName}</div>
                    </div>
                  </div>
                  <div className="text-left mt-2 text-xs desktop:text-lg desktopfull:text-lg">{value.comment}</div>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>

      <FooterUser />
    </div>
  );
};
