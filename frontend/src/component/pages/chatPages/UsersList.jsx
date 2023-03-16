import React from 'react'

const UsersList = ({data}) => {
  return (
    <div
    className="col-12 col-md-3 bg-white container"
    style={{ height: "84.2vh", overflowY: "scroll" }}
  >
    <div className="d-flex align-items-center p-3 my-3  bg-purple rounded shadow-sm">
      <img
        className="me-3"
        src="logo192.png"
        alt=""
        width="48"
        height="38"
      />
      <div className="lh-1">
        <h1 className="h6 mb-0 lh-1">Search</h1>
        <small>Since 2011</small>
      </div>
    </div>

    <div className="my-3 p-2 rounded ">
      <h6 className="border-bottom pb-2 mb-0">Connections</h6>
      {data.map((x) => (
        <div className="d-flex text-muted pt-3">
          <img
            className="bd-placeholder-img flex-shrink-0 me-2 rounded"
            width="35"
            height="35"
            alt={x.name}
            src={x.pic}
          />
          <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
            <div className="d-flex justify-content-between">
              <strong className="text-gray-dark">{x.name}</strong>
              {/* <a href="#">Follow</a> */}
            </div>
            <span className="d-block">{x.mobile}</span>
          </div>
        </div>
      ))}
    </div>
  </div>

  )
}

export default UsersList