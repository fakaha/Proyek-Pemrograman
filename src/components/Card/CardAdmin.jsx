import React, { useState } from "react";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { useUser } from "../../services/admin/GetUsers";
import { useCourseAdmin } from "../../services/admin/GetCourseAdmin";

export const CardAdmin = () => {
  const [getPage, setPage] = useState(1);
  const [getLimit, setLimit] = useState(10);

  // GET USER
  const { data: getDataUser } = useUser({
    page: getPage,
    limit: getLimit,
  });

  const dataUser = getDataUser?.data.pagination.total_items || [];

  //GET COURSE
  const { data: getDataCourse } = useCourseAdmin({
    limit: 1000,
    page: 1,
    search: "",
    sort: "",
    category: [],
    level: [],
  });

  const dataCourse = getDataCourse?.data.course || [];

  const premiumCourse = dataCourse.filter((value) => {
    return value.premium === true;
  });

  const freeCourse = dataCourse.filter((value) => {
    return value.premium === false;
  });

  return (
    <div className="grid grid-cols-3 gap-10">
      <div className="flex items-center desktop:gap-5 desktopfull:gap-8 px-10 desktop:py-6 desktopfull:py-8 bg-[#489CFF] text-white rounded-xl">
        <div className="text-primary bg-white p-3 rounded-3xl">
          <MdOutlinePeopleAlt className="desktop:text-4xl desktopfull:text-5xl" />
        </div>
        <div className="desktop:text-xl desktopfull:text-2xl">
          <div>{dataUser}</div>
          <div className="font-semibold">Active Users</div>
        </div>
      </div>

      <div className="flex items-center desktop:gap-5 desktopfull:gap-8 px-10 desktop:py-6 desktopfull:py-8 bg-[#73CA5C] text-white rounded-xl">
        <div className="text-primary bg-white p-3 rounded-3xl">
          <MdOutlinePeopleAlt className="desktop:text-4xl desktopfull:text-5xl" />
        </div>
        <div className="desktop:text-xl desktopfull:text-2xl">
          <div>{premiumCourse.length}</div>
          <div className="font-semibold">Active Class</div>
        </div>
      </div>

      <div className="flex items-center desktop:gap-5 desktopfull:gap-8 px-10 desktop:py-6 desktopfull:py-8 bg-primary text-white rounded-xl">
        <div className="text-primary bg-white p-3 rounded-3xl">
          <MdOutlinePeopleAlt className="desktop:text-4xl desktopfull:text-5xl" />
        </div>
        <div className="desktop:text-xl desktopfull:text-2xl">
          <div>{freeCourse.length}</div>
          <div className="font-semibold">Premium Class</div>
        </div>
      </div>
    </div>
  );
};
