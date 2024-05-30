import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProfile } from "../pages/User/Profil/UserProfile";
import { RiwayatUser } from "../pages/User/Profil/RiwayatUser";
import { GantiPassword } from "../pages/User/Profil/GantiPassword";
import { Notifikasi } from "../pages/User/Notifikasi";
import { DashboardAdmin } from "../pages/Admin/DashboardAdmin";
import { ClassAdmin } from "../pages/Admin/ClassAdmin";
import { Class } from "../pages/User/Class";
import { Detail } from "../pages/User/Detail";
import { Payment } from "../pages/User/Payment";
import { Berhasil } from "../pages/User/Berhasil";
import { Homepage } from "../pages/User/Homepage";
import { ResetPassword } from "../pages/Autentikasi/ResetPassword";
import { OTP } from "../pages/Autentikasi/OTP";
import { Register } from "../pages/Autentikasi/Register";
import { LoginUser } from "../pages/Autentikasi/LoginUser";
import { SendEmail } from "../pages/Autentikasi/SendEmail";
import { AddVideo } from "../pages/Admin/AddVideo";
import { MyClass } from "../pages/User/MyClass";

export const RouteLists = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH */}
        <Route path="/login" element={<LoginUser />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/sendemail" element={<SendEmail />} />
        <Route path="/reset" element={<ResetPassword />} />

        {/* USER */}
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/kelas" element={<Class />} />
        <Route path="/kelassaya" element={<MyClass />} />
        <Route path="/notifikasi" element={<Notifikasi />} />
        <Route path="/kelas/detail" element={<Detail />} />
        <Route path="/kelas/payment" element={<Payment />} />
        <Route path="/kelas/payment/berhasil" element={<Berhasil />} />

        {/* USER PROFILE */}
        <Route path="/profil" element={<UserProfile />} />
        <Route path="/profil/gantipassword" element={<GantiPassword />} />
        <Route path="/profil/riwayat" element={<RiwayatUser />} />

        {/* ADMIN */}
        <Route path="/admin" element={<DashboardAdmin />} />
        <Route path="/admin/kelolakelas" element={<ClassAdmin />} />
        <Route path="/admin/add-video" element={<AddVideo />} />
      </Routes>
    </BrowserRouter>
  );
};
