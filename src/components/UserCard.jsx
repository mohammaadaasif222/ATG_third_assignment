import React from "react";

const UserCard = ({ user, select }) => {
  return (
    <div className=" card d-flex flex-row gap-3 align-items-center p-3 py-4 my-3 border-0" style={{boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'}} onClick={() => select(user?.id)}>
      <div className="text-center">
        <img
          src={user?.avatar||"https://res.cloudinary.com/mae-com-in/image/upload/v1699458800/images_bx6zzs.png"}
          width="100"
          className="rounded-circle"
        />
      </div>

      <div className="mt-3">
        {/* <span className="bg-secondary p-1 px-4 rounded text-white">Pro</span> */}
        <h5 className="mt-2 mb-0">User Name : {user?.profile.username}</h5>
        <span className="text-muted" style={{fontSize:'small'}}><strong>Job Title: </strong>{user?.jobTitle}</span>

        <div className="mt-1">
          <p className="fonts" style={{fontSize:'small'}}>
          <strong>Bio: </strong> {user?.Bio}
          </p>
        </div>
        <div className="buttons">
          <button className="btn btn-outline-primary px-4">Message</button>
          <button className="btn btn-primary px-4 ms-3">Contact</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
