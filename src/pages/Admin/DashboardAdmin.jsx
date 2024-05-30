import React, { useEffect, useState } from "react";
import { LayoutAdmin } from "../../Layout/LayoutAdmin";
import { CardAdmin } from "../../components/Card/CardAdmin";
import { CiFilter } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { usePayment } from "../../services/admin/GetPayment";
import { useDebounce } from "use-debounce";

export const DashboardAdmin = () => {
  const [getModalFilter, setModalFilter] = useState(false);

  // GET PAYMENT
  const [getLimit, setLimit] = useState(10);
  const [getSearch, setSearch] = useState("");
  const [getStatus, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [getDataPayment, setDataPayment] = useState([]);
  const [searchValue] = useDebounce(getSearch, 1200);

  const { data: getPayment, isSuccess } = usePayment({
    limit: getLimit,
    page: currentPage,
    search: searchValue,
    status: getStatus,
  });

  useEffect(() => {
    setDataPayment(getPayment);
  }, [searchValue, getStatus, isSuccess, currentPage]);

  const dataPayment = getDataPayment?.data?.payment || [];

  // HANDLE PAGE
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const totalCourse = getPayment?.data?.pagination?.total_items;
    const forLastPage = totalCourse / 10;
    setLastPage(Math.ceil(forLastPage));
  }, [lastPage, getPayment]);

  // HANDLE RADIO BUTTON
  const handleRadio = (status) => {
    if (status === "Belum Bayar") {
      setStatus(status);
    } else if (status === "Sudah Bayar") {
      setStatus(status);
    }
  };

  // FUNCTION DATE FORMAT
  const dateFormat = (date) => {
    const dateTime = new Date(date);

    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const day = dateTime.getDate();
    const monthIndex = dateTime.getMonth();
    const year = dateTime.getFullYear();
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();

    const formattedDateTime = `${day} ${months[monthIndex]} ${year}, ${hours}.${minutes}`;

    return formattedDateTime;
  };

  const modalFilter = () => {
    return (
      <div className="absolute right-0 mt-2 bg-white shadow-lg border-t border-primary rounded-lg px-3 pt-1.5 pb-3 text-sm">
        <div className="font-semibold mb-2">Status</div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1.5">
            <input
              type="radio"
              id="notyet"
              name="status"
              value="Belum Bayar"
              onChange={(e) => handleRadio(e.target.value)}
              checked={getStatus === "Belum Bayar"}
              className="h-4 w-4 border border-gray-300 rounded-md"
            />
            <label htmlFor="notyet" className="whitespace-nowrap">
              Belum Bayar
            </label>
          </div>
          <div className="flex items-center gap-1.5">
            <input
              type="radio"
              id="done"
              name="status"
              value="Sudah Bayar"
              onChange={(e) => handleRadio(e.target.value)}
              checked={getStatus === "Sudah Bayar"}
              className="h-4 w-4 border border-gray-300 rounded-md"
            />
            <label htmlFor="done" className="whitespace-nowrap">
              Sudah Bayar
            </label>
          </div>
        </div>
        <hr className="mt-3 mb-2" />
        <div
          onClick={() => setStatus("")}
          className="py-0.5 text-center bg-slate-400 text-white rounded-lg cursor-pointer"
        >
          Reset
        </div>
      </div>
    );
  };

  return (
    <>
      <LayoutAdmin>
        <div className="flex flex-col gap-7">
          <CardAdmin />
          <div>
            <div className="flex justify-between items-center">
              <div className="font-bold text-xl">Status Pembayaran</div>
              <div className="flex items-center gap-6 text-primary">
                <div className="relative">
                  <div
                    className="flex items-center gap-1 text-lg border border-primary rounded-lg px-4 py-0.5 cursor-pointer hover:text-purple-800"
                    onClick={() =>
                      getModalFilter
                        ? setModalFilter(false)
                        : setModalFilter(true)
                    }
                  >
                    <CiFilter className="stroke-1 text-xl" />
                    <span className="font-semibold">Filter</span>
                  </div>
                  {getModalFilter ? modalFilter() : ""}
                </div>
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
                  <th className="ps-2 py-2.5">ID</th>
                  <th className="py-2.5">Kategori</th>
                  <th className="py-2.5">Kelas Premium</th>
                  <th className="py-2.5">Status</th>
                  <th className="py-2.5">Metode Pembayaran</th>
                  <th className="py-2.5">Tanggal Bayar</th>
                </tr>
              </thead>
              <tbody>
                {dataPayment.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-3 text-center">
                        {value.riwayat_transaksi_id}
                      </td>
                      <td className="py-3">{value.Course.Kategori.title}</td>
                      <td className="py-3">{value.Course.title}</td>
                      <td className="py-3 font-bold">{value.status}</td>
                      <td className="py-3">Credit Card</td>
                      <td className="py-3">
                        {dateFormat(value.tanggal_pembayaran)}
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
                    : "bg-[#489CFF] cursor-pointer"
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
                    : "bg-[#489CFF] cursor-pointer"
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
