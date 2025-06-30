import React from "react";

export default function StaffMemberCard({ member }) {
  return (
    <div className="h-20 flex gap-2 bg-primary-hover-bg rounded-md">
      <img
        src={member.staff.image.large}
        alt={member.role}
        className="h-full rounded-l-md shadow"
      />
      <div className="flex flex-col mt-2">
        <span className="text-white text-sm font-light">
          {member.staff.name.full}
        </span>
        <span className="text-primary-hover-text text-xs font-extralight">
          {member.role}
        </span>
      </div>
    </div>
  );
}
