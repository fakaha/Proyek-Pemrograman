import React, { useEffect, useState } from "react";
import { BsDot } from "react-icons/bs";
import { FaArrowLeft, FaRegCheckCircle } from "react-icons/fa";
import { LayoutUser } from "../../../Layout/LayoutUser";
import { SidebarProfil } from "../../../components/Sidebar/SidebarProfil";
import { useRiwayatPembayaran } from "../../../services/User Profile/riwayat_pembayaran";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export const RiwayatUser = () => {
  const navigate = useNavigate();
  const [riwayatPembayaran, setRiwayatPembayaran] = useState([]);
  const { data, isError } = useRiwayatPembayaran();

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    if (data && data.status) {
      setRiwayatPembayaran(data.data.listCourse);
    }
  }, [data]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <>
      <LayoutUser>
        <div
          className={`${
            !isMobile
              ? "w-4/5 mobile:mt-8 desktop:mt-0 desktopfull:mt-0 mx-auto bg-primary rounded-xl border border-primary"
              : "w-full px-3"
          } `}
        >
          {!isMobile && (
            <div className="flex flex-col items-center mt-5 mb-6">
              <div className="text-white text-xl font-bold">Akun</div>
            </div>
          )}
          {isMobile && (
            <Link
              className="block py-2 px-4 cursor-pointer mt-6"
              to={"/profil"}
            >
              <FaArrowLeft className="w-6 h-6 inline-block" />
            </Link>
          )}
          <div className={`flex ${!isMobile ? "bg-white shadow-md" : ""}`}>
            {/* Left Side - Menu */}

            {!isMobile && <SidebarProfil />}

            {/* Right Side - Profile Form */}

            <div className="mobile:w-full desktop:w-2/3 desktopfull:w-2/3 rounded p-4 pb-8">
              <div className="flex flex-col items-center mt-3 mb-6">
                <p className="text-black text-2xl font-bold">
                  Riwayat Pembayaran
                </p>
              </div>

              <div className="grid mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-2 desktopfull:grid-cols-2 gap-3">
                {riwayatPembayaran.map((course, index) => (
                  <div
                    className="rounded-3xl shadow-lg hover:shadow-2xl hover:border hover:border-gray-300 hover:scale-105 cursor-pointer"
                    key={index}
                    onClick={() =>
                      navigate("/kelas/detail", {
                        state: {
                          courseId: course.course_id,
                        },
                      })
                    }
                  >
                    <img
                      src={course.url_image_preview}
                      alt=""
                      className="w-full h-[9rem] object-cover rounded-t-3xl"
                    />
                    <div className="px-3.5 pt-2 pb-5">
                      <div className="text-primary">
                        {course.Kategori.title}
                      </div>
                      <div className="font-bold whitespace-nowrap overflow-hidden text-base">
                        {course.title}
                      </div>
                      <div className="font-medium text-xs">
                        by <span>{course.Mentor.name}</span>
                      </div>
                      <div className="flex items-center gap-0.5 text-xs mt-1">
                        <div>{course.level}</div>
                        <BsDot />
                        <div>{course.module} Modul</div>
                        <BsDot />
                        <div>Sertifikasi Profesional</div>
                      </div>
                      <div className="flex items-center mt-1">
                        <FaRegCheckCircle className="text-green-500 mr-2" />
                        <span className="text-green-500 text-sm font-semibold">
                          {
                            course.Riwayat_Transaksi[
                              course.Riwayat_Transaksi.length - 1
                            ].status
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </LayoutUser>
    </>
  );
};
