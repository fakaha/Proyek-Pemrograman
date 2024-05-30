import React, { useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Accordion } from "flowbite-react";
import { LayoutUser } from "../../Layout/LayoutUser";
import { useCourseDetail } from "../../services/user/GetCourseDetail";
import { usePutPayment } from "../../services/user/PutPayment";

export const Payment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [activeBank, setActiveBank] = useState("");
  const [activeCard, setActiveCard] = useState("");

  const toggleActiveBank = (bankName) => {
    if (activeBank === bankName) {
      setActiveBank("");
    } else {
      setActiveBank(bankName);
      setActiveCard(""); // Deselect any active card when a bank is selected
    }
  };

  const toggleActiveCard = (cardName) => {
    if (activeCard === cardName) {
      setActiveCard("");
    } else {
      setActiveCard(cardName);
      setActiveBank(""); // Deselect any active bank when a card is selected
    }
  };

  // GET DETAIL COURSE
  const { data: getCourseDetail } = useCourseDetail({
    course_id: state.courseId,
  });

  const dataCourseDetail = getCourseDetail?.data || [];

  // PUT PAYMENT
  const { mutate: getPutPayment, isSuccess } = usePutPayment();

  const handleCheckout = () => {
    getPutPayment({
      course_id: dataCourseDetail?.course?.course_id,
      metode_pembayaran: "BNI",
    });
  };
  if (isSuccess) {
    navigate("/kelas/payment/berhasil", {
      state: {
        courseId: dataCourseDetail?.course?.course_id,
      },
    });
  }

  const ppn = (dataCourseDetail?.course?.harga * 11) / 100;

  return (
    <>
      <LayoutUser>
        <div>
          <Link to="/detail" className="flex items-center text-black hover:underline">
            <FaArrowLeft className="mr-2" />
            <h2 className="font-bold">Kembali</h2>
          </Link>
        </div>

        <div className="mobile:flex-col desktop:flex-row desktopfull:flex-row flex gap-4">
          <div className="w-full desktop:w-3/5 p-4">
            <Accordion collapseAll className="mb-3">
              <Accordion.Panel>
                <Accordion.Title className="bg-[#3C3C3C] hover:bg-neutral-950 text-white font-bold p-4 rounded-t-lg border-b border-gray-200">Bank Transfer</Accordion.Title>
                <Accordion.Content className="bg-white p-4 rounded-b-lg border-l border-r border-b border-gray-200">
                  <div className="border rounded-lg p-6 shadow-md">
                    <div className="text-gray-700 space-y-4">
                      <p className="font-bold text-lg">Lakukan pembayaran ke salah satu rekening berikut:</p>
                      <div className="flex justify-center w-full gap-10 mb-4">
                        <button onClick={() => toggleActiveBank("BRI")} className={`transform transition duration-300 ease-in-out relative ${activeBank === "BRI" ? "scale-105 ring-2 ring-[#6148FF] p-2" : "hover:scale-105"}`}>
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/BANK_BRI_logo.svg/1280px-BANK_BRI_logo.svg.png" alt="BRI" className="w-20 h-20 object-contain" />
                        </button>
                        <button onClick={() => toggleActiveBank("BNI")} className={`transform transition duration-300 ease-in-out relative ${activeBank === "BNI" ? "scale-105 ring-2 ring-[#6148FF] p-2" : "hover:scale-105"}`}>
                          <img src="https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/1200px-BNI_logo.svg.png" alt="BNI" className="w-20 h-20 object-contain" />
                        </button>
                        <button onClick={() => toggleActiveBank("MANDIRI")} className={`transform transition duration-300 ease-in-out relative ${activeBank === "MANDIRI" ? "scale-105 ring-2 ring-[#6148FF] p-2" : "hover:scale-105"}`}>
                          <img src="https://bankmandiri.co.id/image/layout_set_logo?img_id=31567&t=1704387784057" alt="MANDIRI" className="w-20 h-20 object-contain" />
                        </button>
                        <button onClick={() => toggleActiveBank("BSI")} className={`transform transition duration-300 ease-in-out relative ${activeBank === "BSI" ? "scale-105 ring-2 ring-[#6148FF] p-2" : "hover:scale-105"}`}>
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Bank_Syariah_Indonesia.svg/2560px-Bank_Syariah_Indonesia.svg.png" alt="BSI" className="w-20 h-20 object-contain" />
                        </button>
                      </div>
                      {/* <p className="font-bold">Silakan cantumkan nomor pesanan saat melakukan transfer.</p> */}
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>

            <Accordion collapseAll>
              <Accordion.Panel>
                <Accordion.Title className="bg-[#6148FF] text-white font-bold hover:bg-blue-800">Credit Card</Accordion.Title>
                <Accordion.Content className="bg-white pb-8">
                  {/* Credit Card Form */}
                  <div className="flex justify-center w-full gap-10 mb-4">
                    <button onClick={() => toggleActiveCard("Mastercard")} className={`transform transition duration-300 ease-in-out relative ${activeCard === "Mastercard" ? "scale-105 ring-2 ring-[#6148FF] p-2" : "hover:scale-105"}`}>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/100px-Mastercard-logo.svg.png" alt="Mastercard" className="w-20 h-20 object-contain" />
                    </button>
                    <button onClick={() => toggleActiveCard("Visa")} className={`transform transition duration-300 ease-in-out relative ${activeCard === "Visa" ? "scale-105 ring-2 ring-[#6148FF] p-2" : "hover:scale-105"}`}>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/200px-Visa.svg.png" alt="Visa" className="w-20 h-20 object-contain" />
                    </button>
                    <button onClick={() => toggleActiveCard("Amex")} className={`transform transition duration-300 ease-in-out relative ${activeCard === "Amex" ? "scale-105 ring-2 ring-[#6148FF] p-2" : "hover:scale-105"}`}>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="American Express" className="w-20 h-20 object-contain" />
                    </button>
                    <button onClick={() => toggleActiveCard("PayPal")} className={`transform transition duration-300 ease-in-out relative ${activeCard === "PayPal" ? "scale-105 ring-2 ring-[#6148FF] p-2" : "hover:scale-105"}`}>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/PayPal_logo.svg/2560px-PayPal_logo.svg.png" alt="PayPal" className="w-20 h-20 object-contain" />
                    </button>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="cardNumber" className="text-sm font-bold">
                      Card number
                    </label>
                    <div className="flex items-center mt-1">
                      <input type="text" id="cardNumber" placeholder="4480 0000 0000 0000" className="w-full p-2 border rounded" />
                    </div>
                  </div>
                  <div className="">
                    <label htmlFor="cardHolder" className="text-sm font-bold">
                      Card holder name
                    </label>
                    <input type="text" id="cardHolder" placeholder="John Doe" className="w-full p-2 border rounded mt-1" />
                  </div>
                  <div className="flex justify-between mt-4 gap-5">
                    <div>
                      <label htmlFor="cardCvv" className="text-sm font-bold">
                        CVV
                      </label>
                      <input type="text" id="cardCvv" placeholder="000" className="w-full p-2 border rounded mt-1" />
                    </div>
                    <div>
                      <label htmlFor="expiryDate" className="text-sm font-bold">
                        Expiry date
                      </label>
                      <input type="text" id="expiryDate" placeholder="07/24" className="w-full p-2 border rounded mt-1" />
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </div>

          <div className="w-full desktop:w-2/5 p-4">
            <div className="p-4 border-2 rounded-xl border-[#6148FF]">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-bold">Pembayaran Kelas</h3>
                </div>
              </div>
              <div className="flex justify-center px-4 mb-5">
                <div className="w-full shadow-xl rounded-3xl overflow-hidden">
                  <img className="w-full h-40 object-cover" src={dataCourseDetail?.course?.url_image_preview} alt="Course thumbnail" />
                  <div className="px-4 pt-1 pb-3 bg-white rounded-b-3xl shadow-lg">
                    <div className="flex justify-between items-center pt-2">
                      <h4 className="text-base font-bold text-[#6148FF]">{dataCourseDetail?.course?.Kategori?.title}</h4>
                    </div>
                    <h1 className="font-bold text-base">{dataCourseDetail?.course?.title}</h1>
                    <p className="text-sm mb-2">by {dataCourseDetail?.course?.Mentor?.name}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center px-5">
                <div className="flex flex-col gap-1.5">
                  <div className="font-bold">Harga</div>
                  <div>Rp {dataCourseDetail?.course?.harga}</div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="font-bold">PPN 11%</div>
                  <div>Rp {ppn}</div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="font-bold">Total Bayar</div>
                  <div className="font-semibold text-primary">Rp {dataCourseDetail?.course?.harga + ppn}</div>
                </div>
              </div>

              <div className="w-full flex justify-center">
                <button className="w-4/5 mt-4 h-12 bg-[#FF0000] text-white font-semibold rounded-full flex items-center justify-center hover:bg-red-600" onClick={handleCheckout}>
                  Bayar dan Ikuti Kelas Selamanya
                  <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </LayoutUser>
    </>
  );
};
