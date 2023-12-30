import React, { useEffect, useState, lazy, Suspense } from "react";
const UserCard = lazy(() => import("./components/UserCard"));
import Spinner from "./components/Spinner";
import Header from "./components/Header";
import { CiSearch } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";

const App = () => {
  const [users, setUsers] = useState(null);
  const [user, setuser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filtered, setFiltered] = useState([]);

  const [query, setQuery] = useState("");
  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://602e7c2c4410730017c50b9d.mockapi.io/users"
      );
      const result = await response.json();
      setUsers(result.slice(10, result.length));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const selectedUser = (id) => {
    setLoading(true);
    setTimeout(() => {
      setuser(users.find((user) => user.id === id));
      setLoading(false);
    }, 2000);
  };
  const handleSearch = (e) => {
    setQuery(e.target.value);
  };
  useEffect(() => {
    const filtered = users?.filter(
      (user) =>
        user?.profile?.username.toLowerCase().includes(query?.toLowerCase()) ||
        user?.profile?.firstName.toLowerCase().includes(query.toLowerCase()) ||
        user?.profole?.lastName.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(filtered);
  }, [query]);
  console.log(filtered?.length);
  return (
    <>
      <Header />
      <div className="container">
        <div className="m-auto lg:w-600px h-50px d-flex align-items-center gap-2 justify-content-between px-6 rounded-xl">
          <input
            className="flex-1 h-100 outline-none form-control placeholder-gray-400 placeholder-font-size-14"
            type="text"
            onChange={handleSearch}
            value={query}
            placeholder="Search here..."
          />
          <FaSearch />
          {query && (
            <div
              className="position-absolute zindex-1 shadow-2xl cursor-pointer card bg-light p-5"
              style={{ height: "300px", overflowY: "auto", top:'7rem', zIndex:'1' }}
            >
              {query &&
               filtered?.length !== 0 ? filtered?.map((user) => (
                  <Suspense fallback={<Spinner />} key={user?.createdAt}>
                    <UserCard user={user} select={selectedUser} />
                  </Suspense>
                )) : <p>No user Found with Search {query}</p>}
            </div>
          )}
        </div>
      </div>

      <div className="container py-5 ">
        <div className="row d-flex justify-content-evenly  flex-wrap-reverse">
          <div className="col-md-6 col-sm-12 bg-light rounded">
            <ul className="list-unstyled bg-light py-3 px-2 rounded">
              <li>All users({`${users ? users?.length : "0"}`})</li>
            </ul>
            <hr />
            {users ? (
              users?.map((user, index) => {
                return (
                  <Suspense fallback={<Spinner />} key={user?.createdAt}>
                    <UserCard user={user} select={selectedUser} />
                  </Suspense>
                );
              })
            ) : (
              <Spinner />
            )}
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
                  <div className="col-md-6 py-3 border-end">
                    <div className="text-center">
                      <img
                        src={
                          user?.avatar ||
                          "https://res.cloudinary.com/mae-com-in/image/upload/v1699458800/images_bx6zzs.png"
                        }
                        width="100"
                        className="rounded-circle"
                      />
                      <p
                        className="text-center mb-0 text-warning py-2 mt-2 rounded-pill bg-secondary"
                        style={{ fontSize: "small" }}
                      >
                        <strong>Username: </strong>{" "}
                        {`${user?.profile?.username}`}
                      </p>
                    </div>
                    <hr />
                    <p className="text-center mb-0">
                      <strong>
                        Name :{" "}
                        {`${user?.profile?.firstName} ${user?.profile?.lastName}`}
                      </strong>
                    </p>
                    <p className="text-center" style={{ fontSize: "0.7rem" }}>
                      <strong>Job Title: </strong>
                      {`${user?.jobTitle}`}
                    </p>
                  </div>
                  <div className="col-md-6 ">
                    <p
                      className="text-muted text-center pt-5"
                      style={{ fontSize: "0.7rem" }}
                    >
                      <strong>Bio: </strong>
                      {user?.Bio}
                    </p>
                    <div className="d-flex gap-3">
                      <hr />
                      <strong
                        className="text-muted text-center"
                        style={{ fontSize: "0.7rem" }}
                      >
                        Email:
                      </strong>
                      <p
                        className="text-muted text-center"
                        style={{ fontSize: "0.7rem" }}
                      >
                        {user?.profile?.email}
                      </p>
                    </div>
                  </div>
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
