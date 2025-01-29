import { RiBuilding2Fill, RiListSettingsFill } from "@remixicon/react";
import { FaMapLocationDot } from "react-icons/fa6";
import { HiReceiptRefund } from "react-icons/hi2";
import { IoVideocam } from "react-icons/io5";
import { MdOutlineWeb } from "react-icons/md";
import {
  PiCalendarDotFill,
  PiCalendarStarFill,
  PiDoorFill,
  PiSubtitlesFill,
  PiTimerFill,
} from "react-icons/pi";

const SettingsWidgetsGrid = () => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-3 w-full h-full gap-2">
      <div className="w-full h-full bg-[#eef0f1] rounded-md shadow-sm">
        <div className="w-full h-full flex justify-start items-center p-1 px-4 rounded-[3px]">
          <div className="rounded-full p-3 bg-[#d6dde2]">
            <RiListSettingsFill className="w-6 h-6 fill-[#4682B4]" />
          </div>
          <div className="pl-8 text-xl text-slate-500">Configurations</div>
        </div>
      </div>
      <div className="w-full h-full bg-[#eef0f1] rounded-md shadow-sm">
        <div className="w-full h-full flex justify-start items-center p-1 px-4 rounded-[3px]">
          <div className="rounded-full p-3 bg-[#e0d6e2]">
            <MdOutlineWeb className="w-6 h-6 fill-[#8c46b4]" />
          </div>
          <div className="pl-8 text-xl text-slate-500">Templates</div>
        </div>
      </div>
      <div className="w-full h-full bg-[#eef0f1] rounded-md shadow-sm">
        <div className="w-full h-full flex justify-start items-center p-1 px-4 rounded-[3px]">
          <div className="rounded-full p-3 bg-[#d6e2d9]">
            <RiBuilding2Fill className="w-6 h-6 fill-[#46b488]" />
          </div>
          <div className="pl-8 text-xl text-slate-500">Departments</div>
        </div>
      </div>

      <div className="w-full h-full bg-[#eef0f1] rounded-md shadow-sm">
        <div className="w-full h-full flex justify-start items-center p-1 px-4 rounded-[3px]">
          <div className="rounded-full p-3 bg-[#e2dad6]">
            <PiCalendarStarFill className="w-6 h-6 fill-[#b46046]" />
          </div>
          <div className="pl-8 text-xl text-slate-500">Holidays</div>
        </div>
      </div>
      <div className="w-full h-full bg-[#eef0f1] rounded-md shadow-sm">
        <div className="w-full h-full flex justify-start items-center p-1 px-4 rounded-[3px]">
          <div className="rounded-full p-3 bg-[#d6d7e2]">
            <PiSubtitlesFill className="w-6 h-6 fill-[#6451a9]" />
          </div>
          <div className="pl-8 text-xl text-slate-500">Job Title</div>
        </div>
      </div>
      <div className="w-full h-full bg-[#eef0f1] rounded-md shadow-sm">
        <div className="w-full h-full flex justify-start items-center p-1 px-4 rounded-[3px]">
          <div className="rounded-full p-3 bg-[#e2e2d6]">
            <PiCalendarDotFill className="w-6 h-6 fill-[#8f6138]" />
          </div>
          <div className="pl-8 text-xl text-slate-500">Leave Type</div>
        </div>
      </div>

      <div className="w-full h-full bg-[#eef0f1] rounded-md shadow-sm">
        <div className="w-full h-full flex justify-start items-center p-1 px-4 rounded-[3px]">
          <div className="rounded-full p-3 bg-[#d6e0e2]">
            <FaMapLocationDot className="w-6 h-6 fill-[#3e9a98]" />
          </div>
          <div className="pl-8 text-xl text-slate-500">Locations</div>
        </div>
      </div>
      <div className="w-full h-full bg-[#eef0f1] rounded-md shadow-sm">
        <div className="w-full h-full flex justify-start items-center p-1 px-4 rounded-[3px]">
          <div className="rounded-full p-3 bg-[#d6dae2]">
            <IoVideocam className="w-6 h-6 fill-[#0047AB]" />
          </div>
          <div className="pl-8 text-xl text-slate-500">Meetings</div>
        </div>
      </div>
      <div className="w-full h-full bg-[#eef0f1] rounded-md shadow-sm">
        <div className="w-full h-full flex justify-start items-center p-1 px-4 rounded-[3px]">
          <div className="rounded-full p-3 bg-[#e2e1d6]">
            <PiDoorFill className="w-6 h-6 fill-[#cfb002]" />
          </div>
          <div className="pl-8 text-xl text-slate-500">Meeting Rooms</div>
        </div>
      </div>

      <div className="w-full h-full bg-[#eef0f1] rounded-md shadow-sm">
        <div className="w-full h-full flex justify-start items-center p-1 px-4 rounded-[3px]">
          <div className="rounded-full p-3 bg-[#dce2d6]">
            <HiReceiptRefund className="w-6 h-6 fill-[#556B2F]" />
          </div>
          <div className="pl-8 text-xl text-slate-500">Reimbursement Types</div>
        </div>
      </div>
      <div className="w-full h-full bg-[#eef0f1] rounded-md shadow-sm">
        <div className="w-full h-full flex justify-start items-center p-1 px-4 rounded-[3px]">
          <div className="rounded-full p-3 bg-[#e2d6d6]">
            <PiTimerFill className="w-6 h-6 fill-[#DC143C]" />
          </div>
          <div className="pl-8 text-xl text-slate-500">Work Shifts</div>
        </div>
      </div>
      <div className="w-full h-full bg-[#eef0f1] rounded-md shadow-sm">
        <div className="w-full h-full flex justify-start items-center p-1 px-4 rounded-[3px]">
          <div className="rounded-full p-3 bg-[#d6dde2]">
            <RiListSettingsFill className="w-6 h-6" />
          </div>
          <div className="pl-8 text-xl text-slate-500">*******</div>
        </div>
      </div>

      <div className="w-full h-full bg-[#eef0f1] rounded-md shadow-sm">
        <div className="w-full h-full flex justify-start items-center p-1 px-4 rounded-[3px]">
          <div className="rounded-full p-3 bg-[#d6dde2]">
            <RiListSettingsFill className="w-6 h-6" />
          </div>
          <div className="pl-8 text-xl text-slate-500">*******</div>
        </div>
      </div>
      <div className="w-full h-full bg-[#eef0f1] rounded-md shadow-sm">
        <div className="w-full h-full flex justify-start items-center p-1 px-4 rounded-[3px]">
          <div className="rounded-full p-3 bg-[#d6dde2]">
            <RiListSettingsFill className="w-6 h-6" />
          </div>
          <div className="pl-8 text-xl text-slate-500">*******</div>
        </div>
      </div>
      <div className="w-full h-full bg-[#eef0f1] rounded-md shadow-sm">
        <div className="w-full h-full flex justify-start items-center p-1 px-4 rounded-[3px]">
          <div className="rounded-full p-3 bg-[#d6dde2]">
            <RiListSettingsFill className="w-6 h-6" />
          </div>
          <div className="pl-8 text-xl text-slate-500">*******</div>
        </div>
      </div>
    </div>
  );
};

export default SettingsWidgetsGrid;
