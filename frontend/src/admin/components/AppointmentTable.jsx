import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RiAddLine } from "react-icons/ri";
import Table from "./Table";
import AppointmentModal from "./AppointmentModal";
import {
  appointmentSelector,
  fetchAppointments,
} from "../../feautures/appointment/appointmentSlice";
import { fetchUsers, userSelector } from "../../feautures/user/userSlice";
import { doctorSelector, getDoctors } from "../../feautures/doctor/doctorSlice";

const AppointmentTable = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { appointments, isLoading, limit, totalPages, totalResults } =
    useSelector(appointmentSelector);
  const { users } = useSelector(userSelector);
  const { doctors } = useSelector(doctorSelector);
  const [page, setPage] = useState(1);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handlePageChange = (page) => {
    if (page < 1) {
      setPage(1);
    } else if (page > totalPages) {
      setPage(totalPages);
    } else {
      setPage(page);
    }
  };

  useEffect(() => {
    dispatch(fetchAppointments(page));
    dispatch(fetchUsers());
    dispatch(getDoctors());
  }, [dispatch, page]);

  return (
    <>
      <div className="container-fluid">
        <div className="layout-specing">
          <div className="row">
            <div className="col-xl-9 col-md-6">
              <h5 className="mb-0">Appointments</h5>
              <nav aria-label="breadcrumb" className="d-inline-block mt-2">
                <ul className="breadcrumb breadcrumb-muted bg-transparent rounded mb-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="/admin/dashboard">SameDay Lab Works</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Appointments
                  </li>
                </ul>
              </nav>
            </div>

            <div className="col-xl-3 col-md-6 mt-4 mt-md-0 text-md-end">
              <Link to="#/" onClick={handleShowModal} className="btn btn-primary">
                <RiAddLine /> Add Appointment
              </Link>
            </div>
          </div>

          <div className="row">
            <div className="col-12 mt-4">
              <div className="table-responsive shadow rounded">
                {!isLoading && <Table data={appointments} />}
              </div>
            </div>
          </div>

          <div className="row text-center">
            <div className="col-12 mt-4">
              <div className="d-md-flex align-items-center text-center justify-content-between">
                <span className="text-muted me-3">
                  Showing 1 - {limit > totalResults ? totalResults : limit} out of {totalResults}
                </span>
                <ul className="pagination justify-content-center mb-0 mt-3 mt-sm-0">
                  <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                    <Link
                      onClick={() => handlePageChange(page - 1)}
                      className="page-link"
                      to="#/"
                      aria-label="Previous"
                    >
                      Prev
                    </Link>
                  </li>
                  {Array.apply(null, Array(totalPages)).map((x, i) => {
                    return (
                      <li
                        key={i}
                        style={{ cursor: "pointer" }}
                        className={`page-item ${page === i + 1 ? "active" : ""}`}
                      >
                        <Link className="page-link" onClick={() => handlePageChange(i + 1)} to="#/">
                          {i + 1}
                        </Link>
                      </li>
                    );
                  })}
                  <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                    <Link
                      onClick={() => handlePageChange(page + 1)}
                      className="page-link"
                      to="#/"
                      aria-label="Next"
                    >
                      Next
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AppointmentModal
        doctors={doctors}
        patients={users}
        show={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default AppointmentTable;
