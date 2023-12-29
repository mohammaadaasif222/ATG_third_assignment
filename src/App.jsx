import React, { useEffect, useState, lazy, Suspense } from "react";
const UserCard = lazy(() => import("./components/UserCard"));
import Spinner from "./components/Spinner";
import Header from "./components/Header";
const App = () => {
  const [users, setUsers] = useState(null);
  const [user, setuser] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://602e7c2c4410730017c50b9d.mockapi.io/users"
      );
      const result = await response.json();
      setUsers(result.slice(10,result.length));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const selectedUser = (id) => {
    console.log(id);
    setLoading(true);
    setTimeout(() => {
      setuser(users.find((user)=>(user.id === id)));
      setLoading(false);
    }, 2000);
  };
  // console.log(users);
  console.log(user);
  return (
    <>
      <Header />
      <div className="container py-5 ">
        <div className="row d-flex justify-content-evenly  flex-wrap-reverse">
          <div className="col-md-6 col-sm-12 bg-light rounded">
            <ul className="list-unstyled bg-light py-3 px-2 rounded">
              <li>All users({`${users?.length}`})</li>
            </ul>
            <hr />
            {users?.map((user, index) => {
              return (
                <Suspense fallback={<Spinner />} key={user?.createdAt}>
                  <UserCard user={user} select={selectedUser} />
                </Suspense>
              );
            })}
          </div>
          <div className="col-md-6 bg-light rounded">
            {loading ? (
              <div className="mt-5">
                <Spinner />
                <p className="text-center">Fetching...</p>
              </div>
            ) : (
              user && (
                <div className="row py-5">
                  <div className="col-md-6 card">
                    <div className="text-center">
                      <img
                        src={user?.avatar || "https://res.cloudinary.com/mae-com-in/image/upload/v1699458800/images_bx6zzs.png"}
                        width="100"
                        className="rounded-circle"
                      />
                    </div>
                    <hr/>
                    <p className="text-center mb-0"><strong>Name : {`${user?.profile?.firstName} ${ user?.profile?.lastName}`}</strong></p>
                    <p className="text-center" style={{fontSize:'0.7rem'}}><strong>Job Title: </strong>{`${user?.jobTitle}`}</p>
                    <hr/>
                    <p className="text-muted text-center" style={{fontSize:'0.7rem'}} ><strong>Bio: </strong>{user?.Bio}</p>
                  </div>
                  <div className="col-md-6 card">hello</div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
